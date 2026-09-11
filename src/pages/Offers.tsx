import { Check, MapPin, MessageSquare, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

const initialOffers = [
  {
    id: 1,
    buyerName: "FreshKart Organics",
    initials: "Fr",
    location: "New Delhi",
    isVerified: true,
    isBestMatch: true,
    price: "3,580",
    quantity: "40",
    received: "12 min ago",
  },
  {
    id: 2,
    buyerName: "GreenBasket Foods",
    initials: "Gr",
    location: "Gurugram",
    isVerified: true,
    isBestMatch: false,
    price: "3,510",
    quantity: "25",
    received: "1 hour ago",
  },
  {
    id: 3,
    buyerName: "Bharat Grains Ltd.",
    initials: "Bh",
    location: "Jaipur",
    isVerified: true,
    isBestMatch: false,
    price: "3,460",
    quantity: "80",
    received: "3 hours ago",
  }
]

export function Offers() {
  const [offers, setOffers] = useState(initialOffers)

  const handleAction = (id: number, action: 'accept' | 'reject') => {
    // In a real app, this would trigger an API call
    setOffers(offers.filter(offer => offer.id !== id))
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header Section */}
      <div className="space-y-2">
        <p className="text-sm font-semibold tracking-wider text-green-600 uppercase">Manage Produce</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">Offers for you</h1>
        <p className="text-muted-foreground text-lg">Compare verified buyers and choose what works best.</p>
      </div>

      {/* Top Banner */}
      <div className="bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/50 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center shrink-0 mt-0.5">
            <MessageSquare className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">3 new offers today</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Your Basmati Rice listing is getting strong interest.</p>
          </div>
        </div>
        <Button variant="outline" className="text-green-700 border-green-200 hover:bg-green-100 bg-transparent shrink-0">
          Compare all
        </Button>
      </div>

      {/* Offers List */}
      <div className="space-y-4">
        {offers.length === 0 ? (
          <Card className="shadow-sm border-gray-200">
            <CardContent className="p-10 text-center">
              <MessageSquare className="h-10 w-10 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900">No active offers</h3>
              <p className="text-gray-500 mt-2">You have processed all your current offers.</p>
            </CardContent>
          </Card>
        ) : (
          offers.map((offer) => (
            <Card key={offer.id} className="shadow-sm border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  
                  {/* Buyer Info */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold shrink-0 text-lg">
                      {offer.initials}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900 dark:text-white truncate">{offer.buyerName}</h3>
                        {offer.isBestMatch && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-800 shrink-0">
                            Best match
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <MapPin className="h-3.5 w-3.5 mr-1" /> {offer.location}
                        </span>
                        {offer.isVerified && (
                          <span className="flex items-center">
                            <ShieldCheck className="h-3.5 w-3.5 mr-1 text-gray-400" /> Verified buyer
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Offer Details Grid */}
                  <div className="grid grid-cols-3 gap-8 flex-1 w-full lg:w-auto">
                    
                    {/* Offer Price */}
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 mb-1">Offer price</span>
                      <div className="font-bold text-green-600 flex items-baseline gap-1 text-lg">
                        ₹{offer.price} <span className="text-xs font-normal text-gray-500">/ Qtl</span>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 mb-1">Quantity</span>
                      <span className="font-bold text-gray-900 dark:text-white">{offer.quantity} Quintals</span>
                    </div>

                    {/* Received */}
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 mb-1">Received</span>
                      <span className="font-bold text-gray-900 dark:text-white">{offer.received}</span>
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 w-full lg:w-auto justify-end shrink-0 mt-4 lg:mt-0">
                    <Button 
                      className="bg-[#1e8b4b] hover:bg-[#166d3a] text-white gap-2 px-6"
                      onClick={() => handleAction(offer.id, 'accept')}
                    >
                      <Check className="h-4 w-4" /> Accept
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="text-gray-500 hover:text-red-600 hover:bg-red-50 px-4"
                      onClick={() => handleAction(offer.id, 'reject')}
                    >
                      Reject
                    </Button>
                  </div>
                  
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
