"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Sparkles, Heart, Shield, Users, Brain, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Remedies",
    description: "Get personalized Ayurvedic solutions powered by Google's advanced Gemini 2.0 Flash AI technology",
    color: "from-blue-500 to-purple-500",
    bgColor: "from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950",
  },
  {
    icon: Heart,
    title: "Natural Healing",
    description: "Traditional remedies using natural ingredients and time-tested methods from ancient Ayurvedic texts",
    color: "from-red-500 to-pink-500",
    bgColor: "from-red-50 to-pink-50 dark:from-red-950 dark:to-pink-950",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Comprehensive safety guidelines and emergency medical support when natural remedies aren't enough",
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950",
  },
  {
    icon: Users,
    title: "Expert Knowledge",
    description: "Based on thousands of years of Ayurvedic wisdom combined with modern AI insights and research",
    color: "from-orange-500 to-yellow-500",
    bgColor: "from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950",
  },
  {
    icon: Brain,
    title: "Personalized Solutions",
    description: "AI analyzes your symptoms, age, and constitution to provide customized remedies just for you",
    color: "from-purple-500 to-indigo-500",
    bgColor: "from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950",
  },
  {
    icon: Leaf,
    title: "Holistic Approach",
    description: "Treats the whole person - body, mind, and spirit - addressing root causes, not just symptoms",
    color: "from-green-500 to-teal-500",
    bgColor: "from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950",
  },
]

export function FeatureCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length)
    setIsAutoPlaying(false)
  }

  const currentFeature = features[currentIndex]

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Main Feature Display */}
      <div
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${currentFeature.bgColor} p-8 transition-all duration-700 ease-in-out`}
      >
        <div className="relative z-10">
          <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur">
            <CardHeader className="text-center pb-4">
              <div
                className={`mx-auto w-20 h-20 bg-gradient-to-br ${currentFeature.color} rounded-2xl flex items-center justify-center mb-6 transform transition-transform duration-500 hover:scale-110`}
              >
                <currentFeature.icon className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                {currentFeature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                {currentFeature.description}
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 animate-float-1">
            <Leaf className="h-8 w-8 text-current" />
          </div>
          <div className="absolute top-20 right-20 animate-float-2">
            <Heart className="h-6 w-6 text-current" />
          </div>
          <div className="absolute bottom-20 left-20 animate-float-3">
            <Sparkles className="h-7 w-7 text-current" />
          </div>
          <div className="absolute bottom-10 right-10 animate-float-4">
            <Shield className="h-5 w-5 text-current" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <Button
          variant="outline"
          size="icon"
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur hover:bg-white dark:hover:bg-gray-900 shadow-lg"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Feature Indicators */}
        <div className="flex space-x-0 sm:space-x-1.5 md:space-x-2 lg:space-x-3">
          {features.map((feature, index) => (
            <button
              key={index}
              className={`group relative p-3 rounded-xl transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white dark:bg-gray-800 shadow-lg scale-110"
                  : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlaying(false)
              }}
            >
              <feature.icon
                className={`h-5 w-5 transition-colors duration-300 ${
                  index === currentIndex
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                }`}
              />

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                {feature.title}
              </div>
            </button>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur hover:bg-white dark:hover:bg-gray-900 shadow-lg"
          onClick={goToNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${currentFeature.color} transition-all duration-300 ease-out`}
            style={{ width: `${((currentIndex + 1) / features.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
          <span>
            {currentIndex + 1} of {features.length}
          </span>
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="hover:text-gray-700 dark:hover:text-gray-200"
          >
            {isAutoPlaying ? "⏸️ Pause" : "▶️ Play"}
          </button>
        </div>
      </div>
    </div>
  )
}