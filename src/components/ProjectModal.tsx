import { useEffect, useState } from 'react'
import { siX } from 'simple-icons'
import screenshot1 from '../assets/edge/screenshot-1.png'
import screenshot2 from '../assets/edge/screenshot-2.png'
import screenshot3 from '../assets/edge/screenshot-3.png'
import { TechIcon } from './TechIcon'
import './ProjectModal.css'

const SCREENSHOTS = [
  { src: screenshot1, label: 'Trading Chart' },
  { src: screenshot2, label: 'Scanner / Discovery' },
  { src: screenshot3, label: 'Portfolio' },
]

interface ProjectModalProps {
  open: boolean
  onClose: () => void
}

export function ProjectModal({ open, onClose }: ProjectModalProps) {
  const [active, setActive] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { if (zoomed) setZoomed(false); else onClose() }
      if (e.key === 'ArrowRight') setActive((a) => (a + 1) % SCREENSHOTS.length)
      if (e.key === 'ArrowLeft') setActive((a) => (a - 1 + SCREENSHOTS.length) % SCREENSHOTS.length)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, zoomed])

  if (!open) return null

  const highlights = [
    'Built the Edge frontend and API from scratch, hitting all launch date targets.',
    'Integrated TradingView chart widget with a TimescaleDB-backed OHLC API for low-latency candlestick data.',
    'Implemented a WebSocket server for streaming live price and order-book updates.',
    'Built the Discovery page — a highly-optimised scanner handling 100s of state updates per second.',
    'Maintained high performance standards throughout, critical for a live trading application.',
    'Collaborated with a small cross-functional international team.',
  ]

  const tags = ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'TimescaleDB', 'WebSockets', 'TradingView']

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-body">

          {/* ── LEFT: detail ── */}
          <div className="modal-left">
            <div className="modal-num">01 / Featured</div>
            <h2 className="modal-title">Edge Trading Platform</h2>

            <div className="modal-meta">
              <span className="modal-meta-role">Senior Engineer</span>
              <span className="modal-meta-sep">·</span>
              <span className="modal-meta-date">Oct 2024 – Present</span>
              <span className="modal-meta-sep">·</span>
              <span className="modal-meta-remote">Remote</span>
            </div>

            <p className="modal-desc">
              A tech startup specialising in cryptocurrency trading solutions. I built the
              Edge frontend and API end-to-end — from real-time market data infrastructure
              through to the trading interface used by live customers.
            </p>

            <div className="modal-highlights">
              {highlights.map((h, i) => (
                <div key={i} className="modal-highlight">
                  <span className="modal-highlight-dot" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className="modal-tags">
              {tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>

            {/* Screenshot carousel */}
            <div className="modal-carousel">
              <div className="modal-carousel-track">
                {SCREENSHOTS.map((s, i) => (
                  <img
                    key={i}
                    src={s.src}
                    alt={s.label}
                    className={`modal-carousel-img ${i === active ? 'active' : ''}`}
                    onClick={() => i === active && setZoomed(true)}
                  />
                ))}
                <button
                  className="modal-carousel-arrow modal-carousel-arrow--prev"
                  onClick={() => setActive((a) => (a - 1 + SCREENSHOTS.length) % SCREENSHOTS.length)}
                  aria-label="Previous"
                >‹</button>
                <button
                  className="modal-carousel-arrow modal-carousel-arrow--next"
                  onClick={() => setActive((a) => (a + 1) % SCREENSHOTS.length)}
                  aria-label="Next"
                >›</button>
              </div>
              <div className="modal-carousel-bar">
                <span className="modal-carousel-label">{SCREENSHOTS[active].label}</span>
                <div className="modal-carousel-dots">
                  {SCREENSHOTS.map((_, i) => (
                    <button
                      key={i}
                      className={`modal-carousel-dot ${i === active ? 'active' : ''}`}
                      onClick={() => setActive(i)}
                      aria-label={`Screenshot ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-links">
              <a href="https://edge.trade/scanner" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Open App →
              </a>
            </div>
          </div>

          {/* ── RIGHT: social panel ── */}
          <div className="modal-social">
            <div className="modal-social-header">
              <span className="modal-feed-dot" />
              Links
            </div>

            <a
              href="https://x.com/EdgeTrade"
              target="_blank"
              rel="noopener noreferrer"
              className="modal-social-card"
            >
              <div className="modal-social-card-icon">
                <TechIcon path={siX.path} color="#fff" size={22} />
              </div>
              <div className="modal-social-card-body">
                <div className="modal-social-card-name">@EdgeTrade</div>
                <div className="modal-social-card-sub">Follow on X for updates</div>
              </div>
              <span className="modal-social-card-arrow">→</span>
            </a>

            <a
              href="https://edge.trade/scanner"
              target="_blank"
              rel="noopener noreferrer"
              className="modal-social-card"
            >
              <div className="modal-social-card-icon modal-social-card-icon--globe">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <div className="modal-social-card-body">
                <div className="modal-social-card-name">edge.trade</div>
                <div className="modal-social-card-sub">Open the live platform</div>
              </div>
              <span className="modal-social-card-arrow">→</span>
            </a>

            <div className="modal-social-divider" />

            <div className="modal-social-stat">
              <span className="modal-social-stat-label">Status</span>
              <span className="modal-social-stat-value">
                <span className="modal-feed-dot modal-feed-dot--sm" /> Live
              </span>
            </div>
            <div className="modal-social-stat">
              <span className="modal-social-stat-label">Role</span>
              <span className="modal-social-stat-value">Senior Engineer</span>
            </div>
            <div className="modal-social-stat">
              <span className="modal-social-stat-label">Since</span>
              <span className="modal-social-stat-value">Oct 2024</span>
            </div>
            <div className="modal-social-stat">
              <span className="modal-social-stat-label">Type</span>
              <span className="modal-social-stat-value">Full-time · Remote</span>
            </div>
          </div>

        </div>

        {/* Lightbox */}
        {zoomed && (
          <div className="modal-lightbox" onClick={() => setZoomed(false)}>
            <img
              src={SCREENSHOTS[active].src}
              alt={SCREENSHOTS[active].label}
              className="modal-lightbox-img"
              onClick={(e) => e.stopPropagation()}
            />
            <button className="modal-lightbox-close" onClick={() => setZoomed(false)}>✕</button>
          </div>
        )}

      </div>
    </div>
  )
}
