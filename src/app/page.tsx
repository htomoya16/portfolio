import MotionProvider from '@/components/animation/MotionProvider'
import FooterSection from '@/components/layout/FooterSection'
import NavBar from '@/components/layout/NavBar'
import ScrollNav from '@/components/layout/ScrollNav'
import AboutSection from '@/components/sections/home/AboutSection'
import ContactSection from '@/components/sections/home/ContactSection'
import ExperienceSection from '@/components/sections/home/ExperienceSection'
import HeroSection from '@/components/sections/home/HeroSection'
import ProjectsSection from '@/components/sections/home/ProjectsSection'
import SkillsSection from '@/components/sections/home/SkillsSection'

export default function Home() {
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
      <FooterSection />
    </MotionProvider>
  )
}
