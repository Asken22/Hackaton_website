import { Plus, X, ArrowRight, Check, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

const initialFarmers = [
  {
    id: "f1",
    name: "Farmer A · You",
    initials: "RK",
    crop: "Basmati Rice · Grade A+",
    quantity: 20,
    color: "bg-green-100 text-green-700",
  },
  {
    id: "f2",
    name: "Farmer B · Amit Singh",
    initials: "AM",
    crop: "Basmati Rice · Grade A",
    quantity: 30,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "f3",
    name: "Farmer C · Priya Sharma",
    initials: "PS",
    crop: "Basmati Rice · Grade A+",
    quantity: 50,
    color: "bg-orange-100 text-orange-700",
  }
]

export function LotCreation() {
  const [farmers, setFarmers] = useState(initialFarmers)
  const [isPublishing, setIsPublishing] = useState(false)
  const [published, setPublished] = useState(false)

  const totalQuantity = farmers.reduce((sum, f) => sum + f.quantity, 0)
  
  const removeFarmer = (id: string) => {
    setFarmers(farmers.filter(f => f.id !== id))
  }

  const handlePublish = () => {
    setIsPublishing(true)
    setTimeout(() => {
      setIsPublishing(false)
      setPublished(true)
    }, 1500)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header Section */}
      <div className="space-y-2">
        <p className="text-sm font-semibold tracking-wider text-green-600 uppercase">Fulfilment</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">Build a collective lot</h1>
        <p className="text-muted-foreground text-lg">Combine produce with trusted farmers to unlock larger buyer demand.</p>
      </div>

      {published ? (
        <Card className="shadow-sm border-gray-200 mt-8 animate-in fade-in zoom-in duration-300">
          <CardContent className="p-16 flex flex-col items-center justify-center text-center">
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Lot Published Successfully!</h2>
            <p className="text-xl text-gray-500 mb-8 max-w-lg">
              Your collective lot of {totalQuantity} Quintals is now live on the marketplace. Buyers will be notified of this premium volume.
            </p>
            <Button variant="outline" className="text-green-700 border-green-200 hover:bg-green-50" onClick={() => { setPublished(false); setFarmers(initialFarmers); }}>
              Build Another Lot
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-sm border-gray-200 mt-8 relative">
          {/* Top Tag */}
          <div className="absolute top-6 right-6 flex items-center gap-2 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full text-xs font-bold border border-orange-100">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
            Draft lot
          </div>

          <CardHeader className="pb-8">
            <CardTitle className="text-2xl font-bold">Lot builder</CardTitle>
            <p className="text-sm text-gray-500">Combine harvests from your FPO network</p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            
            {/* Farmers Horizontal Flow */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-8 overflow-x-auto">
              {farmers.map((farmer, index) => (
                <div key={farmer.id} className="flex flex-col md:flex-row items-center gap-4 shrink-0">
                  
                  {/* Farmer Card */}
                  <div className="flex items-center p-3 pr-4 border border-gray-200 rounded-xl bg-white dark:bg-gray-950 min-w-[280px]">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm mr-3 ${farmer.color}`}>
                      {farmer.initials}
                    </div>
                    <div className="flex-1 min-w-0 mr-4">
                      <p className="font-bold text-sm text-gray-900 dark:text-white truncate">{farmer.name}</p>
                      <p className="text-[10px] text-gray-500 truncate">{farmer.crop}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-sm whitespace-nowrap">{farmer.quantity} Qtl</span>
                      <button 
                        onClick={() => removeFarmer(farmer.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Plus Connector (don't show after last item) */}
                  {index < farmers.length - 1 && (
                    <div className="hidden md:flex h-6 w-6 rounded-full bg-green-50 items-center justify-center text-green-600 shrink-0">
                      <Plus className="h-3 w-3" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Button variant="ghost" className="text-green-700 hover:text-green-800 hover:bg-green-50 font-bold px-0 -mt-2">
              <Plus className="mr-2 h-4 w-4" /> Add a farmer
            </Button>

            {/* Bottom Summary Bar */}
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="flex items-center gap-8 w-full md:w-auto">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Total lot size</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-gray-900 dark:text-white">{totalQuantity}</span>
                    <span className="text-sm text-gray-500">Quintals</span>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 hidden md:block" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Buyer readiness</p>
                  <p className="flex items-center text-green-700 font-bold">
                    <Check className="h-4 w-4 mr-1.5" /> Ready for buyer
                  </p>
                </div>
              </div>

              <Button 
                className="bg-[#1e8b4b] hover:bg-[#166d3a] text-white w-full md:w-auto px-8 py-6 text-base shadow-sm"
                onClick={handlePublish}
                disabled={isPublishing || farmers.length === 0}
              >
                {isPublishing ? "Publishing..." : (
                  <>Publish lot <ArrowRight className="ml-2 h-5 w-5" /></>
                )}
              </Button>
            </div>

          </CardContent>
        </Card>
      )}
    </div>
  )
}
