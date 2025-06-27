"use client"

import { Leaf, Heart, Shield, Users, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"

const principles = [
  {
    titleKey: "holisticApproach" as const,
    descKey: "holisticDesc" as const,
    icon: Heart,
  },
  {
    titleKey: "naturalIngredients" as const,
    descKey: "naturalDesc" as const,
    icon: Leaf,
  },
  {
    titleKey: "preventionFocus" as const,
    descKey: "preventionDesc" as const,
    icon: Shield,
  },
  {
    titleKey: "individualConstitution" as const,
    descKey: "constitutionDesc" as const,
    icon: Users,
  },
]

const benefits = [
  "No harmful side effects when used properly",
  "Addresses root causes, not just symptoms",
  "Promotes overall wellness and vitality",
  "Supports the body's natural healing processes",
  "Cost-effective and accessible remedies",
  "Sustainable and environmentally friendly",
]

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            {t("aboutBadge")}
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            {t("aboutTitle")}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">{t("aboutSubtitle")}</p>
        </div>

        {/* What is Ayurveda */}
        <section className="mb-12 sm:mb-16">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl flex items-center">
                <Leaf className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-green-600" />
                {t("whatIsAyurveda")}
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-base sm:prose-lg max-w-none dark:prose-invert">
              <p className="text-sm sm:text-base">{t("ayurvedaDescription1")}</p>
              <p className="text-sm sm:text-base">{t("ayurvedaDescription2")}</p>
            </CardContent>
          </Card>
        </section>

        {/* Core Principles */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">{t("corePrinciples")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {principles.map((principle, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-lg flex items-center justify-center mb-4">
                    <principle.icon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-base sm:text-lg">{t(principle.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm sm:text-base">{t(principle.descKey)}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* The Three Doshas - Mobile Optimized */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">{t("threeDoshas")}</h2>

          {/* Mobile: Stacked Cards with Better Spacing */}
          <div className="space-y-6 md:hidden">
            {/* Vata */}
            <Card className="border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">V</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg text-orange-700 dark:text-orange-400">{t("vataTitle")}</CardTitle>
                    <CardDescription className="text-sm">{t("vataDesc")}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed">{t("vataDetails")}</p>
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="bg-white dark:bg-gray-800 p-2 rounded">
                    <strong>{t("qualities")}:</strong> {t("cold")}, {t("dry")}, {t("light")}, {t("mobile")}
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-2 rounded">
                    <strong>{t("season")}:</strong> {t("fallWinter")}
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-2 rounded">
                    <strong>{t("time")}:</strong> 2-6 AM/PM
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pitta */}
            <Card className="border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">P</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg text-red-700 dark:text-red-400">{t("pittaTitle")}</CardTitle>
                    <CardDescription className="text-sm">{t("pittaDesc")}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed">{t("pittaDetails")}</p>
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="bg-white dark:bg-gray-800 p-2 rounded">
                    <strong>{t("qualities")}:</strong> {t("hot")}, {t("sharp")}, {t("light")}, {t("oily")}
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-2 rounded">
                    <strong>{t("season")}:</strong> {t("summer")}
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-2 rounded">
                    <strong>{t("time")}:</strong> 10-2 AM/PM
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Kapha */}
            <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">K</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg text-green-700 dark:text-green-400">{t("kaphaTitle")}</CardTitle>
                    <CardDescription className="text-sm">{t("kaphaDesc")}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed">{t("kaphaDetails")}</p>
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="bg-white dark:bg-gray-800 p-2 rounded">
                    <strong>{t("qualities")}:</strong> {t("cold")}, {t("heavy")}, {t("moist")}, {t("stable")}
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-2 rounded">
                    <strong>{t("season")}:</strong> {t("spring")}
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-2 rounded">
                    <strong>{t("time")}:</strong> 6-10 AM/PM
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Desktop: Original Grid Layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
            <Card className="border-orange-200 dark:border-orange-800">
              <CardHeader>
                <CardTitle className="text-xl text-orange-700 dark:text-orange-400">{t("vataTitle")}</CardTitle>
                <CardDescription>{t("vataDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{t("vataDetails")}</p>
                <div className="space-y-1 text-sm">
                  <div>
                    <strong>{t("qualities")}:</strong> {t("cold")}, {t("dry")}, {t("light")}, {t("mobile")}
                  </div>
                  <div>
                    <strong>{t("season")}:</strong> {t("fallWinter")}
                  </div>
                  <div>
                    <strong>{t("time")}:</strong> 2-6 AM/PM
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="text-xl text-red-700 dark:text-red-400">{t("pittaTitle")}</CardTitle>
                <CardDescription>{t("pittaDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{t("pittaDetails")}</p>
                <div className="space-y-1 text-sm">
                  <div>
                    <strong>{t("qualities")}:</strong> {t("hot")}, {t("sharp")}, {t("light")}, {t("oily")}
                  </div>
                  <div>
                    <strong>{t("season")}:</strong> {t("summer")}
                  </div>
                  <div>
                    <strong>{t("time")}:</strong> 10-2 AM/PM
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-xl text-green-700 dark:text-green-400">{t("kaphaTitle")}</CardTitle>
                <CardDescription>{t("kaphaDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{t("kaphaDetails")}</p>
                <div className="space-y-1 text-sm">
                  <div>
                    <strong>{t("qualities")}:</strong> {t("cold")}, {t("heavy")}, {t("moist")}, {t("stable")}
                  </div>
                  <div>
                    <strong>{t("season")}:</strong> {t("spring")}
                  </div>
                  <div>
                    <strong>{t("time")}:</strong> 6-10 AM/PM
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">{t("benefitsTitle")}</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* How Nirogya Works */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">{t("NirogyaWorks")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl sm:text-2xl">🤖</span>
                </div>
                <CardTitle className="text-base sm:text-lg">{t("aiAnalysis")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{t("aiAnalysisDesc")}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl sm:text-2xl">📚</span>
                </div>
                <CardTitle className="text-base sm:text-lg">{t("ancientWisdom")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{t("ancientWisdomDesc")}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl sm:text-2xl">🎯</span>
                </div>
                <CardTitle className="text-base sm:text-lg">{t("personalizedSolution")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{t("personalizedDesc")}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Safety & Disclaimer */}
        <section>
          <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
            <CardHeader>
              <CardTitle className="text-yellow-800 dark:text-yellow-200 flex items-center text-base sm:text-lg">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                {t("safetyTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-yellow-800 dark:text-yellow-200">
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>• Always consult with a qualified healthcare provider before starting any new treatment</li>
                <li>• Ayurvedic remedies are meant to complement, not replace, conventional medical care</li>
                <li>• If you have serious or persistent symptoms, seek immediate medical attention</li>
                <li>• Pregnant or nursing women should consult their doctor before using any remedies</li>
                <li>• Stop using any remedy if you experience adverse reactions</li>
                <li>• This platform provides educational information and should not be considered medical advice</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
