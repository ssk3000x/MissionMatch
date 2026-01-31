"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlowingEffect } from "@/components/ui/glowing-effect"


interface LocationStepProps {
  onComplete: (location: string) => void
}

export function LocationStep({ onComplete }: LocationStepProps) {
  const [location, setLocation] = useState("")
  const [isDetecting, setIsDetecting] = useState(false)

  const handleDetectLocation = () => {
    setIsDetecting(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
            )
            const data = await response.json()
            const city = data.address?.city || data.address?.town || data.address?.village || ""
            const state = data.address?.state || ""
            setLocation(city && state ? `${city}, ${state}` : data.display_name?.split(",").slice(0, 2).join(",") || "")
          } catch {
            setLocation("")
          }
          setIsDetecting(false)
        },
        () => {
          setIsDetecting(false)
        }
      )
    } else {
      setIsDetecting(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (location.trim()) {
      onComplete(location.trim())
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex min-h-screen flex-col items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-lg space-y-8">
        {/* App Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
              VolunteerConnect
            </h1>
            <MapPin className="h-14 w-14 text-primary flex-shrink-0" />
          </div>
          <div className="h-[2px] w-40 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        </motion.div>

        <div className="text-center space-y-2">
          <p className="text-lg text-muted-foreground">
            We&apos;ll help transform your vision into an impactful reality.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          <div className="relative rounded-xl border border-border p-1 bg-card">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={3}
            />
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter the city, zipcode, state, etc. of your volunteer work"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-14 bg-background border-none pl-4 pr-4 text-lg placeholder:text-muted-foreground/60 focus-visible:ring-0"
              />
            </div>
          </div>


          <Button
            type="button"
            variant="outline"
            className="w-full h-12 bg-transparent"
            onClick={handleDetectLocation}
            disabled={isDetecting}
          >
            {isDetecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Detecting location...
              </>
            ) : (
              <>
                <MapPin className="mr-2 h-4 w-4" />
                Use my current location
              </>
            )}
          </Button>

          <Button
            type="submit"
            className="w-full h-14 text-lg font-medium"
            disabled={!location.trim()}
          >
            Continue
          </Button>
        </form>
      </div>
    </motion.div>
  )
}
