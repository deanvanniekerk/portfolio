import avatarImg from '../assets/avatar.jpeg'
import './Hero.css'

export function Hero() {
  return (
    <div className="page-wrapper">
      <section id="hero">
        <div className="hero-content reveal">
          <div className="hero-tag">Senior Engineer · Building since 2013</div>
          <h1 className="hero-name">
            <span className="first">Dean</span>
            <span className="last">van Niekerk</span>
          </h1>
          <div className="hero-title">
            Senior Engineer · Real-Time Systems · Full Stack
          </div>

          <div className="hero-summary">
            <div className="hero-visual" data-parallax="0.05">
              <div className="avatar-glow" />
              <img src={avatarImg} alt="Dean van Niekerk" />
            </div>
            <p className="hero-bio">
              Senior Software Engineer with 10+ years of experience building full-stack
              product systems across React, TypeScript, Node.js, PostgreSQL, real-time
              APIs, and data-heavy interfaces. Strongest in fast-moving product teams
              where frontend, backend, architecture, performance, and delivery ownership
              overlap.
            </p>
          </div>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">View Projects →</a>
            <a href="#connect" className="btn btn-ghost">Get in Touch</a>
          </div>
        </div>

        <aside className="hero-status reveal reveal-delay-2">
          <span className="status-dot" />
          Open to senior engineering roles
        </aside>
      </section>
    </div>
  )
}
