import { useState, useEffect } from "react"
import { Check, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockDB } from "@/lib/mockDatabase"
import type { Bid, Listing } from "@/lib/mockDatabase"
import { useUser } from "@/contexts/UserContext"

export function Offers() {
  const { userId } = useUser()
  const [bids, setBids] = useState<(Bid & { listing?: Listing })[]>([])

  useEffect(() => {
    // Get all listings for this farmer
    const myListingIds = mockDB.getListings().filter(l => l.farmerId === userId).map(l => l.id)
    
    // Get all bids for these listings
    const allBids = mockDB.getBids().filter(b => myListingIds.includes(b.listingId))
    
    // Attach listing info to bid for display
    const bidsWithListings = allBids.map(b => ({
      ...b,
      listing: mockDB.getListing(b.listingId)
    }))
    
    setBids(bidsWithListings)
  }, [userId])

  const handleAction = (bidId: string, status: 'Accepted' | 'Rejected') => {
    mockDB.updateBidStatus(bidId, status)
    setBids(prev => prev.map(b => b.id === bidId ? { ...b, status } : b))
  }

  return (
    <div className="max-w-7xl mx-auto pb-10 space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Buyer Bids</h1>
        <p className="text-muted-foreground text-lg">Review and manage incoming offers for your listings.</p>
      </div>

      <div className="grid gap-4">
        {bids.map(bid => (
          <Card key={bid.id} className="overflow-hidden">
            <CardContent className="p-0 sm:flex items-center justify-between">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-xl">{bid.buyerName}</h3>
                    <p className="text-sm text-gray-500">Bidding on: {bid.listing?.crop} ({bid.requestedQuantity} Qtl)</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                    bid.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                    bid.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {bid.status}
                  </div>
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-700 italic border border-gray-100">
                  "{bid.message}"
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 sm:w-64 border-t sm:border-t-0 sm:border-l flex flex-col justify-center gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">Offered Price</p>
                  <p className="font-extrabold text-2xl text-green-700">₹{bid.offerPrice}</p>
                  <p className="text-xs text-gray-400">per quintal</p>
                </div>
                
                {bid.status === 'Pending' && (
                  <div className="flex gap-2 w-full">
                    <Button 
                      className="flex-1 bg-green-600 hover:bg-green-700" 
                      onClick={() => handleAction(bid.id, 'Accepted')}
                    >
                      <Check className="mr-1 h-4 w-4" /> Accept
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                      onClick={() => handleAction(bid.id, 'Rejected')}
                    >
                      <X className="mr-1 h-4 w-4" /> Reject
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {bids.length === 0 && (
          <p className="text-gray-500">No bids received yet.</p>
        )}
      </div>
    </div>
  )
}
