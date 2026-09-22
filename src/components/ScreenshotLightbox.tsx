import { useEffect } from 'react'
import './ScreenshotLightbox.css'

interface ScreenshotLightboxProps {
  screenshots: readonly { src: string; label: string }[]
  active: number
  onNavigate: (direction: number) => void
  onClose: () => void
}

export function ScreenshotLightbox({ screenshots, active, onNavigate, onClose }: ScreenshotLightboxProps) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault()
        onNavigate(event.key === 'ArrowRight' ? 1 : -1)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onNavigate])

  const screenshot = screenshots[active]

  return (
    <div
      className="modal-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Screenshot gallery"
      onClick={(event) => { event.stopPropagation(); onClose() }}
    >
      <img src={screenshot.src} alt={screenshot.label} className="modal-lightbox-img" onClick={(event) => event.stopPropagation()} />
      <div className="modal-lightbox-controls" onClick={(event) => event.stopPropagation()}>
        <button onClick={() => onNavigate(-1)} aria-label="Previous enlarged screenshot">‹</button>
        <span aria-live="polite" title={screenshot.label}>{active + 1} / {screenshots.length} · {screenshot.label}</span>
        <button onClick={() => onNavigate(1)} aria-label="Next enlarged screenshot">›</button>
      </div>
      <button className="modal-lightbox-close" onClick={(event) => { event.stopPropagation(); onClose() }} aria-label="Close enlarged image">✕</button>
    </div>
  )
}
