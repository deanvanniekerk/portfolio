import { type MouseEvent, useEffect, useState } from 'react'
import { siGithub } from 'simple-icons'
import placeholderArchitecture from '../assets/jedidiahops/architecture.png'
import placeholderMobile from '../assets/jedidiahops/mobile-floor.png'
import placeholderWeb from '../assets/jedidiahops/web-admin.png'
import { TechIcon } from './TechIcon'
import './ProjectModal.css'
import './JedidiahOpsModal.css'

const REPO_URL = 'https://github.com/Jedidiah-Equipment/jedidiah-platform'

const PLACEHOLDERS = [
  { src: placeholderWeb, label: 'Placeholder: Web admin' },
  { src: placeholderMobile, label: 'Placeholder: Shop-floor mobile' },
  { src: placeholderArchitecture, label: 'Placeholder: Platform architecture' },
]

interface JedidiahOpsModalProps {
  open: boolean
  onClose: () => void
}

export function JedidiahOpsModal({ open, onClose }: JedidiahOpsModalProps) {
  const [active, setActive] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  const closeZoom = (event?: MouseEvent<HTMLElement>) => {
    event?.stopPropagation()
    setZoomed(false)
  }

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { if (zoomed) setZoomed(false); else onClose() }
      if (e.key === 'ArrowRight') setActive((a) => (a + 1) % PLACEHOLDERS.length)
      if (e.key === 'ArrowLeft') setActive((a) => (a - 1 + PLACEHOLDERS.length) % PLACEHOLDERS.length)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, zoomed])

  if (!open) return null

  const highlights = [
    'Built web admin workflows for jobs, bays, products, documents, feedback, quotes, and scheduling.',
    'Shipped an Expo operator app for login, bay/job lists, job detail, assemblies, feedback, reconnect handling, and PDF viewing.',
    'Reused a shared Fastify/tRPC API layer across web and mobile, with permission checks around jobs, documents, feedback, and product access.',
    'Modeled the manufacturing domain in Postgres and Drizzle across jobs, bays, quotes, products, feedback, files, and document metadata.',
    'Generated branded quote and brochure PDFs, then supported authenticated document viewing from the mobile app.',
    'Added assistant tooling with the OpenAI Agents SDK, including structured tools for customer and quote workflows plus draft quote emails.',
    'Maintained repo-local agent files and skills for PR follow-up, prompt audits, dev setup, and isolated parallel environments.',
  ]

  const tags = ['React', 'Expo', 'tRPC', 'Fastify', 'Postgres', 'Drizzle', 'OpenAI SDK']

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel jedidiahops-modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-body">
          <div className="modal-left">
            <div className="modal-num">01 / Featured</div>
            <h2 className="modal-title">JedidiahOps</h2>

            <div className="modal-meta">
              <span className="modal-meta-role">Manufacturing operations platform</span>
              <span className="modal-meta-sep">·</span>
              <span className="modal-meta-date">Web + Mobile</span>
              <span className="modal-meta-sep">·</span>
              <span className="modal-meta-remote">2026</span>
            </div>

            <p className="modal-desc">
              Over a two-month build, I developed JedidiahOps for a fabrication business. It started
              as a web-based admin system, then grew into a shop-floor product where operators can see
              jobs, bay schedules, documents, assemblies, and submit feedback from the floor. The
              mobile app went from first scaffold to Android build/submission in about two weeks.
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

            <div className="modal-carousel jedidiahops-carousel">
              <div className="modal-carousel-track jedidiahops-carousel-track">
                {PLACEHOLDERS.map((s, i) => (
                  <img
                    key={s.label}
                    src={s.src}
                    alt={s.label}
                    className={`modal-carousel-img ${i === active ? 'active' : ''}`}
                    onClick={() => i === active && setZoomed(true)}
                  />
                ))}
                <button
                  className="modal-carousel-arrow modal-carousel-arrow--prev"
                  onClick={() => setActive((a) => (a - 1 + PLACEHOLDERS.length) % PLACEHOLDERS.length)}
                  aria-label="Previous"
                >‹</button>
                <button
                  className="modal-carousel-arrow modal-carousel-arrow--next"
                  onClick={() => setActive((a) => (a + 1) % PLACEHOLDERS.length)}
                  aria-label="Next"
                >›</button>
              </div>
              <div className="modal-carousel-bar">
                <span className="modal-carousel-label">{PLACEHOLDERS[active].label}</span>
                <div className="modal-carousel-dots">
                  {PLACEHOLDERS.map((_, i) => (
                    <button
                      key={i}
                      className={`modal-carousel-dot ${i === active ? 'active' : ''}`}
                      onClick={() => setActive(i)}
                      aria-label={`Placeholder ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-links">
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                GitHub repo →
              </a>
            </div>
          </div>

          <div className="modal-social jedidiahops-stats-panel">
            <div className="modal-social-header">
              <span className="modal-feed-dot" />
              Platform
            </div>

            <div className="jedidiahops-stat-grid">
              <div className="jedidiahops-stat-card">
                <div className="jedidiahops-stat-value">~2 mo</div>
                <div className="jedidiahops-stat-label">Build window</div>
              </div>
              <div className="jedidiahops-stat-card">
                <div className="jedidiahops-stat-value">~2 wk</div>
                <div className="jedidiahops-stat-label">Mobile push</div>
              </div>
            </div>

            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-social-card"
            >
              <div className="modal-social-card-icon jedidiahops-github-icon">
                <TechIcon path={siGithub.path} color="#fff" size={21} />
              </div>
              <div className="modal-social-card-body">
                <div className="modal-social-card-name">GitHub repository</div>
                <div className="modal-social-card-sub">Public portfolio source</div>
              </div>
              <span className="modal-social-card-arrow">→</span>
            </a>

            <div className="modal-social-divider" />

            <div className="modal-social-stat">
              <span className="modal-social-stat-label">Role</span>
              <span className="modal-social-stat-value">Full-stack builder</span>
            </div>
            <div className="modal-social-stat">
              <span className="modal-social-stat-label">Scope</span>
              <span className="modal-social-stat-value">Web · Mobile · API · AI</span>
            </div>
            <div className="modal-social-stat">
              <span className="modal-social-stat-label">Mobile</span>
              <span className="modal-social-stat-value">Expo · Android submission</span>
            </div>
            <div className="modal-social-stat">
              <span className="modal-social-stat-label">Data</span>
              <span className="modal-social-stat-value">Postgres · Drizzle</span>
            </div>
            <div className="modal-social-stat">
              <span className="modal-social-stat-label">Docs</span>
              <span className="modal-social-stat-value">PDF generation · Auth viewing</span>
            </div>
          </div>
        </div>
      </div>

      {zoomed && (
        <div className="modal-lightbox" onClick={closeZoom} role="dialog" aria-modal="true">
          <img
            src={PLACEHOLDERS[active].src}
            alt={PLACEHOLDERS[active].label}
            className="modal-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="modal-lightbox-close" onClick={closeZoom} aria-label="Close enlarged image">✕</button>
        </div>
      )}
    </div>
  )
}
