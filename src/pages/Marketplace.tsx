import { useState, useEffect } from "react"
import { ShieldCheck, MapPin, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockDB } from "@/lib/mockDatabase"
import type { Listing } from "@/lib/mockDatabase"
import { useUser } from "@/contexts/UserContext"
import riceImg from "@/assets/rice.jpg"
import wheatImg from "@/assets/wheat.jpg"
import soybeanImg from "@/assets/soybean.jpg"
import maizeImg from "@/assets/maize.jpg"

export function Marketplace() {
  const { userId, userName } = useUser()
  const [listings, setListings] = useState<Listing[]>([])
  
  // Bidding modal state
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null)
  const [bidPrice, setBidPrice] = useState('')
  const [bidQty, setBidQty] = useState('')
  const [bidMsg, setBidMsg] = useState('')

  useEffect(() => {
    // Buyers see all listings
    setListings(mockDB.getListings())
  }, [])

  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedListing) return

    mockDB.addBid({
      id: `bid_${Date.now()}`,
      listingId: selectedListing.id,
      buyerId: userId,
      buyerName: userName,
      offerPrice: Number(bidPrice),
      requestedQuantity: Number(bidQty),
      message: bidMsg,
      status: 'Pending',
      createdAt: new Date().toISOString()
    })
    
    alert('Bid placed successfully!')
    setSelectedListing(null)
    setBidPrice('')
    setBidQty('')
    setBidMsg('')
  }

  return (
    <div className="max-w-7xl mx-auto pb-10 space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Browse Listings</h1>
        <p className="text-muted-foreground text-lg">Find verified produce directly from farmers.</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search crops, locations..." 
            className="w-full pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>
        <Button variant="outline" className="rounded-full">Filters</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {listings.map(listing => (
          <Card key={listing.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
            <div className="bg-gray-100 aspect-video relative overflow-hidden">
              <img 
                src={
                  listing.crop.toLowerCase().includes('rice') ? riceImg :
                  listing.crop.toLowerCase().includes('wheat') ? wheatImg :
                  listing.crop.toLowerCase().includes('soybean') ? soybeanImg :
                  listing.crop.toLowerCase().includes('maize') ? maizeImg :
                  wheatImg
                } 
                alt={listing.crop}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
              {listing.verificationStatus !== 'None' && (
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-md text-xs font-bold text-green-700 flex items-center gap-1 shadow-sm">
                  <ShieldCheck className="h-3 w-3" /> {listing.verificationStatus}
                </div>
              )}
            </div>
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl">{listing.crop}</h3>
                  <p className="text-sm text-gray-600 font-medium">{listing.farmerName}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-700 text-lg">₹{listing.expectedPrice}</p>
                  <p className="text-xs text-gray-500">Expected / Qtl</p>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1 shrink-0" /> {listing.location}
              </div>
              
              <div className="flex items-center justify-between border-t pt-4">
                <span className="font-semibold">{listing.quantity} Qtl Available</span>
                <Button size="sm" onClick={() => setSelectedListing(listing)} className="bg-green-700 hover:bg-green-800">
                  Place Bid
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bidding Modal Overlay */}
      {selectedListing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
            <CardHeader>
              <CardTitle>Place Bid</CardTitle>
              <CardDescription>Bidding on {selectedListing.crop} from {selectedListing.farmerName}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePlaceBid} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Offer Price (₹ / Qtl)</label>
                  <input 
                    type="number" 
                    required 
                    value={bidPrice}
                    onChange={e => setBidPrice(e.target.value)}
                    className="w-full border rounded-md px-3 py-2"
                    placeholder={`Expected: ₹${selectedListing.expectedPrice}`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Required Quantity (Qtl)</label>
                  <input 
                    type="number" 
                    required 
                    max={selectedListing.quantity}
                    value={bidQty}
                    onChange={e => setBidQty(e.target.value)}
                    className="w-full border rounded-md px-3 py-2"
                    placeholder={`Max: ${selectedListing.quantity}`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message (Optional)</label>
                  <textarea 
                    rows={2}
                    value={bidMsg}
                    onChange={e => setBidMsg(e.target.value)}
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="E.g. Ready for immediate pickup."
                  />
                </div>
                <div className="pt-4 flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setSelectedListing(null)}>Cancel</Button>
                  <Button type="submit" className="bg-green-700 hover:bg-green-800">Submit Bid</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
