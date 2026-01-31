"use client"

import React, { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Building2, CheckCircle2, Clock, XCircle, Calendar, Phone, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type OrgStatus = "onboarded" | "unsure" | "declined" | "callback" | "pending" | "interested" | "not_available"

interface OrgNote {
  id: string
  orgName: string
  status: OrgStatus
  contactName?: string | null
  availability?: string | null
  notes?: string | null
  callbackDate?: string | null
  calledAt?: string | null
  rawOrg?: any
  rawCall?: any
}

// Live notes state — populated from backend /api/notes
const mockNotes: OrgNote[] = []

const statusConfig: Record<OrgStatus, { label: string; color: string; icon: React.ReactNode }> = {
  onboarded: { label: 'Onboarded', color: 'bg-green-100 text-green-800 border-green-200', icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
  unsure: { label: 'Unsure', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: <Clock className="h-3.5 w-3.5" /> },
  declined: { label: 'Declined', color: 'bg-red-100 text-red-800 border-red-200', icon: <XCircle className="h-3.5 w-3.5" /> },
  callback: { label: 'Callback', color: 'bg-primary/10 text-primary border-primary/20', icon: <Calendar className="h-3.5 w-3.5" /> },
  pending: { label: 'Pending', color: 'bg-muted text-muted-foreground border-border', icon: <Clock className="h-3.5 w-3.5" /> },
  interested: { label: 'Interested', color: 'bg-secondary/10 text-secondary border-secondary/20', icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
  not_available: { label: 'Not Available', color: 'bg-muted text-muted-foreground border-border', icon: <XCircle className="h-3.5 w-3.5" /> },
}

function NotesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const filterStatus = searchParams.get("status") as OrgStatus | null

  const [notes, setNotes] = useState<OrgNote[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      try {
        const res = await fetch('http://localhost:4000/api/notes')
        const body = await res.json()
        if (!cancelled && body?.ok) {
          setNotes(body.notes || [])
        }
      } catch (e) {
        console.error('Failed to load notes:', e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const filteredNotes = filterStatus ? notes.filter(n => n.status === filterStatus) : notes

  const interestedCount = notes.filter((n) => n.status === "onboarded" || n.status === 'interested').length
  const callbackCount = notes.filter((n) => n.status === "callback").length
  const pendingCount = notes.filter((n) => n.status === "pending" || n.status === 'unsure').length
  const notAvailableCount = notes.filter((n) => n.status === "declined" || n.status === 'not_available').length

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
          {loading && (
            <div className="text-center py-12 text-muted-foreground">Loading notes…</div>
          )}
          {!loading && filteredNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.05 }}
            >
              <Card className="bg-card border-border shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-medium text-lg">{note.orgName}</h3>
                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <Phone className="h-3.5 w-3.5" />
                            {note.calledAt ? new Date(note.calledAt).toLocaleString() : 'No calls yet'}
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
                          <p className="prose-sm max-w-none">{note.notes}</p>
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

                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => router.push(`/`)}>
                          View Organization
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => router.push(`/`)}>
                          View Call Details
                        </Button>
                      </div>
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
