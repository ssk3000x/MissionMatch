"use client"

import { useState, useCallback } from "react"
import { AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { LocationStep } from "@/components/location-step"
import { MissionStep } from "@/components/mission-step"
import { DiscoveryScreen } from "@/components/discovery-screen"
import { ResultsView } from "@/components/results-view"
import type { Organization } from "@/components/organization-card"
import { OrganizationDetailsDialog } from "@/components/organization-details-dialog"

type Step = "location" | "mission" | "discovery" | "results"

// Mock organizations data
const mockOrganizations: Organization[] = [
  {
    id: "1",
    name: "Community Food Bank",
    description: "Local food bank serving over 10,000 families monthly. Looking for volunteers to help with food sorting, distribution, and delivery to homebound seniors.",
    address: "123 Main St, Downtown",
    categories: ["Food Security", "Community", "Weekly Commitment"],
    status: "ready",
  },
  {
    id: "2",
    name: "Animal Rescue Center",
    description: "No-kill shelter caring for dogs, cats, and small animals. Volunteers needed for dog walking, cat socialization, and adoption events.",
    address: "456 Oak Ave, Eastside",
    categories: ["Animal Welfare", "Flexible Hours"],
    status: "ready",
  },
  {
    id: "3",
    name: "Youth Tutoring Alliance",
    description: "Free tutoring program for K-12 students. Seeking tutors for math, science, and reading. Background check required.",
    address: "789 School Rd, Northside",
    categories: ["Education", "Youth", "Background Check"],
    status: "ready",
  },
  {
    id: "4",
    name: "Habitat for Humanity",
    description: "Building affordable housing for families in need. No construction experience necessary - training provided on site.",
    address: "321 Build Lane, Westside",
    categories: ["Housing", "Physical Activity", "Weekend Projects"],
    status: "ready",
  },
  {
    id: "5",
    name: "Senior Care Center",
    description: "Assisted living facility looking for volunteers to visit with residents, lead activities, and provide companionship.",
    address: "555 Elder Way, Midtown",
    categories: ["Elder Care", "Companionship", "Flexible Schedule"],
    status: "ready",
  },
  {
    id: "6",
    name: "Environmental Cleanup Crew",
    description: "Monthly beach and park cleanups. Great for groups and individuals. All supplies provided.",
    address: "100 Beach Blvd, Coastal",
    categories: ["Environment", "Outdoors", "One-time Events"],
    status: "ready",
  },
  {
    id: "7",
    name: "Literacy Partners",
    description: "Adult literacy program helping community members improve reading and writing skills. Training provided for all volunteers.",
    address: "200 Library Ln, Central",
    categories: ["Education", "Adults", "Training Provided"],
    status: "ready",
  },
  {
    id: "8",
    name: "Meals on Wheels",
    description: "Delivering hot meals to homebound seniors and individuals with disabilities. Flexible routes and schedules available.",
    address: "300 Care Dr, Northside",
    categories: ["Food Security", "Elder Care", "Driving Required"],
    status: "ready",
  },
  {
    id: "9",
    name: "Crisis Helpline Center",
    description: "24/7 crisis support line seeking compassionate volunteers. Comprehensive 40-hour training program included.",
    address: "400 Hope St, Downtown",
    categories: ["Mental Health", "Crisis Support", "Training Required"],
    status: "ready",
  },
]

// Mock call notes for completed calls
const mockCallNotes = {
  "1": {
    summary: "Very welcoming organization with immediate volunteer opportunities available. They need help with food sorting and distribution, especially on weekends.",
    contactName: "Sarah Johnson",
    availability: "Weekdays 9am-5pm, Saturdays 8am-2pm",
    nextSteps: [
      "Complete online volunteer application",
      "Attend orientation session",
      "Bring valid ID and wear closed-toe shoes",
    ],
  },
  "2": {
    summary: "Currently looking for volunteers to help with dog walking and cat socialization. They have a structured volunteer program with different levels.",
    contactName: "Mike Chen",
    availability: "Daily 7am-7pm",
    nextSteps: [
      "Submit volunteer interest form on website",
      "Complete 2-hour training session",
      "Start with supervised shifts",
    ],
  },
  "3": {
    summary: "Nonprofit focused on providing free tutoring to underserved students. Currently need math and science tutors for middle and high school students.",
    contactName: "Dr. Amanda Peters",
    availability: "After school hours: Mon-Thu 3pm-7pm",
    nextSteps: [
      "Fill out tutor application",
      "Pass background check",
      "Complete tutor training workshop",
    ],
  },
}

export default function Home() {
  const router = useRouter()
  const [step, setStep] = useState<Step>("location")
  const [location, setLocation] = useState("")
  const [mission, setMission] = useState("")
  const [organizations, setOrganizations] = useState<Organization[]>([])

  const handleLocationComplete = (loc: string) => {
    setLocation(loc)
    setStep("mission")
  }

  const handleMissionComplete = (mis: string, orgs?: Organization[]) => {
    setMission(mis)
    if (orgs && orgs.length > 0) {
      // If we have organizations from the backend, use them
      setOrganizations(orgs)
      setStep("results")
    } else {
      // Otherwise go to discovery screen
      setStep("discovery")
    }
  }

  const handleDiscoveryComplete = useCallback(() => {
    setOrganizations(mockOrganizations)
    setStep("results")
  }, [])

  const handleCall = async (orgId: string, scheduledTime?: string) => {
    // If scheduledTime is explicitly undefined (cancel action), revert to ready status
    if (scheduledTime === undefined && organizations.find(o => o.id === orgId)?.status === "scheduled") {
      setOrganizations((prev) =>
        prev.map((org) =>
          org.id === orgId 
            ? { ...org, status: "ready" as const, scheduledTime: undefined } 
            : org
        )
      )
      return
    }

    // If scheduled, set to scheduled status
    if (scheduledTime) {
      setOrganizations((prev) =>
        prev.map((org) =>
          org.id === orgId 
            ? { ...org, status: "scheduled" as const, scheduledTime } 
            : org
        )
      )
      return
    }

    // Get organization details
    const org = organizations.find(o => o.id === orgId)
    if (!org || !org.phone) {
      console.error("Organization or phone number not found")
      return
    }

    // Set organization to calling status
    setOrganizations((prev) =>
      prev.map((org) =>
        org.id === orgId ? { ...org, status: "calling" as const, scheduledTime: undefined } : org
      )
    )

    // Make actual phone call via backend
    try {
      const callText = `Hello, this is an automated message from VolunteerConnect. We are reaching out on behalf of a volunteer interested in supporting ${org.name}. They are looking to help with ${mission}. Please call them back to discuss volunteer opportunities. Thank you!`
      
      const response = await fetch('http://localhost:4000/api/voice/call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: org.phone,
          text: callText,
          organizationName: org.name
        })
      })

      const result = await response.json()
      
      if (response.ok && result.ok) {
        console.log("✓ Call initiated:", result)
        const callId = result.callId;

        // Poll for call completion every 3 seconds
        const pollForCompletion = async () => {
          const maxPolls = 120; // 6 minutes max (120 * 3s)
          let polls = 0;
          
          while (polls < maxPolls) {
            try {
              console.log(`⏳ [Poll ${polls + 1}] Checking call ${callId} status...`);
              const statusRes = await fetch(`http://localhost:4000/api/voice/call/${callId}`);
              const statusJson = await statusRes.json();
              console.log(`📊 Status response:`, statusJson);
              
              if (statusRes.ok && statusJson.ok && statusJson.completed) {
                console.log('✓ Call completed!');
                
                // Fetch persisted summary
                let summaryData = null;
                try {
                  console.log(`📋 Fetching summary for key: ${org.phone || callId}`);
                  const sumRes = await fetch(`http://localhost:4000/api/call-summaries?key=${encodeURIComponent(org.phone || callId)}`);
                  if (sumRes.ok) {
                    summaryData = await sumRes.json();
                    console.log('✓ Summary fetched:', summaryData);
                  }
                } catch (e) {
                  console.error('❌ Error fetching summary:', e);
                }

                // Update organization with completed status
                setOrganizations((prev) =>
                  prev.map((o) =>
                    o.id === orgId
                      ? {
                          ...o,
                          status: 'completed' as const,
                          scheduledTime: undefined,
                          callNotes: summaryData?.data?.vapiSummary || {
                            summary: statusJson?.summary || 'Call completed.',
                            availability: null,
                            nextSteps: [],
                          },
                        }
                      : o
                  )
                );
                console.log('✓ UI updated to completed');
                return; // Done polling
              }
              
              // Still in progress, wait and poll again
              await new Promise(r => setTimeout(r, 3000));
              polls++;
            } catch (e) {
              console.error('❌ Poll error:', e);
              await new Promise(r => setTimeout(r, 3000));
              polls++;
            }
          }
          
          // Timeout - reset to ready
          console.error('❌ Polling timeout');
          setOrganizations((prev) =>
            prev.map((o) => (o.id === orgId ? { ...o, status: 'ready' as const } : o))
          );
        };

        pollForCompletion();
      } else {
        console.error("Call failed:", result)
        // Reset to ready status on failure
        setOrganizations((prev) =>
          prev.map((org) =>
            org.id === orgId ? { ...org, status: "ready" as const } : org
          )
        )
      }
    } catch (error) {
      console.error("Error making call:", error)
      // Reset to ready status on error
      setOrganizations((prev) =>
        prev.map((org) =>
          org.id === orgId ? { ...org, status: "ready" as const } : org
        )
      )
    }
  }

  const handleViewNotes = (orgId: string) => {
    if (orgId === "all") {
      router.push("/notes")
    } else {
      const org = organizations.find(o => o.id === orgId) || null
      setSelectedOrg(org)
      setShowOrgDialog(true)
    }
  }

  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null)
  const [showOrgDialog, setShowOrgDialog] = useState(false)

  const handleReset = () => {
    setStep("location")
    setLocation("")
    setMission("")
    setOrganizations([])
  }

  return (
    <main className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {step === "location" && (
          <LocationStep key="location" onComplete={handleLocationComplete} />
        )}
        {step === "mission" && (
          <MissionStep
            key="mission"
            location={location}
            onComplete={handleMissionComplete}
            onBack={() => setStep("location")}
          />
        )}
        {step === "discovery" && (
          <DiscoveryScreen
            key="discovery"
            location={location}
            mission={mission}
            organizations={organizations}
            onComplete={handleDiscoveryComplete}
          />
        )}
        {step === "results" && (
          <ResultsView
            key="results"
            location={location}
            mission={mission}
            organizations={organizations}
            onBack={handleReset}
            onCall={handleCall}
            onViewNotes={handleViewNotes}
          />
        )}
      </AnimatePresence>
      <OrganizationDetailsDialog
        organization={selectedOrg}
        isOpen={showOrgDialog}
        onClose={() => setShowOrgDialog(false)}
      />
    </main>
  )
}
