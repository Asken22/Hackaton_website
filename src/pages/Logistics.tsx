import { MapPin, Phone, Truck, ArrowRight, Download, Building, Users, BadgeCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const logisticsOptions = [
  {
    id: 1,
    type: "National App",
    name: "Kisan Rath",
    description: "Mobile app for booking farm transport",
    coverage: "Pan-India / Karnal region",
    contactPerson: "Kisan Rath support",
    phone: "+91 1800 120 4567",
    icon: Truck,
    isApp: true,
    actionText: "Download Kisan Rath app",
    color: "bg-green-100 text-green-700",
  },
  {
    id: 2,
    type: "Private Logistics",
    name: "Shakti Transport Services",
    description: "Reliable local fleet for timely deliveries",
    coverage: "18 km from your farm",
    contactPerson: "Rajesh Meena",
    phone: "+91 98765 43210",
    icon: Users,
    isApp: false,
    actionText: "Contact Rajesh Meena",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 3,
    type: "Public Logistics",
    name: "Haryana State Transport",
    description: "Government subsidized transport network",
    coverage: "Karnal district service",
    contactPerson: "Transport helpdesk",
    phone: "+91 1800 180 2020",
    icon: Building,
    isApp: false,
    actionText: "Contact Transport helpdesk",
    color: "bg-orange-100 text-orange-700",
  }
]

export function Logistics() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Header Section */}
      <div className="space-y-2">
        <p className="text-sm font-semibold tracking-wider text-green-600 uppercase">Fulfilment</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">Move your produce</h1>
        <p className="text-muted-foreground text-lg">Connect with a transport option that works for your pickup.</p>
      </div>

      {/* Location Banner */}
      <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center shrink-0">
            <Truck className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-green-800 dark:text-green-200">Based on your location in</p>
            <p className="font-bold text-green-900 dark:text-green-50">Karnal, Haryana</p>
          </div>
        </div>
        <Button variant="outline" className="text-green-700 border-green-200 hover:bg-green-100 bg-white dark:bg-gray-800 shadow-sm shrink-0">
          Change location
        </Button>
      </div>

      {/* Logistics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {logisticsOptions.map((option) => {
          const Icon = option.icon
          return (
            <Card key={option.id} className="overflow-hidden glass hover:shadow-xl transition-all border-transparent hover:border-green-200 flex flex-col group">
              <CardContent className="p-6 flex flex-col h-full">
                
                {/* Card Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${option.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                    {option.type}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="mb-6 flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{option.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{option.description}</p>
                </div>

                {/* Coverage & Status */}
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-6 py-3 border-y border-gray-100 dark:border-gray-800">
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1.5 text-gray-400" />
                    {option.coverage}
                  </span>
                  <span className="flex items-center text-green-600 font-medium">
                    <BadgeCheck className="h-4 w-4 mr-1.5" />
                    Contact available
                  </span>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Contact person</p>
                    <p className="font-semibold text-gray-900 dark:text-white truncate" title={option.contactPerson}>{option.contactPerson}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Phone</p>
                    <p className="font-semibold text-gray-900 dark:text-white truncate flex items-center">
                      {option.phone}
                    </p>
                  </div>
                </div>

                {/* Call to Action */}
                <Button 
                  variant={option.isApp ? "default" : "outline"}
                  className={`w-full mt-auto ${
                    option.isApp 
                      ? "bg-[#1e8b4b] hover:bg-[#166d3a] text-white" 
                      : "border-gray-300 text-gray-700 hover:text-green-700 hover:border-green-300 bg-transparent hover:bg-green-50"
                  }`}
                >
                  {option.isApp ? <Download className="mr-2 h-4 w-4" /> : <Phone className="mr-2 h-4 w-4" />}
                  {option.actionText}
                </Button>

              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
