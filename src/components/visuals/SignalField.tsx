'use client'

import { useEffect, useRef } from 'react'

/**
 * Hero visual for the violet field: a chalk ECG in atrial fibrillation that
 * resolves out of noise, with a single lime playhead reading across it (the one
 * charge of lime). AF is modelled honestly — no organised P waves, an irregular
 * fibrillatory baseline, and irregularly-irregular R-R intervals with normal
 * QRS+T morphology. Same animation as before; only the waveform is now cardiac.
 * Performance-minded — capped DPR, paused when offscreen/hidden — and fully
 * static under prefers-reduced-motion.
 */
export default function SignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const COLS = 520
    // Stable per-column phase offsets for cheap, flicker-free value noise.
    const phaseA = Array.from({ length: COLS }, (_, i) => Math.sin(i * 12.9898) * 43758.5453 % 1)
    const phaseB = Array.from({ length: COLS }, (_, i) => Math.sin(i * 78.233) * 12543.123 % 1)

    // Fixed R-peak positions across the trace, irregularly-irregular (AF).
    // Deterministic jitter so the rhythm is stable across renders.
    const beats: number[] = []
    {
      const jitter = (n: number) => Math.abs((Math.sin(n * 99.13) * 43758.5453) % 1)
      let x = 0.03
      let k = 0
      while (x < 1.03) {
        beats.push(x)
        x += 0.1 + jitter(k) * 0.085
        k++
      }
    }

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dpr = 1

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const CHALK = 'rgba(246, 242, 234, '
    const LIME = '#C6F24E'

    // Gaussian bump.
    const g = (d: number, w: number) => Math.exp(-(d * d) / (w * w))
    // QRS + T morphology as a function of normalized-x distance from an R peak.
    // No P wave (atrial fibrillation).
    const complex = (d: number) =>
      -0.1 * g(d + 0.008, 0.004) + // Q
      0.95 * g(d, 0.004) + //         R
      -0.26 * g(d - 0.009, 0.0045) + // S
      0.2 * g(d - 0.042, 0.017) //    T

    // value of the clean AF ECG at normalized x (0..1) and time t
    const signal = (nx: number, t: number) => {
      // Fibrillatory baseline — chaotic low-amplitude f-waves that replace the
      // flat isoelectric line and organised P waves. Shimmers gently with t.
      let v =
        0.045 * Math.sin(nx * 120 + t * 0.8) +
        0.03 * Math.sin(nx * 190 - t * 0.6) +
        0.022 * Math.sin(nx * 85 + t * 0.4)
      for (let b = 0; b < beats.length; b++) v += complex(nx - beats[b])
      return v
    }

    const noiseAt = (i: number, t: number) =>
      Math.sin(i * 0.9 + phaseA[i] * 6.28 + t * 2.1) *
      Math.cos(i * 0.5 + phaseB[i] * 6.28 - t * 1.3)

    const draw = (t: number, noiseAmp: number) => {
      ctx.clearRect(0, 0, width, height)
      const midY = height / 2
      const amp = Math.min(height * 0.28, 150)

      // chalk ECG line
      ctx.lineWidth = 1.5
      ctx.lineJoin = 'round'
      ctx.beginPath()
      for (let i = 0; i < COLS; i++) {
        const nx = i / (COLS - 1)
        const x = nx * width
        const y = midY - (signal(nx, t) + noiseAt(i, t) * noiseAmp) * amp
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.strokeStyle = CHALK + '0.5)'
      ctx.stroke()

      // faint baseline
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, midY)
      ctx.lineTo(width, midY)
      ctx.strokeStyle = CHALK + '0.14)'
      ctx.stroke()

      // lime playhead reading across the signal
      const ph = reduce ? 0.62 : (t * 0.08) % 1
      const nx = ph
      const x = nx * width
      const y = midY - signal(nx, t) * amp
      ctx.strokeStyle = 'rgba(198, 242, 78, 0.45)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
      ctx.fillStyle = LIME
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
    }

    if (reduce) {
      draw(0.8, 0.06)
      return () => ro.disconnect()
    }

    let raf = 0
    let running = true
    const start = performance.now()

    const loop = (now: number) => {
      if (!running) return
      const t = (now - start) / 1000
      // noise decays over the first ~2.4s, then breathes gently
      const intro = Math.min(t / 2.4, 1)
      const eased = 1 - Math.pow(1 - intro, 3)
      const noiseAmp = (1 - eased) * 0.9 + 0.06 + Math.sin(t * 0.6) * 0.02
      draw(t, noiseAmp)
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
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      role="img"
      aria-label="An electrocardiogram in atrial fibrillation, resolving out of noise."
    />
  )
}
