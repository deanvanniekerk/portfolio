import { type MouseEvent, useEffect, useState } from 'react'
import { siGithub } from 'simple-icons'
import tabletScreenshot1 from '../assets/jedidiahops/tablet/tablet-1.webp'
import tabletScreenshot2 from '../assets/jedidiahops/tablet/tablet-2.webp'
import tabletScreenshot3 from '../assets/jedidiahops/tablet/tablet-3.webp'
import tabletScreenshot4 from '../assets/jedidiahops/tablet/tablet-4.webp'
import tabletScreenshot5 from '../assets/jedidiahops/tablet/tablet-5.webp'
import tabletScreenshot6 from '../assets/jedidiahops/tablet/tablet-6.webp'
import webScreenshot1 from '../assets/jedidiahops/web/web-1.webp'
import webScreenshot2 from '../assets/jedidiahops/web/web-2.webp'
import webScreenshot3 from '../assets/jedidiahops/web/web-3.webp'
import webScreenshot4 from '../assets/jedidiahops/web/web-4.webp'
import webScreenshot5 from '../assets/jedidiahops/web/web-5.webp'
import webScreenshot6 from '../assets/jedidiahops/web/web-6.webp'
import webScreenshot7 from '../assets/jedidiahops/web/web-7.webp'
import webScreenshot8 from '../assets/jedidiahops/web/web-8.webp'
import { TechIcon } from './TechIcon'
import './ProjectModal.css'
import './JedidiahOpsModal.css'

const REPO_URL = 'https://github.com/Jedidiah-Equipment/jedidiah-platform'

interface ScreenshotItem {
  src: string
  label: string
}

type GalleryKey = 'web' | 'tablet'

const WEB_SCREENSHOTS: ScreenshotItem[] = [
  { src: webScreenshot1, label: 'Web dashboard' },
  { src: webScreenshot2, label: 'Web product editor' },
  { src: webScreenshot3, label: 'Web product media' },
  { src: webScreenshot4, label: 'Web quote detail' },
  { src: webScreenshot5, label: 'Web quote PDF' },
  { src: webScreenshot6, label: 'Web job scheduling' },
  { src: webScreenshot7, label: 'Web planning board' },
  { src: webScreenshot8, label: 'Web assistant' },
]

const TABLET_SCREENSHOTS: ScreenshotItem[] = [
  { src: tabletScreenshot1, label: 'Tablet login' },
  { src: tabletScreenshot2, label: 'Tablet job board' },
  { src: tabletScreenshot3, label: 'Tablet active job' },
  { src: tabletScreenshot4, label: 'Tablet job detail' },
  { src: tabletScreenshot5, label: 'Tablet document viewer' },
  { src: tabletScreenshot6, label: 'Tablet feedback form' },
]

interface JedidiahOpsModalProps {
  open: boolean
  onClose: () => void
}

interface ScreenshotCarouselProps {
  active: number
  gallery: GalleryKey
  onActivateGallery: (gallery: GalleryKey) => void
  onActiveChange: (index: number) => void
  onZoom: (screenshot: ScreenshotItem) => void
  screenshots: ScreenshotItem[]
  title: string
}

