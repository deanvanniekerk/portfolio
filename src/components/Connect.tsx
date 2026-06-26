import './Connect.css'

const contactEmail = 'dean@vanniekerk.online'
const emailSubject = encodeURIComponent('Senior engineering opportunity')
const emailBody = encodeURIComponent(`Hi Dean,

I came across your portfolio and wanted to reach out about...
`)
const contactMailto = `mailto:${contactEmail}?subject=${emailSubject}&body=${emailBody}`

export function Connect() {
  return (
    <section id="connect">
      <div className="page-wrapper">
        <div className="section-label reveal">05 — Get in touch</div>
        <h2 className="section-title reveal reveal-delay-1">Connect</h2>
        <div className="connect-inner">
          <div className="connect-links reveal">
            <a href={contactMailto} className="connect-link">
              <span className="connect-link-label">{contactEmail}</span>
              <span className="connect-link-arrow">→</span>
            </a>
            <a href="https://www.linkedin.com/in/dean-van-niekerk" target="_blank" rel="noreferrer" className="connect-link">
              <span className="connect-link-label">LinkedIn</span>
              <span className="connect-link-arrow">→</span>
            </a>
            <a href="https://github.com/deanvanniekerk" target="_blank" rel="noreferrer" className="connect-link">
              <span className="connect-link-label">GitHub</span>
              <span className="connect-link-arrow">→</span>
            </a>
          </div>

          <div className="connect-cta reveal reveal-delay-1">
            <div className="connect-cta-title">
              <span className="connect-cta-dot" />
              Open to work
            </div>
            <p className="connect-cta-text">
              Open to senior or lead engineering roles where product ownership,
              high-performance TypeScript, realtime systems, fintech, crypto, or Web3
              depth matter. I'm strongest where architecture, execution, and team momentum
              all need to meet.
            </p>
            <a href={contactMailto} className="btn btn-primary">Send a message →</a>
          </div>
        </div>
      </div>
    </section>
  )
}
