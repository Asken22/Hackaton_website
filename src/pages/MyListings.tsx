import { Link } from "react-router-dom"
import { Package, MessageSquare, CheckCircle, Plus, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import wheatImg from "@/assets/wheat.jpg"
import soybeanImg from "@/assets/soybean.jpg"
import riceImg from "@/assets/rice.jpg"

const listings = [
  {
    id: 1,
    crop: "Basmati Rice",
    grade: "Grade A+",
    harvestDate: "21 May 2024",
    listedTime: "2 days ago",
    quantity: "120",
    price: "3,420",
    status: "Active",
    image: riceImg,
  },
  {
    id: 2,
    crop: "Mustard",
    grade: "Grade A",
    harvestDate: "21 May 2024",
    listedTime: "2 days ago",
    quantity: "48",
    price: "5,780",
    status: "Active",
    image: soybeanImg, // Using soybean image as placeholder for mustard
  },
  {
    id: 3,
    crop: "Wheat",
    grade: "Grade A+",
    harvestDate: "21 May 2024",
    listedTime: "2 days ago",
    quantity: "200",
    price: "2,410",
    status: "Active",
    image: wheatImg,
  },
]

export function MyListings() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold tracking-wider text-green-600 uppercase">Manage Produce</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">My listings</h1>
          <p className="text-muted-foreground text-lg">Track your produce and the interest it's receiving.</p>
        </div>
        <Button className="bg-[#1e8b4b] hover:bg-[#166d3a] text-white" asChild>
          <Link to="/upload">
            <Plus className="mr-2 h-4 w-4" /> Upload produce
          </Link>
        </Button>
      </div>

      {/* Top Stat Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm border-gray-200">
          <CardContent className="p-6 flex items-start gap-4">
            <div className="mt-1 flex items-center justify-center text-green-700">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Active listings</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">04</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-200">
          <CardContent className="p-6 flex items-start gap-4">
            <div className="mt-1 flex items-center justify-center text-green-700">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total offers</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">12</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-200">
          <CardContent className="p-6 flex items-start gap-4">
            <div className="mt-1 flex items-center justify-center text-green-700">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Sold this season</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">₹4.8L</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Listings Card */}
      <Card className="shadow-sm border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {listings.map((item) => (
            <div key={item.id} className="p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
              
              {/* Image & Info */}
              <div className="flex items-center gap-6 flex-1 min-w-0 w-full">
                <img 
                  src={item.image} 
                  alt={item.crop} 
                  className="w-20 h-20 rounded-xl object-cover border shadow-sm shrink-0"
                />
                <div className="space-y-1.5 min-w-0">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                    {item.grade}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                    {item.crop}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">
                    Harvested {item.harvestDate} • Listed {item.listedTime}
                  </p>
                </div>
              </div>

              {/* Stats & Actions Row */}
              <div className="flex items-center justify-between w-full md:w-auto md:gap-12 shrink-0">
                
                {/* Quantity */}
                <div className="flex flex-col md:items-start text-left">
                  <span className="text-xs text-gray-500 mb-1">Quantity</span>
                  <span className="font-bold text-gray-900 dark:text-white">{item.quantity} Qtl</span>
                </div>

                {/* Asking Price */}
                <div className="flex flex-col md:items-start text-left">
                  <span className="text-xs text-gray-500 mb-1">Asking price</span>
                  <div className="font-bold text-gray-900 dark:text-white flex items-baseline gap-1">
                    ₹{item.price} <span className="text-xs font-normal text-gray-500">/ Qtl</span>
                  </div>
                </div>

                {/* Status */}
                <div className="flex flex-col md:items-start text-left hidden sm:flex">
                  <span className="text-xs text-gray-500 mb-1">Status</span>
                  <div className="flex items-center text-sm font-medium text-green-700">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    {item.status}
                  </div>
                </div>

                {/* Action */}
                <div className="pl-0 md:pl-4">
                  <Button variant="outline" className="border-gray-200 text-gray-700 hover:text-green-700 hover:border-green-200 transition-colors" asChild>
                    <Link to="/offers">
                      View offers <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
