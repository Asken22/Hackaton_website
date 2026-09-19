import { useState } from "react"
import { ArrowUp, ArrowRight, ChevronDown, Truck, Building2 } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: '01 May', price: 1500 },
  { name: '07 May', price: 2100 },
  { name: '14 May', price: 2300 },
  { name: '21 May', price: 2900 },
  { name: 'Today', price: 3420 },
]

export function MarketIntelligence() {
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null)

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header Section */}
      <div className="space-y-2">
        <p className="text-sm font-semibold tracking-wider text-green-600 uppercase">Government-Backed Data</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Market Intelligence</h1>
        <p className="text-muted-foreground text-lg">Compare mandi prices using trusted AGMARKNET datasets.</p>
      </div>

      {/* Selectors */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-3">
          <button className="flex items-center justify-between gap-2 px-4 py-2 bg-white border rounded-md shadow-sm text-sm font-medium hover:bg-gray-50">
            Basmati Rice <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
          <button className="flex items-center justify-between gap-2 px-4 py-2 bg-white border rounded-md shadow-sm text-sm font-medium hover:bg-gray-50">
            Karnal district <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Live from AGMARKNET
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Current Market Price */}
        <Card className="bg-green-700 text-white border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-100">Local Mandi (Karnal)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">₹3,420</span>
              <span className="text-sm text-green-100">/ quintal</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-green-100 flex items-center">
                <ArrowUp className="h-4 w-4 mr-1" /> 8.4% vs last week
              </span>
              <Button 
                variant="secondary" 
                size="sm" 
                className="bg-white text-green-700 hover:bg-green-50"
                onClick={() => setSelectedMarket('Karnal')}
              >
                Select
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Nearby Market 1 */}
        <Card className={`shadow-sm transition-all border-2 ${selectedMarket === 'Kurukshetra' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Kurukshetra Mandi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-gray-900">₹3,470</span>
              <span className="text-sm text-gray-500">/ quintal</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-green-600 font-medium">+₹50 higher</span>
              <Button 
                variant={selectedMarket === 'Kurukshetra' ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedMarket('Kurukshetra')}
              >
                {selectedMarket === 'Kurukshetra' ? 'Selected' : 'Select'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Nearby Market 2 */}
        <Card className={`shadow-sm transition-all border-2 ${selectedMarket === 'Panipat' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Panipat Mandi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-gray-900">₹3,450</span>
              <span className="text-sm text-gray-500">/ quintal</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-green-600 font-medium">+₹30 higher</span>
              <Button 
                variant={selectedMarket === 'Panipat' ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedMarket('Panipat')}
              >
                {selectedMarket === 'Panipat' ? 'Selected' : 'Select'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kisan Rath Integration */}
      {selectedMarket && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-900">Logistics Required for {selectedMarket}?</h3>
              <p className="text-blue-700">Book government-verified transport to the selected mandi seamlessly.</p>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shrink-0">
            Continue with Kisan Rath <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      )}

      {/* Main Content Area */}
      <div className="grid gap-6 md:grid-cols-3 mt-6">
        {/* Trend Chart */}
        <Card className="md:col-span-2 shadow-sm border-gray-200 flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">30-Day Historical Trend</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} tickFormatter={(value) => `${value / 1000}k`} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} formatter={(value) => [`₹${value}`, "Price"]} />
                <Area type="monotone" dataKey="price" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" activeDot={{ r: 6, fill: '#fff', stroke: '#16a34a', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* eNAM Feed */}
        <Card className="shadow-sm border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Building2 className="h-5 w-5 text-gray-500" />
              eNAM Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-2 border-green-500 pl-4">
                <p className="text-sm font-medium">New Buyer registered in Karnal</p>
                <p className="text-xs text-gray-500 mt-1">10 mins ago</p>
              </div>
              <div className="border-l-2 border-blue-500 pl-4">
                <p className="text-sm font-medium">Govt MSP announced for Kharif</p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
              <div className="border-l-2 border-orange-500 pl-4">
                <p className="text-sm font-medium">Weather Alert: Light rain expected</p>
                <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
