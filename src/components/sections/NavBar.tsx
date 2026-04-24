const NAV_LINKS = ['ABOUT', 'SKILLS', 'PROJECTS', 'EXPERIENCE', 'CONTACT'] as const

export function NavBar() {
  return (
    <nav className="nav">
      <a href="#top" className="logo">
        Y<span>///</span>
      </a>
      <ul>
        {NAV_LINKS.map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`}>{l}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
