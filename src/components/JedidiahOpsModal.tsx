import { ScreenshotLightbox } from './ScreenshotLightbox'
import { useCallback, useEffect, useState } from 'react'
import { siGithub } from 'simple-icons'
import webScreenshot1 from '../assets/jedidiahops/web/dashboard.webp'
import webScreenshot2 from '../assets/jedidiahops/web/planning.webp'
import webScreenshot3 from '../assets/jedidiahops/web/activity.webp'
import webScreenshot4 from '../assets/jedidiahops/web/buy-list.webp'
import webScreenshot5 from '../assets/jedidiahops/web/purchase-order.webp'
import webScreenshot6 from '../assets/jedidiahops/web/quotes.webp'
import webScreenshot7 from '../assets/jedidiahops/web/quote-pdf.webp'
import webScreenshot8 from '../assets/jedidiahops/web/product.webp'
import webScreenshot9 from '../assets/jedidiahops/web/translations.webp'
import mobileScreenshot1 from '../assets/jedidiahops/mobile/activity.webp'
import mobileScreenshot2 from '../assets/jedidiahops/mobile/jobs.webp'
import mobileScreenshot3 from '../assets/jedidiahops/mobile/quotes.webp'
import mobileScreenshot4 from '../assets/jedidiahops/mobile/product.webp'
import mobileScreenshot5 from '../assets/jedidiahops/mobile/stock-movements.webp'
import mobileScreenshot6 from '../assets/jedidiahops/mobile/job-progress.webp'
import mobileScreenshot7 from '../assets/jedidiahops/mobile/document.webp'
import { TechIcon } from './TechIcon'
import './ProjectModal.css'
import './JedidiahOpsModal.css'

const REPO_URL = 'https://github.com/Jedidiah-Equipment/jedidiah-platform'

interface ScreenshotItem {
  src: string
  label: string
}

type GalleryKey = 'web' | 'mobile'

const WEB_SCREENSHOTS: ScreenshotItem[] = [
  { src: webScreenshot1, label: 'Operations dashboard' },
  { src: webScreenshot2, label: 'Bay-by-bay production planning' },
  { src: webScreenshot3, label: 'Job activity timeline' },
  { src: webScreenshot4, label: 'Inventory shortages and buy list' },
  { src: webScreenshot5, label: 'Purchase order editor' },
  { src: webScreenshot6, label: 'Product and service quotes' },
  { src: webScreenshot7, label: 'Branded quotation PDF' },
  { src: webScreenshot8, label: 'Product catalogue and publishing' },
  { src: webScreenshot9, label: 'English and Afrikaans translations' },
]

