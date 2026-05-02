import ScrambleText from '@/components/animation/ScrambleText'
import { navLinks } from '@/content/site/navigation'

export default function NavBar() {
  return (
    <nav className="nav">
      <a href="#" className="logo">
        <ScrambleText text="htomoya16" chars="lowercase" revealRate={48} settleDuration={320} />
      </a>
      <ul>
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href}>
              <ScrambleText text={link.label} chars="uppercase" revealRate={42} settleDuration={260} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
