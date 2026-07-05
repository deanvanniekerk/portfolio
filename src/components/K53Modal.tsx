import { type MouseEvent, useEffect, useState } from 'react'
import { siApple, siGithub } from 'simple-icons'
import './ProjectModal.css'
import './K53Modal.css'
import screenStudyHome from '../assets/k53/screen-study-home.webp'
import screenStudyDetail from '../assets/k53/screen-study-detail.webp'
import screenQuizDashboard from '../assets/k53/screen-quiz-dashboard.webp'
import screenQuizQuestion from '../assets/k53/screen-quiz-question.webp'
import screenTestQuestion from '../assets/k53/screen-test-question.webp'
import screenProfile from '../assets/k53/screen-profile.webp'
import { TechIcon } from './TechIcon'

const APP_STORE_URL = 'https://apps.apple.com/us/app/k53-study-guide/id6784718443'
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=deanvniekerk.k53studyguide.app'
const WEBSITE_URL = 'https://k53studyguide.online/'
const REPO_URL = 'https://github.com/deanvanniekerk/k53studyguide'

const SCREENSHOTS = [
  { src: screenStudyHome, label: 'Study home' },
  { src: screenStudyDetail, label: 'Study detail' },
  { src: screenQuizDashboard, label: 'Quiz dashboard' },
  { src: screenQuizQuestion, label: 'Quiz question' },
  { src: screenTestQuestion, label: 'Mock test' },
  { src: screenProfile, label: 'Profile' },
]

interface K53ModalProps {
  open: boolean
  onClose: () => void
}

