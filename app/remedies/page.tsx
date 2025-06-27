"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Loader2, AlertTriangle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RemedyCard } from "@/components/remedy-card"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"

export default function RemediesPage() {
  const [symptoms, setSymptoms] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [remedy, setRemedy] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { t } = useLanguage()

  useEffect(() => {
    const searchQuery = searchParams.get("search")
    if (searchQuery) {
      setSymptoms(searchQuery)
    }
  }, [searchParams])

  const handleSearch = async () => {
    if (!symptoms.trim()) {
      toast({
        title: t("enterSymptoms"),
        description: t("enterSymptomsDesc"),
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setError("")
    setRemedy(null)

    try {
      console.log("Sending request with symptoms:", symptoms.trim())

      const response = await fetch("/api/get-remedy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symptoms: symptoms.trim(),
          age: age || undefined,
          gender: gender || undefined,
        }),
      })

      console.log("Response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error occurred" }))
        console.error("API Error:", errorData)
        throw new Error(errorData.error || `HTTP ${response.status}: Failed to get remedy`)
      }

      const data = await response.json()
      console.log("Received data:", data)

      if (data.quotaExceeded) {
        toast({
          title: "AI Service Temporarily Limited",
          description: "Using basic remedy while AI service recovers. Full service will resume soon.",
          variant: "default",
        })
      } else if (data.fallback) {
        toast({
          title: "Basic Remedy Provided",
          description: "Showing a traditional remedy while AI service is unavailable.",
          variant: "default",
        })
      } else {
        toast({
          title: "Remedy Generated!",
          description: "Your personalized Ayurvedic remedy is ready.",
        })
      }

      setRemedy(data)
    } catch (err: any) {
      console.error("Client error:", err)
      const errorMessage = err.message || "Failed to generate remedy. Please try again."
      setError(errorMessage)

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            {t("remediesTitle")}
          </h1>
          <p className="text-xl text-muted-foreground">{t("remediesSubtitle")}</p>
        </div>

        {/* Search Form */}
        <Card className="mb-8 shadow-lg rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all hover:shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 p-6 rounded-t-xl">
            <CardTitle className="flex items-center text-xl sm:text-2xl font-semibold text-green-700 dark:text-green-300">
              <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 mr-3 text-green-600 animate-pulse" />
              {t("describeSymptoms")}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
              {t("symptomsDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="symptoms" className="text-base font-medium text-gray-900 dark:text-gray-100">
                {t("symptomsLabel")}
              </Label>
              <Input
                id="symptoms"
                type="text"
                placeholder={t("symptomsPlaceholder")}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="mt-2 w-full text-base py-3 px-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:border-green-400 dark:focus:ring-green-900 transition-all duration-200"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-base font-medium text-gray-900 dark:text-gray-100">
                  {t("ageLabel")}
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder={t("agePlaceholder")}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="mt-2 w-full text-base py-3 px-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:border-green-400 dark:focus:ring-green-900 transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-base font-medium text-gray-900 dark:text-gray-100">
                  {t("genderLabel")}
                </Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="w-full text-base py-3 px-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:border-green-400 dark:focus:ring-green-900 transition-all duration-200">
                    <SelectValue placeholder={t("selectGender")} />
                  </SelectTrigger>
                  <SelectContent className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <SelectItem value="male" className="text-base">{t("male")}</SelectItem>
                    <SelectItem value="female" className="text-base">{t("female")}</SelectItem>
                    <SelectItem value="other" className="text-base">{t("other")}</SelectItem>
                    <SelectItem value="prefer-not-to-say" className="text-base">{t("preferNotToSay")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleSearch}
              disabled={loading || !symptoms.trim()}
              size="lg"
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  {t("generatingRemedy")}
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  {t("getMyRemedy")}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Alert className="mb-8 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 dark:text-red-200">{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {loading && (
          <Card className="mb-8">
            <CardContent className="py-12">
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-green-600" />
                <h3 className="text-lg font-semibold mb-2">{t("analyzingSymptoms")}</h3>
                <p className="text-muted-foreground">{t("analyzingDescription")}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Remedy Result */}
        {remedy && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">{t("personalizedRemedy")}</h2>
              <p className="text-muted-foreground">{t("remedyBasedOn")}</p>
            </div>
            <RemedyCard remedy={remedy} />
          </div>
        )}

        {/* Disclaimer */}
        <Alert className="mt-12">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-justify">
            <strong>Important:</strong> This content is for educational purposes only and is not a substitute for professional medical advice. Always consult a qualified healthcare provider before beginning any new treatment, especially if you have serious or ongoing symptoms.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
