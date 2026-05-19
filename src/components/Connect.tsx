import './Connect.css'

export function Connect() {
  return (
    <section id="connect">
      <div className="page-wrapper">
        <div className="section-label reveal">Get in touch</div>
        <h2 className="section-title reveal reveal-delay-1">Connect</h2>
        <div className="connect-inner">
          <div className="connect-links reveal">
            <a href="mailto:dean@vanniekerk.online" className="connect-link">
              <div className="connect-link-label">
                <span className="connect-link-icon">◉</span>
                <span>dean@vanniekerk.online</span>
              </div>
              <span className="connect-link-arrow">→</span>
            </a>
            <a href="https://www.linkedin.com/in/dean-van-niekerk" target="_blank" rel="noreferrer" className="connect-link">
              <div className="connect-link-label">
                <span className="connect-link-icon">◈</span>
                <span>LinkedIn</span>
              </div>
              <span className="connect-link-arrow">→</span>
            </a>
            <a href="https://github.com/deanvanniekerk" target="_blank" rel="noreferrer" className="connect-link">
              <div className="connect-link-label">
                <span className="connect-link-icon">⌘</span>
                <span>GitHub</span>
              </div>
              <span className="connect-link-arrow">→</span>
            </a>
          </div>

          <div className="connect-cta reveal reveal-delay-1">
            <div className="connect-cta-title">Open to work</div>
            <p className="connect-cta-text">
              Open to senior or lead engineering roles where product ownership,
              high-performance TypeScript, realtime systems, fintech, crypto, or Web3
              depth matter. I'm strongest where architecture, execution, and team momentum
              all need to meet.
            </p>
            <a href="mailto:dean@vanniekerk.online" className="btn btn-primary">Send a message →</a>
          </div>
        </div>
      </div>
    </section>
  )
}
