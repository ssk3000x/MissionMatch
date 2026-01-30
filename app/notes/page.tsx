"use client"

import React from "react"

import { useSearchParams, useRouter } from "next/navigation"
import { Suspense } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Building2, CheckCircle2, Clock, XCircle, Calendar, Phone, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type OrgStatus = "interested" | "not_available" | "callback" | "pending"

interface OrgNote {
  id: string
  orgName: string
  status: OrgStatus
  contactName?: string
  availability?: string
  notes?: string
  callbackDate?: string
  calledAt: string
}

const mockNotes: OrgNote[] = [
  {
    id: "1",
    orgName: "Community Food Bank",
    status: "interested",
    contactName: "Sarah Johnson",
    availability: "Weekdays 9am-5pm, Saturdays 8am-2pm",
    notes: "Needs help with food sorting and distribution. Orientation every Saturday at 8:30am.",
    calledAt: "Today at 2:34 PM",
  },
  {
    id: "2",
    orgName: "Animal Rescue Center",
    status: "interested",
    contactName: "Mike Chen",
    availability: "Daily 7am-7pm",
    notes: "Looking for dog walkers and cat socializers. 4+ hours/week commitment preferred.",
    calledAt: "Today at 2:38 PM",
  },
  {
    id: "3",
    orgName: "Youth Tutoring Alliance",
    status: "callback",
    contactName: "Dr. Amanda Peters",
    callbackDate: "Tomorrow at 10:00 AM",
    notes: "Program director was in a meeting. Requested callback to discuss tutor positions.",
    calledAt: "Today at 2:42 PM",
  },
  {
    id: "4",
    orgName: "Senior Care Center",
    status: "not_available",
    notes: "Currently at full volunteer capacity. Suggested checking back in 3 months.",
    calledAt: "Today at 2:45 PM",
  },
  {
    id: "5",
    orgName: "Environmental Cleanup Crew",
    status: "interested",
    contactName: "Jake Williams",
    availability: "Weekends only",
    notes: "Monthly beach cleanups. Next event: Feb 15th. No experience needed.",
    calledAt: "Today at 2:48 PM",
  },
  {
    id: "6",
    orgName: "Habitat for Humanity",
    status: "pending",
    notes: "Voicemail left. Waiting for callback.",
    calledAt: "Today at 2:51 PM",
  },
]

const statusConfig: Record<OrgStatus, { label: string; color: string; icon: React.ReactNode }> = {
  interested: {
    label: "Interested",
    color: "bg-secondary/10 text-secondary border-secondary/20",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
  not_available: {
    label: "Not Available",
    color: "bg-muted text-muted-foreground border-border",
    icon: <XCircle className="h-3.5 w-3.5" />,
  },
  callback: {
    label: "Callback Scheduled",
    color: "bg-primary/10 text-primary border-primary/20",
    icon: <Calendar className="h-3.5 w-3.5" />,
  },
  pending: {
    label: "Pending Response",
    color: "bg-muted text-muted-foreground border-border",
    icon: <Clock className="h-3.5 w-3.5" />,
  },
}

function NotesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const filterStatus = searchParams.get("status") as OrgStatus | null

  const filteredNotes = filterStatus 
    ? mockNotes.filter((n) => n.status === filterStatus)
    : mockNotes

  const interestedCount = mockNotes.filter((n) => n.status === "interested").length
  const callbackCount = mockNotes.filter((n) => n.status === "callback").length
  const pendingCount = mockNotes.filter((n) => n.status === "pending").length
  const notAvailableCount = mockNotes.filter((n) => n.status === "not_available").length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="text-muted-foreground hover:text-foreground -ml-2"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-semibold tracking-tight">
            Organization Status
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Overview of all contacted organizations
          </p>
        </motion.div>

        {/* Status Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
        >
          <button
            onClick={() => router.push(filterStatus === "interested" ? "/notes" : "/notes?status=interested")}
            className={`p-4 rounded-xl border text-left transition-colors ${
              filterStatus === "interested" 
                ? "bg-secondary/10 border-secondary/30" 
                : "bg-card border-border hover:border-secondary/30"
            }`}
          >
            <div className="flex items-center gap-2 text-secondary mb-1">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-2xl font-semibold">{interestedCount}</span>
            </div>
            <p className="text-sm text-muted-foreground">Interested</p>
          </button>

          <button
            onClick={() => router.push(filterStatus === "callback" ? "/notes" : "/notes?status=callback")}
            className={`p-4 rounded-xl border text-left transition-colors ${
              filterStatus === "callback" 
                ? "bg-primary/10 border-primary/30" 
                : "bg-card border-border hover:border-primary/30"
            }`}
          >
            <div className="flex items-center gap-2 text-primary mb-1">
              <Calendar className="h-4 w-4" />
              <span className="text-2xl font-semibold">{callbackCount}</span>
            </div>
            <p className="text-sm text-muted-foreground">Callbacks</p>
          </button>

          <button
            onClick={() => router.push(filterStatus === "pending" ? "/notes" : "/notes?status=pending")}
            className={`p-4 rounded-xl border text-left transition-colors ${
              filterStatus === "pending" 
                ? "bg-muted border-muted-foreground/30" 
                : "bg-card border-border hover:border-muted-foreground/30"
            }`}
          >
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-2xl font-semibold">{pendingCount}</span>
            </div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </button>

          <button
            onClick={() => router.push(filterStatus === "not_available" ? "/notes" : "/notes?status=not_available")}
            className={`p-4 rounded-xl border text-left transition-colors ${
              filterStatus === "not_available" 
                ? "bg-muted border-muted-foreground/30" 
                : "bg-card border-border hover:border-muted-foreground/30"
            }`}
          >
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <XCircle className="h-4 w-4" />
              <span className="text-2xl font-semibold">{notAvailableCount}</span>
            </div>
            <p className="text-sm text-muted-foreground">Not Available</p>
          </button>
        </motion.div>

        {/* Organizations List */}
        <div className="space-y-3">
          {filteredNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.05 }}
            >
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-medium">{note.orgName}</h3>
                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <Phone className="h-3.5 w-3.5" />
                            {note.calledAt}
                            {note.contactName && (
                              <>
                                <span className="text-border">|</span>
                                {note.contactName}
                              </>
                            )}
                          </div>
                        </div>
                        <Badge variant="outline" className={statusConfig[note.status].color}>
                          {statusConfig[note.status].icon}
                          <span className="ml-1">{statusConfig[note.status].label}</span>
                        </Badge>
                      </div>

                      {note.notes && (
                        <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                          <MessageSquare className="h-4 w-4 shrink-0 mt-0.5" />
                          <p>{note.notes}</p>
                        </div>
                      )}

                      {(note.availability || note.callbackDate) && (
                        <div className="mt-3 flex flex-wrap gap-3 text-sm">
                          {note.availability && (
                            <div className="flex items-center gap-1.5 text-secondary">
                              <Clock className="h-3.5 w-3.5" />
                              {note.availability}
                            </div>
                          )}
                          {note.callbackDate && (
                            <div className="flex items-center gap-1.5 text-primary">
                              <Calendar className="h-3.5 w-3.5" />
                              Callback: {note.callbackDate}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No organizations with this status
          </div>
        )}
      </main>
    </div>
  )
}

export default function NotesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    }>
      <NotesContent />
    </Suspense>
  )
}
