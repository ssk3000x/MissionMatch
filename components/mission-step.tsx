"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { GlowingEffect } from "@/components/ui/glowing-effect"


interface MissionStepProps {
  location: string
  onComplete: (mission: string) => void
  onBack: () => void
}

export function MissionStep({ location, onComplete, onBack }: MissionStepProps) {
  const [mission, setMission] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (mission.trim()) {
      // Trigger navigation immediately
      onComplete(mission.trim())

      // Aggregate user input data
      const operationData = {
        location: location,
        mission: mission.trim(),
        timestamp: new Date().toISOString()
      }
      
      // Print to console
      console.log("=== Operation Parameters ===")
      console.log("Location:", operationData.location)
      console.log("Mission:", operationData.mission)
      console.log("Timestamp:", operationData.timestamp)
      console.log("Full Data:", operationData)
      
      // Send to Node.js server
      try {
        const response = await fetch('http://localhost:4000/api/agents/refine', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(operationData)
        })
        
        if (response.ok) {
          const result = await response.json()
          console.log("Server response:", result)
        } else {
          console.error("Server error:", response.status)
        }
      } catch (error) {
        console.error("Failed to send data to server:", error)
      }
    }
  }

  const suggestions = [
    "Help with food banks and meal distribution",
    "Work with animals at local shelters",
    "Tutor or mentor students",
    "Environmental cleanup and conservation",
    "Support elderly care facilities",
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex min-h-screen flex-col items-center justify-center px-4"
    >
      <div className="w-full max-w-lg space-y-8">
        <div className="space-y-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Button>

          <div className="text-center space-y-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10"
            >
              <Heart className="h-8 w-8 text-secondary" />
            </motion.div>
            <h1 className="text-3xl font-semibold tracking-tight text-balance">
              Describe your volunteering project!
            </h1>
            <p className="text-muted-foreground text-balance">
              Searching in <span className="text-foreground font-medium">{location}</span>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative rounded-xl border border-border p-1 bg-card shadow-sm">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={3}
            />
            <div className="relative">
              <Textarea
                placeholder="Describe what you'd like to help with..."
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                className="min-h-32 bg-background border-none text-lg placeholder:text-muted-foreground/60 resize-none focus-visible:ring-0"
              />
            </div>
          </div>


          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Quick suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setMission(suggestion)}
                  className="rounded-full bg-muted px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-14 text-lg font-medium"
            disabled={!mission.trim()}
          >
            Find Organizations
          </Button>
        </form>
      </div>
    </motion.div>
  )
}
