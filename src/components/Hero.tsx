import avatarImg from '../assets/avatar.jpeg'
import './Hero.css'

export function Hero() {
  return (
    <div className="page-wrapper">
      <section id="hero">
        <div className="hero-content">
          <div className="hero-tag">Senior Engineer · Building since 2013</div>
          <h1 className="hero-name">
            <div className="first">Dean</div>
            <div className="last">van Niekerk</div>
          </h1>
          <div className="hero-title">
            Senior Engineer @ <span>Edge</span>&nbsp;·&nbsp;Full Stack&nbsp;·&nbsp;Crypto
          </div>
          <p className="hero-bio">
            10+ years building full-stack web applications in the crypto sector.
            Designed and launched trading platforms, led engineering teams, and I'm
            always hungry to learn. I value craft, collaboration, and strong relationships.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">View Projects →</a>
            <a href="#connect" className="btn btn-ghost">Get in Touch</a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="avatar-container">
            <div className="avatar-glow" />
            <div className="hex-ring" />
            <div className="avatar-img-wrap">
              <img src={avatarImg} alt="Dean van Niekerk" />
            </div>
          </div>
          <div className="status-badge">
            <div className="status-dot" />
            Senior Engineer at Edge
          </div>
        </div>
      </section>
    </div>
  )
}
