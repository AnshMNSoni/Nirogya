"use client"

import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"
import type { Language } from "@/lib/translations"

const languages = [
  { code: "en" as Language, name: "English", nativeName: "English" },
  { code: "hi" as Language, name: "Hindi", nativeName: "हिंदी" },
  { code: "sa" as Language, name: "Sanskrit", nativeName: "संस्कृतम्" },
]

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  const currentLanguage = languages.find((lang) => lang.code === language)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="touch-target">
          <Globe className="h-5 w-5 ml-3" />
          <span className="sr-only">Select language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center justify-between cursor-pointer ${language === lang.code ? "bg-muted" : ""}`}
          >
            <span className="flex items-center space-x-2">
              <span className="text-sm font-medium">{lang.name}</span>
              <span className="text-xs text-muted-foreground">({lang.nativeName})</span>
            </span>
            {language === lang.code && <span className="text-green-600 dark:text-green-400">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
