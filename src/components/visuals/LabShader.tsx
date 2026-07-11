'use client'

import { useEffect, useRef } from 'react'

/**
 * ECG ribbon — a single AF-ECG trace as an iridescent ribbon in fake 3D. The
 * form is STATIC and anchored (no scrolling, no bob): the geometry has no time
 * term, so it stays put like the reference's centred butterfly. Only the sheen
 * breathes slowly and the pointer drives a chromatic-aberration shimmer (RGB
 * split widens with pointer velocity; horizontal pointer shifts the sheen hue).
 *
 * Capped DPR, paused when hidden, static under prefers-reduced-motion, flat
 * violet fallback if WebGL is unavailable.
 */
const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_intro;
uniform vec2 u_mouse;
uniform float u_energy;
uniform float u_recede; // 0 at top -> 1 scrolled (home only)

const vec3 DEEP = vec3(0.09, 0.04, 0.26);

float hash(vec2 p){ p=fract(p*vec2(123.34,345.45)); p+=dot(p,p+34.345); return fract(p.x*p.y); }
vec3 ramp(float f){
  vec3 c1=vec3(0.09,0.04,0.26), c2=vec3(0.32,0.12,0.72), c3=vec3(0.55,0.36,0.94), c4=vec3(0.86,0.84,0.99);
  vec3 col=mix(c1,c2,smoothstep(0.0,0.45,f));
  col=mix(col,c3,smoothstep(0.40,0.72,f));
  col=mix(col,c4,smoothstep(0.78,1.0,f));
  return col;
}
float gaus(float d, float w){ return exp(-(d*d)/(w*w)); }
// AF-ECG morphology (QRS + T, no P wave) at distance d from an R peak.
float ecg(float d){
  return -0.10*gaus(d+0.008,0.004) + 0.95*gaus(d,0.004)
         -0.26*gaus(d-0.009,0.0045) + 0.20*gaus(d-0.042,0.017);
}

// Static, anchored ribbon colour at position uv. No time in the geometry.
vec3 shade(vec2 uv, float t, float en){
  float depth = sin(uv.x * 1.4);              // fixed dimensional curve (anchored)
  float persp = 1.0 / (1.0 + 0.3 * depth);
  float beat = fract(uv.x * 1.9 + 0.5);       // fixed beats across the width
  float trace = ecg(beat - 0.5);
  float yc = trace * 0.42 * persp + 0.08 * depth; // centreline (baseline ~ centre)
  float thick = 0.055 * persp;
  float d = abs(uv.y - yc);
  float ribbon = smoothstep(thick, thick * 0.25, d);

  float f = 0.5 + trace * 0.8 + 0.3 * depth;
  vec3 col = ramp(clamp(f, 0.0, 1.0));
  col = mix(DEEP * 0.9, col, ribbon);

  // edge sheen + iridescence (only a slow hue breath animates; form is static)
  float edge = smoothstep(thick, thick * 0.5, d) * (1.0 - smoothstep(thick * 0.5, 0.0, d));
  vec3 irid = 0.18 * cos(6.28318 * (f * 2.0 + uv.x * 0.6 + 0.03 * t + u_mouse.x * 0.4 + vec3(0.0, 0.33, 0.66)));
  col += irid * ribbon * (1.0 + 0.8 * en);
  col += edge * vec3(0.9, 0.95, 0.8) * 0.3;
  return col;
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  float t = u_time;
  float en = u_energy;
  float off = 0.0016 + 0.03 * en;               // horizontal chromatic aberration
  vec3 cR = shade(uv + vec2(off, 0.0), t, en);
  vec3 cG = shade(uv, t, en);
  vec3 cB = shade(uv - vec2(off, 0.0), t, en);
  vec3 col = vec3(cR.r, cG.g, cB.b);
  float n = hash(gl_FragCoord.xy * 0.5 + vec2(u_time));
  col = mix(mix(DEEP, vec3(n), 0.5), col, u_intro);
  col = mix(col, vec3(0.416, 0.133, 0.839), u_recede * 0.85); // recede to flat grape
  float v = smoothstep(1.5, 0.1, length(uv));
  col *= 0.82 + 0.18 * v;
  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)
  if (!sh) return null
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn('[LabShader] compile failed:', gl.getShaderInfoLog(sh))
    gl.deleteShader(sh)
    return null
  }
  return sh
}

export default function LabShader({ recede = false }: { recede?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = (canvas.getContext('webgl', { alpha: false, antialias: false }) ||
      canvas.getContext('experimental-webgl', {
        alpha: false,
        antialias: false,
      })) as WebGLRenderingContext | null
    if (!gl) return

    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) return
    const prog = gl.createProgram()
    if (!prog) return
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('[LabShader] link failed:', gl.getProgramInfoLog(prog))
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
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
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
      gl.uniform1f(uTime, 6.0)
      gl.uniform1f(uIntro, 1)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      return () => {
        ro.disconnect()
        if (onScroll) window.removeEventListener('scroll', onScroll)
      }
    }

    const mouse = { x: 0, y: 0 }
    const targ = { x: 0, y: 0 }
    const last = { x: 0, y: 0 }
    let energy = 0
    let energyUsed = 0
    let have = false
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      if (have) energy = Math.min(energy + Math.hypot(nx - last.x, ny - last.y) * 1.5, 1.1)
      last.x = nx
      last.y = ny
      targ.x = nx
      targ.y = ny
      have = true
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
      mouse.x += (targ.x - mouse.x) * 0.06
      mouse.y += (targ.y - mouse.y) * 0.06
      energy *= 0.93
      energyUsed += (energy - energyUsed) * 0.2
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.uniform1f(uEnergy, energyUsed)
      gl.uniform1f(uRecede, recedeVal)
      gl.uniform1f(uTime, t)
      gl.uniform1f(uIntro, eased)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onVis = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!running) {
        running = true
        raf = requestAnimationFrame(loop)
      }
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      if (onScroll) window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVis)
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
      aria-label="A static iridescent ECG ribbon in 3D that shimmers under the cursor."
    />
  )
}