const MOBILE_SCREENSHOTS: ScreenshotItem[] = [
  { src: mobileScreenshot1, label: 'Shop-floor activity feed' },
  { src: mobileScreenshot2, label: 'Active and scheduled jobs' },
  { src: mobileScreenshot3, label: 'Quote pipeline' },
  { src: mobileScreenshot4, label: 'Product details and website links' },
  { src: mobileScreenshot5, label: 'Stock checkout, returns and receiving' },
  { src: mobileScreenshot6, label: 'Job progress and production route' },
  { src: mobileScreenshot7, label: 'Engineering drawings and bill of materials' },
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
  onZoom: () => void
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
              onZoom()
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
  const [activeMobile, setActiveMobile] = useState(0)
  const [activeGallery, setActiveGallery] = useState<GalleryKey>('web')
  const [zoomed, setZoomed] = useState(false)
  const screenshots = activeGallery === 'web' ? WEB_SCREENSHOTS : MOBILE_SCREENSHOTS
  const activeIndex = activeGallery === 'web' ? activeWeb : activeMobile

  const navigate = useCallback((direction: number) => {
    if (activeGallery === 'web') {
      setActiveWeb((index) => (index + direction + WEB_SCREENSHOTS.length) % WEB_SCREENSHOTS.length)
    } else {
      setActiveMobile((index) => (index + direction + MOBILE_SCREENSHOTS.length) % MOBILE_SCREENSHOTS.length)
    }
  }, [activeGallery])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open || zoomed) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault()
        navigate(e.key === 'ArrowRight' ? 1 : -1)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [navigate, onClose, open, zoomed])

  if (!open) return null

  const highlights = [
    'Connected product and service quotes to production jobs, with optional assemblies, branded quote PDFs, and tracking for individual equipment units.',
    'Built bay-by-bay planning around working calendars, production routes, and department work times, with dashboard views of capacity, pipeline, and shop-floor activity.',
    'Added inventory and procurement: bills of materials, job stock commitments, shortage-driven buy lists, purchase orders, receiving, supplier invoice matching, stocktakes, and job close-out costing.',
    'Expanded the Expo / React Native app for iOS and Android with job progress, quotes, activity feeds, stock movements, and engineering-document viewing and sharing.',
    'Connected the product catalogue to a public website and PDF brochures, with English and Afrikaans content, AI translations, and manual review controls.',
    'Built a permission-aware assistant for web and mobile using the Vercel AI SDK and OpenAI, plus AI-assisted supplier invoice extraction.',
    'Extended the platform to Jedidiah Contracting with machine-hour capture, offline mobile reading sync, manager job queues, and completion sign-off. Each business keeps its own data and access rules.',
    'Kept web and mobile on a shared Fastify/tRPC API and Postgres/Drizzle model, with server-side permissions, audit history, integration tests, and mobile error monitoring.',
  ]

  const tags = ['TypeScript', 'React', 'React Native', 'Expo', 'tRPC', 'Fastify', 'Postgres', 'Drizzle', 'Vercel AI SDK', 'OpenAI']

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
              <span className="modal-meta-date">Manufacturing + contracting</span>
              <span className="modal-meta-sep">·</span>
              <span className="modal-meta-remote">Web + Mobile · May 2026–present</span>
            </div>

            <p className="modal-desc">
              I started JedidiahOps in May 2026 for Jedidiah Equipment, an agricultural equipment
              manufacturer. Working directly with the business, I have grown it from a web admin
              system into a connected platform for quoting, production planning, inventory,
              procurement, and shop-floor work. It now spans desktop, iOS, Android, and a bilingual
              public product website. I own
              delivery across the interface, API, data model, and mobile app, turning day-to-day
              operating needs into working software.
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
              onZoom={() => setZoomed(true)}
              screenshots={WEB_SCREENSHOTS}
              title="Desktop app"
            />

            <ScreenshotCarousel
              active={activeMobile}
              gallery="mobile"
              onActivateGallery={setActiveGallery}
              onActiveChange={setActiveMobile}
              onZoom={() => setZoomed(true)}
              screenshots={MOBILE_SCREENSHOTS}
              title="Mobile app"
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
              <div className="jedidiahops-stat-card">
                <div className="jedidiahops-stat-value">Sep 2026</div>
                <div className="jedidiahops-stat-label">Project updated</div>
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
                <div className="modal-social-card-sub">Platform source code</div>
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
              <span className="modal-social-stat-value">Web · Mobile · API · AI · Website</span>
            </div>
            <div className="modal-social-stat">
              <span className="modal-social-stat-label">Mobile</span>
              <span className="modal-social-stat-value">Expo · iOS + Android</span>
            </div>
            <div className="modal-social-stat">
              <span className="modal-social-stat-label">Data</span>
              <span className="modal-social-stat-value">Postgres · Drizzle</span>
            </div>
            <div className="modal-social-stat">
              <span className="modal-social-stat-label">Docs</span>
              <span className="modal-social-stat-value">Quotes · Brochures · Drawings</span>
            </div>
          </div>
        </div>
      </div>

      {zoomed && (
        <ScreenshotLightbox
          screenshots={screenshots}
          active={activeIndex}
          onNavigate={navigate}
          onClose={() => setZoomed(false)}
        />
      )}
    </div>
  )
}
