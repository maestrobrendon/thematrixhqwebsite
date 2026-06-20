"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Instagram, Linkedin, Facebook, Dribbble, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NavigationHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState({
    lagos: "",
    newYork: "",
    amsterdam: "",
  })
  const pathname = usePathname()

  const navLinks = [
    { name: "Home", href: "/", type: "page" },
    { name: "About", href: "/about", type: "page" },
    { name: "Projects", href: "/work", type: "page" },
    { name: "Contact", href: "/contact", type: "page" },
  ]

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/thematrixhq/",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/company/thematrixhq",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://web.facebook.com/thematrixxhouse",
    },
    {
      name: "Behance",
      icon: Dribbble,
      url: "https://www.behance.net/maestrobrendon",
    },
  ]

  // Update time zones every second
  useEffect(() => {
    const updateTimes = () => {
      const now = new Date()

      setCurrentTime({
        lagos: now.toLocaleTimeString("en-US", {
          timeZone: "Africa/Lagos",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        newYork: now.toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        amsterdam: now.toLocaleTimeString("en-US", {
          timeZone: "Europe/Amsterdam",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      })
    }

    updateTimes()
    const interval = setInterval(updateTimes, 1000)

    return () => clearInterval(interval)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative w-32 h-8 block z-50">
            <Image
              src="/images/design-mode/Artboard%20301.png"
              alt="Matrix HQ"
              fill
              className="object-contain leading-7"
              priority
            />
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop "Start your journey" Button */}
            <Button
              asChild
              className="hidden md:flex h-11 px-6 rounded-full bg-white text-black hover:bg-gray-200 font-medium text-sm transition-all"
            >
              <Link href="https://wa.me/2347045985964" target="_blank" rel="noopener noreferrer">
                Start your journey
              </Link>
            </Button>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50 text-white hover:text-gray-300 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-500 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-24 h-full flex flex-col md:flex-row pt-24 pb-12 overflow-y-auto">
          {/* Left Side - Navigation & Contact */}
          <div className="flex-1 flex flex-col justify-between py-8 md:py-12 md:pr-16 border-b md:border-b-0 md:border-r border-white/10 mb-8 md:mb-0 pb-8 md:pb-0">
            {/* Navigation Links */}
            <nav className="flex flex-col gap-4 md:gap-6">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-4xl md:text-6xl lg:text-7xl font-bold transition-all duration-300 group relative inline-block w-fit ${
                      isActive ? "text-white" : "text-gray-600 hover:text-white"
                    }`}
                    style={{
                      animation: isMenuOpen ? `fade-in-up 0.5s ease-out ${index * 0.1}s forwards` : "none",
                      opacity: isMenuOpen ? 1 : 0,
                    }}
                  >
                    <span className="relative">
                      {link.name}
                      {/* Animated underline */}
                      <span
                        className={`absolute -bottom-2 left-0 h-1 bg-matrix-blue transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </span>
                  </Link>
                )
              })}
            </nav>

            {/* Contact Info */}
            <div
              className="mt-12 md:mt-0"
              style={{
                animation: isMenuOpen ? "fade-in-up 0.5s ease-out 0.5s forwards" : "none",
                opacity: isMenuOpen ? 1 : 0,
              }}
            >
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">Talk with us</p>
              <a
                href="mailto:hello@thematrixhq.com"
                className="text-xl md:text-2xl text-white hover:text-matrix-blue transition-colors mb-4 block font-medium"
              >
                hello@thematrixhq.com
              </a>
            </div>
          </div>

          {/* Right Side - Time Zones & Social */}
          <div className="md:w-2/5 md:pl-16 flex flex-col justify-between py-8 md:py-12">
            {/* Time Zones */}
            <div
              style={{
                animation: isMenuOpen ? "fade-in-up 0.5s ease-out 0.3s forwards" : "none",
                opacity: isMenuOpen ? 1 : 0,
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-500 uppercase tracking-wider">Local Time</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-gray-400">Nigeria</span>
                  <span className="text-white font-mono text-lg">{currentTime.lagos}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-gray-400">New York</span>
                  <span className="text-white font-mono text-lg">{currentTime.newYork}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-gray-400">Amsterdam</span>
                  <span className="text-white font-mono text-lg">{currentTime.amsterdam}</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div
              className="mt-12 md:mt-0"
              style={{
                animation: isMenuOpen ? "fade-in-up 0.5s ease-out 0.4s forwards" : "none",
                opacity: isMenuOpen ? 1 : 0,
              }}
            >
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-6">Follow us</p>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-matrix-blue transition-all group"
                  >
                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-matrix-blue transition-colors" />
                    <span className="text-sm text-white">{social.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer Info */}
            <div
              className="mt-12 md:mt-0 pt-8 border-t border-white/10"
              style={{
                animation: isMenuOpen ? "fade-in-up 0.5s ease-out 0.5s forwards" : "none",
                opacity: isMenuOpen ? 1 : 0,
              }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm text-gray-500">
                <p>© 2025 The Matrix HQ. All rights reserved.</p>
                <div className="flex gap-4">
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                  <Link href="/cookies" className="hover:text-white transition-colors">
                    Cookies
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}
