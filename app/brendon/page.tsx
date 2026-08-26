import { Hero } from "./components/Hero"
import { About } from "./components/About"
import { FeaturedWork } from "./components/FeaturedWork"
import { AllWork } from "./components/AllWork"
import { WorkDivider } from "./components/WorkDivider"
import { Perspective } from "./components/Perspective"
import { SkillsExpertise } from "./components/SkillsExpertise"
import { ExperienceExpertise } from "./components/ExperienceExpertise"
import { Footer } from "./components/Footer"

export default function BrendonPortfolioPage() {
  return (
    <main className="relative bg-white text-(--brendon-ink) font-body">
      <Hero />
      <About />
      <FeaturedWork />
      <AllWork />
      <WorkDivider />
      <Perspective />
      <SkillsExpertise />
      <ExperienceExpertise />
      <Footer />
    </main>
  )
}
