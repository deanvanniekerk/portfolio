import './Nav.css'

export function Nav() {
  return (
    <nav>
      <div className="nav-logo">// DVN</div>
      <ul className="nav-links">
        <li><a href="#skills">Skills</a></li>
        <li><a href="#ai-workflow">AI</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#activity">Activity</a></li>
        <li><a href="#connect">Connect</a></li>
      </ul>
    </nav>
  )
}
