'use client'

import { useEffect, useRef } from 'react'

/**
 * Iridescent signal field — a raw-WebGL fragment shader (no external libs).
 *
 * Rest state: a calm, centred, flowing violet field with faint waveform
 * striations in the Electric Grape palette. Interaction (modelled on
 * ochyai.dev): the composition stays anchored — the pointer never translates or
 * dents it. Pointer *velocity* builds a smoothed energy that fades back to rest
 * and drives a chromatic-aberration shimmer (RGB channel split) along the
 * edges; horizontal pointer position gives a gentle sheen-hue shift. Move fast
 * → it shimmers; stop → it settles.
 *
 * `recede` (home use): dims toward the flat grape field as the page scrolls, so
 * content below stays legible. Performance-minded — capped DPR, paused when
 * hidden. Static under prefers-reduced-motion. Flat-violet fallback if WebGL is
 * unavailable.
 */
const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_intro;  // 0..1 resolve-from-noise
uniform vec2 u_mouse;   // smoothed pointer, -1..1 (sheen-hue only; no translation)
uniform float u_energy; // smoothed pointer-velocity energy, ~0 at rest
uniform float u_recede; // 0 at top -> 1 scrolled (home only)

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p) {
  float s = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { s += a * vnoise(p); p = m * p; a *= 0.5; }
  return s;
}
// On-brand Electric Grape ramp: deep indigo -> grape -> periwinkle -> lilac.
vec3 ramp(float f) {
  vec3 c1 = vec3(0.09, 0.04, 0.26);
  vec3 c2 = vec3(0.32, 0.12, 0.72);
  vec3 c3 = vec3(0.55, 0.36, 0.94);
  vec3 c4 = vec3(0.86, 0.84, 0.99);
  vec3 col = mix(c1, c2, smoothstep(0.0, 0.45, f));
  col = mix(col, c3, smoothstep(0.40, 0.72, f));
  col = mix(col, c4, smoothstep(0.78, 1.0, f));
  return col;
}

// Full iridescent signal-field colour at position p. Anchored — no pointer
// displacement; energy only intensifies the sheen shimmer.
vec3 shade(vec2 p, float t, float en) {
  vec2 q = vec2(fbm(p * 1.4 + vec2(0.0, 0.05 * t)),
                fbm(p * 1.4 + vec2(3.2, -0.05 * t)));
  float f = fbm(p * 1.4 + 1.7 * q);
  f += 0.10 * sin(p.y * 7.0 + f * 3.0 + t * 0.5); // horizontal signal striations

  vec3 col = ramp(f);

  // thin-film sheen along the flowing rims; horizontal pointer shifts its hue,
  // velocity energy makes it shimmer harder.
  float e = length(q - 0.5) * 1.6;
  float sheen = smoothstep(0.35, 0.95, e) * (1.0 + 0.8 * en);
  vec3 irid = 0.12 * cos(6.28318 * ((f * 2.2 + 0.12 * t + u_mouse.x * 0.4) + vec3(0.0, 0.33, 0.66)));
  col += irid * sheen;
  return col;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  float t = u_time;
  float en = u_energy;

  // Chromatic aberration — horizontal RGB split, realigned at rest, widening
  // with pointer velocity. Anchored: no cursor hotspot, no translation.
  float off = 0.0014 + 0.035 * en;
  vec3 cR = shade(uv + vec2(off, 0.0), t, en);
  vec3 cG = shade(uv, t, en);
  vec3 cB = shade(uv - vec2(off, 0.0), t, en);
  vec3 col = vec3(cR.r, cG.g, cB.b);

  // resolve out of noise on load
  float n = hash(gl_FragCoord.xy * 0.5 + vec2(u_time));
  col = mix(mix(vec3(0.09, 0.04, 0.26), vec3(n), 0.5), col, u_intro);

  // recede toward the flat grape field as the page scrolls (home)
  col = mix(col, vec3(0.416, 0.133, 0.839), u_recede * 0.85);

  // gentle vignette so text sits calmly over it
  float v = smoothstep(1.4, 0.1, length(uv));
  col *= 0.8 + 0.2 * v;

  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)
  if (!sh) return null
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn('[ShaderField] shader compile failed:', gl.getShaderInfoLog(sh))
    gl.deleteShader(sh)
    return null
  }
  return sh
}

export default function ShaderField({ recede = false }: { recede?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = (canvas.getContext('webgl', { alpha: false, antialias: false }) ||
      canvas.getContext('experimental-webgl', {
        alpha: false,
        antialias: false,
      })) as WebGLRenderingContext | null
    if (!gl) return // fall back to the wrapper's flat violet

    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) return
    const prog = gl.createProgram()
    if (!prog) return
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('[ShaderField] link failed:', gl.getProgramInfoLog(prog))
      return
    }
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uIntro = gl.getUniformLocation(prog, 'u_intro')
    const uMouse = gl.getUniformLocation(prog, 'u_mouse')
    const uEnergy = gl.getUniformLocation(prog, 'u_energy')
    const uRecede = gl.getUniformLocation(prog, 'u_recede')

    gl.clearColor(0.09, 0.04, 0.26, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25) // 3× sampling — keep it lean
      canvas.width = Math.max(1, Math.round(rect.width * dpr))
      canvas.height = Math.max(1, Math.round(rect.height * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    let recedeVal = 0
    const onScroll = recede
      ? () => {
          const vh = window.innerHeight || 800
          recedeVal = Math.min(Math.max(window.scrollY / (vh * 0.85), 0), 1)
        }
      : null
    if (onScroll) {
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      gl.uniform2f(uMouse, 0, 0)
      gl.uniform1f(uEnergy, 0)
      gl.uniform1f(uRecede, recedeVal)
      gl.uniform1f(uTime, 12.0)
      gl.uniform1f(uIntro, 1)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      return () => {
        ro.disconnect()
        if (onScroll) window.removeEventListener('scroll', onScroll)
      }
    }

    // Smoothed pointer + smoothed velocity energy (gentle rise and fall).
    const mouse = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    const lastPos = { x: 0, y: 0 }
    let energy = 0 // raw accumulator (decays)
    let energyUsed = 0 // extra-smoothed value sent to the GPU
    let havePos = false
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      if (havePos) energy = Math.min(energy + Math.hypot(nx - lastPos.x, ny - lastPos.y) * 1.5, 1.1)
      lastPos.x = nx
      lastPos.y = ny
      target.x = nx
      target.y = ny
      havePos = true
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    let raf = 0
    let running = true
    const start = performance.now()
    const loop = (now: number) => {
      if (!running) return
      const t = (now - start) / 1000
      const intro = Math.min(t / 2.0, 1)
      const eased = 1 - Math.pow(1 - intro, 3)
      mouse.x += (target.x - mouse.x) * 0.06
      mouse.y += (target.y - mouse.y) * 0.06
      energy *= 0.93 // decay
      energyUsed += (energy - energyUsed) * 0.2 // smooth rise & fall
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.uniform1f(uEnergy, energyUsed)
      gl.uniform1f(uRecede, recedeVal)
      gl.uniform1f(uTime, t)
      gl.uniform1f(uIntro, eased)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!running) {
        running = true
        raf = requestAnimationFrame(loop)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      if (onScroll) window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
      ro.disconnect()
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buf)
    }
  }, [recede])

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      role="img"
      aria-label="An iridescent violet signal field that shimmers under the cursor."
    />
  )
}
