"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Instagram, Linkedin, Facebook, Dribbble, MessageCircle, Mail, MapPin, Clock } from "lucide-react"
import Link from "next/link"

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/thematrixhq/",
    handle: "@thematrixhq"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/company/thematrixhq",
    handle: "The Matrix HQ"
  },
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://web.facebook.com/thematrixxhouse",
    handle: "thematrixxhouse"
  },
  {
    name: "Behance",
    icon: Dribbble,
    url: "https://www.behance.net/maestrobrendon",
    handle: "maestrobrendon"
  }
]

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "hello@thematrixhq.com",
    link: "mailto:hello@thematrixhq.com"
  },
  {
    icon: MapPin,
    title: "Location",
    content: "Lagos, Nigeria",
    subtitle: "(6.5244° N, 3.3792° E)"
  },
  {
    icon: Clock,
    title: "Working Hours",
    content: "Mon - Fri: 9:00 AM - 6:00 PM",
    subtitle: "WAT (West Africa Time)"
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        company: "",
        budget: "",
        message: ""
      })

      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main className="relative bg-matrix-bg min-h-screen">
      <NavigationHeader />

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="text-6xl md:text-8xl lg:text-9xl">👋</div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-matrix-text mb-8 leading-[1.1]">
              Hey! Tell us <br />
              <span className="text-matrix-blue">all the things</span>
            </h1>

            <p className="text-xl md:text-2xl text-matrix-text-muted max-w-2xl leading-relaxed">
              Have a project in mind? Want to collaborate? Or just want to say hello?
              We'd love to hear from you.
            </p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-40 right-10 w-64 h-64 bg-matrix-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-matrix-blue/5 rounded-full blur-3xl" />
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Form - Takes 3 columns */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="bg-matrix-surface border border-matrix-border rounded-3xl p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-matrix-text mb-8">
                  Start a conversation
                </h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-2xl font-bold text-matrix-text mb-2">
                      Thanks for reaching out!
                    </h3>
                    <p className="text-matrix-text-muted">
                      We'll get back to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-matrix-text mb-2">
                          Your Name *
                        </label>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className="w-full h-12 px-4 bg-black border border-matrix-border rounded-lg text-matrix-text placeholder-matrix-text-dim focus:outline-none focus:border-matrix-blue transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-matrix-text mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          className="w-full h-12 px-4 bg-black border border-matrix-border rounded-lg text-matrix-text placeholder-matrix-text-dim focus:outline-none focus:border-matrix-blue transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-matrix-text mb-2">
                          Company
                        </label>
                        <Input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your Company"
                          className="w-full h-12 px-4 bg-black border border-matrix-border rounded-lg text-matrix-text placeholder-matrix-text-dim focus:outline-none focus:border-matrix-blue transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-matrix-text mb-2">
                          Project Budget
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full h-12 px-4 bg-black border border-matrix-border rounded-lg text-matrix-text focus:outline-none focus:border-matrix-blue transition-colors appearance-none cursor-pointer"
                        >
                          <option value="">Select budget range</option>
                          <option value="under-500">Under $500</option>
                          <option value="500-1000">$500 - $1,000</option>
                          <option value="1000-5000">$1,000 - $5,000</option>
                          <option value="5000-10000">$5,000 - $10,000</option>
                          <option value="10000-plus">$10,000+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-matrix-text mb-2">
                        Tell us about your project *
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Share your vision, goals, and any specific requirements..."
                        rows={6}
                        className="w-full px-4 py-3 bg-black border border-matrix-border rounded-lg text-matrix-text placeholder-matrix-text-dim focus:outline-none focus:border-matrix-blue transition-colors resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-matrix-blue text-white hover:bg-matrix-blue-light font-medium text-base rounded-lg transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            ⏳
                          </motion.div>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message
                          <Send className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info & Social - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* WhatsApp Button */}
              <div className="bg-[#25D366]/10 border border-[#25D366]/30 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle className="w-6 h-6 text-[#25D366]" />
                  <h3 className="text-xl font-bold text-matrix-text">Quick Chat</h3>
                </div>
                <p className="text-matrix-text-muted mb-6">
                  Prefer instant messaging? Let's chat on WhatsApp!
                </p>
                <Button
                  asChild
                  className="w-full h-12 bg-[#25D366] text-white hover:bg-[#20BA5A] font-medium rounded-lg transition-all"
                >
                  <Link
                    href="https://wa.me/2347045985964"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat on WhatsApp
                  </Link>
                </Button>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-matrix-surface border border-matrix-border rounded-2xl p-6 hover:border-matrix-blue/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-matrix-blue/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-matrix-blue" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-matrix-text-muted mb-1">
                          {info.title}
                        </h4>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-lg font-bold text-matrix-text hover:text-matrix-blue transition-colors"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-lg font-bold text-matrix-text">
                            {info.content}
                          </p>
                        )}
                        {info.subtitle && (
                          <p className="text-sm text-matrix-text-dim mt-1">
                            {info.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="bg-matrix-surface border border-matrix-border rounded-3xl p-8">
                <h3 className="text-xl font-bold text-matrix-text mb-6">
                  Follow us
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-black border border-matrix-border hover:border-matrix-blue hover:bg-matrix-surface-hover transition-all group"
                      >
                        <social.icon className="w-8 h-8 text-matrix-text-muted group-hover:text-matrix-blue transition-colors" />
                        <div className="text-center">
                          <p className="text-sm font-medium text-matrix-text">
                            {social.name}
                          </p>
                          <p className="text-xs text-matrix-text-dim">
                            {social.handle}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 md:py-32 border-t border-matrix-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-matrix-text mb-6 leading-tight">
              Not ready to commit? <br />
              <span className="text-matrix-blue">Let's just talk</span>
            </h2>
            <p className="text-lg md:text-xl text-matrix-text-muted mb-8">
              Sometimes the best projects start with a simple conversation.
              No pressure, no obligations — just good ideas and possibilities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                className="h-14 px-8 bg-matrix-blue text-white hover:bg-matrix-blue-light font-medium text-base rounded-full"
              >
                <Link href="/work">View Our Work</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-14 px-8 bg-transparent border-matrix-border text-matrix-text hover:bg-matrix-surface-hover font-medium text-base rounded-full"
              >
                <Link href="/about">Learn About Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
