"use client"

import React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search, Globe, Building2, CheckCircle2 } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"


interface DiscoveryScreenProps {
  location: string
  mission: string
  onComplete: () => void
}

interface DiscoveryStep {
  id: string
  label: string
  icon: React.ReactNode
  duration: number
}

const discoverySteps: DiscoveryStep[] = [
  {
    id: "search",
    label: "Searching local databases",
    icon: <Search className="h-5 w-5" />,
    duration: 2000,
  },
  {
    id: "web",
    label: "Scanning community websites",
    icon: <Globe className="h-5 w-5" />,
    duration: 2500,
  },
  {
    id: "orgs",
    label: "Finding matching organizations",
    icon: <Building2 className="h-5 w-5" />,
    duration: 2000,
  },
]

export function DiscoveryScreen({ location, mission, onComplete }: DiscoveryScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const runDiscovery = async () => {
      for (let i = 0; i < discoverySteps.length; i++) {
        setCurrentStep(i)
        const step = discoverySteps[i]
        const startProgress = (i / discoverySteps.length) * 100
        const endProgress = ((i + 1) / discoverySteps.length) * 100
        const progressInterval = 50
        const progressIncrement = (endProgress - startProgress) / (step.duration / progressInterval)

        await new Promise<void>((resolve) => {
          let currentProgress = startProgress
          const interval = setInterval(() => {
            currentProgress += progressIncrement
            if (currentProgress >= endProgress) {
              currentProgress = endProgress
              clearInterval(interval)
              setCompletedSteps((prev) => [...prev, step.id])
              resolve()
            }
            setProgress(currentProgress)
          }, progressInterval)
        })

        await new Promise((resolve) => setTimeout(resolve, 300))
      }

      setTimeout(onComplete, 500)
    }

    runDiscovery()
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen flex-col items-center justify-center px-4"
    >
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Finding opportunities for you
          </h1>
          <p className="text-muted-foreground text-sm">
            Searching in {location}
          </p>
        </div>

        <div className="space-y-6">
          {/* Overall progress bar */}
          <div className="space-y-2">
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              {Math.round(progress)}% complete
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {discoverySteps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id)
              const isActive = currentStep === index && !isCompleted

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-4 rounded-xl border p-4 transition-colors relative ${isActive
                    ? "border-primary bg-primary/5"
                    : isCompleted
                      ? "border-secondary/30 bg-secondary/5"
                      : "border-border bg-card"
                    }`}
                >
                  {isActive && (
                    <GlowingEffect
                      spread={40}
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                      borderWidth={2}
                    />
                  )}
                  <div className="relative flex items-center gap-4 w-full">

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${isActive
                        ? "bg-primary text-primary-foreground"
                        : isCompleted
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-muted text-muted-foreground"
                        }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        step.icon
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-medium ${isActive || isCompleted
                          ? "text-foreground"
                          : "text-muted-foreground"
                          }`}
                      >
                        {step.label}
                      </p>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-2 h-1 overflow-hidden rounded-full bg-muted"
                        >
                          <motion.div
                            className="h-full bg-primary"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{
                              duration: step.duration / 1000,
                              ease: "linear",
                            }}
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>


              )
            })}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground"
        >
          Looking for: &quot;{mission.length > 50 ? mission.slice(0, 50) + "..." : mission}&quot;
        </motion.p>
      </div>
    </motion.div>
  )
}
