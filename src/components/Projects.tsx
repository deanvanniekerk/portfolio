import { useEffect, useRef, useState } from 'react'
import './Projects.css'
import { ProjectModal } from './ProjectModal'
import { K53Modal } from './K53Modal'
import { WorkModal } from './WorkModal'
import edgeScreenshot from '../assets/edge/screenshot-1.png'

type VizType = 'chart' | 'network' | 'heatmap' | 'terminal'

function drawViz(canvas: HTMLCanvasElement, type: VizType) {
  const c = canvas.getContext('2d')
  if (!c) return
  const w = canvas.offsetWidth || 400
  const h = canvas.offsetHeight || 160
  canvas.width = w
  canvas.height = h

  if (type === 'chart') {
    c.fillStyle = '#080d1a'
    c.fillRect(0, 0, w, h)
    const bars = 30
    const bw = w / bars
    let price = 50
    const prices: number[] = [price]
    for (let i = 1; i < bars; i++) {
      price += (Math.random() - 0.45) * 8
      prices.push(Math.max(10, Math.min(90, price)))
    }
    prices.forEach((p, i) => {
      const next = prices[i + 1] ?? p
      const isUp = next >= p
      const x = i * bw + bw * 0.2
      const bh = Math.abs(next - p) * (h * 0.008) + 2
      const y = h - p * (h * 0.007) - bh
      c.fillStyle = isUp ? 'oklch(65% 0.25 240)' : 'oklch(55% 0.2 15)'
      c.globalAlpha = 0.8
      c.fillRect(x, y, bw * 0.6, bh)
    })
    c.globalAlpha = 0.5
    c.beginPath()
    c.strokeStyle = 'oklch(78% 0.2 195)'
    c.lineWidth = 1.5
    prices.forEach((p, i) => {
      const x = i * bw + bw * 0.5
      const y = h - p * (h * 0.007)
      i === 0 ? c.moveTo(x, y) : c.lineTo(x, y)
    })
    c.stroke()
    c.globalAlpha = 1
  } else if (type === 'network') {
    c.fillStyle = '#080d1a'
    c.fillRect(0, 0, w, h)
    const nodes = Array.from({ length: 12 }, () => ({
      x: Math.random() * (w - 40) + 20,
      y: Math.random() * (h - 40) + 20,
      r: Math.random() * 5 + 2,
    }))
    nodes.forEach((n, i) => {
      nodes.forEach((m, j) => {
        if (j > i && Math.random() > 0.5) {
          c.beginPath()
          c.moveTo(n.x, n.y)
          c.lineTo(m.x, m.y)
          c.strokeStyle = 'rgba(40,100,255,0.2)'
          c.lineWidth = 0.8
          c.stroke()
        }
      })
    })
    nodes.forEach((n) => {
      c.beginPath()
      c.arc(n.x, n.y, n.r, 0, Math.PI * 2)
      c.fillStyle = 'oklch(65% 0.25 240)'
      c.shadowColor = 'oklch(65% 0.25 240)'
      c.shadowBlur = 8
      c.fill()
    })
    c.shadowBlur = 0
  } else if (type === 'heatmap') {
    c.fillStyle = '#080d1a'
    c.fillRect(0, 0, w, h)
    const cols = 16
    const rows = 6
    const cw = w / cols
    const ch = h / rows
    for (let r = 0; r < rows; r++) {
      for (let col = 0; col < cols; col++) {
        const val = Math.random()
        const alpha = 0.1 + val * 0.7
        const hue = val > 0.6 ? 195 : 240
        c.fillStyle = `oklch(${50 + val * 30}% 0.22 ${hue} / ${alpha})`
        c.fillRect(col * cw + 1, r * ch + 1, cw - 2, ch - 2)
      }
    }
  } else if (type === 'terminal') {
    c.fillStyle = '#080d1a'
    c.fillRect(0, 0, w, h)
    const lines = [
      '$ npm run build',
      '> compiled 247 modules',
      '> bundle size: 42kb gzip',
      '✓ types checked',
      '✓ tests passed (312)',
      '✓ deployed to production',
    ]
    c.font = `11px 'JetBrains Mono', monospace`
    lines.forEach((line, i) => {
      const alpha = 0.3 + (i / lines.length) * 0.5
      if (i === 0) c.fillStyle = `rgba(40,200,220,${alpha})`
      else if (i === lines.length - 1) c.fillStyle = `rgba(80,220,120,${alpha})`
      else c.fillStyle = `rgba(140,160,200,${alpha})`
      c.fillText(line, 16, 28 + i * 21)
    })
  }
}

