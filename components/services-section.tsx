"use client"

import { ScrollReveal } from "@/components/scroll-reveal"
import { Card } from "@/components/ui/card"
import { Target, Rocket } from "lucide-react"

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-matrix-bg relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-matrix-blue/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-matrix-purple/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="mb-16">
            <p className="text-sm text-matrix-blue font-medium tracking-wider uppercase mb-4">Why choose us?</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-matrix-text mb-6 leading-tight">
              Experience the Difference: <br />
              <span className="text-matrix-text-dim">We Offer Powerful &amp; Bold Solutions</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {/* Main Feature - Spans 2 cols, 2 rows - "Why choose us?" */}
          <ScrollReveal delay={0} className="md:col-span-2 md:row-span-2">
            <Card className="h-full bg-black border-matrix-border hover:border-matrix-blue/30 transition-all duration-500 p-6 md:p-8 flex flex-col justify-between group overflow-hidden relative">
              {/* Dark overlay to ensure text visibility */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/95 to-black/90 z-0" />

              {/* Subtle accent gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-matrix-blue/[0.05] via-transparent to-matrix-blue-light/[0.05] opacity-100 z-0" />

              {/* Animated grid pattern */}
              <div className="absolute inset-0 opacity-[0.03] z-0">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                  }}
                />
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-6 leading-tight">
                  We don't just design. <br />
                  <span className="text-[#FFFFFF]">We build brands with purpose and precision.</span>
                </h3>

                <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed max-w-xl">
                  Our approach goes beyond surface-level design. We combine research, creativity, and structured execution to help businesses build identities that scale. The result? A brand that is smarter, sharper, and built for the modern digital world.
                </p>
              </div>

              <div className="relative z-10 mt-6 md:mt-8">
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  <div className="bg-black/80 p-3 md:p-4 rounded-lg md:rounded-xl border border-matrix-blue/30 hover:border-matrix-blue/50 transition-colors backdrop-blur-sm">
                    <div className="text-xl md:text-2xl lg:text-3xl font-bold text-matrix-blue mb-0.5 md:mb-1">10x</div>
                    <div className="text-[9px] md:text-[10px] lg:text-xs text-gray-400 uppercase tracking-wider leading-tight">
                      Faster
                      <br className="md:hidden" /> Delivery
                    </div>
                  </div>
                  <div className="bg-black/80 p-3 md:p-4 rounded-lg md:rounded-xl border border-matrix-blue-light/30 hover:border-matrix-blue-light/50 transition-colors backdrop-blur-sm">
                    <div className="text-xl md:text-2xl lg:text-3xl font-bold text-matrix-blue-light mb-0.5 md:mb-1">100%</div>
                    <div className="text-[9px] md:text-[10px] lg:text-xs text-gray-400 uppercase tracking-wider leading-tight">
                      Custom
                      <br className="md:hidden" /> Built
                    </div>
                  </div>
                  <div className="bg-black/80 p-3 md:p-4 rounded-lg md:rounded-xl border border-matrix-purple/30 hover:border-matrix-purple/50 transition-colors backdrop-blur-sm">
                    <div className="text-xl md:text-2xl lg:text-3xl font-bold text-matrix-purple mb-0.5 md:mb-1">
                      24/7
                    </div>
                    <div className="text-[9px] md:text-[10px] lg:text-xs text-gray-400 uppercase tracking-wider leading-tight">
                      
                      <br className="md:hidden" /> Support
                    </div>
                  </div>
                </div>
              </div>

              {/* Very subtle corner accents */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-matrix-blue/5 blur-[60px] opacity-50 group-hover:opacity-100 transition-all duration-700 z-0" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-matrix-blue-light/5 blur-[60px] opacity-50 group-hover:opacity-100 transition-all duration-700 z-0" />
            </Card>
          </ScrollReveal>

          {/* Our Product - Top Right */}
          <ScrollReveal delay={100} className="md:col-span-1 md:row-span-1">
            <Card className="h-full bg-matrix-surface border-matrix-border hover:border-matrix-blue/30 hover:bg-matrix-surface-hover transition-all duration-500 p-6 flex flex-col group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-matrix-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-matrix-blue/20 flex items-center justify-center mb-4 text-matrix-blue group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-matrix-text mb-3">With Us </h3>

                <ul className="space-y-2.5 text-sm text-matrix-text-muted">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-matrix-blue mt-1.5 flex-shrink-0" />
                    <span>Instant automated insights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-matrix-blue mt-1.5 flex-shrink-0" />
                    <span>AI forecasts trends</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-matrix-blue mt-1.5 flex-shrink-0" />
                    <span>Fully customizable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-matrix-blue mt-1.5 flex-shrink-0" />
                    <span>Enterprise-grade security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-matrix-blue mt-1.5 flex-shrink-0" />
                    <span>Intuitive interface</span>
                  </li>
                </ul>
              </div>

              {/* Hover glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-matrix-blue/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Card>
          </ScrollReveal>

          {/* Others - Middle Right */}
          <ScrollReveal delay={200} className="md:col-span-1 md:row-span-1">
            <Card className="h-full bg-matrix-surface border-matrix-border hover:border-matrix-purple/30 hover:bg-matrix-surface-hover transition-all duration-500 p-6 flex flex-col group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-matrix-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-matrix-purple/20 flex items-center justify-center mb-4 text-matrix-purple group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-matrix-text mb-3">With Others</h3>

                <ul className="space-y-2.5 text-sm text-matrix-text-muted">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-matrix-text-dim mt-1.5 flex-shrink-0" />
                    <span>Delayed and manual updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-matrix-text-dim mt-1.5 flex-shrink-0" />
                    <span>Limited forecasting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-matrix-text-dim mt-1.5 flex-shrink-0" />
                    <span>Generic templates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-matrix-text-dim mt-1.5 flex-shrink-0" />
                    <span>Basic data protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-matrix-text-dim mt-1.5 flex-shrink-0" />
                    <span>Steep learning curve</span>
                  </li>
                </ul>
              </div>

              {/* Hover glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-matrix-purple/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Card>
          </ScrollReveal>

          {/* <-- Empty placeholder removed (Speed & Efficiency) */}
        </div>
      </div>
    </section>
  )
}
