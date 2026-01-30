"use client"

import { motion } from "framer-motion"
import { ArrowLeft, FileText, MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OrganizationCard, type Organization } from "./organization-card"

interface ResultsViewProps {
  location: string
  mission: string
  organizations: Organization[]
  onBack: () => void
  onCall: (id: string, scheduled?: string) => void
  onViewNotes: (id: string) => void
}

export function ResultsView({
  location,
  mission,
  organizations,
  onBack,
  onCall,
  onViewNotes,
}: ResultsViewProps) {
  const completedCount = organizations.filter((o) => o.status === "completed").length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground -ml-2"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              New Search
            </Button>
            {completedCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent"
                onClick={() => onViewNotes("all")}
              >
                <FileText className="mr-1.5 h-4 w-4" />
                View All Notes ({completedCount})
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 space-y-1"
        >
          <h1 className="text-2xl font-semibold tracking-tight">
            {organizations.length} organizations found
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {location}
            </span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1">
              <Search className="h-3.5 w-3.5" />
              {mission.length > 40 ? mission.slice(0, 40) + "..." : mission}
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {organizations.map((org, index) => (
            <motion.div
              key={org.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <OrganizationCard
                organization={org}
                onCall={onCall}
                onViewNotes={onViewNotes}
              />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}
