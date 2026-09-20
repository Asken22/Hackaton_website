import { useState, useEffect } from "react"
import { ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { mockDB } from "@/lib/mockDatabase"
import type { Listing } from "@/lib/mockDatabase"
import { useUser } from "@/contexts/UserContext"
import riceImg from "@/assets/rice.jpg"
import wheatImg from "@/assets/wheat.jpg"
import soybeanImg from "@/assets/soybean.jpg"
import maizeImg from "@/assets/maize.jpg"

export function MyListings() {
  const { userId } = useUser()
  const [listings, setListings] = useState<Listing[]>([])

  useEffect(() => {
    setListings(mockDB.getListings().filter(l => l.farmerId === userId))
  }, [userId])

  return (
    <div className="max-w-7xl mx-auto pb-10 space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">My Listings</h1>
        <p className="text-muted-foreground text-lg">Manage your active produce listings.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {listings.map(listing => (
          <Card key={listing.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
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
                className="object-cover w-full h-full"
              />
            </div>
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl">{listing.crop}</h3>
                  <p className="text-sm text-gray-500">{new Date(listing.harvestDate).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-700 text-lg">₹{listing.expectedPrice}</p>
                  <p className="text-sm text-gray-500">per qtl</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t pt-4">
                <span className="font-semibold">{listing.quantity} Quintals</span>
                {listing.verificationStatus !== 'None' && (
                  <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded">
                    <ShieldCheck className="w-3 h-3" /> {listing.verificationStatus}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {listings.length === 0 && (
          <p className="col-span-full text-gray-500">You have not created any listings yet.</p>
        )}
      </div>
    </div>
  )
}
