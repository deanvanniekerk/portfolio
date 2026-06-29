import { useState } from 'react'
import './Projects.css'
import { ProjectModal } from './ProjectModal'
import { K53Modal } from './K53Modal'
import { WorkModal } from './WorkModal'
import edgeBannerImagegenTerminal from '../assets/edge/banner-imagegen-terminal.png'
import aspenBannerUserGenerated from '../assets/aspen/banner-user-generated.png'
import aspenLogo from '../assets/aspen/logo.svg'
import kurtosysBanner from '../assets/kurtosys/banner.png'
import kurtosysLogo from '../assets/kurtosys/logo.png'
import k53HeroImagegenFan from '../assets/k53/hero-imagegen-fan.png'

interface Project {
  num: string
  name: string
  desc: string
  tags: string[]
  previewImage: string
  previewLabel: string
  previewFit?: 'cover' | 'contain'
  previewTone?: string
  typeLabel?: string
  delay?: string
}

interface ProjectRowProps extends Project {
  index: number
  onClick: () => void
}

function ProjectRow({
  num,
  name,
  desc,
  tags,
  previewImage,
  previewLabel,
  previewFit = 'cover',
  previewTone,
  typeLabel,
  delay,
  index,
  onClick,
}: ProjectRowProps) {
  const reversed = index % 2 === 1

  return (
    <article className={`project-row reveal ${delay ?? ''} ${reversed ? 'project-row--reverse' : ''}`}>
      <button className={`project-media ${previewTone ?? ''}`} onClick={onClick} type="button" data-parallax="0.02">
        <div className="project-browser-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <img
          src={previewImage}
          alt={previewLabel}
          className={`project-preview-image project-preview-image--${previewFit}`}
        />
      </button>

      <div className="project-copy">
        <div className="project-num">{num}</div>
        <div className="project-title-row">
          <h3 className="project-name">{name}</h3>
          {typeLabel && <span className="project-type-tag">{typeLabel}</span>}
        </div>
        <p className="project-desc">{desc}</p>
        <div className="project-tags">
          {tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <button className="project-detail-button" onClick={onClick} type="button">
          View details →
        </button>
      </div>
    </article>
  )
}

const projects: Project[] = [
  {
    num: '01 / Featured',
    name: 'Edge Trading Platform',
    desc: 'Built key frontend, API, and realtime data surfaces for a live crypto trading platform — discovery feeds, TradingView charts, order-book updates, portfolio views, and quick-trade flows.',
    tags: ['TypeScript', 'React', 'Node.js', 'Kafka', 'RisingWave'],
    previewImage: edgeBannerImagegenTerminal,
    previewLabel: 'Edge trading platform',
    previewTone: 'project-media--edge',
  },
  {
    num: '02 / Personal',
    name: 'K53 Study Guide',
    desc: 'Built and maintained a production Android app end-to-end: React/Ionic mobile UI, native Capacitor integrations, premium unlocks, Firebase analytics, Crashlytics, SEO/ASO, and Play Store compliance. 100K+ downloads, 4.6★ rating.',
    tags: ['Mobile', 'TypeScript', 'Ionic', 'Capacitor', 'Firebase'],
    typeLabel: 'Personal Project',
    previewImage: k53HeroImagegenFan,
    previewLabel: 'K53 Study Guide',
    previewTone: 'project-media--k53',
    delay: 'reveal-delay-1',
  },
  {
    num: '03 / Web3',
    name: 'Aspen NFT Platform',
    desc: 'Led engineering on a Web3 membership platform for NFT minting, trading, and white-label creator storefronts. Architected core product flows, decentralised order-book mechanics, and 0x-based smart contracts.',
    tags: ['TypeScript', 'Viem', 'Solidity', '0x Protocol'],
    previewImage: aspenBannerUserGenerated,
    previewLabel: 'Aspen NFT platform',
    previewTone: 'project-media--aspen',
    delay: 'reveal-delay-2',
  },
  {
    num: '04 / Fintech',
    name: 'Kurtosys Systems',
    desc: 'Built full-stack fintech tooling for international asset managers including BMO, Federated Hermes, and Bank of America Merrill Lynch. Delivered database, backend, and frontend features end-to-end while mentoring engineers.',
    tags: ['TypeScript', 'React', 'C#', '.NET', 'SQL'],
    previewImage: kurtosysBanner,
    previewLabel: 'Kurtosys systems',
    previewFit: 'contain',
    previewTone: 'project-media--kurtosys',
    delay: 'reveal-delay-3',
  },
]

const ASPEN_MODAL = {
  num: '03 / Web3',
  title: 'Aspen NFT Platform',
  role: 'Team Lead · Senior Engineer',
  period: 'Jun 2020 – Oct 2024',
  location: 'Remote',
  desc: 'Aspen is a Web3 membership platform for NFT minting, trading, membership management, and white-label creator storefronts. As engineering team lead at Monax Labs I architected core product flows, decentralised order-book mechanics, and 0x-based smart contract infrastructure.',
  highlights: [
    'Led engineering delivery across NFT trading, minting, membership management, and creator storefront tooling.',
    'Deployed and maintained custom 0x smart contracts to facilitate decentralised NFT swaps.',
    'Developed a decentralised order book with pre-signed orders.',
    'Engineered the NFT Storefronts feature — white-label storefronts with custom branding and minting.',
    'Mentored engineers, reviewed code, and kept technical execution aligned with product goals.',
  ],
  tags: ['TypeScript', 'React', 'Node.js', 'Viem', 'Solidity', '0x Protocol'],
  links: [{
    label: 'Aspen posts',
    sub: 'LinkedIn articles',
    url: 'https://www.linkedin.com/showcase/aspenft/posts/?feedView=articles',
    icon: 'globe' as const,
  }],
  logoUrl: aspenLogo,
  logoAlt: 'Aspen logo',
  stats: [
    { label: 'Role', value: 'Team Lead · Senior Engineer' },
    { label: 'Company', value: 'Monax Labs' },
    { label: 'Period', value: 'Jun 2020 – Oct 2024' },
    { label: 'Type', value: 'Full-time · Remote' },
  ],
  accentLabel: 'Web3',
}

const KURTOSYS_MODAL = {
  num: '04 / Fintech',
  title: 'Kurtosys Systems',
  role: 'Senior Engineer',
  period: 'Oct 2018 – Jun 2020',
  location: 'Cape Town',
  desc: 'Full-stack engineer building fintech tooling for international asset managers. Clients included BMO, Federated Hermes, and Bank of America Merrill Lynch. Responsible for delivering database, backend, and frontend features end-to-end in a regulated financial-services environment.',
  highlights: [
    'Built tools used by top-tier international asset managers: BMO, Federated Hermes, and Bank of America Merrill Lynch.',
    'Helped architect and deliver new application capabilities in a regulated fintech environment.',
    'Implemented features end-to-end — database migrations through to the frontend.',
    'Mentored junior developers and conducted code reviews to uphold best practices.',
  ],
  tags: ['TypeScript', 'React', 'C#', '.NET', 'PostgreSQL', 'SQL'],
  links: [{ label: 'kurtosys.com', sub: 'Company website', url: 'https://kurtosys.com', icon: 'globe' as const }],
  logoUrl: kurtosysLogo,
  logoAlt: 'Kurtosys logo',
  stats: [
    { label: 'Role', value: 'Senior Engineer' },
    { label: 'Company', value: 'Kurtosys Systems' },
    { label: 'Period', value: 'Oct 2018 – Jun 2020' },
    { label: 'Location', value: 'Cape Town, SA' },
    { label: 'Clients', value: 'BMO · Hermes · BoA' },
  ],
  accentLabel: 'Fintech',
}

export function Projects() {
  const [edgeOpen, setEdgeOpen] = useState(false)
  const [k53Open, setK53Open] = useState(false)
  const [aspenOpen, setAspenOpen] = useState(false)
  const [kurtosysOpen, setKurtosysOpen] = useState(false)

  const openers = [
    () => setEdgeOpen(true),
    () => setK53Open(true),
    () => setAspenOpen(true),
    () => setKurtosysOpen(true),
  ]

  return (
    <>
      <section id="projects">
        <div className="page-wrapper">
          <div className="section-heading projects-heading">
            <div>
              <div className="section-label reveal">03 — Selected Work</div>
              <h2 className="section-title reveal reveal-delay-1">Projects</h2>
            </div>
            <div className="projects-count reveal reveal-delay-2">01 — 04</div>
          </div>

          <div className="projects-list">
            {projects.map((project, index) => (
              <ProjectRow
                key={project.num}
                {...project}
                index={index}
                onClick={openers[index]}
              />
            ))}
          </div>
        </div>
      </section>

      <ProjectModal open={edgeOpen} onClose={() => setEdgeOpen(false)} />
      <K53Modal open={k53Open} onClose={() => setK53Open(false)} />
      <WorkModal open={aspenOpen} onClose={() => setAspenOpen(false)} {...ASPEN_MODAL} />
      <WorkModal open={kurtosysOpen} onClose={() => setKurtosysOpen(false)} {...KURTOSYS_MODAL} />
    </>
  )
}
