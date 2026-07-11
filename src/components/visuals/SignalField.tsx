'use client'

import { useEffect, useRef } from 'react'

/**
 * Hero visual for the violet field: a chalk ECG in atrial fibrillation that
 * resolves out of noise, with a single lime playhead reading across it (the one
 * charge of lime). AF is modelled honestly — no organised P waves, an irregular
 * fibrillatory baseline, and irregularly-irregular R-R intervals with normal
 * QRS+T morphology.
 *
 * Two variants:
 *  - `inline`   — sits in a box (the classic hero-right usage).
 *  - `backdrop` — a fixed, full-viewport backdrop the whole page scrolls over;
 *                 the trace and playhead *recede* (dim) as you scroll away, so
 *                 content reads over a calm violet field. The signal never fully
 *                 vanishes (kept legible-but-quiet), and the whites are held a
 *                 touch below full to avoid glare.
 *
 * Performance-minded — capped DPR, paused when hidden — and fully static under
 * prefers-reduced-motion.
 */
export default function SignalField({
  variant = 'inline',
}: {
  variant?: 'inline' | 'backdrop'
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scrollYRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const backdrop = variant === 'backdrop'
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
    const LIME = 'rgba(198, 242, 78, '

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

    // presence ∈ [0,1]: 1 at the top of the page, easing to 0 as the hero
    // scrolls away. Drives how far the trace recedes. inline mode is always 1.
    const presence = () => {
      if (!backdrop) return 1
      const vh = window.innerHeight || 800
      const fade = Math.min(Math.max(scrollYRef.current / (vh * 0.7), 0), 1)
      return 1 - fade
    }

    const draw = (t: number, noiseAmp: number, pres: number) => {
      ctx.clearRect(0, 0, width, height)
      const midY = height / 2
      const amp = Math.min(height * 0.28, 150) * (0.88 + 0.12 * pres)

      // chalk ECG line — the whites dim as the page recedes (and never sit at
      // full brightness, to keep glare down).
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
      ctx.strokeStyle = CHALK + (0.14 + 0.3 * pres) + ')'
      ctx.stroke()

      // faint baseline
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, midY)
      ctx.lineTo(width, midY)
      ctx.strokeStyle = CHALK + (0.06 + 0.06 * pres) + ')'
      ctx.stroke()

      // lime playhead reading across the signal — the one charge. The vertical
      // guide stays a whisper (never a page seam); the dot carries the charge
      // and recedes hard with the page.
      const ph = reduce ? 0.62 : (t * 0.08) % 1
      const nx = ph
      const x = nx * width
      const y = midY - signal(nx, t) * amp
      ctx.strokeStyle = LIME + (0.05 + 0.1 * pres) + ')'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
      ctx.fillStyle = LIME + (0.15 + 0.75 * pres) + ')'
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
    }

    if (reduce) {
      // static, mid-presence when it's a backdrop so content still reads calmly.
      draw(0.8, 0.06, backdrop ? 0.7 : 1)
      return () => ro.disconnect()
    }

    let onScroll: (() => void) | null = null
    if (backdrop) {
      onScroll = () => {
        scrollYRef.current = window.scrollY
      }
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
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
      draw(t, noiseAmp, presence())
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
      if (onScroll) window.removeEventListener('scroll', onScroll)
      ro.disconnect()
    }
  }, [variant])

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      role="img"
      aria-label="An electrocardiogram in atrial fibrillation, resolving out of noise."
    />
  )
}
