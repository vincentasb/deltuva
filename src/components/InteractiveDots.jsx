import { useEffect, useRef } from 'react'

function InteractiveDots() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const dots = []
    const pointer = { x: -9999, y: -9999 }
    let rafId = 0
    let cssWidth = 0
    let cssHeight = 0
    let fieldTop = 120

    const buildDots = () => {
      dots.length = 0
      const baseSpacing = window.innerWidth < 768 ? 54 : 44
      const cols = Math.max(1, Math.ceil(cssWidth / baseSpacing))
      const rows = Math.max(1, Math.ceil((cssHeight - fieldTop) / baseSpacing))

      for (let row = 0; row <= rows; row += 1) {
        for (let col = 0; col <= cols; col += 1) {
          const xJitter = (Math.random() - 0.5) * (baseSpacing * 0.55)
          const yJitter = (Math.random() - 0.5) * (baseSpacing * 0.55)
          const baseX = col * baseSpacing + xJitter
          const baseY = fieldTop + row * baseSpacing + yJitter

          if (Math.random() < 0.17) continue
          if (baseX < -20 || baseX > cssWidth + 20 || baseY < fieldTop || baseY > cssHeight + 20) continue

          dots.push({
            baseX,
            baseY,
            x: baseX,
            y: baseY,
            radius: 1.3 + Math.random() * 2.2,
            alpha: 0.14 + Math.random() * 0.24,
          })
        }
      }
    }

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      cssWidth = canvas.clientWidth
      cssHeight = canvas.clientHeight
      const nav = document.querySelector('.top-bar')
      fieldTop = nav ? nav.getBoundingClientRect().bottom + 12 : 120
      canvas.width = Math.round(cssWidth * dpr)
      canvas.height = Math.round(cssHeight * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildDots()
    }

    const onMouseMove = (event) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
    }

    const onMouseLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }

    const draw = () => {
      const threshold = 130
      const stiffness = 0.14

      ctx.clearRect(0, 0, cssWidth, cssHeight)

      for (let i = 0; i < dots.length; i += 1) {
        const dot = dots[i]
        const dx = pointer.x - dot.baseX
        const dy = pointer.y - dot.baseY
        const dist = Math.hypot(dx, dy)

        let targetX = dot.baseX
        let targetY = dot.baseY

        if (dist > 0 && dist < threshold) {
          const pull = ((threshold - dist) / threshold) ** 2 * 64
          targetX += (dx / dist) * pull
          targetY += (dy / dist) * pull
        }

        dot.x += (targetX - dot.x) * stiffness
        dot.y += (targetY - dot.y) * stiffness

        ctx.beginPath()
        ctx.fillStyle = `rgba(230, 239, 255, ${dot.alpha})`
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      rafId = window.requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseout', onMouseLeave)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseout', onMouseLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-dots" aria-hidden="true" />
}

export default InteractiveDots
