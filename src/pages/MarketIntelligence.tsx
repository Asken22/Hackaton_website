import { 
  ArrowUp, 
  MapPin, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Warehouse, 
  CloudSun, 
  Building2, 
  ChevronDown,
  ArrowUpRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: '01 May', price: 1500 },
  { name: '07 May', price: 2100 },
  { name: '14 May', price: 2300 },
  { name: '21 May', price: 2900 },
  { name: 'Today', price: 3420 },
]

export function MarketIntelligence() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header Section */}
      <div className="space-y-2">
        <p className="text-sm font-semibold tracking-wider text-green-600 uppercase">Market Intelligence</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">Make your next move count</h1>
        <p className="text-muted-foreground text-lg">Live signals from 42 mandis, simplified for you.</p>
      </div>

      {/* Selectors and Last Updated */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-3">
          <button className="flex items-center justify-between gap-2 px-4 py-2 bg-white border rounded-md shadow-sm text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500">
            Basmati Rice <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
          <button className="flex items-center justify-between gap-2 px-4 py-2 bg-white border rounded-md shadow-sm text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500">
            Karnal district <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Updated 4 min ago
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Current Market Price */}
        <Card className="bg-[#1e8b4b] text-white border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-100">Current market price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">₹3,420</span>
              <span className="text-sm text-green-100">/ quintal</span>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-100 font-medium">
              <ArrowUp className="h-4 w-4 mr-1" />
              8.4% vs last week
            </div>
          </CardContent>
        </Card>

        {/* Best Nearby Market */}
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Best nearby market</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">₹3,470</span>
              <span className="text-sm text-gray-500">/ Qtl</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1.5" />
                Kurukshetra Mandi
              </div>
              <span className="text-green-600 font-medium">+₹50</span>
            </div>
          </CardContent>
        </Card>

        {/* Buyer Demand */}
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Buyer demand</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">High</span>
              <span className="text-sm text-green-600 font-medium flex items-center">
                <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" />
                22%
              </span>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1.5" />
              12 active buyers today
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Trend Chart */}
        <Card className="md:col-span-2 shadow-sm border-gray-200 flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">30-day price trend</CardTitle>
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
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`₹${value}`, "Price"]}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#16a34a" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorPrice)" 
                  activeDot={{ r: 6, fill: '#fff', stroke: '#16a34a', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="shadow-sm border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Today's recommendation</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col">
              
              {/* Item 1 */}
              <div className="px-6 py-4 flex items-center justify-between border-b last:border-0 hover:bg-gray-50 transition-colors group cursor-pointer">
                <div className="flex gap-4">
                  <div className="mt-1 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Sell today</p>
                    <p className="text-sm text-gray-500">Good demand, fair price</p>
                  </div>
                </div>
                <span className="font-bold text-green-600">₹3,420</span>
              </div>

              {/* Item 2 */}
              <div className="px-6 py-4 flex items-center justify-between border-b last:border-0 hover:bg-gray-50 transition-colors group cursor-pointer">
                <div className="flex gap-4">
                  <div className="mt-1 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <ArrowRight className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Better buyer available</p>
                    <p className="text-sm text-gray-500">2 buyers match your grade</p>
                  </div>
                </div>
                <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors -rotate-90" />
              </div>

              {/* Item 3 */}
              <div className="px-6 py-4 flex items-center justify-between border-b last:border-0 hover:bg-gray-50 transition-colors group cursor-pointer">
                <div className="flex gap-4">
                  <div className="mt-1 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Better market available</p>
                    <p className="text-sm text-gray-500">₹50 more • 48 km away</p>
                  </div>
                </div>
                <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors -rotate-90" />
              </div>

              {/* Item 4 */}
              <div className="px-6 py-4 flex items-center justify-between border-b last:border-0 hover:bg-gray-50 transition-colors group cursor-pointer">
                <div className="flex gap-4">
                  <div className="mt-1 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <Warehouse className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Consider storage</p>
                    <p className="text-sm text-gray-500">Capacity available nearby</p>
                  </div>
                </div>
                <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors -rotate-90" />
              </div>

            </div>
          </CardContent>
        </Card>
      </div>

      {/* Community Updates */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg">Community updates</CardTitle>
          <a href="#" className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center">
            See all updates <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-3">
              <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                <CloudSun className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-semibold text-gray-900 dark:text-white">Weather watch</span>
                  <span className="text-gray-500 mx-1">·</span>
                  <span className="text-gray-600 dark:text-gray-300">Light rain expected in Karnal tomorrow. Plan your pickup accordingly.</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                <Building2 className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-semibold text-gray-900 dark:text-white">Government update</span>
                  <span className="text-gray-500 mx-1">·</span>
                  <span className="text-gray-600 dark:text-gray-300">New MSP guidelines published for the Kharif season.</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">Yesterday</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
