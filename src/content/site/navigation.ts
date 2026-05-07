export const navLinks = [
  { href: '#about', label: 'ABOUT' },
  { href: '#skills', label: 'SKILLS' },
  { href: '#projects', label: 'PROJECTS' },
  { href: '#experience', label: 'EXPERIENCE' },
  { href: '#contact', label: 'CONTACT' },
]


export const scrollNavLinks = [
  { id: 'hero', label: 'HERO' },
  { id: 'about', label: '01 ABOUT' },
  { id: 'skills', label: '02 SKILLS' },
  { id: 'projects', label: '03 PROJECTS' },
  { id: 'experience', label: '04 EXP' },
  { id: 'contact', label: '05 CONTACT' },
] as const

export const scrollNavCopy = {
  ariaLabel: 'Section navigation',
  itemAriaPrefix: 'Go to',
} as const
