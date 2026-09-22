import { useEffect, useRef, useSyncExternalStore } from 'react'
import { Home } from './components/Home'
import { ProjectPage } from './components/ProjectPage'
import { projects, resumeUrl } from './data/projects'

function subscribe(callback: () => void) {
  window.addEventListener('hashchange', callback)
  return () => window.removeEventListener('hashchange', callback)
}

export default function App() {
  const hash = useSyncExternalStore(subscribe, () => window.location.hash, () => '')
  const slug = hash.startsWith('#work/') ? hash.slice(6) : null
  const project = projects.find((item) => item.slug === slug)
  const missingProject = slug !== null && !project
  const main = useRef<HTMLElement>(null)
  const previousPage = useRef(slug)

  useEffect(() => {
    document.title = project ? `${project.name} | Dean van Niekerk` : 'Dean van Niekerk | Senior Full-Stack Engineer'
    const pageChanged = previousPage.current !== slug
    previousPage.current = slug
    if (pageChanged) main.current?.focus({ preventScroll: true })
    const frame = requestAnimationFrame(() => {
      if (slug !== null) window.scrollTo({ top: 0, behavior: 'instant' })
      else if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' })
      else if (pageChanged) window.scrollTo({ top: 0, behavior: 'instant' })
    })
    return () => cancelAnimationFrame(frame)
  }, [hash, project, slug])

  return (
    <>
      <a className="skip-link" href="#main" onClick={(event) => {
        event.preventDefault()
        main.current?.focus()
        main.current?.scrollIntoView({ behavior: 'instant' })
      }}>Skip to content</a>
      <header className="site-header">
        <nav className="container nav" aria-label="Main navigation">
          <a className="wordmark" href="#hero">Dean van Niekerk<span className="wordmark-period">.</span></a>
          <div className="nav-links">
            <a href="#projects" aria-current={project || hash === '#projects' ? 'location' : undefined}>Work</a>
            <a href="#experience" aria-current={hash === '#experience' ? 'location' : undefined}>Experience</a>
            <a href="#connect" aria-current={hash === '#connect' ? 'location' : undefined}>Contact</a>
            <a href={resumeUrl} target="_blank" rel="noreferrer" className="nav-resume">Resume <span aria-hidden="true">↗</span></a>
          </div>
        </nav>
      </header>
      <main id="main" ref={main} tabIndex={-1}>
        {project ? <ProjectPage key={project.slug} project={project} /> : missingProject ? (
          <section className="container not-found"><h1>That project isn’t here.</h1><p>Explore the selected work for the current case studies.</p><a href="#projects" className="button primary">Back to selected work</a></section>
        ) : <Home />}
      </main>
      <footer className="container footer"><span>© {new Date().getFullYear()} Dean van Niekerk</span><a href="https://github.com/deanvanniekerk" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/dean-van-niekerk" target="_blank" rel="noreferrer">LinkedIn ↗</a></footer>
    </>
  )
}
