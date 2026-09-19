import { useState, useEffect } from "react"
import { CheckCircle2, ShieldAlert, FileText, UploadCloud } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockDB } from "@/lib/mockDatabase"
import type { Listing } from "@/lib/mockDatabase"
import { useUser } from "@/contexts/UserContext"

export function QualityVerification() {
  const { userId } = useUser()
  const [listings, setListings] = useState<Listing[]>([])

  useEffect(() => {
    // Get listings for current farmer that are NOT fully verified
    const myUnverified = mockDB.getListings().filter(l => l.farmerId === userId && l.verificationStatus !== 'AGMARK Verified');
    setListings(myUnverified);
  }, [userId])

  const requestVerification = (listingId: string, type: 'FPO' | 'AGMARK') => {
    mockDB.addVerificationRequest({
      id: `req_${Date.now()}`,
      listingId,
      farmerId: userId,
      farmerName: 'Ramesh Kumar', // mock
      type,
      status: 'Pending',
      documents: [],
      createdAt: new Date().toISOString()
    })
    alert(`Requested ${type} verification!`)
  }

  const markSelfVerified = (listingId: string) => {
    mockDB.updateListing(listingId, { verificationStatus: 'Self Verified' })
    alert('Listing marked as Self Verified.')
    // Refresh local state
    setListings(mockDB.getListings().filter(l => l.farmerId === userId && l.verificationStatus !== 'AGMARK Verified'))
  }

  return (
    <div className="max-w-7xl mx-auto pb-10 space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Quality Verification</h1>
        <p className="text-muted-foreground text-lg">Build buyer trust by verifying your crop quality.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="border-2 border-gray-200">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <UploadCloud className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle>Self Verification</CardTitle>
            <CardDescription>Upload detailed photos and parameters</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="border-2 border-orange-200 bg-orange-50/50">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
            <CardTitle>FPO Verification</CardTitle>
            <CardDescription>Local cooperative physically verifies</CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-2 border-green-200 bg-green-50/50">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <ShieldAlert className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>AGMARK Verification</CardTitle>
            <CardDescription>Official Govt Lab Certification</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <h3 className="text-2xl font-bold mb-4">Your Listings Pending Verification</h3>
      
      {listings.length === 0 ? (
        <p className="text-gray-500">You have no listings that need verification.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map(listing => (
            <Card key={listing.id}>
              <CardHeader>
                <CardTitle>{listing.crop}</CardTitle>
                <CardDescription>{listing.quantity} Quintals • Current Status: <strong className="text-black">{listing.verificationStatus}</strong></CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {listing.verificationStatus === 'None' && (
                  <Button variant="outline" className="w-full justify-start" onClick={() => markSelfVerified(listing.id)}>
                    <CheckCircle2 className="mr-2 h-4 w-4" /> Self Verify
                  </Button>
                )}
                {listing.verificationStatus !== 'FPO Verified' && listing.verificationStatus !== 'AGMARK Verified' && (
                  <Button variant="outline" className="w-full justify-start border-orange-200 text-orange-700 hover:bg-orange-50" onClick={() => requestVerification(listing.id, 'FPO')}>
                    <FileText className="mr-2 h-4 w-4" /> Request FPO Verification
                  </Button>
                )}
                <Button variant="outline" className="w-full justify-start border-green-200 text-green-700 hover:bg-green-50" onClick={() => requestVerification(listing.id, 'AGMARK')}>
                  <ShieldAlert className="mr-2 h-4 w-4" /> Request AGMARK
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
