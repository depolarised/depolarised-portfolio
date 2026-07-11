'use client'

import { useEffect, useRef } from 'react'

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)
  if (!sh) return null
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn('[FragmentCanvas] compile failed:', gl.getShaderInfoLog(sh))
    gl.deleteShader(sh)
    return null
  }
  return sh
}

/**
 * Full-viewport fragment-shader canvas with the shared interaction model:
 * anchored composition, pointer-velocity energy driving a chromatic-aberration
 * shimmer, and (optionally) scroll-recede. Capped DPR, paused when hidden,
 * static under prefers-reduced-motion, flat-violet fallback if WebGL is absent.
 */
export default function FragmentCanvas({
  frag,
  recede = false,
  ariaLabel,
}: {
  frag: string
  recede?: boolean
  ariaLabel: string
}) {
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
    const fs = compile(gl, gl.FRAGMENT_SHADER, frag)
    if (!vs || !fs) return
    const prog = gl.createProgram()
    if (!prog) return
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('[FragmentCanvas] link failed:', gl.getProgramInfoLog(prog))
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

    gl.clearColor(0.416, 0.133, 0.839, 1)
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
  }, [frag, recede])

  return <canvas ref={canvasRef} className="h-full w-full" role="img" aria-label={ariaLabel} />
}
