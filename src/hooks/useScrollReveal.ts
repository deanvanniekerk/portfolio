import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
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

    // Animate skill bars already in viewport on load
    document.querySelectorAll<HTMLElement>('.skill-bar-fill').forEach((bar) => {
      const card = bar.closest('.skill-card')
      if (card) {
        const rect = card.getBoundingClientRect()
        if (rect.top < window.innerHeight) {
          setTimeout(() => bar.classList.add('animated'), 600)
        }
      }
    })

    return () => observer.disconnect()
  }, [])
}
