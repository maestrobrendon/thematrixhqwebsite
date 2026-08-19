import type { ServiceEntry } from "@/lib/data/services"
import { ServiceHero } from "./ServiceHero"
import { ProofStrip } from "./ProofStrip"
import { WhatsIncluded } from "./WhatsIncluded"
import { ProcessSteps } from "./ProcessSteps"
import { PortfolioSlot } from "./PortfolioSlot"
import { TestimonialSlot } from "./TestimonialSlot"
import { PricingCTA } from "./PricingCTA"
import { ServiceFAQ } from "./ServiceFAQ"
import { ClosingCTA } from "./ClosingCTA"

interface ServicePageTemplateProps {
  service: ServiceEntry
}

export function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  return (
    <main>
      <ServiceHero service={service} />
      <ProofStrip service={service} />
      <WhatsIncluded service={service} />
      <ProcessSteps service={service} />
      <PortfolioSlot service={service} />
      <TestimonialSlot service={service} />
      <PricingCTA service={service} />
      <ServiceFAQ service={service} />
      <ClosingCTA headline={service.cta} whatsappText={service.whatsappText} />
    </main>
  )
}
