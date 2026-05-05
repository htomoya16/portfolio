import NavProgressBar from './NavProgressBar'
import { navLinks } from '@/content/site/navigation'

export default function NavBar() {
  return (
    <nav className="nav">
      <NavProgressBar />
      <a href="#" className="logo">{'// htomoya16'}</a>
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
