"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Leaf, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { LanguageSelector } from "./language-selector"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

const navigationKeys = [
  { key: "home", href: "/" },
  { key: "findRemedy", href: "/remedies" },
  { key: "aboutAyurveda", href: "/about" },
  { key: "faq", href: "/faq" },
  { key: "emergency", href: "/emergency" },
  { key: "contact", href: "/contact" },
] as const

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 safe-area-inset">
      <div className="container-responsive flex h-14 sm:h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 touch-target">
          <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 dark:text-green-400" />
          <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Nirogya
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationKeys.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "relative text-sm font-medium transition-all duration-300 ease-in-out touch-target px-4 py-2 rounded-lg group overflow-hidden",
                pathname === item.href
                  ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/50"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {/* Background hover effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>

              {/* Sliding underline effect */}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 group-hover:w-full transition-all duration-300 ease-out"></span>

              {/* Text content */}
              <span className="relative z-10 group-hover:scale-105 transition-transform duration-200">
                {t(item.key)}
              </span>

              {/* Subtle glow effect */}
              <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-green-400 to-blue-400 blur-sm"></span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-1 sm:space-x-2">
          <LanguageSelector />
          <ThemeToggle />

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden touch-target"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background/95 backdrop-blur safe-area-inset">
          <nav className="container-responsive py-4 space-y-1">
            {navigationKeys.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "block px-4 py-3 text-base font-medium rounded-lg transition-colors touch-target",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
