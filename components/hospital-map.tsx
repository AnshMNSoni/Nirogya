"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, Navigation, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"

interface Hospital {
  id: string
  name: string
  lat: number
  lon: number
  address: string
  phone?: string
  website?: string
  distance?: number
  amenity: string
}

export function HospitalMap() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null)
  const [searchLocation, setSearchLocation] = useState("")
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const { toast } = useToast()
  const { t } = useLanguage()

  // Load Leaflet dynamically
  useEffect(() => {
    const loadLeaflet = async () => {
      if (typeof window !== "undefined") {
        const L = await import("leaflet")

        // Fix for default markers
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        })

        return L
      }
    }

    loadLeaflet()
  }, [])

  const getCurrentLocation = () => {
    setLoading(true)
    setError("")

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser")
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }
        setUserLocation(location)
        searchNearbyHospitals(location)
        toast({
          title: t("locationFound"),
          description: t("searchingHospitals"),
        })
      },
      (error) => {
        setError("Unable to retrieve your location. Please enter your address manually.")
        setLoading(false)
        toast({
          title: t("locationError"),
          description: t("enterAddressManually"),
          variant: "destructive",
        })
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    )
  }

  const searchLocationByAddress = async () => {
    if (!searchLocation.trim()) {
      toast({
        title: "Please enter an address",
        description: "Enter your city, address, or postal code to find nearby hospitals.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchLocation)}&limit=1`,
      )
      const data = await response.json()

      if (data.length === 0) {
        setError("Location not found. Please try a different address.")
        setLoading(false)
        return
      }

      const location = {
        lat: Number.parseFloat(data[0].lat),
        lon: Number.parseFloat(data[0].lon),
      }

      setUserLocation(location)
      searchNearbyHospitals(location)
      toast({
        title: t("locationFound"),
        description: t("searchingHospitals"),
      })
    } catch (err) {
      setError("Failed to search location. Please try again.")
      setLoading(false)
      toast({
        title: t("searchError"),
        description: t("searchErrorDesc"),
        variant: "destructive",
      })
    }
  }

  const searchNearbyHospitals = async (location: { lat: number; lon: number }) => {
    try {
      // Search for hospitals within 10km radius
      const overpassQuery = `
        [out:json][timeout:25];
        (
          node["amenity"="hospital"](around:10000,${location.lat},${location.lon});
          node["amenity"="clinic"](around:10000,${location.lat},${location.lon});
          node["healthcare"="hospital"](around:10000,${location.lat},${location.lon});
        );
        out body;
      `

      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: overpassQuery,
      })

      const data = await response.json()

      const hospitalData: Hospital[] = data.elements
        .filter((element: any) => element.tags && element.tags.name)
        .map((element: any) => {
          const distance = calculateDistance(location.lat, location.lon, element.lat, element.lon)
          return {
            id: element.id.toString(),
            name: element.tags.name,
            lat: element.lat,
            lon: element.lon,
            address: element.tags["addr:full"] || element.tags["addr:street"] || "Address not available",
            phone: element.tags.phone,
            website: element.tags.website,
            distance: Math.round(distance * 100) / 100,
            amenity: element.tags.amenity || element.tags.healthcare || "hospital",
          }
        })
        .sort((a: Hospital, b: Hospital) => (a.distance || 0) - (b.distance || 0))
        .slice(0, 10) // Limit to 10 closest hospitals

      setHospitals(hospitalData)
      initializeMap(location, hospitalData)
      setLoading(false)

      toast({
        title: t("hospitalsFound"),
        description: `${t("hospitalsFoundDesc").replace("{count}", hospitalData.length.toString())}`,
      })
    } catch (err) {
      setError("Failed to search for hospitals. Please try again.")
      setLoading(false)
      toast({
        title: t("searchError"),
        description: t("searchErrorHospitals"),
        variant: "destructive",
      })
    }
  }

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLon = (lon2 - lon1) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const initializeMap = async (userLoc: { lat: number; lon: number }, hospitalData: Hospital[]) => {
    if (typeof window === "undefined" || !mapRef.current) return

    try {
      const L = await import("leaflet")

      // Clear existing map
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
      }

      // Create new map
      const map = L.map(mapRef.current).setView([userLoc.lat, userLoc.lon], 12)

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      // Add user location marker
      const userIcon = L.divIcon({
        html: `<div style="background-color: #3b82f6; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        className: "custom-div-icon",
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      })

      L.marker([userLoc.lat, userLoc.lon], { icon: userIcon }).addTo(map).bindPopup("<b>Your Location</b>").openPopup()

      // Add hospital markers
      hospitalData.forEach((hospital) => {
        const hospitalIcon = L.divIcon({
          html: `<div style="background-color: #dc2626; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
          className: "custom-div-icon",
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        })

        const popupContent = `
          <div style="min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-weight: bold;">${hospital.name}</h3>
            <p style="margin: 4px 0; font-size: 12px;"><strong>${t("distance")}:</strong> ${hospital.distance} km</p>
            <p style="margin: 4px 0; font-size: 12px;"><strong>${t("address")}:</strong> ${hospital.address}</p>
            ${hospital.phone ? `<p style="margin: 4px 0; font-size: 12px;"><strong>${t("phone")}:</strong> <a href="tel:${hospital.phone}">${hospital.phone}</a></p>` : ""}
            <div style="margin-top: 8px;">
              <a href="https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lon}" target="_blank" style="background-color: #3b82f6; color: white; padding: 4px 8px; text-decoration: none; border-radius: 4px; font-size: 12px;">${t("directions")}</a>
            </div>
          </div>
        `

        L.marker([hospital.lat, hospital.lon], { icon: hospitalIcon }).addTo(map).bindPopup(popupContent)
      })

      mapInstanceRef.current = map
    } catch (error) {
      console.error("Error initializing map:", error)
      setError("Failed to load map. Please refresh the page.")
    }
  }

  return (
    <div className="space-y-6">
      {/* Location Search */}
      <Card className="hover-lift">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center text-base sm:text-lg">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-600" />
            {t("findNearbyHospitals")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
            <Input
              type="text"
              placeholder={t("findNearbyDesc")}
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="flex-1 text-sm sm:text-base touch-target"
              onKeyPress={(e) => e.key === "Enter" && searchLocationByAddress()}
            />
            <Button onClick={searchLocationByAddress} disabled={loading} className="touch-target">
              <MapPin className="h-4 w-4 mr-2" />
              {t("search")}
            </Button>
          </div>

          <div className="text-center">
            <span className="text-xs sm:text-sm text-muted-foreground">or</span>
          </div>

          <Button onClick={getCurrentLocation} disabled={loading} variant="outline" className="w-full touch-target">
            <Navigation className="h-4 w-4 mr-2" />
            {loading ? t("gettingLocation") : t("useCurrentLocation")}
          </Button>

          {error && (
            <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
              <AlertDescription className="text-red-800 dark:text-red-200 text-xs sm:text-sm">{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Map */}
      <Card className="hover-lift">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-base sm:text-lg">{t("interactiveMap")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div ref={mapRef} className="w-full h-64 sm:h-80 md:h-96 rounded-lg border" style={{ minHeight: "300px" }}>
            {!userLocation && (
              <div className="flex items-center justify-center h-full bg-muted rounded-lg">
                <div className="text-center p-4">
                  <MapPin className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground text-sm sm:text-base">{t("mapPlaceholder")}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Hospital List */}
      {hospitals.length > 0 && (
        <Card className="hover-lift">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">
              {t("nearbyFacilities")} ({hospitals.length} {t("facilitiesFound")})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {hospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  className="border rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow card-mobile"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                    <div className="flex-1">
                      <h3 className="font-semibold text-base sm:text-lg mb-2">{hospital.name}</h3>
                      <div className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                          <span>
                            {hospital.distance} {t("kmAway")}
                          </span>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2 mt-0.5" />
                          <span>{hospital.address}</span>
                        </div>
                        {hospital.phone && (
                          <div className="flex items-center">
                            <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                            <a href={`tel:${hospital.phone}`} className="text-blue-600 hover:underline">
                              {hospital.phone}
                            </a>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Badge variant="secondary" className="text-xs">
                          {hospital.amenity === "hospital" ? t("hospital") : t("clinic")}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {hospital.distance} km
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-row sm:flex-col gap-2">
                      <Button asChild size="sm" variant="outline" className="flex-1 sm:flex-none touch-target">
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lon}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Navigation className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">{t("directions")}</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Load Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />
    </div>
  )
}
