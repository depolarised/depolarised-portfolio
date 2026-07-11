'use client'

import { useEffect, useRef } from 'react'

/**
 * Bold iridescent field — a raw-WebGL fragment shader (no external libs).
 * Domain-warped fbm builds flowing, organic forms in the Electric Grape palette;
 * a cosine-palette thin-film sheen pushes violet → periwinkle with lime/pearl
 * glints along the high-gradient rims. Resolves out of noise like the ECG.
 *
 * Performance-minded — capped DPR, paused when hidden. Static under
 * prefers-reduced-motion. Degrades to the wrapper's flat violet if WebGL is
 * unavailable (context stays untouched; nothing throws).
 */
const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_intro; // 0..1 resolve-from-noise

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
  for (int i = 0; i < 6; i++) { s += a * vnoise(p); p = m * p; a *= 0.5; }
  return s;
}
void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  float t = u_time * 0.06;

  // domain warp — two levels for the flowing, wing-like forms
  vec2 q = vec2(fbm(uv * 1.5 + vec2(0.0, t)),
                fbm(uv * 1.5 + vec2(3.2, -t)));
  vec2 r = vec2(fbm(uv * 1.5 + 2.0 * q + vec2(1.7, 9.2) + 0.15 * t),
                fbm(uv * 1.5 + 2.0 * q + vec2(8.3, 2.8) - 0.12 * t));
  float f = fbm(uv * 1.5 + 3.5 * r);

  // On-brand Electric Grape ramp: deep indigo -> grape -> periwinkle -> lilac.
  vec3 c1 = vec3(0.09, 0.04, 0.26);
  vec3 c2 = vec3(0.32, 0.12, 0.72);
  vec3 c3 = vec3(0.55, 0.36, 0.94);
  vec3 c4 = vec3(0.86, 0.84, 0.99);
  vec3 col = mix(c1, c2, smoothstep(0.0, 0.45, f));
  col = mix(col, c3, smoothstep(0.40, 0.72, f));
  col = mix(col, c4, smoothstep(0.78, 1.0, f));

  // Thin-film iridescence — oil-slick spectral bands that intensify along the
  // high-gradient rims (the wing edges catching light), so the field shimmers
  // boldly without going rainbow through the calm violet bulk.
  float e = length(r - q) * 1.35;
  float sheen = smoothstep(0.30, 0.9, e);
  vec3 oil = 0.5 + 0.5 * cos(6.28318 * (f * 3.0 + 0.10 * t + vec3(0.0, 0.35, 0.70)));
  col = mix(col, oil, 0.16 * sheen);
  vec3 irid = 0.12 * cos(6.28318 * ((f * 2.2 + 0.12 * t) + vec3(0.0, 0.33, 0.66)));
  col += irid * sheen;

  // The one lime/pearl charge — a glint along the sharpest rims only.
  float glint = smoothstep(0.66, 0.96, e);
  col += glint * glint * mix(vec3(0.78, 0.95, 0.31), vec3(0.97, 0.96, 0.93), 0.5) * 0.30;

  // resolve out of noise on load
  float n = hash(gl_FragCoord.xy * 0.5 + vec2(u_time));
  col = mix(mix(c1, vec3(n), 0.5), col, u_intro);

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

    // full-screen triangle
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uIntro = gl.getUniformLocation(prog, 'u_intro')

    gl.clearColor(0.11, 0.05, 0.3, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    let dpr = 1
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
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

    const render = (time: number, intro: number) => {
      gl.uniform1f(uTime, time)
      gl.uniform1f(uIntro, intro)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    if (reduce) {
      render(12.0, 1) // a settled, static frame
      return () => ro.disconnect()
    }

    let raf = 0
    let running = true
    const start = performance.now()
    const loop = (now: number) => {
      if (!running) return
      const t = (now - start) / 1000
      const intro = Math.min(t / 2.0, 1)
      const eased = 1 - Math.pow(1 - intro, 3)
      render(t, eased)
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
      aria-label="A bold iridescent generative field in violet, periwinkle, and pearl."
    />
  )
}
