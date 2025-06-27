"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, India",
    text: "The steam inhalation remedy for my cold worked amazingly! Much better than taking medicines. The AI recommendations were spot-on.",
    rating: 5,
    avatar: "PS",
    condition: "Cold & Congestion",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Delhi, India",
    text: "I love how the AI gives personalized remedies based on my specific symptoms. The ginger-mint tea recipe helped my digestion issues completely.",
    rating: 5,
    avatar: "RK",
    condition: "Digestive Issues",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    location: "California, USA",
    text: "As someone interested in natural healing, this website is a treasure trove of authentic Ayurvedic knowledge. The remedies actually work!",
    rating: 5,
    avatar: "SJ",
    condition: "Stress & Anxiety",
  },
  {
    id: 4,
    name: "Dr. Amit Patel",
    location: "Gujarat, India",
    text: "Even as a medical professional, I'm impressed by the accuracy of these traditional remedies. Great resource for complementary healing.",
    rating: 5,
    avatar: "AP",
    condition: "Professional Review",
  },
  {
    id: 5,
    name: "Maria Rodriguez",
    location: "Madrid, Spain",
    text: "The headache remedy with peppermint oil massage was incredible. I've been using it for weeks now and it's become my go-to solution.",
    rating: 5,
    avatar: "MR",
    condition: "Headaches",
  },
  {
    id: 6,
    name: "Chen Wei",
    location: "Singapore",
    text: "The emergency section helped me find the nearest hospital when I needed it most. The map feature is brilliant and potentially life-saving.",
    rating: 5,
    avatar: "CW",
    condition: "Emergency Support",
  },
]

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0">
              <Card className="mx-2 sm:mx-4 border-0 shadow-lg bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-green-950">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                        {testimonial.avatar}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center sm:text-left">
                      {/* Quote Icon */}
                      <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 mb-3 sm:mb-4 opacity-50 mx-auto sm:mx-0" />

                      {/* Rating */}
                      <div className="flex items-center justify-center sm:justify-start space-x-1 mb-3 sm:mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <blockquote className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                        "{testimonial.text}"
                      </blockquote>

                      {/* Author Info */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                            {testimonial.name}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            {testimonial.location}
                          </div>
                        </div>
                        <div className="text-center sm:text-right">
                          <div className="text-xs sm:text-sm font-medium text-green-600 dark:text-green-400">
                            {testimonial.condition}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 backdrop-blur hover:bg-white dark:hover:bg-gray-900 shadow-lg touch-target w-10 h-10 sm:w-12 sm:h-12"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 backdrop-blur hover:bg-white dark:hover:bg-gray-900 shadow-lg touch-target w-10 h-10 sm:w-12 sm:h-12"
        onClick={goToNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-4 sm:mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 touch-target ${
              index === currentIndex ? "bg-green-500 scale-125" : "bg-gray-300 dark:bg-gray-600 hover:bg-green-300"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="text-center mt-3 sm:mt-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 touch-target px-2 py-1"
        >
          {isAutoPlaying ? "⏸️ Pause" : "▶️ Play"} Auto-scroll
        </button>
      </div>
    </div>
  )
}
