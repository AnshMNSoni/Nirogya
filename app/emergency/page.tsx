"use client"

import { Phone, AlertTriangle, Heart, Zap, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { HospitalMap } from "@/components/hospital-map"
import { useLanguage } from "@/contexts/language-context"

const emergencySymptoms = [
  {
    categoryKey: "cardiacEmergency" as const,
    symptoms: [
      "Chest pain or pressure",
      "Difficulty breathing",
      "Rapid or irregular heartbeat",
      "Fainting or dizziness",
    ],
    icon: Heart,
    color: "text-red-600",
  },
  {
    categoryKey: "neurologicalEmergency" as const,
    symptoms: ["Severe headache", "Confusion or altered consciousness", "Seizures", "Sudden weakness or numbness"],
    icon: Zap,
    color: "text-purple-600",
  },
  {
    categoryKey: "respiratoryEmergency" as const,
    symptoms: ["Severe difficulty breathing", "Choking", "Blue lips or face", "Severe allergic reaction"],
    icon: AlertTriangle,
    color: "text-orange-600",
  },
]

export default function EmergencyPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8 safe-area-inset">
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
        {/* Emergency Alert */}
        <Alert className="mb-6 sm:mb-8 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950 animate-fade-in">
          <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200 text-sm sm:text-base">
            {t("emergencyAlert")}
          </AlertDescription>
        </Alert>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-red-700 dark:text-red-400 leading-tight">
            {t("emergencyTitle")}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("emergencySubtitle")}
          </p>
        </div>

        {/* Emergency Numbers */}
        <section className="mb-8 sm:mb-12 animate-slide-in-bottom">
          <Card className="border-red-100 dark:border-red-900 hover:shadow-xl rounded-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <CardHeader className="pb-4 sm:pb-6 bg-gray-100 dark:bg-gray-800/50 p-6 rounded-t-xl">
              <CardTitle className="text-red-600 dark:text-red-400 flex items-center text-xl sm:text-2xl font-semibold">
                <Phone className="h-6 w-6 sm:h-7 sm:w-7 mr-3 animate-pulse text-red-500" />
                {t("emergencyNumbers")}
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                {t("emergencyNumbersDesc")}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <Button
                  asChild
                  size="lg"
                  className="h-14 sm:h-16 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-base sm:text-lg font-medium rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <a href="tel:911">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                    911 - {t("emergency")}
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 sm:h-16 border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-base sm:text-lg font-medium rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <a href="tel:1-800-222-1222">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                    {t("poisonControl")}
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 sm:h-16 border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-base sm:text-lg font-medium rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 sm:col-span-2 lg:col-span-1"
                >
                  <a href="tel:988">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                    988 - {t("crisisLine")}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* When to Seek Emergency Care */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 animate-fade-in">{t("whenToSeek")}</h2>
          <div className="relative w-full">
            <div className="carousel overflow-x-auto snap-x snap-mandatory scrollbar-hide">
              <div className="flex space-x-4 sm:space-x-6 p-4">
                {emergencySymptoms.map((category, index) => (
                  <Card key={index} className="w-72 sm:w-80 flex-shrink-0 snap-center hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <CardHeader className="pb-3 sm:pb-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
                      <CardTitle className={`flex items-center text-base sm:text-lg font-semibold ${category.color}`}>
                        <category.icon className="h-5 w-5 sm:h-6 sm:w-6 mr-3 text-green-600 animate-pulse" />
                        {t(category.categoryKey)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                      <ul className="space-y-2">
                        {category.symptoms.map((symptom, idx) => (
                          <li key={idx} className="flex items-start text-sm sm:text-base text-gray-700 dark:text-gray-300">
                            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="leading-relaxed">{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <button className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 z-10">
              <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 z-10">
              <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </section>

        {/* Interactive Hospital Map */}
        <section className="mb-8 sm:mb-12 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">{t("findNearby")}</h2>
          <HospitalMap />
        </section>

        {/* Emergency Preparedness */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 animate-fade-in bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            {t("preparedness")}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 stagger-animation">
            <Card className="hover-lift card-mobile shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transform hover:-translate-y-2 transition-all duration-300">
              <CardHeader className="pb-3 sm:pb-4 bg-green-50 dark:bg-green-900/50 p-4 rounded-t-xl">
                <CardTitle className="flex items-center text-base sm:text-lg font-semibold text-green-700 dark:text-green-300">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 mr-3 text-red-500 animate-pulse" />
                  {t("beforeEmergency")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <ul className="space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  <li className="flex items-start"><span className="mr-2 text-green-500">•</span> Keep emergency contact numbers easily accessible</li>
                  <li className="flex items-start"><span className="mr-2 text-green-500">•</span> Know the location of your nearest hospital</li>
                  <li className="flex items-start"><span className="mr-2 text-green-500">•</span> Keep a list of your medications and allergies</li>
                  <li className="flex items-start"><span className="mr-2 text-green-500">•</span> Learn basic first aid and CPR</li>
                  <li className="flex items-start"><span className="mr-2 text-green-500">•</span> Have a well-stocked first aid kit at home</li>
                  <li className="flex items-start"><span className="mr-2 text-green-500">•</span> Keep your medical insurance information handy</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-lift card-mobile shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transform hover:-translate-y-2 transition-all duration-300">
              <CardHeader className="pb-3 sm:pb-4 bg-orange-50 dark:bg-orange-900/50 p-4 rounded-t-xl">
                <CardTitle className="flex items-center text-base sm:text-lg font-semibold text-orange-700 dark:text-orange-300">
                  <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 mr-3 text-orange-500 animate-pulse" />
                  {t("duringEmergency")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <ul className="space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  <li className="flex items-start"><span className="mr-2 text-orange-500">•</span> Stay calm and call 911 immediately</li>
                  <li className="flex items-start"><span className="mr-2 text-orange-500">•</span> Provide clear information about the emergency</li>
                  <li className="flex items-start"><span className="mr-2 text-orange-500">•</span> Follow dispatcher instructions carefully</li>
                  <li className="flex items-start"><span className="mr-2 text-orange-500">•</span> Don't hang up until told to do so</li>
                  <li className="flex items-start"><span className="mr-2 text-orange-500">•</span> If safe, provide first aid while waiting for help</li>
                  <li className="flex items-start"><span className="mr-2 text-orange-500">•</span> Gather important documents if time permits</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Important Disclaimer */}
        <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950 animate-fade-in">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200 text-xs sm:text-sm">
            <strong>Important:</strong> This page provides general emergency information and helps locate nearby medical
            facilities. In a true emergency, always call 911 first. The map shows approximate locations - verify current
            details when possible. This tool should not delay seeking immediate professional medical attention.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