export function K53Modal({ open, onClose }: K53ModalProps) {
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
      if (e.key === 'ArrowRight') setActive((a) => (a + 1) % SCREENSHOTS.length)
      if (e.key === 'ArrowLeft')  setActive((a) => (a - 1 + SCREENSHOTS.length) % SCREENSHOTS.length)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, zoomed])

  if (!open) return null

  const highlights = [
    'Built the app solo with React, Ionic, Capacitor, TypeScript, Redux, Vite, and native Android/iOS integrations.',
    'Launched version 1.0 on the Apple App Store, expanding the production app from Android to iOS.',
    'Implemented the study, quiz, progress, profile, and dynamically generated mock-test flows.',
    'Added full-funnel Firebase/GA4 analytics covering landing-page handoff, app engagement, premium prompts, checkout, and purchase outcomes.',
    'Implemented one-time premium unlocks, app-rating prompts, Crashlytics, and mobile store compliance updates.',
    'Converted the project into a pnpm monorepo with dedicated app and landing-page packages.',
    'Maintained a production mobile product with 100K+ downloads and a 4.5+ Play Store rating.',
  ]

  const tags: string[] = ['Personal Project', 'Android', 'iOS', 'TypeScript', 'Ionic', 'Capacitor', 'Firebase'];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-body">

          {/* ── LEFT: detail ── */}
          <div className="modal-left">
            <div className="modal-num">03 / Personal Project</div>
            <h2 className="modal-title">K53 Study Guide</h2>

            <div className="modal-meta">
              <span className="modal-meta-role">Solo Project</span>
              <span className="modal-meta-sep">·</span>
              <span className="modal-meta-date">Android + iOS</span>
              <span className="modal-meta-sep">·</span>
              <span className="modal-meta-remote">2018 – Present</span>
            </div>

            <p className="modal-desc">
              Independent production mobile product that I built and operated end-to-end:
              app architecture, mobile UI, native integrations, analytics, monetisation,
              landing-page SEO, App Store and Play Store compliance, and ongoing release
              maintenance.
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
            <div className="modal-carousel k53-carousel">
              <div className="modal-carousel-track k53-carousel-track">
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
              <a href={WEBSITE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Website →
              </a>
              <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                View on Play Store
              </a>
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                View on App Store
              </a>
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                GitHub repo →
              </a>
            </div>
          </div>

          {/* ── RIGHT: stats panel ── */}
          <div className="modal-social k53-stats-panel">
            <div className="modal-social-header">
              <span className="modal-feed-dot" />
              Project Links
            </div>

            {/* Big stats */}
            <div className="k53-stats">
              <div className="k53-stat">
                <div className="k53-stat-value">100K+</div>
                <div className="k53-stat-label">Android downloads</div>
              </div>
              <div className="k53-stat-divider" />
              <div className="k53-stat">
                <div className="k53-stat-value">
                  4.6
                  <span className="k53-stat-star">★</span>
                </div>
                <div className="k53-stat-label">Play rating</div>
              </div>
              <div className="k53-stat-divider" />
              <div className="k53-stat">
                <div className="k53-stat-value">
                  1.0
                </div>
                <div className="k53-stat-label">App Store launch</div>
              </div>
            </div>

            {/* Star bar */}
            <div className="k53-stars">
              {[1,2,3,4,5].map((s) => (
                <span key={s} className={`k53-star-icon ${s <= 4 ? 'filled' : s === 5 ? 'partial' : ''}`}>★</span>
              ))}
              <span className="k53-stars-score">4.6 / 5 on Google Play</span>
            </div>

            <div className="modal-social-divider" />

            {/* Links */}
            <a
              href={WEBSITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-social-card"
            >
              <div className="modal-social-card-icon modal-social-card-icon--globe">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <div className="modal-social-card-body">
                <div className="modal-social-card-name">k53studyguide.online</div>
                <div className="modal-social-card-sub">Official website</div>
              </div>
              <span className="modal-social-card-arrow">→</span>
            </a>

            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-social-card"
            >
              <div className="modal-social-card-icon k53-playstore-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M3.18 23.76c.3.17.64.24.99.2L15.34 12 11.8 8.46 3.18 23.76zm17.29-11.53L17.6 10.6l-3.54 1.4 3.54 1.4 2.87-1.17a1.1 1.1 0 0 0 0-2.0zM3.54.04a1.1 1.1 0 0 0-.36.92v21.08l8.62-8.62L3.54.04zm8.26 11.96L3.18.24c.35-.04.69.03.99.2L15.34 12l-3.54-3.54z"/>
                </svg>
              </div>
              <div className="modal-social-card-body">
                <div className="modal-social-card-name">Google Play</div>
                <div className="modal-social-card-sub">100K+ Android downloads</div>
              </div>
              <span className="modal-social-card-arrow">→</span>
            </a>

            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-social-card"
            >
              <div className="modal-social-card-icon k53-appstore-icon">
                <TechIcon path={siApple.path} color="#fff" size={20} />
              </div>
              <div className="modal-social-card-body">
                <div className="modal-social-card-name">Apple App Store</div>
                <div className="modal-social-card-sub">iOS version 1.0</div>
              </div>
              <span className="modal-social-card-arrow">→</span>
            </a>

            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-social-card"
            >
              <div className="modal-social-card-icon k53-github-icon">
                <TechIcon path={siGithub.path} color="#fff" size={21} />
              </div>
              <div className="modal-social-card-body">
                <div className="modal-social-card-name">GitHub repository</div>
                <div className="modal-social-card-sub">deanvanniekerk/k53studyguide</div>
              </div>
              <span className="modal-social-card-arrow">→</span>
            </a>

            <div className="modal-social-divider" />

            <div className="modal-social-stat">
              <span className="modal-social-stat-label">Platform</span>
              <span className="modal-social-stat-value">Android + iOS</span>
            </div>
            <div className="modal-social-stat">
              <span className="modal-social-stat-label">Type</span>
              <span className="modal-social-stat-value">Personal Project</span>
            </div>
            <div className="modal-social-stat">
              <span className="modal-social-stat-label">iOS launch</span>
              <span className="modal-social-stat-value">Jun 2026</span>
            </div>
          </div>

        </div>

      </div>

      {zoomed && (
        <div className="modal-lightbox" onClick={closeZoom} role="dialog" aria-modal="true">
          <img
            src={SCREENSHOTS[active].src}
            alt={SCREENSHOTS[active].label}
            className="modal-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="modal-lightbox-close" onClick={closeZoom} aria-label="Close enlarged image">✕</button>
        </div>
      )}
    </div>
  )
}
