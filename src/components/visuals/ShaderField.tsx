'use client'

import { useEffect, useRef } from 'react'

/**
 * Iridescent signal field — a raw-WebGL fragment shader (no external libs).
 *
 * Rest state: a calm, flowing violet field with horizontal waveform striations
 * and a lime "playhead" sweeping across it (the ECG/signal motif) in the
 * Electric Grape palette. Interaction: the pointer injects a velocity-driven
 * energy that inflates the warp, ripples the surface around the cursor, and
 * splits the RGB channels into a chromatic-aberration shimmer along the edges —
 * pump it by moving fast, and it deflates back to rest as the energy decays.
 * (Modelled on ochyai.dev's mouse-reactive field.)
 *
 * Performance-minded — capped DPR, paused when hidden. Static under
 * prefers-reduced-motion (energy pinned to 0). Degrades to the wrapper's flat
 * violet if WebGL is unavailable.
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
uniform vec2 u_mouse;   // smoothed pointer, -1..1 across the viewport
uniform float u_energy; // pointer-velocity energy, ~0 at rest

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

// Full iridescent signal-field colour at position p.
vec3 shade(vec2 p, float t, vec2 m, float en) {
  // pointer ripple — the surface inflates around the cursor, settles at rest
  vec2 toM = p - m;
  float d = length(toM);
  float ripple = sin(d * 13.0 - t * 3.0) * exp(-d * 2.2) * (0.015 + 0.14 * en);
  p += (toM / (d + 0.001)) * ripple;

  float amp = 1.0 + 0.7 * en;               // energy inflates the warp
  vec2 q = vec2(fbm(p * 1.4 + vec2(0.0, 0.05 * t)),
                fbm(p * 1.4 + vec2(3.2, -0.05 * t)));
  float f = fbm(p * 1.4 + 1.7 * amp * q);
  f += 0.10 * sin(p.y * 7.0 + f * 3.0 + t * 0.5); // horizontal signal striations

  vec3 col = ramp(f);

  // thin-film sheen along the flowing rims
  float e = length(q - 0.5) * 1.6;
  float sheen = smoothstep(0.35, 0.95, e);
  vec3 irid = 0.12 * cos(6.28318 * ((f * 2.2 + 0.12 * t) + vec3(0.0, 0.33, 0.66)));
  col += irid * sheen;
  return col;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  float aspect = u_res.x / u_res.y;
  float t = u_time;
  vec2 m = vec2(u_mouse.x * 0.5 * aspect, -u_mouse.y * 0.5);
  float en = u_energy;

  // Chromatic aberration — RGB channels realign at rest, split with energy and
  // proximity to the cursor (the iridescent glitch along the edges).
  vec2 toM = uv - m;
  float prox = smoothstep(1.3, 0.0, length(toM));
  vec2 dir = toM / (length(toM) + 0.001);
  float off = 0.0016 + (0.006 + 0.030 * en) * (0.35 + 0.65 * prox);
  vec3 cR = shade(uv + dir * off, t, m, en);
  vec3 cG = shade(uv, t, m, en);
  vec3 cB = shade(uv - dir * off, t, m, en);
  vec3 col = vec3(cR.r, cG.g, cB.b);

  // Traveling heartbeat playhead — a lime charge sweeping the signal field.
  float sweep = fract(t * 0.05 + 0.02 * sin(t * 0.6));
  float px = mix(-aspect * 0.55, aspect * 0.55, sweep);
  float dpx = (uv.x - px) / 0.018;
  float pulse = exp(-dpx * dpx);
  col += pulse * vec3(0.78, 0.95, 0.31) * 0.16;

  // resolve out of noise on load
  float n = hash(gl_FragCoord.xy * 0.5 + vec2(u_time));
  col = mix(mix(vec3(0.09, 0.04, 0.26), vec3(n), 0.5), col, u_intro);

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

export default function ShaderField() {
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

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      gl.uniform2f(uMouse, 0, 0)
      gl.uniform1f(uEnergy, 0)
      gl.uniform1f(uTime, 12.0)
      gl.uniform1f(uIntro, 1)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      return () => ro.disconnect()
    }

    // Smoothed pointer + velocity-driven energy that decays back to rest.
    const mouse = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    const lastPos = { x: 0, y: 0 }
    let energy = 0
    let havePos = false
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      if (havePos) energy = Math.min(energy + Math.hypot(nx - lastPos.x, ny - lastPos.y) * 3.0, 1.6)
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
      mouse.x += (target.x - mouse.x) * 0.08
      mouse.y += (target.y - mouse.y) * 0.08
      energy *= 0.95 // deflate back to rest
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.uniform1f(uEnergy, energy)
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
      document.removeEventListener('visibilitychange', onVisibility)
      ro.disconnect()
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      role="img"
      aria-label="An iridescent signal field in violet with a lime playhead; it ripples and splits colour under the cursor."
    />
  )
}
