import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Projects } from '@/components/projects'
import { RobloxGames } from '@/components/roblox-games'
import { VideoShowcase } from '@/components/video-showcase'
import { GithubSection } from '@/components/github-section'
import { Skills } from '@/components/skills'
import { Experience } from '@/components/experience'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <About />
        <Projects />
        <RobloxGames />
        <VideoShowcase />
        <GithubSection />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
