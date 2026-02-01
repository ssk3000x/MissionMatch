"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { ElegantShape } from "@/components/ui/shape-landing-hero"


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
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      exit={{ y: -20 }}
      className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 overflow-hidden bg-[#030303]"
    >
      {/* Background gradient (green + blue highlights) */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.12] via-blue-500/[0.12] to-blue-300/[0.10] blur-4xl" />

      {/* Animated geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-blue-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-green-500/[0.12]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-blue-400/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-white/[0.10]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-blue-300/[0.15]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg space-y-6">
        {/* App Title */}
        <motion.div
          initial={{ y: -30 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-center space-y-4 -mt-8"
        >
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-6xl font-bold tracking-tight text-white">
              MissionMatch
            </h1>
            <MapPin className="h-14 w-14 text-white flex-shrink-0" />
          </div>
          <div className="h-[2px] w-40 mx-auto bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
        </motion.div>

        <div className="text-center space-y-2">
          <p className="text-lg text-white/60">
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
