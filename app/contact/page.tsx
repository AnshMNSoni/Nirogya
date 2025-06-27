"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"

const contactInfo = [
  {
    icon: Mail,
    titleKey: "emailUs" as const,
    descKey: "emailDesc" as const,
    contact: "ansh.mn.soni7505@gmail.com",
    action: "mailto:ansh.mn.soni7505@gmail.com",
  },
  {
    icon: Clock,
    titleKey: "businessHours" as const,
    descKey: "businessHoursDesc" as const,
    contact: "Mon-Fri: 10:00 AM - 5:00 PM IST",
    action: "#",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { t } = useLanguage()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("https://formspree.io/f/manjaenn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: t("messageSent"),
          description: t("messageSentDesc"),
        })

        setFormData({
          name: "",
          email: "",
          subject: "",
          category: "",
          message: "",
        })
      } else {
        throw new Error("Form submission failed")
      }
    } catch (error) {
      toast({
        title: t("error"),
        description: t("errorDesc") || "There was an error sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-8 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50/30 via-blue-50/30 to-purple-50/30 dark:from-green-950/30 dark:via-blue-950/30 dark:to-purple-950/30">
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 md:space-y-6 animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            {t("contactTitle")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("contactSubtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg hover:shadow-blue-200/50 dark:hover:shadow-blue-900/50 rounded-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
              <CardHeader className="space-y-2 pb-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
                <CardTitle className="flex items-center text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  <MessageSquare className="h-7 w-7 mr-4 text-green-600 animate-pulse" />
                  {t("sendMessage")}
                </CardTitle>
                <CardDescription className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t("sendMessageDesc")}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-base font-medium text-gray-700 dark:text-gray-300">
                        {t("fullName")}
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="mt-2 w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:border-green-400 dark:focus:ring-green-900 transition-all duration-200 text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-base font-medium text-gray-700 dark:text-gray-300">
                        {t("emailAddress")}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="mt-2 w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:border-green-400 dark:focus:ring-green-900 transition-all duration-200 text-base"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="category" className="text-base font-medium text-gray-700 dark:text-gray-300">
                        {t("category")}
                      </Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:border-green-400 dark:focus:ring-green-900 transition-all duration-200 text-base">
                          <SelectValue placeholder={t("selectCategory")} />
                        </SelectTrigger>
                        <SelectContent className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                          <SelectItem value="general" className="text-base">{t("generalInquiry")}</SelectItem>
                          <SelectItem value="technical" className="text-base">{t("technicalSupport")}</SelectItem>
                          <SelectItem value="remedy" className="text-base">{t("remedyQuestion")}</SelectItem>
                          <SelectItem value="safety" className="text-base">{t("safetyConcern")}</SelectItem>
                          <SelectItem value="feedback" className="text-base">{t("feedback")}</SelectItem>
                          <SelectItem value="partnership" className="text-base">{t("partnership")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="subject" className="text-base font-medium text-gray-700 dark:text-gray-300">
                        {t("subject")}
                      </Label>
                      <Input
                        id="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        className="mt-2 w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:border-green-400 dark:focus:ring-green-900 transition-all duration-200 text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-base font-medium text-gray-700 dark:text-gray-300">
                      {t("message")}
                    </Label>
                    <Textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="mt-2 w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:border-green-400 dark:focus:ring-green-900 transition-all duration-200 text-base"
                      placeholder={t("messagePlaceholder")}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        {t("sendingMessage")}
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-3" />
                        {t("sendMessageButton")}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information & FAQ */}
          <div className="space-y-8">
            {/* Contact Info */}
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur hover-lift">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">{t("contactInformation")}</CardTitle>
                <CardDescription>{t("otherWays")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{t(info.titleKey)}</h4>
                      <p className="text-sm text-muted-foreground mb-1">{t(info.descKey)}</p>
                      {info.action.startsWith("#") ? (
                        <p className="text-sm font-medium">{info.contact}</p>
                      ) : (
                        <a
                          href={info.action}
                          className="text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                        >
                          {info.contact}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.025-3.05-1.864-3.05-1.865 0-2.149 1.451-2.149 2.955v5.699h-3v-11h2.879v1.518h.041c.401-.761 1.381-1.564 2.843-1.564 3.039 0 3.604 2.001 3.604 4.602v6.444z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">LinkedIn</h4>
                    <p className="text-sm text-muted-foreground mb-1">Connect with me professionally</p>
                    <a
                      href="https://www.linkedin.com/in/anshmnsoni"
                      className="text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit LinkedIn
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">GitHub</h4>
                    <p className="text-sm text-muted-foreground mb-1">Check out my projects</p>
                    <a
                      href="https://github.com/AnshMNSoni"
                      className="text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit GitHub
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Notice */}
            <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950 shadow-lg hover-lift">
              <CardHeader className="pb-4">
                <CardTitle className="text-red-700 dark:text-red-400 flex items-center text-lg">
                  <Phone className="h-5 w-5 mr-2" />
                  {t("medicalEmergencyTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-red-800 dark:text-red-200 text-sm leading-relaxed">{t("medicalEmergencyDesc")}</p>
                <Button asChild variant="destructive" size="sm" className="hover-lift">
                  <a href="/emergency">{t("emergencyResources")}</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}