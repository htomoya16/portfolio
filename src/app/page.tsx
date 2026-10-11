import CursorFollower from '@/components/animation/CursorFollower'
import SmoothScroll from '@/components/animation/SmoothScroll'
import FooterSection from '@/components/layout/FooterSection'
import NavBar from '@/components/layout/NavBar'
import ScrollNav from '@/components/layout/ScrollNav'
import NegiLoader from '@/components/pet/NegiLoader'
import NegiSystem from '@/components/pet/NegiSystem'
import AboutSection from '@/components/sections/home/about/AboutSection'
import ContactSection from '@/components/sections/home/contact/ContactSection'
import ExperienceSection from '@/components/sections/home/experience/ExperienceSection'
import HeroSection from '@/components/sections/home/hero/HeroSection'
import ProjectsSection from '@/components/sections/home/projects/ProjectsSection'
import SkillsSection from '@/components/sections/home/skills/SkillsSection'

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <NavBar />
      <ScrollNav />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <FooterSection />
      <NegiLoader />
      <NegiSystem />
      <CursorFollower />
    </>
  )
}
