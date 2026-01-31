"use client"

import React, { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Loader2, Phone, Calendar, User, CheckCircle2, XCircle, HelpCircle, Building2, MapPin } from "lucide-react"

interface OrganizationDetailsDialogProps {
  organization: any | null
  isOpen: boolean
  onClose: () => void
}

export function OrganizationDetailsDialog({
  organization,
  isOpen,
  onClose,
}: OrganizationDetailsDialogProps) {
  const [loading, setLoading] = useState(true)
  const [callData, setCallData] = useState<any>(null)

  useEffect(() => {
    if (isOpen && organization) {
      // Immediately show any locally-available call notes to avoid flicker
      if (organization.callNotes) {
        setCallData(organization.callNotes)
      }

      setLoading(true)
      // Identify call by phone or id. Ideally phone since VAPI uses customer number as key.
      const key = organization.phone || organization.id

      fetch(`http://localhost:4000/api/call-summaries?key=${encodeURIComponent(key)}`)
        .then(res => res.json())
        .then(data => {
          if (data.ok && data.data) {
            setCallData(data.data)
          } else {
            // fallback to any local callNotes saved on the organization object
            if (organization.callNotes) setCallData(organization.callNotes)
            else setCallData(null)
          }
        })
        .catch(err => {
          console.error("Failed to fetch summary", err)
          if (organization.callNotes) setCallData(organization.callNotes)
          else setCallData(null)
        })
        .finally(() => setLoading(false))
    }
  }, [isOpen, organization])

  if (!organization) return null

  // Determine status display
  const isInterested = callData?.interested
  const statusColor = isInterested === true 
    ? "bg-green-100 text-green-800 border-green-200"
    : isInterested === false
      ? "bg-red-100 text-red-800 border-red-200"
      : "bg-yellow-100 text-yellow-800 border-yellow-200"
  
  const statusLabel = isInterested === true
    ? "Onboarded / Interested"
    : isInterested === false
      ? "Declined / Not Available"
      : "Unsure / Pending"

  const statusIcon = isInterested === true
    ? <CheckCircle2 className="w-4 h-4 mr-1" />
    : isInterested === false
      ? <XCircle className="w-4 h-4 mr-1" />
      : <HelpCircle className="w-4 h-4 mr-1" />

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
        
        {/* Header Section */}
        <div className="p-6 bg-secondary/5 border-b border-border">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white border border-border shadow-sm">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold font-heading">{organization.name}</DialogTitle>
                <DialogDescription className="mt-1 flex items-center gap-2 text-sm text-foreground/70">
                  <MapPin className="w-3.5 h-3.5" />
                  {organization.address || "No address provided"}
                </DialogDescription>
              </div>
            </div>
            {callData && (
              <Badge variant="outline" className={`${statusColor} flex items-center shrink-0`}>
                {statusIcon}
                {statusLabel}
              </Badge>
            )}
          </div>
        </div>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-8">
            
            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">About</h4>
              <p className="text-sm leading-relaxed text-foreground/90">
                {organization.description || "No description available."}
              </p>
            </div>

            {/* Call Analysis Section */}
            {loading ? (
              <div className="py-8 flex justify-center items-center text-muted-foreground bg-muted/30 rounded-lg">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Loading call analysis...
              </div>
            ) : callData ? (
              <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                <div className="bg-muted/50 px-4 py-3 border-b border-border flex justify-between items-center">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    Call Intelligence Report
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {new Date(callData.updated_at || new Date()).toLocaleString()}
                  </span>
                </div>
                
                <div className="p-4 space-y-4">
                  {/* Summary Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                        <User className="w-3 h-3" /> Point of Contact
                      </span>
                      <p className="font-medium text-sm">
                        {callData.contact_name || callData.contactName || "Not identified"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Availability
                      </span>
                      <p className="font-medium text-sm">
                        {callData.availability || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Executive Summary */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium flex items-center gap-2 text-foreground/80">
                      Outcome Summary
                    </h5>
                    <div className="bg-secondary/5 p-3 rounded-lg border border-secondary/10 text-sm leading-relaxed">
                      {callData.summary}
                    </div>
                  </div>

                  {/* Next Steps */}
                  {(callData.next_steps || callData.nextSteps) && Array.isArray(callData.next_steps || callData.nextSteps) && (callData.next_steps || callData.nextSteps).length > 0 && (
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium flex items-center gap-2 text-foreground/80">
                        Recommended Next Steps
                      </h5>
                      <ul className="space-y-2">
                        {(callData.next_steps || callData.nextSteps).map((step: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm bg-background p-2 rounded border border-border">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary mt-0.5">
                              {i + 1}
                            </span>
                            <span className="text-foreground/90">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : (
             <div className="py-8 text-center bg-muted/30 rounded-xl border border-dashed border-muted-foreground/30">
               <Phone className="w-8 h-8 mx-auto text-muted-foreground/50 mb-2" />
               <p className="text-muted-foreground font-medium">No calls made to this organization yet</p>
               <Button 
                 variant="link" 
                 size="sm" 
                 className="mt-1"
               >
                 Initiate a call from the dashboard
               </Button>
             </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t border-border bg-background flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Close</Button>
          {organization.url && organization.url !== "N/A" && (
            <Button onClick={() => window.open(organization.url, '_blank')}>
              Visit Website
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
