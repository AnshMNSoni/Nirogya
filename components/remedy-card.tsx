"use client"

import { useState } from "react"
import { Clock, Users, AlertTriangle, CheckCircle, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useLanguage } from "@/contexts/language-context"

interface RemedyCardProps {
  remedy: {
    title: string
    description: string
    severity: "mild" | "moderate" | "serious"
    ingredients: string[]
    steps: string[]
    precautions: string[]
    duration: string
    frequency: string
    benefits: string[]
    contraindications: string[]
    isEmergency: boolean
    emergencyMessage?: string
  }
}

export function RemedyCard({ remedy }: RemedyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { t } = useLanguage()

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "mild":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "moderate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "serious":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case "mild":
        return t("mild")
      case "moderate":
        return t("moderate")
      case "serious":
        return t("serious")
      default:
        return severity
    }
  }

  if (remedy.isEmergency) {
    return (
      <Card className="border-red-200 dark:border-red-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-red-700 dark:text-red-400 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              {remedy.title}
            </CardTitle>
            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">{t("emergency")}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              <strong>{t("immediateAttention")}</strong> {remedy.emergencyMessage}
            </AlertDescription>
          </Alert>

          <div className="mt-4">
            <h4 className="font-semibold text-lg mb-3">{t("emergencySteps")}:</h4>
            <ol className="space-y-2">
              {remedy.steps.map((step, index) => (
                <li key={index} className="flex">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                    {index + 1}
                  </span>
                  <span className="pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{remedy.title}</CardTitle>
          <div className="flex gap-2">
            <Badge className={getSeverityColor(remedy.severity)}>{getSeverityText(remedy.severity)}</Badge>
            {(remedy as any).fallback && (
              <Badge variant="outline" className="text-xs">
                {t("traditionalRecipe")}
              </Badge>
            )}
          </div>
        </div>
        <CardDescription className="text-base">{remedy.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Show fallback notice if applicable */}
        {(remedy as any).fallback && (
          <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
            <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-blue-800 dark:text-blue-200">
              This is a traditional Ayurvedic remedy. Our AI service will be back soon for personalized recommendations.
            </AlertDescription>
          </Alert>
        )}

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">{remedy.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">{remedy.frequency}</span>
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <h4 className="font-semibold text-lg mb-3 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
            {t("ingredientsNeeded")}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {remedy.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center p-2 bg-green-50 dark:bg-green-950 rounded">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm">{ingredient}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div>
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
              📋
            </span>
            {t("stepByStep")}
          </h4>
          <div className="space-y-4">
            {remedy.steps.map((step, index) => (
              <div key={index} className="group relative">
                {/* Progress Line - hidden on mobile screens */}
                {index < remedy.steps.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-8 bg-gradient-to-b from-green-200 to-blue-200 dark:from-green-800 dark:to-blue-800 hidden md:block"></div>
                )}

                <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-green-50/50 to-blue-50/50 dark:from-green-950/30 dark:to-blue-950/30 border border-green-100 dark:border-green-800 hover:shadow-md transition-all duration-300 group-hover:scale-[1.02]">
                  {/* Step Number */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      {index + 1}
                    </div>
                    {/* Pulse animation for active step */}
                    <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-full animate-ping opacity-20"></div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pt-2">
                    <div className="flex items-start justify-between">
                      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
                        {step}
                      </p>

                      {/* Time estimate for each step */}
                      <div className="ml-4 flex-shrink-0">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          <Clock className="w-3 h-3 mr-1" />
                          {index === 0 ? "2 min" : index === remedy.steps.length - 1 ? "5 min" : "1 min"}
                        </span>
                      </div>
                    </div>

                    {/* Progress indicator */}
                    <div className="mt-3 flex items-center space-x-2">
                      <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${((index + 1) / remedy.steps.length) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        {index + 1}/{remedy.steps.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Completion Message */}
          <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl border border-green-200 dark:border-green-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h5 className="font-semibold text-green-800 dark:text-green-300">{t("youreAllSet")}</h5>
                <p className="text-sm text-green-700 dark:text-green-400">{t("followSteps")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Sections */}
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full">
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-2" />
                  {t("showLess")}
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-2" />
                  {t("showMore")}
                </>
              )}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-6 mt-6">
            <Separator />

            {/* Benefits */}
            <div>
              <h4 className="font-semibold text-lg mb-3 text-green-700 dark:text-green-400">{t("benefits")}</h4>
              <ul className="space-y-2">
                {remedy.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Precautions */}
            <div>
              <h4 className="font-semibold text-lg mb-3 text-orange-700 dark:text-orange-400">{t("precautions")}</h4>
              <ul className="space-y-2">
                {remedy.precautions.map((precaution, index) => (
                  <li key={index} className="flex items-start">
                    <AlertTriangle className="h-4 w-4 mr-2 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{precaution}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contraindications */}
            {remedy.contraindications.length > 0 && (
              <div>
                <h4 className="font-semibold text-lg mb-3 text-red-700 dark:text-red-400">{t("whenNotToUse")}</h4>
                <ul className="space-y-2">
                  {remedy.contraindications.map((contraindication, index) => (
                    <li key={index} className="flex items-start">
                      <AlertTriangle className="h-4 w-4 mr-2 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{contraindication}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card >
  )
}
