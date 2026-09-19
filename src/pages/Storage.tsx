import { MapPin, Phone, Warehouse, Ruler, ThermometerSnowflake, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import warehouse1Img from "@/assets/warehouse_1.jpg"
import warehouse2Img from "@/assets/warehouse_2.jpg"
import warehouse3Img from "@/assets/warehouse_3.jpg"

const storages = [
  {
    id: 1,
    name: "MahaAgri Cold Chain Solutions",
    address: "Plot 45, MIDC Industrial Area, Satpur, Nashik, Maharashtra 422007",
    phone: "+91 98765 43210",
    capacity: "5000 MT",
    type: "Cold Storage",
    verified: true,
    price: "₹120 / Qtl / Month",
    image: warehouse1Img,
    features: ["Temperature Control", "24/7 Security", "Fumigation"],
  },
  {
    id: 2,
    name: "Deccan Grain Silos & Warehousing",
    address: "Gat No 112, Pune-Solapur Highway, Uruli Kanchan, Pune, Maharashtra 412202",
    phone: "+91 99887 76655",
    capacity: "12000 MT",
    type: "Dry Grain Silo",
    verified: true,
    price: "₹80 / Qtl / Month",
    image: warehouse2Img,
    features: ["Automated Weighing", "Pest Control", "Insurance Covered"],
  },
  {
    id: 3,
    name: "Vidarbha Agro Logistics Park",
    address: "Survey 88, Wardha Road, Butibori, Nagpur, Maharashtra 441122",
    phone: "+91 88776 65544",
    capacity: "8500 MT",
    type: "Mixed Storage",
    verified: false,
    price: "₹95 / Qtl / Month",
    image: warehouse3Img,
    features: ["Loading Docks", "Ventilation", "Transport Assistance"],
  }
]

export function Storage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold tracking-wider text-green-600 uppercase">Fulfilment</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Warehouse & Cold Storage</h1>
          <p className="text-muted-foreground text-lg">Find secure and verified warehousing across Maharashtra to safely store your produce.</p>
        </div>
        <button className="bg-green-700 text-white hover:bg-green-800 px-6 py-3 rounded-full font-medium shadow-sm transition-colors">
          Find Nearby Warehouses
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {storages.map((storage) => (
          <Card key={storage.id} className="overflow-hidden glass hover:shadow-xl transition-all group border-transparent hover:border-green-200 flex flex-col">
            <div className="aspect-video relative overflow-hidden shrink-0">
              <img src={storage.image} alt={storage.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
              {storage.verified && (
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-md flex items-center gap-1.5 text-xs font-bold text-green-700 shadow-sm">
                  <ShieldCheck className="h-4 w-4" /> Verified
                </div>
              )}
            </div>
            
            <CardContent className="p-6 flex-1 flex flex-col">
              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl leading-tight text-gray-900 dark:text-white">{storage.name}</h3>
                </div>
                <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                  {storage.type === 'Cold Storage' ? <ThermometerSnowflake className="w-3 h-3 mr-1" /> : <Warehouse className="w-3 h-3 mr-1" />}
                  {storage.type}
                </div>
              </div>

              <div className="space-y-3 mb-6 flex-1">
                <div className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-2.5 mt-0.5 text-gray-400 shrink-0" />
                  <span className="leading-snug">{storage.address}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Phone className="h-4 w-4 mr-2.5 text-gray-400 shrink-0" />
                  {storage.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Ruler className="h-4 w-4 mr-2.5 text-gray-400 shrink-0" />
                  Capacity: <span className="font-semibold text-gray-900 dark:text-white ml-1">{storage.capacity}</span>
                </div>
              </div>

              <div className="pt-4 border-t space-y-4">
                <div className="flex flex-wrap gap-2">
                  {storage.features.map(f => (
                    <span key={f} className="text-[10px] uppercase tracking-wider font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {f}
                    </span>
                  ))}
                </div>
                <button className="w-full bg-green-50 text-green-700 hover:bg-green-100 py-2 rounded-md font-medium text-sm transition-colors">
                  View Details
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
