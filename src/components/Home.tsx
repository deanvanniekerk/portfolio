import avatar from '../assets/avatar.webp'
import { emailUrl, projects, resumeUrl } from '../data/projects'

export function Home() {
  return (
    <>
      <section className="hero container" id="hero" aria-labelledby="intro-title">
        <div className="hero-copy">
          <p className="eyebrow">Senior full-stack engineer</p>
          <h1 id="intro-title">Full-stack engineering.<br /><span>End-to-end ownership</span></h1>
          <p className="hero-description">From real-time trading to factory operations, I turn complex requirements into software people can use.</p>
          <div className="actions">
            <a className="button primary" href="#projects">Explore my work <span aria-hidden="true">↗</span></a>
            <a className="text-link" href={resumeUrl} download>Download resume <span className="link-note">PDF</span></a>
          </div>
        </div>
        <div className="portrait">
          <img src={avatar} alt="Dean van Niekerk" width="480" height="480" fetchPriority="high" />
        </div>
      </section>

      <section className="selected-work container" id="projects" aria-labelledby="work-title">
        <div className="section-heading">
          <h2 id="work-title">Selected work</h2>
          <p>Three different domains. The same ownership across interface, API and delivery.</p>
        </div>
        <div className="work-grid">
          {projects.map((project, index) => (
            <article key={project.slug} className={`work-item ${index === 0 ? 'work-item-featured' : ''}`}>
              <a className={`work-image work-image-${project.slug}`} href={`#work/${project.slug}`} tabIndex={-1} aria-hidden="true">
                {project.slug === 'k53-study-guide' ? (
                  <div className="phone-pair">
                    {project.screenshots.slice(0, 2).map((screen) => <img key={screen.src} src={screen.src} alt="" loading="lazy" width="390" height="844" />)}
                  </div>
                ) : <img src={project.screenshots[0].src} alt="" loading="lazy" width="1600" height="900" />}
              </a>
              <div className="work-copy">
                <p className="project-category">{project.category}</p>
                <h3><a href={`#work/${project.slug}`}>{project.name}<span aria-hidden="true">↗</span></a></h3>
                <p>{project.summary}</p>
                <p className="project-proof">{project.proof}</p>
                <ul className="stack-list" aria-label={`${project.name} technologies`}>
                  {project.stack.slice(0, 4).map((tech) => <li key={tech}>{tech}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="experience container" id="experience" aria-labelledby="experience-title">
        <h2 id="experience-title">Experience</h2>
        <div className="experience-list">
          <article className="experience-row">
            <div className="experience-period">May 2026 - present</div>
            <div><h3>Jedidiah Equipment</h3><p className="role">Full-stack engineer / Contract</p></div>
            <p>Working directly with the business to deliver a connected operations platform across web, mobile and backend services. <a href="#work/jedidiahops">View the work ↗</a></p>
          </article>
          <article className="experience-row">
            <div className="experience-period">Oct 2024 - Jun 2026</div>
            <div><h3>Edge</h3><p className="role">Senior Software Engineer</p></div>
            <p>Real-time trading, market discovery and charting in a small, distributed product team. <a href="#work/edge">View the work ↗</a></p>
          </article>
          <article className="experience-row">
            <div className="experience-period">Jun 2020 - Oct 2024</div>
            <div><h3>Monax Labs</h3><p className="role">Team Lead / Senior Software Engineer</p></div>
            <div><p>Led engineering delivery for Aspen, a creator-commerce and membership platform. Built white-label storefronts, minting and decentralised trading flows, while mentoring engineers and reviewing code.</p><a className="inline-link" href="https://aspenft.io" target="_blank" rel="noreferrer">About Aspen ↗</a></div>
          </article>
          <article className="experience-row">
            <div className="experience-period">Oct 2018 - Jun 2020</div>
            <div><h3>Kurtosys Systems</h3><p className="role">Senior Software Engineer</p></div>
            <div><p>Delivered database, backend and frontend features for financial-services clients including BMO, Federated Hermes and Bank of America Merrill Lynch.</p><a className="inline-link" href="https://kurtosys.com" target="_blank" rel="noreferrer">About Kurtosys ↗</a></div>
          </article>
        </div>
      </section>

      <section className="about container" id="about" aria-labelledby="about-title">
        <div className="about-intro">
          <h2 id="about-title">Hands-on, across<br />the whole product.</h2>
          <p>I’m Dean, a software engineer based in Port Elizabeth, South Africa. I work best close to the problem, with responsibility for both the technical decisions and the software that ships.</p>
          <p>My experience spans international remote teams, engineering leadership and independently operated products.</p>
          <a className="text-link" href="https://github.com/deanvanniekerk" target="_blank" rel="noreferrer">Explore my GitHub ↗</a>
        </div>
        <div className="capabilities" id="skills">
          <div><h3>Interfaces that handle complexity</h3><p>React, TypeScript and React Native. Data-heavy screens, real-time state and mobile workflows.</p></div>
          <div><h3>APIs and data that hold together</h3><p>Node.js, PostgreSQL and tRPC. Shared schemas, permissions, event-driven systems and business rules.</p></div>
          <div><h3>Delivery beyond the feature</h3><p>Automated tests, code review, monitoring and release maintenance. The work continues after the first deployment.</p></div>
          <div id="ai-workflow"><h3>AI, with engineering accountability</h3><p>I use AI for exploration, implementation and review. I check the code, test the behavior and own the result.</p></div>
        </div>
      </section>

      <section className="contact container" id="connect" aria-labelledby="contact-title">
        <p className="availability"><span aria-hidden="true" />Open to senior full-stack roles</p>
        <h2 id="contact-title">Have a product<br />that needs an owner?</h2>
        <a className="contact-email" href={emailUrl}>dean@vanniekerk.online <span aria-hidden="true">↗</span></a>
        <div className="contact-details"><p>Based in South Africa (UTC+2). Experienced in remote, international teams.</p><a href="https://www.linkedin.com/in/dean-van-niekerk" target="_blank" rel="noreferrer">Connect on LinkedIn ↗</a></div>
      </section>
    </>
  )
}
