"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"

const contactInfo = [
  {
    icon: Mail,
    titleKey: "emailUs" as const,
    descKey: "emailDesc" as const,
    contact: "support@Nirogya.com",
    action: "mailto:support@Nirogya.com",
  },
  {
    icon: Phone,
    titleKey: "callUs" as const,
    descKey: "callDesc" as const,
    contact: "+1 (555) 123-AYUR",
    action: "tel:+15551232987",
  },
  {
    icon: MapPin,
    titleKey: "visitUs" as const,
    descKey: "visitDesc" as const,
    contact: "123 Wellness Street, Health City, HC 12345",
    action: "#",
  },
  {
    icon: Clock,
    titleKey: "businessHours" as const,
    descKey: "businessHoursDesc" as const,
    contact: "Mon-Fri: 9AM-6PM PST",
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

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

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
    setIsSubmitting(false)
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
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur hover-lift">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="flex items-center text-xl md:text-2xl">
                  <MessageSquare className="h-6 w-6 mr-3 text-green-600" />
                  {t("sendMessage")}
                </CardTitle>
                <CardDescription className="text-base">{t("sendMessageDesc")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">{t("fullName")}</Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">{t("emailAddress")}</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">{t("category")}</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder={t("selectCategory")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">{t("generalInquiry")}</SelectItem>
                          <SelectItem value="technical">{t("technicalSupport")}</SelectItem>
                          <SelectItem value="remedy">{t("remedyQuestion")}</SelectItem>
                          <SelectItem value="safety">{t("safetyConcern")}</SelectItem>
                          <SelectItem value="feedback">{t("feedback")}</SelectItem>
                          <SelectItem value="partnership">{t("partnership")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="subject">{t("subject")}</Label>
                      <Input
                        id="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">{t("message")}</Label>
                    <Textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="mt-1"
                      placeholder={t("messagePlaceholder")}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {t("sendingMessage")}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
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
