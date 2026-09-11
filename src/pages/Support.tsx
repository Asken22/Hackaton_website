import { Upload, ArrowRight, CheckCircle2, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

const recentTickets = [
  {
    id: "AGR-2048",
    title: "Payment not reflected",
    date: "Raised 18 May 2024",
    status: "In review",
    statusColor: "text-orange-500",
    dotColor: "bg-orange-500",
    progress: 1, // 0: Raised, 1: Review, 2: Resolved
  },
  {
    id: "AGR-1991",
    title: "Pickup delay — INV-240501",
    date: "Resolved 08 May 2024",
    status: "Resolved",
    statusColor: "text-green-600",
    dotColor: "bg-green-600",
    progress: 2,
  }
]

export function Support() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }, 1000)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header Section */}
      <div className="space-y-2">
        <p className="text-sm font-semibold tracking-wider text-green-600 uppercase">Help & Support</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">How can we help?</h1>
        <p className="text-muted-foreground text-lg">Raise a ticket and our team will get back to you within 24 hours.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Left Column: Raise Complaint Form */}
        <Card className="shadow-sm border-gray-200 h-fit">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Raise a complaint</CardTitle>
          </CardHeader>
          <CardContent>
            {showSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-300">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Ticket Submitted!</h3>
                <p className="text-gray-500">Our support team will review it and get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Complaint title</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full rounded-md border border-gray-300 bg-background px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                  <textarea 
                    required 
                    rows={5}
                    placeholder="Tell us what happened..."
                    className="w-full rounded-md border border-gray-300 bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 resize-none" 
                  />
                </div>

                <div className="border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-between bg-gray-50/50 dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-white dark:bg-gray-800 rounded-md border shadow-sm flex items-center justify-center group-hover:border-green-300 transition-colors">
                      <Upload className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-700">Attach evidence</p>
                      <p className="text-xs text-gray-500">Optional · JPG or PDF</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-green-700 hover:underline">Browse</span>
                </div>

                <Button type="submit" disabled={isSubmitting} className="bg-[#1e8b4b] hover:bg-[#166d3a] text-white">
                  {isSubmitting ? "Submitting..." : (
                    <>Submit ticket <ArrowRight className="ml-2 h-4 w-4" /></>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Right Column: Recent Tickets */}
        <Card className="shadow-sm border-gray-200 h-fit">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Recent tickets</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {recentTickets.map((ticket, idx) => (
                <div key={ticket.id} className="p-6 pb-8">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-bold tracking-wider text-green-700 uppercase">#{ticket.id}</p>
                    <div className={`flex items-center text-sm font-medium ${ticket.statusColor}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${ticket.dotColor} mr-2`}></span>
                      {ticket.status}
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{ticket.title}</h3>
                  <p className="text-xs text-gray-500 mb-6">{ticket.date}</p>

                  {/* Progress Tracker (Only show on the second item to match design) */}
                  {idx === 1 && (
                    <div className="relative mt-8 max-w-md">
                      <div className="absolute top-2.5 left-2 right-2 h-[2px] bg-gray-100 dark:bg-gray-800 -z-10"></div>
                      <div className="flex justify-between relative">
                        {/* Step 1: Raised */}
                        <div className="flex flex-col items-center">
                          <div className={`h-5 w-5 rounded-full flex items-center justify-center bg-green-50 border border-green-200 mb-2`}>
                            <CheckCircle2 className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="text-xs font-medium text-green-700">Raised</span>
                        </div>

                        {/* Step 2: Review */}
                        <div className="flex flex-col items-center">
                          <div className={`h-5 w-5 rounded-full flex items-center justify-center bg-green-50 border border-green-200 mb-2`}>
                            <CheckCircle2 className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="text-xs font-medium text-green-700">Review</span>
                        </div>

                        {/* Step 3: Resolved */}
                        <div className="flex flex-col items-center">
                          <div className={`h-5 w-5 rounded-full flex items-center justify-center bg-white border border-gray-200 mb-2`}>
                            <Circle className="h-2 w-2 text-gray-300" />
                          </div>
                          <span className="text-xs font-medium text-gray-400">Resolved</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
