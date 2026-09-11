import { useState } from "react"
import { BadgeCheck, IndianRupee, MapPin, Search, X, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import wheatImg from "@/assets/wheat.jpg"
import soybeanImg from "@/assets/soybean.jpg"
import riceImg from "@/assets/rice.jpg"
import maizeImg from "@/assets/maize.jpg"

const dummyProducts = [
  { id: 1, crop: "Wheat", variety: "Sharbati", farmer: "Ramesh Kumar", fpo: "Kisan FPO", district: "Sehore", quantity: 50, price: 2350, verified: true, image: wheatImg },
  { id: 2, crop: "Soybean", variety: "JS 9560", farmer: "Suresh Singh", fpo: null, district: "Ujjain", quantity: 120, price: 4200, verified: false, image: soybeanImg },
  { id: 3, crop: "Rice (Paddy)", variety: "Basmati 1121", farmer: "Manoj Patel", fpo: "Green Valley FPO", district: "Karnal", quantity: 80, price: 3800, verified: true, image: riceImg },
  { id: 4, crop: "Maize", variety: "Hybrid", farmer: "Vikram Yadav", fpo: "AgriTech FPO", district: "Chhindwara", quantity: 200, price: 1850, verified: true, image: maizeImg },
]

export function Marketplace() {
  const [selectedProduct, setSelectedProduct] = useState<typeof dummyProducts[0] | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setSelectedProduct(null)
      }, 2000)
    }, 1000)
  }

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Buyer Marketplace</h1>
          <p className="text-muted-foreground">Discover and purchase premium quality produce directly from farmers.</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search crops, varieties, or districts..."
            className="w-full rounded-md border border-input bg-background pl-9 pr-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <select className="rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hidden sm:block">
          <option>All Crops</option>
          <option>Wheat</option>
          <option>Rice</option>
          <option>Soybean</option>
        </select>
        <select className="rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hidden sm:block">
          <option>All Districts</option>
          <option>Sehore</option>
          <option>Ujjain</option>
          <option>Karnal</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dummyProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden glass hover:shadow-lg transition-all group border-transparent hover:border-green-200">
            <div className="aspect-[4/3] relative overflow-hidden">
              <img src={product.image} alt={product.crop} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
              {product.verified && (
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-xs font-medium text-green-700 shadow-sm">
                  <BadgeCheck className="h-3 w-3" /> FPO Verified
                </div>
              )}
            </div>
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{product.crop}</h3>
                  <p className="text-sm text-muted-foreground">{product.variety}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600 flex items-center justify-end">
                    <IndianRupee className="h-4 w-4" />{product.price}
                  </div>
                  <p className="text-xs text-muted-foreground">per Qtl</p>
                </div>
              </div>
              
              <div className="space-y-1 text-sm pt-2 border-t">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 mr-1" /> {product.district}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Farmer:</span>
                  <span className="font-medium truncate max-w-[120px]">{product.farmer}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Available:</span>
                  <span className="font-medium">{product.quantity} Qtl</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-2 w-full">
                <Button variant="outline" className="w-full text-xs">View Details</Button>
                <Button 
                  className="w-full text-xs bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => setSelectedProduct(product)}
                >
                  Send Offer
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Send Offer Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            {showSuccess ? (
              <CardContent className="p-10 flex flex-col items-center justify-center text-center space-y-4">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Offer Sent Successfully!</h2>
                <p className="text-muted-foreground">
                  Your offer has been sent to {selectedProduct.farmer}. They will be notified immediately.
                </p>
              </CardContent>
            ) : (
              <>
                <div className="flex justify-between items-center p-6 pb-2">
                  <h2 className="text-xl font-bold">Send Offer</h2>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedProduct(null)} className="h-8 w-8 rounded-full">
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <CardContent className="p-6 pt-2">
                  <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg mb-6">
                    <img src={selectedProduct.image} alt={selectedProduct.crop} className="w-12 h-12 rounded-md object-cover" />
                    <div>
                      <p className="font-medium">{selectedProduct.crop} ({selectedProduct.variety})</p>
                      <p className="text-sm text-muted-foreground">Listing Price: ₹{selectedProduct.price} / Qtl</p>
                    </div>
                  </div>

                  <form onSubmit={handleSendOffer} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">Offer Amount (per Qtl)</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input 
                          required 
                          type="number" 
                          min={selectedProduct.price} 
                          defaultValue={selectedProduct.price}
                          className="w-full rounded-md border border-input bg-background pl-9 pr-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" 
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Minimum offer must be equal to or greater than the listing price.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">Quantity Required (Qtl)</label>
                      <input 
                        required 
                        type="number" 
                        min="1" 
                        max={selectedProduct.quantity}
                        defaultValue={Math.min(10, selectedProduct.quantity)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" 
                      />
                      <p className="text-xs text-muted-foreground">Maximum available: {selectedProduct.quantity} Qtl</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">Message (Optional)</label>
                      <textarea 
                        rows={3}
                        placeholder="e.g., Interested in immediate pickup..."
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none" 
                      />
                    </div>

                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Submit Offer"}
                    </Button>
                  </form>
                </CardContent>
              </>
            )}
          </Card>
        </div>
      )}
    </div>
  )
}
