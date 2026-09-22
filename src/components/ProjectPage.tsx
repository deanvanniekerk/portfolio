import { projects } from '../data/projects'
import type { Project } from '../data/projects'
import { Gallery } from './Gallery'

export function ProjectPage({ project }: { project: Project }) {
  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  return (
    <article className="case-study container">
      <a href="#projects" className="back-link">← All work</a>
      <header className="case-header">
        <p className="eyebrow">{project.category}</p>
        <h1>{project.name}</h1>
        <p className="case-summary">{project.summary}</p>
        <dl className="case-meta"><div><dt>My role</dt><dd>{project.role}</dd></div><div><dt>When</dt><dd>{project.period}</dd></div></dl>
      </header>
      <Gallery screenshots={project.screenshots} name={project.name} />
      <div className="case-content">
        <aside className="case-sidebar">
          <h2>The stack</h2>
          <ul className="stack-list">{project.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul>
          <div className="case-links">{project.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</div>
        </aside>
        <div className="case-story">
          <section><h2>The problem</h2><p>{project.context}</p></section>
          <section><h2>What I owned</h2><p>{project.ownership}</p></section>
          <section><h2>Engineering decisions</h2><div className="decision-list">{project.decisions.map((decision) => <div key={decision.title}><h3>{decision.title}</h3><p>{decision.body}</p></div>)}</div></section>
          <section><h2>What shipped</h2><p>{project.delivered}</p></section>
        </div>
      </div>
      <a className="next-project" href={`#work/${next.slug}`}><span>Next case study</span><strong>{next.name} <span aria-hidden="true">↗</span></strong></a>
    </article>
  )
}