function ScreenshotCarousel({
  active,
  gallery,
  onActivateGallery,
  onActiveChange,
  onZoom,
  screenshots,
  title,
}: ScreenshotCarouselProps) {
  const show = (index: number) => {
    onActivateGallery(gallery)
    onActiveChange((index + screenshots.length) % screenshots.length)
  }

  return (
    <div className={`modal-carousel jedidiahops-carousel jedidiahops-carousel--${gallery}`}>
      <div className="jedidiahops-carousel-heading">
        <h3>{title}</h3>
        <span>{active + 1} / {screenshots.length}</span>
      </div>
      <div className={`modal-carousel-track jedidiahops-carousel-track jedidiahops-carousel-track--${gallery}`}>
        {screenshots.map((s, i) => (
          <img
            key={s.label}
            src={s.src}
            alt={s.label}
            className={`modal-carousel-img ${i === active ? 'active' : ''}`}
            onClick={() => {
              onActivateGallery(gallery)
              onZoom(s)
            }}
          />
        ))}
        <button
          className="modal-carousel-arrow modal-carousel-arrow--prev"
          onClick={() => show(active - 1)}
          aria-label={`Previous ${title} screenshot`}
        >‹</button>
        <button
          className="modal-carousel-arrow modal-carousel-arrow--next"
          onClick={() => show(active + 1)}
          aria-label={`Next ${title} screenshot`}
        >›</button>
      </div>
      <div className="modal-carousel-bar">
        <span className="modal-carousel-label">{screenshots[active].label}</span>
        <div className="modal-carousel-dots">
          {screenshots.map((_, i) => (
            <button
              key={i}
              className={`modal-carousel-dot ${i === active ? 'active' : ''}`}
              onClick={() => show(i)}
              aria-label={`${title} screenshot ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function JedidiahOpsModal({ open, onClose }: JedidiahOpsModalProps) {
  const [activeWeb, setActiveWeb] = useState(0)
  const [activeTablet, setActiveTablet] = useState(0)
  const [activeGallery, setActiveGallery] = useState<GalleryKey>('web')
  const [zoomed, setZoomed] = useState<ScreenshotItem | null>(null)

  const closeZoom = (event?: MouseEvent<HTMLElement>) => {
    event?.stopPropagation()
    setZoomed(null)
  }

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { if (zoomed) setZoomed(null); else onClose() }
      if (e.key === 'ArrowRight' && activeGallery === 'web') setActiveWeb((a) => (a + 1) % WEB_SCREENSHOTS.length)
      if (e.key === 'ArrowLeft' && activeGallery === 'web') setActiveWeb((a) => (a - 1 + WEB_SCREENSHOTS.length) % WEB_SCREENSHOTS.length)
      if (e.key === 'ArrowRight' && activeGallery === 'tablet') setActiveTablet((a) => (a + 1) % TABLET_SCREENSHOTS.length)
      if (e.key === 'ArrowLeft' && activeGallery === 'tablet') setActiveTablet((a) => (a - 1 + TABLET_SCREENSHOTS.length) % TABLET_SCREENSHOTS.length)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activeGallery, onClose, zoomed])

  if (!open) return null

  const highlights = [
    'Built the React/Vite admin app around permission-gated quote, job, bay, product, document, feedback, and scheduling routes.',
    'Wired the JedidiahOps assistant through the OpenAI Agents SDK and /ai/chat-stream, with permission-filtered read/write tools, route metadata, and a draft-email flow.',
    'Kept web and React Native mobile on the same Fastify/tRPC contract, so the shop-floor UI could reuse cached board reads and detail queries instead of carrying a separate API.',
    'Modeled the production workflow in Postgres and Drizzle with normalized scheduling, queue, assignment, file, and metadata tables.',
    'Built React Native shop-floor flows with React Query, protected-session reconnect handling, card-based board screens, detail panes, and typed mutations.',
    'Generated branded PDFs with @pkg/pdf, then served authenticated download routes to a local-file mobile viewer.',
    'Kept repo-local agent files and skills for PR-comment follow-up, prompt audits, dev setup, and isolated parallel environments.',
  ]

  const tags = ['React', 'React Native', 'tRPC', 'Fastify', 'Postgres', 'Drizzle', 'OpenAI SDK']

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel jedidiahops-modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-body">
          <div className="modal-left">
            <div className="modal-num">01 / Featured</div>
            <h2 className="modal-title">JedidiahOps</h2>

            <div className="modal-meta">
              <span className="modal-meta-role">Contract work</span>
              <span className="modal-meta-sep">·</span>
              <span className="modal-meta-date">Manufacturing ops platform</span>
              <span className="modal-meta-sep">·</span>
              <span className="modal-meta-remote">Web + Mobile · 2026</span>
            </div>

            <p className="modal-desc">
              I started JedidiahOps in May 2026 for a fabrication business. It began as a web-based
              admin system, then grew into a shop-floor product where operators can see jobs, bay
              schedules, documents, assemblies, and submit feedback from the floor. I worked closely
              with the client to understand the real operating needs, drive out requirements, resolve
              issues as they surfaced, and keep scope aligned as the product evolved.
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

            <ScreenshotCarousel
              active={activeWeb}
              gallery="web"
              onActivateGallery={setActiveGallery}
              onActiveChange={setActiveWeb}
              onZoom={setZoomed}
              screenshots={WEB_SCREENSHOTS}
              title="Web app"
            />

            <ScreenshotCarousel
              active={activeTablet}
              gallery="tablet"
              onActivateGallery={setActiveGallery}
              onActiveChange={setActiveTablet}
              onZoom={setZoomed}
              screenshots={TABLET_SCREENSHOTS}
              title="Tablet app"
            />

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
                <div className="jedidiahops-stat-value">May 2026</div>
                <div className="jedidiahops-stat-label">Started</div>
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
              <span className="modal-social-stat-label">Type</span>
              <span className="modal-social-stat-value">Contract Work</span>
            </div>
            <div className="modal-social-stat">
              <span className="modal-social-stat-label">Scope</span>
              <span className="modal-social-stat-value">Web · Mobile · API · AI</span>
            </div>
            <div className="modal-social-stat">
              <span className="modal-social-stat-label">Mobile</span>
              <span className="modal-social-stat-value">React Native · Android submission</span>
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
            src={zoomed.src}
            alt={zoomed.label}
            className="modal-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="modal-lightbox-close" onClick={closeZoom} aria-label="Close enlarged image">✕</button>
        </div>
      )}
    </div>
  )
}
