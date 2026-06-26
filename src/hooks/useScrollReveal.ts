import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            entry.target.querySelectorAll<HTMLElement>('.skill-bar-fill').forEach((bar) => {
              bar.classList.add('animated')
            })
          }
        })
      },
      { threshold: 0.12 }
    )

    const elements = document.querySelectorAll('.reveal')
    elements.forEach((el) => observer.observe(el))

    document.querySelectorAll<HTMLElement>('.skill-bar-fill').forEach((bar) => {
      const card = bar.closest('.skill-card')
      if (card) {
        const rect = card.getBoundingClientRect()
        if (rect.top < window.innerHeight) {
          setTimeout(() => bar.classList.add('animated'), 600)
        }
      }
    })

    const parallaxElements = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))
    let frame = 0

    const updateParallax = () => {
      frame = 0
      if (reduceMotion) return

      const viewportCenter = window.innerHeight / 2
      parallaxElements.forEach((el) => {
        const speed = Number(el.dataset.parallax) || 0
        const rect = el.getBoundingClientRect()
        const elementCenter = rect.top + rect.height / 2
        el.style.transform = `translate3d(0, ${((viewportCenter - elementCenter) * speed).toFixed(1)}px, 0)`
      })
    }

    const requestParallax = () => {
      if (frame) return
      frame = window.requestAnimationFrame(updateParallax)
    }

    updateParallax()
    window.addEventListener('scroll', requestParallax, { passive: true })
    window.addEventListener('resize', requestParallax, { passive: true })

    return () => {
      observer.disconnect()
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestParallax)
      window.removeEventListener('resize', requestParallax)
    }
  }, [])
}
