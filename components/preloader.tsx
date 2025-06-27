"use client"

import { useEffect, useState } from "react"
import { Leaf } from "lucide-react"

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-950 dark:via-blue-950 dark:to-purple-950">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-ping">
            <Leaf className="h-16 w-16 mx-auto text-green-400 opacity-75" />
          </div>
          <div className="relative animate-pulse">
            <Leaf className="h-16 w-16 mx-auto text-green-600 dark:text-green-400" />
          </div>
        </div>

        {/* Brand Name with Animation */}
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
          Nirogya
        </h1>

        {/* Loading Text */}
        <p className="text-lg text-muted-foreground mb-8 animate-fade-in-delay">
          Preparing your natural healing journey...
        </p>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}%</p>
        </div>

        {/* Floating Herbs Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute animate-float-${i + 1} opacity-20`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              <Leaf className="h-6 w-6 text-green-500 transform rotate-12" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