interface ProjectCardProps {
  num: string
  name: string
  desc: string
  tags: string[]
  vizType: VizType
  previewLabel: string
  previewImage?: string
  delay?: string
  onClick?: () => void
}

function ProjectCard({ num, name, desc, tags, vizType, previewLabel, previewImage, delay, onClick }: ProjectCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!previewImage && canvasRef.current) drawViz(canvasRef.current, vizType)
  }, [vizType, previewImage])

  useEffect(() => {
    const handleResize = () => {
      if (!previewImage && canvasRef.current) drawViz(canvasRef.current, vizType)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [vizType, previewImage])

  return (
    <div className={`project-card reveal ${delay ?? ''}`} onClick={onClick}>
      <div className="project-preview">
        {previewImage
          ? <img src={previewImage} alt={previewLabel} className="project-preview-screenshot" />
          : <canvas ref={canvasRef} className="project-preview-vis" />
        }
      </div>
      <div className="project-num">
        {num}
        {onClick && <span className="project-expand">View details →</span>}
      </div>
      <div className="project-name">{name}</div>
      <p className="project-desc">{desc}</p>
      <div className="project-tags">
        {tags.map((t) => <span key={t} className="tag">{t}</span>)}
      </div>
    </div>
  )
}

const projects: ProjectCardProps[] = [
  {
    num: '01 / Featured',
    name: 'Edge Trading Platform',
    desc: 'High-performance crypto trading platform built from the ground up. Handles real-time market data, order management, and portfolio analytics at scale. Significantly optimized trading efficiency and execution speed.',
    tags: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'WebSockets'],
    vizType: 'chart',
    previewLabel: 'Trading Platform',
    previewImage: edgeScreenshot,
  },
  {
    num: '02 / Personal',
    name: 'K53 Study Guide',
    desc: '100K+ download Android app helping South African learners pass their K53 driver\'s licence test. Features structured study material, an XP-based quiz engine, and dynamically generated mock exams.',
    tags: ['Android', 'Mobile', 'TypeScript', 'React Native'],
    vizType: 'terminal',
    previewLabel: 'Mobile App',
    previewImage: 'https://play-lh.googleusercontent.com/Aw8Z5L5zW_dBck11Qox3ZlDAsBon3dwbvKDx1GukiRllvmBytDcXxZi3nd0MwAJqDg=w1052-h592-rw',
    delay: 'reveal-delay-1',
  },
  {
    num: '03 / Web3',
    name: 'Aspen NFT Platform',
    desc: 'Pioneering Web3 membership platform for creators — NFT minting, trading, and white-label storefronts. Led the engineering team at Monax Labs, architecting core features and 0x-based smart contract infrastructure.',
    tags: ['TypeScript', 'React', 'Node.js', 'Web3.js', 'Ethers', 'Solidity', '0x'],
    vizType: 'network',
    previewLabel: 'Web3 Platform',
    delay: 'reveal-delay-2',
  },
  {
    num: '04 / Fintech',
    name: 'Kurtosys Systems',
    desc: 'Full-stack engineer building tools for international asset managers including BMO, Hermes, and Bank of America. Delivered features end-to-end — DB migrations through to frontend — and mentored junior developers.',
    tags: ['TypeScript', 'React', 'C#', '.NET', 'PostgreSQL', 'SQL'],
    vizType: 'heatmap',
    previewLabel: 'Fintech Platform',
    delay: 'reveal-delay-3',
  },
]

