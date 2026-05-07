import { useEffect } from 'react'
import './ProjectModal.css'
import './WorkModal.css'

interface WorkModalLink {
  label: string
  sub: string
  url: string
  icon: 'globe' | 'github'
}

interface WorkModalStat {
  label: string
  value: string
}

export interface WorkModalProps {
  open: boolean
  onClose: () => void
  num: string
  title: string
  role: string
  period: string
  location: string
  desc: string
  highlights: string[]
  tags: string[]
  links: WorkModalLink[]
  stats: WorkModalStat[]
  accentLabel?: string
  logoUrl?: string
  logoAlt?: string
}

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
)

export function WorkModal({
  open, onClose, num, title, role, period, location,
  desc, highlights, tags, links, stats, accentLabel, logoUrl, logoAlt,
}: WorkModalProps) {

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel work-modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-body">

          {/* ── LEFT: detail ── */}
          <div className="modal-left">
            <div className="modal-num">{num}</div>
            <div className="work-modal-title-row">
              {logoUrl && (
                <img src={logoUrl} alt={logoAlt ?? `${title} logo`} className="work-modal-logo" />
              )}
              <h2 className="modal-title">{title}</h2>
            </div>

            <div className="modal-meta">
              <span className="modal-meta-role">{role}</span>
              <span className="modal-meta-sep">·</span>
              <span className="modal-meta-date">{period}</span>
              <span className="modal-meta-sep">·</span>
              <span className="modal-meta-remote">{location}</span>
            </div>

            <p className="modal-desc">{desc}</p>

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

            <div className="modal-links">
              {links.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  {l.label} →
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT: info panel ── */}
          <div className="modal-social">
            <div className="modal-social-header">
              <span className="modal-feed-dot" />
              {accentLabel ?? 'Details'}
            </div>

            {links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="modal-social-card">
                <div className={`modal-social-card-icon modal-social-card-icon--globe`}>
                  {l.icon === 'github' ? <GithubIcon /> : <GlobeIcon />}
                </div>
                <div className="modal-social-card-body">
                  <div className="modal-social-card-name">{l.label}</div>
                  <div className="modal-social-card-sub">{l.sub}</div>
                </div>
                <span className="modal-social-card-arrow">→</span>
              </a>
            ))}

            <div className="modal-social-divider" />

            {stats.map((s) => (
              <div key={s.label} className="modal-social-stat">
                <span className="modal-social-stat-label">{s.label}</span>
                <span className="modal-social-stat-value">{s.value}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
