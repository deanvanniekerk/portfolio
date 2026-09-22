import { useEffect, useRef, useState } from 'react'
import type { Screenshot } from '../data/projects'

export function Gallery({ screenshots, name }: { screenshots: Screenshot[]; name: string }) {
  const [active, setActive] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const screen = screenshots[active]

  useEffect(() => {
    const element = dialog.current
    return () => { element?.close(); document.body.style.overflow = '' }
  }, [])

  const close = () => {
    dialog.current?.close()
    document.body.style.overflow = ''
    trigger.current?.focus()
  }

  const show = () => {
    dialog.current?.showModal()
    document.body.style.overflow = 'hidden'
  }

  const navigate = (direction: number) => setActive((current) => (current + direction + screenshots.length) % screenshots.length)

  return (
    <section className="gallery" aria-label={`${name} screenshots`}>
      <button ref={trigger} className={`gallery-image ${screen.mobile ? 'gallery-image-mobile' : ''}`} onClick={show} aria-label={`Enlarge ${screen.label}`}>
        <img src={screen.src} alt={screen.label} width={screen.mobile ? 390 : 1600} height={screen.mobile ? 844 : 900} />
        <span className="enlarge-hint">Enlarge image ↗</span>
      </button>
      <div className="gallery-caption"><p aria-live="polite">{screen.label}</p><span>{active + 1} of {screenshots.length}</span></div>
      <div className="gallery-thumbnails" aria-label="Choose a screenshot">
        {screenshots.map((item, index) => (
          <button key={item.src} onClick={() => setActive(index)} aria-label={`Show ${item.label}`} aria-pressed={index === active}>
            <img src={item.src} alt="" loading="lazy" width="120" height="80" />
          </button>
        ))}
      </div>
      <dialog ref={dialog} className="image-dialog" aria-label={`${name} enlarged screenshots`} onCancel={(event) => { event.preventDefault(); close() }} onClick={(event) => { if (event.target === event.currentTarget) close() }} onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          navigate(event.key === 'ArrowRight' ? 1 : -1)
        }
      }}>
        <div className="image-dialog-body">
          <button className="dialog-close" autoFocus onClick={close} aria-label="Close enlarged image">Close ×</button>
          <img src={screen.src} alt={screen.label} />
          <div className="dialog-controls">
            <button onClick={() => navigate(-1)} aria-label="Previous screenshot">←</button>
            <p aria-live="polite">{screen.label}<span>{active + 1} of {screenshots.length}</span></p>
            <button onClick={() => navigate(1)} aria-label="Next screenshot">→</button>
          </div>
        </div>
      </dialog>
    </section>
  )
}