const ASPEN_MODAL = {
  num: '03 / Web3',
  title: 'Aspen NFT Platform',
  role: 'Team Lead · Senior Engineer',
  period: 'Jun 2020 – Oct 2024',
  location: 'Remote',
  desc: 'Aspen is a pioneering Web3 membership platform that empowers creators to manage, mint, and trade NFTs. As engineering team lead at Monax Labs I architected the core infrastructure and delivered the platform end-to-end.',
  highlights: [
    'Architected and implemented core features: NFT trading, minting, and membership management.',
    'Deployed and maintained custom 0x smart contracts to facilitate decentralised NFT swaps.',
    'Developed a decentralised order book with pre-signed orders.',
    'Engineered the NFT Storefronts feature — white-label storefronts with custom branding and minting.',
    'Led a cross-functional engineering team across a 4-year tenure.',
  ],
  tags: ['TypeScript', 'React', 'Node.js', 'Web3.js', 'Ethers', 'Solidity', '0x Protocol'],
  links: [{ label: 'aspenft.io', sub: 'Live platform', url: 'https://aspenft.io', icon: 'globe' as const }],
  stats: [
    { label: 'Role',     value: 'Team Lead · Senior Engineer' },
    { label: 'Company',  value: 'Monax Labs' },
    { label: 'Period',   value: 'Jun 2020 – Oct 2024' },
    { label: 'Type',     value: 'Full-time · Remote' },
  ],
  accentLabel: 'Web3',
}

const KURTOSYS_MODAL = {
  num: '04 / Fintech',
  title: 'Kurtosys Systems',
  role: 'Senior Engineer',
  period: 'Oct 2018 – Jun 2020',
  location: 'Cape Town',
  desc: 'Full-stack engineer building tooling for international asset managers. Clients included BMO, Hermes, and Bank of America – Merrill Lynch. Responsible for architecting and delivering new features across the full stack.',
  highlights: [
    'Built tools used by top-tier international asset managers: BMO, Hermes, Bank of America – Merrill Lynch.',
    'Architected and delivered new features across the application.',
    'Implemented features end-to-end — database migrations through to the frontend.',
    'Mentored junior developers and conducted code reviews to uphold best practices.',
  ],
  tags: ['TypeScript', 'React', 'C#', '.NET', 'PostgreSQL', 'SQL'],
  links: [{ label: 'kurtosys.com', sub: 'Company website', url: 'https://kurtosys.com', icon: 'globe' as const }],
  stats: [
    { label: 'Role',     value: 'Senior Engineer' },
    { label: 'Company',  value: 'Kurtosys Systems' },
    { label: 'Period',   value: 'Oct 2018 – Jun 2020' },
    { label: 'Location', value: 'Cape Town, SA' },
    { label: 'Clients',  value: 'BMO · Hermes · BoA' },
  ],
  accentLabel: 'Fintech',
}

export function Projects() {
  const [edgeOpen,     setEdgeOpen]     = useState(false)
  const [k53Open,      setK53Open]      = useState(false)
  const [aspenOpen,    setAspenOpen]    = useState(false)
  const [kurtosysOpen, setKurtosysOpen] = useState(false)

  return (
    <>
      <section id="projects">
        <div className="page-wrapper">
          <div className="section-label reveal">Selected Work</div>
          <h2 className="section-title reveal reveal-delay-1">Projects</h2>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <ProjectCard
                key={p.num}
                {...p}
                onClick={
                  i === 0 ? () => setEdgeOpen(true) :
                  i === 1 ? () => setK53Open(true) :
                  i === 2 ? () => setAspenOpen(true) :
                  i === 3 ? () => setKurtosysOpen(true) :
                  undefined
                }
              />
            ))}
          </div>
        </div>
      </section>
      <ProjectModal open={edgeOpen}  onClose={() => setEdgeOpen(false)} />
      <K53Modal      open={k53Open}   onClose={() => setK53Open(false)} />
      <WorkModal     open={aspenOpen}    onClose={() => setAspenOpen(false)}    {...ASPEN_MODAL} />
      <WorkModal     open={kurtosysOpen} onClose={() => setKurtosysOpen(false)} {...KURTOSYS_MODAL} />
    </>
  )
}
