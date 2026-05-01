// Server component

const navLinks = [
  { href: '#about', label: 'ABOUT' },
  { href: '#skills', label: 'SKILLS' },
  { href: '#projects', label: 'PROJECTS' },
  { href: '#experience', label: 'EXPERIENCE' },
  { href: '#contact', label: 'CONTACT' },
]

export default function NavBar() {
  return (
    <nav className="nav">
      <a href="#" className="logo">
        htomoya16
      </a>
      <ul>
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
