"use client"

import { Phone, AlertTriangle, Heart, Zap } from "lucide-react"
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
          <Card className="border-red-200 dark:border-red-800 hover-lift">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="text-red-700 dark:text-red-400 flex items-center text-xl sm:text-2xl">
                <Phone className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                {t("emergencyNumbers")}
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">{t("emergencyNumbersDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <Button
                  asChild
                  size="lg"
                  className="h-14 sm:h-16 bg-red-600 hover:bg-red-700 text-white text-base sm:text-lg hover-lift touch-target"
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
                  className="h-14 sm:h-16 border-red-200 text-red-700 hover:bg-red-50 text-base sm:text-lg hover-lift touch-target"
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
                  className="h-14 sm:h-16 border-blue-200 text-blue-700 hover:bg-blue-50 text-base sm:text-lg hover-lift touch-target sm:col-span-2 lg:col-span-1"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 stagger-animation">
            {emergencySymptoms.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover-lift card-mobile">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className={`flex items-center ${category.color} text-base sm:text-lg`}>
                    <category.icon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    {t(category.categoryKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.symptoms.map((symptom, idx) => (
                      <li key={idx} className="flex items-start text-xs sm:text-sm">
                        <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-red-500 mt-0.5 flex-shrink-0" />
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Interactive Hospital Map */}
        <section className="mb-8 sm:mb-12 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">{t("findNearby")}</h2>
          <HospitalMap />
        </section>

        {/* Emergency Preparedness */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 animate-fade-in">
            {t("preparedness")}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 stagger-animation">
            <Card className="hover-lift card-mobile">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-red-600" />
                  {t("beforeEmergency")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>• Keep emergency contact numbers easily accessible</li>
                  <li>• Know the location of your nearest hospital</li>
                  <li>• Keep a list of your medications and allergies</li>
                  <li>• Learn basic first aid and CPR</li>
                  <li>• Have a well-stocked first aid kit at home</li>
                  <li>• Keep your medical insurance information handy</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-lift card-mobile">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-orange-600" />
                  {t("duringEmergency")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>• Stay calm and call 911 immediately</li>
                  <li>• Provide clear information about the emergency</li>
                  <li>• Follow dispatcher instructions carefully</li>
                  <li>• Don't hang up until told to do so</li>
                  <li>• If safe, provide first aid while waiting for help</li>
                  <li>• Gather important documents if time permits</li>
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
