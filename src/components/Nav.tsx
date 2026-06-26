import './Nav.css'

export function Nav() {
  return (
    <nav>
      <a href="#hero" className="nav-logo">
        <span className="nav-logo-dot" />
        Dean van Niekerk
      </a>
      <ul className="nav-links">
        <li><a href="#skills">Skills</a></li>
        <li><a href="#ai-workflow">AI</a></li>
        <li><a href="#projects">Work</a></li>
        <li><a href="#activity">Activity</a></li>
        <li><a href="#connect">Connect</a></li>
      </ul>
    </nav>
  )
}
