"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Search, HelpCircle, MessageSquare, Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

const faqCategories = [
  {
    id: "general",
    name: "General",
    icon: "🌿",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  {
    id: "safety",
    name: "Safety",
    icon: "🛡️",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  {
    id: "remedies",
    name: "Remedies",
    icon: "💊",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  },
  {
    id: "technical",
    name: "Technical",
    icon: "⚙️",
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  },
]

const faqData = [
  {
    id: 1,
    category: "general",
    question: "What is AyurCure and how does it work?",
    answer:
      "AyurCure is an AI-powered platform that combines ancient Ayurvedic wisdom with Google's Gemini 2.0 Flash technology. Simply describe your symptoms, and our AI analyzes them against thousands of traditional remedies to provide personalized, natural healing solutions.",
    popular: true,
  },
  {
    id: 2,
    category: "safety",
    question: "Is AyurCure safe to use?",
    answer:
      "Yes, AyurCure provides traditional Ayurvedic remedies with comprehensive safety guidelines. However, always consult healthcare providers for serious conditions. Our platform includes emergency detection and will recommend immediate medical attention when necessary.",
    popular: true,
  },
  {
    id: 3,
    category: "remedies",
    question: "How accurate are the AI-generated remedies?",
    answer:
      "Our AI is trained on authentic Ayurvedic texts and practices from classical sources. While highly accurate for traditional remedies, they should complement, not replace, professional medical care. We maintain a 95% user satisfaction rate.",
    popular: true,
  },
  {
    id: 4,
    category: "safety",
    question: "Can I use these remedies alongside my medications?",
    answer:
      "Always consult your doctor before combining Ayurvedic remedies with prescription medications to avoid potential interactions. Our platform provides contraindication warnings, but professional medical advice is essential.",
    popular: false,
  },
  {
    id: 5,
    category: "remedies",
    question: "Are the ingredients easy to find?",
    answer:
      "Most ingredients are common household items or easily available at grocery stores and health food shops. We prioritize accessible remedies using ingredients like ginger, turmeric, honey, and common herbs.",
    popular: true,
  },
  {
    id: 6,
    category: "technical",
    question: "Why do I sometimes get fallback remedies?",
    answer:
      "When our AI service experiences high demand or temporary limitations, we provide traditional fallback remedies based on your symptoms. These are authentic Ayurvedic solutions while our full AI service recovers.",
    popular: false,
  },
  {
    id: 7,
    category: "general",
    question: "Is AyurCure free to use?",
    answer:
      "Yes, AyurCure is completely free to use. We believe natural healing knowledge should be accessible to everyone. Our mission is to democratize Ayurvedic wisdom through modern technology.",
    popular: true,
  },
  {
    id: 8,
    category: "safety",
    question: "What should I do in a medical emergency?",
    answer:
      "Never rely on natural remedies for medical emergencies. Call 911 immediately or visit your nearest emergency room. Our emergency page provides hospital maps and emergency contacts for immediate help.",
    popular: false,
  },
  {
    id: 9,
    category: "remedies",
    question: "How long do remedies take to work?",
    answer:
      "Ayurvedic remedies work gradually and naturally. Some provide immediate relief (like steam inhalation for congestion), while others may take days or weeks for full effect. Consistency is key for best results.",
    popular: false,
  },
  {
    id: 10,
    category: "technical",
    question: "Can I use AyurCure on mobile devices?",
    answer:
      "AyurCure is fully responsive and optimized for mobile devices. You can access all features, including the hospital map and remedy generation, from your smartphone or tablet.",
    popular: false,
  },
  {
    id: 11,
    category: "general",
    question: "What makes AyurCure different from other health apps?",
    answer:
      "AyurCure uniquely combines 5,000-year-old Ayurvedic wisdom with cutting-edge AI technology. We focus on natural, accessible remedies while maintaining safety through emergency detection and medical disclaimers.",
    popular: true,
  },
  {
    id: 12,
    category: "remedies",
    question: "Can children use these remedies?",
    answer:
      "Many Ayurvedic remedies are gentle and suitable for children, but always consult a pediatrician first. Our platform provides age-specific warnings and dosage adjustments when applicable.",
    popular: false,
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [openItems, setOpenItems] = useState<number[]>([])
  const { t } = useLanguage()

  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const popularFAQs = faqData.filter((faq) => faq.popular)

  const toggleItem = (id: number) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen py-8 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50/30 via-blue-50/30 to-purple-50/30 dark:from-green-950/30 dark:via-blue-950/30 dark:to-purple-950/30">
      <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 md:space-y-6 animate-fade-in">
          <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">{t("faqBadge")}</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            {t("faqTitle")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("faqSubtitle")}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="space-y-6 animate-slide-in-bottom">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t("searchAnswers")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className="hover-lift"
            >
              {t("allQuestions")}
            </Button>
            {faqCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="hover-lift"
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Popular Questions Carousel */}
        {searchTerm === "" && selectedCategory === "all" && (
          <section className="animate-fade-in">
            <h2 className="text-2xl font-bold text-center mb-8">{t("mostPopular")}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animation">
              {popularFAQs.slice(0, 6).map((faq, index) => (
                <Card
                  key={faq.id}
                  className="hover:shadow-lg transition-all duration-300 hover-lift cursor-pointer bg-white/80 dark:bg-gray-900/80 backdrop-blur"
                  onClick={() => toggleItem(faq.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Badge className={faqCategories.find((cat) => cat.id === faq.category)?.color}>
                        {faqCategories.find((cat) => cat.id === faq.category)?.icon}{" "}
                        {faqCategories.find((cat) => cat.id === faq.category)?.name}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {t("popular")}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">{faq.answer}</p>
                    <Button variant="ghost" size="sm" className="mt-3 p-0 h-auto text-blue-600 hover:text-blue-700">
                      Read more <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* FAQ List */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {searchTerm || selectedCategory !== "all" ? t("searchResults") : t("allQuestions")}
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredFAQs.length} {filteredFAQs.length !== 1 ? t("questionsFound") : t("questionFound")}
            </span>
          </div>

          <div className="space-y-4 stagger-animation">
            {filteredFAQs.map((faq, index) => (
              <Card
                key={faq.id}
                className="hover:shadow-md transition-all duration-300 hover-lift bg-white/80 dark:bg-gray-900/80 backdrop-blur"
              >
                <Collapsible open={openItems.includes(faq.id)} onOpenChange={() => toggleItem(faq.id)}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={faqCategories.find((cat) => cat.id === faq.category)?.color}>
                              {faqCategories.find((cat) => cat.id === faq.category)?.icon}{" "}
                              {faqCategories.find((cat) => cat.id === faq.category)?.name}
                            </Badge>
                            {faq.popular && (
                              <Badge variant="secondary" className="text-xs">
                                {t("popular")}
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-lg text-left">{faq.question}</CardTitle>
                        </div>
                        <div className="ml-4">
                          {openItems.includes(faq.id) ? (
                            <ChevronUp className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <HelpCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">{t("noQuestionsFound")}</h3>
              <p className="text-muted-foreground mb-6">{t("noQuestionsDesc")}</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                }}
              >
                {t("showAllQuestions")}
              </Button>
            </div>
          )}
        </section>

        {/* Contact CTA */}
        <section className="text-center py-12 animate-fade-in">
          <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white border-0">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold mb-4">{t("stillHaveQuestions")}</h3>
              <p className="text-lg mb-6 opacity-90">{t("stillHaveQuestionsDesc")}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="hover-lift">
                  <Link href="/contact">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    {t("contactSupport")}
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-600 hover-lift"
                >
                  <Link href="/emergency">
                    <Phone className="h-5 w-5 mr-2" />
                    {t("emergencyHelp")}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
