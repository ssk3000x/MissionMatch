"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { ElegantShape } from "@/components/ui/shape-landing-hero"


interface MissionStepProps {
  location: string
  onComplete: (mission: string, organizations?: any[]) => void
  onBack: () => void
}

export function MissionStep({ location, onComplete, onBack }: MissionStepProps) {
  const [mission, setMission] = useState("")
  const [clarifyMode, setClarifyMode] = useState(false)
  const [questions, setQuestions] = useState<string[]>([])
  const [answers, setAnswers] = useState<Record<number,string>>({})
  const [loadingQuestions, setLoadingQuestions] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!mission.trim()) return

    // Enter clarify mode and request follow-up questions
    setClarifyMode(true)
    setLoadingQuestions(true)
    try {
      const resp = await fetch('http://localhost:4000/api/agents/clarify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mission: mission.trim(), location }),
      })
      const body = await resp.json()
      if (body?.ok && Array.isArray(body.questions)) {
        setQuestions(body.questions)
      } else {
        setQuestions([])
      }
    } catch (err) {
      console.error('Clarify fetch failed', err)
      setQuestions([])
    } finally {
      setLoadingQuestions(false)
    }
  }

  const suggestions = [
    "Help with food banks and meal distribution",
    "Finding local shelters that can use help",
    "Libraries that are open to partnerships",
    "Environmental organizations needing tools"
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="relative flex min-h-screen flex-col px-4 py-8 overflow-hidden bg-[#030303]"
    >
      {/* Background gradient */}
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
          gradient="from-green-500/[0.10]"
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

      {/* Back button - top left */}
      <div className="absolute top-8 left-4 z-20">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-white/60 hover:text-white"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Main content - centered */}
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <div className="w-full max-w-2xl space-y-12">
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-center space-y-4"
              >
                <div className="flex items-center justify-center gap-4">
                  <h1 className="text-5xl font-bold tracking-tight text-white">
                    MissionMatch
                  </h1>
                  <MapPin className="h-12 w-12 text-white flex-shrink-0" />
                </div>
                <div className="h-[2px] w-40 mx-auto bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
              </motion.div>
              <h2 className="text-2xl font-semibold tracking-tight leading-tight px-4 text-white mt-8">
your community project or organization and what you need to find!
              </h2>
              <p className="text-white/60 text-balance">
                Searching in <span className="text-white font-medium">{location}</span>
              </p>
            </div>
            </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                className="min-h-28 md:min-h-32 bg-background border-none text-lg placeholder:text-muted-foreground/60 resize-none focus-visible:ring-0"
              />
            </div>
          </div>

          {!clarifyMode && (
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

              <Button
                type="submit"
                className="w-full h-14 text-lg font-medium"
                disabled={!mission.trim()}
              >
                Continue
              </Button>
            </div>
          )}

          {/* Clarification UI */}
          {clarifyMode && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">A few quick questions</h4>
              {loadingQuestions ? (
                <p className="text-sm text-muted-foreground">Generating questions…</p>
              ) : (
                <div className="space-y-2">
                  {questions.map((q, i) => (
                    <div key={i} className="space-y-1">
                      <label className="text-sm text-muted-foreground">{q}</label>
                      <input
                        type="text"
                        value={answers[i] || ''}
                        onChange={(e) => setAnswers((prev) => ({ ...prev, [i]: e.target.value }))}
                        className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2">
            {clarifyMode ? (
              <>
                <Button
                  type="button"
                  className="flex-1 h-14 text-lg font-medium"
                  onClick={async () => {
                    // Show discovery/loading screen immediately
                    onComplete(mission.trim())

                    // Then run the server-side search in background and update when ready
                    const operationData = {
                      location: location,
                      mission: mission.trim(),
                      timestamp: new Date().toISOString(),
                      clarifications: Object.values(answers).filter(Boolean),
                    }
                    try {
                      const response = await fetch('http://localhost:4000/api/agents/refine', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(operationData),
                      })
                      if (response.ok) {
                        const result = await response.json()
                        const organizations = (result.searchResults || []).map((org: any, index: number) => ({
                          id: String(index + 1),
                          name: org.title,
                          description: org.description || 'No description available',
                          address: org.address || 'Address not available',
                          categories: ['Volunteer Opportunity'],
                          status: 'ready' as const,
                          phone: org.phone,
                          url: org.url,
                        }))
                        if (organizations.length > 0) {
                          // update parent with organizations to show results immediately
                          onComplete(mission.trim(), organizations)
                          return
                        }
                      }
                    } catch (err) {
                      console.error('Find organizations failed', err)
                    }
                  }}
                >
                  Find Organizations
                </Button>

                <Button type="button" variant="ghost" onClick={() => setClarifyMode(false)} className="h-14">
                  Edit
                </Button>
              </>
            ) : (
              <></>
            )}
          </div>
        </form>
        </div>
      </div>
    </motion.div>
  )
}
