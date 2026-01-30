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
      className="flex min-h-screen flex-col items-center justify-center px-4"
    >
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
          >
            <MapPin className="h-8 w-8 text-primary" />
          </motion.div>
          <h1 className="text-3xl font-semibold tracking-tight text-balance">
            Where are you located?
          </h1>
          <p className="text-muted-foreground text-balance">
            We&apos;ll find volunteer opportunities near you
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Enter your city or zip code"
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
