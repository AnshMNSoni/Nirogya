"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Leaf, Heart, Shield, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FeatureCarousel } from "@/components/feature-carousel"
import { useLanguage } from "@/contexts/language-context"

const popularRemedies = [
  { name: "Cold & Cough", users: "15k+", effectiveness: "94%" },
  { name: "Headache Relief", users: "12k+", effectiveness: "89%" },
  { name: "Digestive Issues", users: "8k+", effectiveness: "91%" },
  { name: "Stress & Anxiety", users: "10k+", effectiveness: "87%" },
]

export default function HomePage() {
  const [quickSearch, setQuickSearch] = useState("")
  const { t } = useLanguage()

  const handleQuickSearch = () => {
    if (quickSearch.trim()) {
      window.location.href = `/remedies?search=${encodeURIComponent(quickSearch.trim())}`
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-950 dark:via-blue-950 dark:to-purple-950 overflow-hidden w-full">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 sm:top-20 left-4 sm:left-10 animate-float-1 opacity-20">
            <Leaf className="h-8 w-8 sm:h-12 sm:w-12 text-green-500" />
          </div>
          <div className="absolute top-32 sm:top-40 right-8 sm:right-20 animate-float-2 opacity-20">
            <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
          </div>
          <div className="absolute bottom-32 sm:bottom-40 left-8 sm:left-20 animate-float-3 opacity-20">
            <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-purple-500" />
          </div>
          <div className="absolute bottom-16 sm:bottom-20 right-4 sm:right-10 animate-float-4 opacity-20">
            <Shield className="h-7 w-7 sm:h-9 sm:w-9 text-blue-500" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center w-full py-8 sm:py-12 px-4 sm:px-6">
          <div className="animate-fade-in space-y-6 sm:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent leading-tight tracking-tight">
              {t("heroTitle")}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto animate-fade-in-delay leading-relaxed">
              {t("heroSubtitle")}
            </p>
          </div>

          {/* Quick Search */}
          <div className="max-w-3xl mx-auto mb-8 mt-8 sm:mb-10 animate-slide-in-bottom">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-3">
              <Input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                className="flex-1 text-base sm:text-lg py-4 sm:py-5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleQuickSearch();
                  }
                }}
                aria-label={t("searchPlaceholder")}
              />
              <Button
                size="lg"
                className="px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link
                  href={`/remedies${quickSearch ? `?search=${encodeURIComponent(quickSearch)}` : ""}`}
                  className="flex items-center"
                >
                  {t("findRemedy")}
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto stagger-animation">
            {[
              { value: "99.99%", label: t("happyUsers"), color: "text-green-500 dark:text-green-400" },
              { value: "500+", label: t("naturalRemedies"), color: "text-blue-500 dark:text-blue-400" },
              { value: "95%", label: t("successRate"), color: "text-purple-500 dark:text-purple-400" },
              { value: "24/7", label: t("aiSupport"), color: "text-orange-500 dark:text-orange-400" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <div className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Carousel Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fade-in space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">{t("whyChoose")}</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              {t("whyChooseSubtitle")}
            </p>
          </div>

          <FeatureCarousel />
        </div>
      </section>

      {/* Popular Remedies */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fade-in space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              {t("popularRemedies")}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">{t("popularRemediesSubtitle")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 stagger-animation">
            {popularRemedies.map((remedy, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover-lift card-mobile">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg">{remedy.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-muted-foreground">{t("usersHelped")}</span>
                      <Badge variant="secondary" className="text-xs">
                        {remedy.users}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-muted-foreground">{t("effectiveness")}</span>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs">
                        {remedy.effectiveness}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-6 sm:mt-8 md:mt-12 animate-fade-in">
            <Button asChild size="lg" variant="outline" className="hover-lift touch-target">
              <Link href="/remedies">
                {t("exploreAll")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600 text-white relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 sm:top-10 left-4 sm:left-10 animate-float-1">
            <Leaf className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 text-white" />
          </div>
          <div className="absolute top-16 sm:top-20 right-8 sm:right-20 animate-float-2">
            <Heart className="h-6 w-6 sm:h-8 sm:w-8 md:h-12 md:w-12 text-white" />
          </div>
          <div className="absolute bottom-16 sm:bottom-20 left-8 sm:left-20 animate-float-3">
            <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 md:h-14 md:w-14 text-white" />
          </div>
          <div className="absolute bottom-8 sm:bottom-10 right-4 sm:right-10 animate-float-4">
            <Shield className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4 sm:space-y-6 md:space-y-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 animate-fade-in px-4">
            {t("ctaTitle")}
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 md:mb-8 opacity-90 animate-fade-in-delay px-4">
            {t("ctaSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-slide-in-bottom px-4">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 hover-lift touch-target"
            >
              <Link href="/remedies">
                {t("getRemedyNow")}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 border-white dark:text-white dark:hover:bg-gray-800 hover:bg-white text-green-600 hover:text-green-600 hover-lift touch-target"
            >
              <Link href="/about">{t("learnAbout")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="py-8 sm:py-12 lg:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Nirogya
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md leading-relaxed">
                  {t("footerDescription")}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  >
                    🌿 100% Natural
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                  >
                    🛡️ Safe & Tested
                  </Badge>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg mb-4">{t("quickLinks")}</h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/remedies"
                      className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 flex items-center group"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {t("findRemedy")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 flex items-center group"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {t("aboutAyurveda")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 flex items-center group"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {t("faq")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/emergency"
                      className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 flex items-center group"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {t("emergency")}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg mb-4">{t("support")}</h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/contact"
                      className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 flex items-center group"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {t("contact")}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-200 dark:border-gray-800 py-8 bg-gray-50 dark:bg-gray-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
      {/* Copyright Section */}
      <div className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
        <span>
          © <span className="text-green-600 dark:text-green-400 font-semibold">{new Date().getFullYear()} Nirogya.</span>{" "}
          {t("copyright")}
        </span>
      </div>

      {/* Developer and Social Links Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-right">
          {t("developedBy")}{" "}
          <span className="text-green-600 dark:text-green-400 font-semibold">ansh.mn.soni</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/anshmnsoni"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            aria-label="LinkedIn profile of ansh.mn.soni"
          >
            <svg
              className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.025-3.05-1.864-3.05-1.865 0-2.149 1.451-2.149 2.955v5.699h-3v-11h2.879v1.518h.041c.401-.761 1.381-1.564 2.843-1.564 3.039 0 3.604 2.001 3.604 4.602v6.444z" />
            </svg>
          </a>
          <a
            href="https://github.com/AnshMNSoni"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            aria-label="GitHub profile of AnshMNSoni"
          >
            <svg
              className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-200"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
        </div>
      </footer>
    </div>
  )
}
