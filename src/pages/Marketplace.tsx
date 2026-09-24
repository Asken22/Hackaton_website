import { useState, useEffect, useMemo } from "react"
import { ShieldCheck, MapPin, Search, Filter, ArrowUpDown, Clock, Droplets, Package, Phone, CheckCircle, Leaf } from "lucide-react"
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
  const { userId, userName, role } = useUser()
  const [listings, setListings] = useState<Listing[]>([])
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('recent')

  // Bidding modal state
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null)
  const [bidPrice, setBidPrice] = useState('')
  const [bidQty, setBidQty] = useState('')
  const [bidMsg, setBidMsg] = useState('')

  useEffect(() => {
    setListings(mockDB.getListings())
  }, [])

  const filteredListings = useMemo(() => {
    let result = listings;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(l => 
        l.crop.toLowerCase().includes(q) || 
        l.farmerName.toLowerCase().includes(q) || 
        l.location.toLowerCase().includes(q)
      )
    }

    if (sort === 'lowest_price') result.sort((a, b) => a.expectedPrice - b.expectedPrice)
    if (sort === 'highest_quantity') result.sort((a, b) => b.quantity - a.quantity)
    if (sort === 'recent') result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    return result;
  }, [listings, search, sort])

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
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 border-b pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200 uppercase tracking-wider">
            B2B Procurement Dashboard
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Browse Listings</h1>
          <p className="text-muted-foreground text-lg">Source premium agricultural produce directly from verified farmers and FPOs.</p>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search crops, farmers, locations..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <Button variant="outline" className="shrink-0 rounded-md">
            <Filter className="h-4 w-4 mr-2" /> Filters
          </Button>
        </div>
      </div>

      {/* Filter Bar (Visual Mockup for Prompt reqs) */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-4 flex flex-wrap gap-3 items-center">
          <span className="text-sm font-semibold text-gray-500 mr-2 flex items-center gap-1"><ArrowUpDown className="h-4 w-4"/> Sort By:</span>
          <select value={sort} onChange={e => setSort(e.target.value)} className="text-sm border rounded-md px-3 py-1.5 focus:ring-2 focus:ring-green-500 bg-white">
            <option value="recent">Recently Added</option>
            <option value="lowest_price">Lowest Price</option>
            <option value="highest_quantity">Highest Quantity</option>
            <option value="highest_grade">Highest Grade (FPO)</option>
            <option value="nearest">Nearest Location</option>
          </select>

          <div className="h-6 w-px bg-gray-300 mx-2 hidden md:block"></div>
          
          <select className="text-sm border rounded-md px-3 py-1.5 bg-white"><option>Crop (All)</option></select>
          <select className="text-sm border rounded-md px-3 py-1.5 bg-white"><option>Verification (All)</option></select>
          <select className="text-sm border rounded-md px-3 py-1.5 bg-white"><option>Grade (All)</option></select>
          <select className="text-sm border rounded-md px-3 py-1.5 bg-white"><option>State (All)</option></select>
        </CardContent>
      </Card>

      {/* Results Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredListings.map(listing => {
          const isFpo = listing.verificationType === 'FPO';
          const isAgmark = listing.verificationType === 'AGMARK';
          return (
            <Card key={listing.id} className="overflow-hidden shadow-sm hover:shadow-lg transition-all group bg-white border-gray-200 flex flex-col">
              <div className="bg-gray-100 aspect-[4/3] relative overflow-hidden shrink-0">
                <img 
                  src={
                    listing.crop.toLowerCase().includes('rice') ? riceImg :
                    listing.crop.toLowerCase().includes('wheat') ? wheatImg :
                    listing.crop.toLowerCase().includes('soybean') ? soybeanImg :
                    listing.crop.toLowerCase().includes('maize') ? maizeImg :
                    wheatImg
                  } 
                  alt={listing.crop}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                
                {/* Badges top right */}
                <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                  {isAgmark && (
                    <div className="bg-green-100 border border-green-300 px-2 py-1 rounded-sm text-xs font-bold text-green-800 flex items-center gap-1 shadow-sm">
                      <ShieldCheck className="h-3.5 w-3.5" /> AGMARK Certified
                    </div>
                  )}
                  {isFpo && (
                    <div className="bg-orange-100 border border-orange-300 px-2 py-1 rounded-sm text-xs font-bold text-orange-800 flex items-center gap-1 shadow-sm">
                      <ShieldCheck className="h-3.5 w-3.5" /> FPO Grade {listing.grade}
                    </div>
                  )}
                  {!isAgmark && !isFpo && (
                    <div className="bg-blue-100 border border-blue-300 px-2 py-1 rounded-sm text-xs font-bold text-blue-800 flex items-center gap-1 shadow-sm">
                      <CheckCircle className="h-3.5 w-3.5" /> Self Verified
                    </div>
                  )}
                </div>

                {/* Bottom Left Title over image */}
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="font-extrabold text-2xl drop-shadow-md">{listing.crop}</h3>
                  <p className="text-sm font-medium text-white/90 drop-shadow-sm flex items-center gap-1">
                    <Leaf className="h-3.5 w-3.5" /> Hybrid Variety
                  </p>
                </div>
              </div>
              
              <CardContent className="p-5 flex-1 flex flex-col space-y-4">
                
                {/* Price and Farmer */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{listing.farmerName}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5"><MapPin className="h-3 w-3" /> {listing.location} (32km)</p>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-green-700 text-xl">₹{listing.expectedPrice}</p>
                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">per quintal</p>
                  </div>
                </div>
                
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100 mt-auto">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider flex items-center gap-1"><Package className="h-3 w-3"/> Total Qty</p>
                    <p className="text-sm font-bold text-gray-900">{listing.quantity} Quintals</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider flex items-center gap-1"><Droplets className="h-3 w-3"/> Moisture</p>
                    <p className="text-sm font-bold text-gray-900">{isFpo && listing.qualityParams ? listing.qualityParams.moisture + '%' : '12%'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider flex items-center gap-1"><Clock className="h-3 w-3"/> Harvested</p>
                    <p className="text-sm font-bold text-gray-900">{new Date(listing.harvestDate).toLocaleDateString('en-GB')}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider flex items-center gap-1"><Package className="h-3 w-3"/> Min Order</p>
                    <p className="text-sm font-bold text-gray-900">50 Quintals</p>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  {role === 'buyer' ? (
                    <>
                      <Button className="flex-1 bg-green-700 hover:bg-green-800 shadow-sm" onClick={() => setSelectedListing(listing)}>
                        Place Bid
                      </Button>
                      <Button variant="outline" className="px-3" title="Contact Farmer">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button variant="secondary" className="w-full" disabled>Log in as Buyer to Bid</Button>
                  )}
                </div>

              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No listings found matching your criteria.</p>
        </div>
      )}

      {/* Bidding Modal Overlay */}
      {selectedListing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <CardHeader className="border-b bg-gray-50/50 rounded-t-xl">
              <CardTitle className="text-xl">Submit Procurement Bid</CardTitle>
              <CardDescription>You are placing a bid for <strong className="text-gray-800">{selectedListing.crop}</strong> from <strong className="text-gray-800">{selectedListing.farmerName}</strong>.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handlePlaceBid} className="space-y-5">
                
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-blue-600 font-bold uppercase">Seller's Ask</p>
                    <p className="text-lg font-extrabold text-blue-900">₹{selectedListing.expectedPrice} / Qtl</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-blue-600 font-bold uppercase">Available</p>
                    <p className="text-lg font-extrabold text-blue-900">{selectedListing.quantity} Qtl</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Your Offer (₹ / Qtl)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                      <input 
                        type="number" 
                        required 
                        value={bidPrice}
                        onChange={e => setBidPrice(e.target.value)}
                        className="w-full border rounded-md pl-8 pr-3 py-2 focus:ring-2 focus:ring-green-500 font-bold text-gray-900"
                        placeholder={`${selectedListing.expectedPrice}`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Quantity (Qtl)</label>
                    <input 
                      type="number" 
                      required 
                      max={selectedListing.quantity}
                      value={bidQty}
                      onChange={e => setBidQty(e.target.value)}
                      className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 font-bold text-gray-900"
                      placeholder={`Max: ${selectedListing.quantity}`}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Procurement Notes (Optional)</label>
                  <textarea 
                    rows={2}
                    value={bidMsg}
                    onChange={e => setBidMsg(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 text-sm"
                    placeholder="E.g. Require immediate dispatch, transport arranged by us."
                  />
                </div>
                
                <div className="pt-4 flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setSelectedListing(null)}>Cancel</Button>
                  <Button type="submit" className="bg-green-700 hover:bg-green-800 px-8">Submit Official Bid</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
