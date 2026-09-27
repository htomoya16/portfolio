import MotionProvider from '@/components/animation/MotionProvider'
import FooterSection from '@/components/layout/FooterSection'
import NavBar from '@/components/layout/NavBar'
import ScrollNav from '@/components/layout/ScrollNav'
import NegiSystem from '@/components/pet/NegiSystem'
import AboutSection from '@/components/sections/home/AboutSection'
import ContactSection from '@/components/sections/home/ContactSection'
import ExperienceSection from '@/components/sections/home/ExperienceSection'
import HeroSection from '@/components/sections/home/HeroSection'
import ProjectsSection from '@/components/sections/home/ProjectsSection'
import SkillsSection from '@/components/sections/home/SkillsSection'
import { getLatestCommitDate } from '@/lib/github-stats'

/** GitHub から取得できなかったときはビルド日を版として出す。 */
function buildDateVersion() {
  const t = new Date()
  const p = (n: number) => String(n).padStart(2, '0')
  return `${t.getFullYear()}.${p(t.getMonth() + 1)}.${p(t.getDate())}`
}


export default async function Home() {
  const version = (await getLatestCommitDate()) ?? buildDateVersion()

  return (
    <MotionProvider>
      <NavBar />
      <ScrollNav />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <FooterSection version={version} />
      <NegiSystem />
    </MotionProvider>
  )
}
