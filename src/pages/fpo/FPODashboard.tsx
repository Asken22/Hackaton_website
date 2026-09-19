import { useState, useEffect } from "react"
import { Check, X, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockDB } from "@/lib/mockDatabase"
import type { VerificationRequest, Listing } from "@/lib/mockDatabase"

export function FPODashboard() {
  const [requests, setRequests] = useState<(VerificationRequest & { listing?: Listing })[]>([])

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = () => {
    const allReqs = mockDB.getVerificationRequests().filter(r => r.type === 'FPO')
    const withListings = allReqs.map(r => ({
      ...r,
      listing: mockDB.getListing(r.listingId)
    }))
    setRequests(withListings)
  }

  const handleAction = (reqId: string, listingId: string, status: 'Approved' | 'Rejected') => {
    mockDB.updateVerificationRequestStatus(reqId, status)
    if (status === 'Approved') {
      mockDB.updateListing(listingId, { verificationStatus: 'FPO Verified' })
    }
    fetchRequests()
  }

  return (
    <div className="max-w-7xl mx-auto pb-10 space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Pending Verifications</h1>
        <p className="text-muted-foreground text-lg">Review and approve crop quality for farmers.</p>
      </div>

      <div className="grid gap-4">
        {requests.map(req => (
          <Card key={req.id}>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center text-xl">
                <span>{req.farmerName}</span>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  req.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  req.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {req.status}
                </span>
              </CardTitle>
              <CardDescription>Requested for: {req.listing?.crop} ({req.listing?.quantity} Qtl)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-md mb-4 flex items-center justify-center border border-dashed border-gray-300 text-gray-500 cursor-pointer hover:bg-gray-100">
                <FileText className="mr-2 h-5 w-5" /> View Uploaded Documents & Photos
              </div>

              {req.status === 'Pending' && (
                <div className="flex gap-2">
                  <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleAction(req.id, req.listingId, 'Approved')}>
                    <Check className="mr-1 h-4 w-4" /> Approve
                  </Button>
                  <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50" onClick={() => handleAction(req.id, req.listingId, 'Rejected')}>
                    <X className="mr-1 h-4 w-4" /> Reject
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        {requests.length === 0 && (
          <p className="text-gray-500">No pending requests.</p>
        )}
      </div>
    </div>
  )
}
