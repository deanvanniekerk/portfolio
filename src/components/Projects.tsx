import { useEffect, useRef } from 'react'
import './Projects.css'

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
  delay?: string
}

function ProjectCard({ num, name, desc, tags, vizType, previewLabel, delay }: ProjectCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) drawViz(canvasRef.current, vizType)
  }, [vizType])

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) drawViz(canvasRef.current, vizType)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [vizType])

  return (
    <div className={`project-card reveal ${delay ?? ''}`}>
      <div className="project-preview">
        <canvas ref={canvasRef} className="project-preview-vis" />
        <div className="project-preview-inner">{previewLabel}</div>
      </div>
      <div className="project-num">{num}</div>
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
  },
  {
    num: '02 / Crypto',
    name: 'DeFi Liquidity Protocol',
    desc: 'Decentralized finance protocol enabling automated market making and yield optimization. Designed smart contract interactions and the full-stack dApp interface for a seamless user experience.',
    tags: ['TypeScript', 'Web3.js', 'React', 'Solidity'],
    vizType: 'network',
    previewLabel: 'DeFi Protocol',
    delay: 'reveal-delay-1',
  },
  {
    num: '03 / Data',
    name: 'Market Analytics Engine',
    desc: 'Real-time analytics platform aggregating on-chain and off-chain data. Delivers actionable insights for traders — price feeds, volume analysis, wallet activity monitoring, and custom alert systems.',
    tags: ['Node.js', 'PostgreSQL', 'React', 'Redis'],
    vizType: 'heatmap',
    previewLabel: 'Analytics Dashboard',
    delay: 'reveal-delay-2',
  },
  {
    num: '04 / Infra',
    name: 'Full Stack Boilerplate',
    desc: 'Battle-tested monorepo starter for full-stack TypeScript applications. Includes authentication, database migrations, CI/CD pipelines, and best-practice patterns distilled from 10 years of production experience.',
    tags: ['TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    vizType: 'terminal',
    previewLabel: 'Infrastructure',
    delay: 'reveal-delay-3',
  },
]

export function Projects() {
  return (
    <section id="projects">
      <div className="page-wrapper">
        <div className="section-label reveal">Selected Work</div>
        <h2 className="section-title reveal reveal-delay-1">Projects</h2>
        <div className="projects-grid">
          {projects.map((p) => <ProjectCard key={p.num} {...p} />)}
        </div>
      </div>
    </section>
  )
}
