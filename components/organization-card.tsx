"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, PhoneOff, Building2, MapPin, Clock, CheckCircle2, Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GlowingEffect } from "@/components/ui/glowing-effect"

export interface Organization {
  id: string
  name: string
  description: string
  address: string
  categories: string[]
  status: "ready" | "calling" | "completed" | "scheduled"
  scheduledTime?: string
  phone?: string
  url?: string
  callNotes?: {
    summary: string
    contactName?: string
    nextSteps?: string[]
    availability?: string
  }
}

interface OrganizationCardProps {
  organization: Organization
  onCall: (id: string, scheduled?: string) => void
  onViewNotes: (id: string) => void
}

export function OrganizationCard({ organization, onCall, onViewNotes }: OrganizationCardProps) {
  const [callProgress, setCallProgress] = useState(0)
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")

  // Format phone number: remove +1 prefix and any non-digits
  const formatPhoneNumber = (phone: string | undefined) => {
    if (!phone) return ""
    return phone.replace(/^\+1/, "").replace(/\D/g, "")
  }

  const handleCallNow = () => {
    setShowScheduleDialog(false)
    onCall(organization.id)
    const interval = setInterval(() => {
      setCallProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  const handleSchedule = () => {
    if (scheduleDate && scheduleTime) {
      const scheduledDateTime = `${scheduleDate} at ${scheduleTime}`
      onCall(organization.id, scheduledDateTime)
      setShowScheduleDialog(false)
    }
  }

  const handleCancelSchedule = () => {
    setShowCancelDialog(true)
  }

  const confirmCancelSchedule = () => {
    // Revert to ready status by calling with undefined scheduled time
    onCall(organization.id, undefined)
    setShowCancelDialog(false)
  }

  return (
    <>
      <Card className="bg-card border-border h-full flex flex-col relative group">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex flex-col h-full overflow-hidden rounded-[inherit] z-10">
          <CardHeader className="pb-3">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold leading-tight line-clamp-2">{organization.name}</h3>
              </div>
            </div>
            
            {/* Contact Information Section */}
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{organization.address}</span>
              </div>
              {organization.phone && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  <span className="font-mono">{formatPhoneNumber(organization.phone)}</span>
                </div>
              )}
              {organization.url && (
                <div className="flex items-center gap-2 text-sm">
                  <a
                    href={organization.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline truncate"
                  >
                    Visit Website →
                  </a>
                </div>
              )}
            </div>

            {(organization.status === "completed" || organization.status === "scheduled") && (
              <div className="mt-3">
                {organization.status === "completed" && (
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Called
                  </Badge>
                )}
                {organization.status === "scheduled" && (
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    <Calendar className="mr-1 h-3 w-3" />
                    Scheduled
                  </Badge>
                )}
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-4 flex-1 flex flex-col">
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {organization.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {organization.categories.slice(0, 3).map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="bg-muted/50 text-muted-foreground border-border text-xs"
                >
                  {category}
                </Badge>
              ))}
              {organization.categories.length > 3 && (
                <Badge
                  variant="outline"
                  className="bg-muted/50 text-muted-foreground border-border text-xs"
                >
                  +{organization.categories.length - 3}
                </Badge>
              )}
            </div>

            {organization.status === "calling" && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Phone className="h-4 w-4 animate-pulse" />
                  AI Agent is calling...
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${callProgress}%` }}
                  />
                </div>
              </div>
            )}

            {organization.status === "scheduled" && organization.scheduledTime && (
              <div className="rounded-lg bg-primary/5 border border-primary/10 p-3">
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Calendar className="h-4 w-4" />
                  <span>Scheduled for {organization.scheduledTime}</span>
                </div>
              </div>
            )}

            {organization.status === "completed" && organization.callNotes && (
              <div className="rounded-lg bg-muted/50 p-3 space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-secondary">
                  <CheckCircle2 className="h-4 w-4" />
                  Call completed
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {organization.callNotes.summary}
                </p>
                {organization.callNotes.availability && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {organization.callNotes.availability}
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-2 pt-1 mt-auto">
              {organization.status === "ready" && (
                <Button
                  onClick={() => setShowScheduleDialog(true)}
                  className="flex-1"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Deploy Voice Agent & Call
                </Button>
              )}
              {organization.status === "calling" && (
                <Button variant="outline" className="flex-1 bg-transparent" disabled>
                  <PhoneOff className="mr-2 h-4 w-4" />
                  In Progress...
                </Button>
              )}
              {organization.status === "scheduled" && (
                <Button
                  variant="outline"
                  className="flex-1 bg-muted/50 text-muted-foreground border-border hover:bg-muted"
                  onClick={handleCancelSchedule}
                >
                  <X className="mr-2 h-4 w-4" />
                  Scheduled Call - Click to Cancel
                </Button>
              )}
              {organization.status === "completed" && (
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => onViewNotes(organization.id)}
                >
                  View Notes
                </Button>
              )}
            </div>
          </CardContent>

        </div>
      </Card>



      {/* Cancel Confirmation Dialog */}
      <AnimatePresence>
        {
          showCancelDialog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
              onClick={() => setShowCancelDialog(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl"
              >
                <div className="mb-4">
                  <h2 className="text-lg font-semibold">Cancel Scheduled Call?</h2>
                  <p className="text-sm text-muted-foreground mt-2">
                    Are you sure you want to cancel the scheduled call to {organization.name}?
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowCancelDialog(false)}
                    className="flex-1 bg-transparent"
                  >
                    No, Keep It
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={confirmCancelSchedule}
                    className="flex-1"
                  >
                    Yes, Cancel
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )
        }
      </AnimatePresence>

      {/* Schedule Dialog */}
      <AnimatePresence>
        {
          showScheduleDialog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
              onClick={() => setShowScheduleDialog(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">Deploy AI Agent</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Call {organization.name}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 -mr-2 -mt-2"
                    onClick={() => setShowScheduleDialog(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={handleCallNow}
                    className="w-full justify-start h-auto py-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">
                          Call {organization.phone || "Now"}
                        </div>
                        <div className="text-sm opacity-80">AI agent will call immediately</div>
                      </div>
                    </div>
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">or schedule</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="date" className="text-sm">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={scheduleDate}
                          onChange={(e) => setScheduleDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time" className="text-sm">Time</Label>
                        <Input
                          id="time"
                          type="time"
                          value={scheduleTime}
                          onChange={(e) => setScheduleTime(e.target.value)}
                          className="bg-background"
                        />
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleSchedule}
                      disabled={!scheduleDate || !scheduleTime}
                      className="w-full bg-transparent"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Call
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )
        }
      </AnimatePresence >
    </>
  )
}
