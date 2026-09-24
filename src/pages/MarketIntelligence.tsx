import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp, Search, MapPin, RefreshCw, AlertCircle, TrendingUp, Calendar, ChevronDown, CheckCircle, Truck, Sparkles, Building2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { useUser } from "@/contexts/UserContext"

// --- Mock Data Generators ---
interface MarketData {
  id: string;
  market: string;
  variety: string;
  unit: string;
  arrivals: number;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  date: string;
  type: string;
}

const STATES_DISTRICTS: Record<string, string[]> = {
  'Maharashtra': ['Pune', 'Nashik', 'Nagpur', 'Mumbai', 'Sangli', 'Ahilyanagar'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
  'Karnataka': ['Bangalore', 'Mysore', 'Hubli'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar'],
  'Haryana': ['Karnal', 'Panipat', 'Rohtak']
}

const CROPS = ['Rice', 'Tomato', 'Onion', 'Banana', 'Orange', 'Wheat', 'Cotton']
const TIME_RANGES = ['7 Days', '15 Days', '30 Days', '90 Days']

const generateMockMarkets = (crop: string, _state: string, district: string): MarketData[] => {
  // Generate 3-5 random markets based on inputs
  const numMarkets = Math.floor(Math.random() * 3) + 3; 
  const markets: MarketData[] = [];
  const basePrice = crop === 'Orange' ? 6000 : crop === 'Rice' ? 3000 : crop === 'Tomato' ? 2000 : crop === 'Cotton' ? 7000 : 4000;
  
  const marketNames = [`${district} Main Mandi`, `${district} Wholesale Market`, `${district} APMC`, `${district} Farmers Market`, `${district} Agro Hub`];

  for (let i = 0; i < numMarkets; i++) {
    const variance = (Math.random() - 0.5) * 2000;
    const modal = Math.round(basePrice + variance);
    markets.push({
      id: `mkt_${i}`,
      market: marketNames[i],
      variety: 'Hybrid No.1',
      unit: 'Quintal',
      arrivals: Math.floor(Math.random() * 500) + 50,
      minPrice: modal - Math.floor(Math.random() * 1000) - 500,
      maxPrice: modal + Math.floor(Math.random() * 1000) + 500,
      modalPrice: modal,
      date: '22 Sept 2026',
      type: 'Local'
    });
  }
  return markets;
}

const generateChartData = (days: number, basePrice: number) => {
  const data = [];
  let currentPrice = basePrice;
  for (let i = days; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    currentPrice = currentPrice + (Math.random() - 0.4) * 200; // slight upward trend
    data.push({
      date: d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
      modal: Math.round(currentPrice),
      min: Math.round(currentPrice - 800),
      max: Math.round(currentPrice + 800),
      arrivals: Math.floor(Math.random() * 300) + 100
    });
  }
  return data;
}

export function MarketIntelligence() {
  const { role } = useUser()

  // Filters State
  const [selectedCrop, setSelectedCrop] = useState('Orange')
  const [selectedState, setSelectedState] = useState('Maharashtra')
  const [selectedDistrict, setSelectedDistrict] = useState('Mumbai')
  const [selectedDate, setSelectedDate] = useState('2026-09-22')
  const [timeRange, setTimeRange] = useState('30 Days')
  
  // Data State
  const [loading, setLoading] = useState(true)
  const [markets, setMarkets] = useState<MarketData[]>([])
  const [chartData, setChartData] = useState<any[]>([])
  
  // Table Sorting
  const [sortKey, setSortKey] = useState<keyof MarketData>('modalPrice')
  const [sortDesc, setSortDesc] = useState(true)

  const handleFetchData = () => {
    setLoading(true)
    // Simulate API delay
    setTimeout(() => {
      const freshMarkets = generateMockMarkets(selectedCrop, selectedState, selectedDistrict)
      setMarkets(freshMarkets)
      
      const days = parseInt(timeRange.split(' ')[0])
      const avgBase = freshMarkets.reduce((acc, m) => acc + m.modalPrice, 0) / freshMarkets.length || 4000
      setChartData(generateChartData(days, avgBase))
      
      setLoading(false)
    }, 1200)
  }

  // Initial Fetch & Refetch on filter change
  useEffect(() => {
    handleFetchData()
  }, [selectedCrop, selectedState, selectedDistrict, timeRange, selectedDate])

  // Handle State Change -> Reset District
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    setSelectedState(newState);
    setSelectedDistrict(STATES_DISTRICTS[newState][0]);
  }

  const sortedMarkets = useMemo(() => {
    return [...markets].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (aVal < bVal) return sortDesc ? 1 : -1
      if (aVal > bVal) return sortDesc ? -1 : 1
      return 0
    })
  }, [markets, sortKey, sortDesc])

  const handleSort = (key: keyof MarketData) => {
    if (sortKey === key) {
      setSortDesc(!sortDesc)
    } else {
      setSortKey(key)
      setSortDesc(true)
    }
  }

  // Derived Insights
  const bestMarket = useMemo(() => {
    if (!markets.length) return null;
    return [...markets].sort((a, b) => b.modalPrice - a.modalPrice)[0];
  }, [markets])

  const lowestMarket = useMemo(() => {
    if (!markets.length) return null;
    return [...markets].sort((a, b) => a.modalPrice - b.modalPrice)[0];
  }, [markets])

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      
      {/* Header & Live Status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold border border-green-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
            </span>
            Live Data from AGMARKNET
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Market Intelligence</h1>
          <p className="text-muted-foreground text-lg">Real-time commodity prices and AI-driven recommendations.</p>
        </div>
        <div className="text-sm text-gray-500 text-right">
          <p>Last Updated</p>
          <p className="font-bold text-gray-900">23-09-2026 • 11:00 AM</p>
        </div>
      </div>

      {/* Dynamic Filters */}
      <Card className="bg-white shadow-sm border-gray-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Crop</label>
              <div className="relative">
                <select value={selectedCrop} onChange={e => setSelectedCrop(e.target.value)} className="w-full appearance-none bg-gray-50 border rounded-md px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-green-500 font-medium">
                  {CROPS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">State</label>
              <div className="relative">
                <select value={selectedState} onChange={handleStateChange} className="w-full appearance-none bg-gray-50 border rounded-md px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-green-500 font-medium">
                  {Object.keys(STATES_DISTRICTS).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">District</label>
              <div className="relative">
                <select value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)} className="w-full appearance-none bg-gray-50 border rounded-md px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-green-500 font-medium">
                  {STATES_DISTRICTS[selectedState].map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Date</label>
              <div className="relative">
                <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-full bg-gray-50 border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 font-medium" />
              </div>
            </div>

            <div className="flex items-end lg:justify-end">
              <Button onClick={handleFetchData} disabled={loading} className="w-full lg:w-auto bg-green-700 hover:bg-green-800">
                {loading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
                Search API
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State / Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
          <div className="h-48 bg-gray-200 rounded-xl"></div>
          <div className="h-48 bg-gray-200 rounded-xl"></div>
          <div className="h-48 bg-gray-200 rounded-xl"></div>
          <div className="h-[400px] bg-gray-200 rounded-xl md:col-span-3"></div>
        </div>
      ) : markets.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto" />
          <h3 className="text-xl font-bold text-gray-700">No market data available</h3>
          <p className="text-gray-500">No records found for {selectedCrop} in {selectedDistrict} on {selectedDate}.</p>
          <Button variant="outline" onClick={handleFetchData}>Retry Fetch</Button>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
            
            {/* Insights & Recommendations */}
            {bestMarket && lowestMarket && (
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* AI Market Insight */}
                <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-100 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="h-5 w-5 text-indigo-600" />
                      <h3 className="text-lg font-bold text-indigo-900">Market Insight</h3>
                    </div>
                    <p className="text-indigo-800 leading-relaxed">
                      <strong className="font-extrabold">{bestMarket.market}</strong> offers the highest modal price today for {selectedCrop}. 
                      Selling there could increase revenue by approximately <strong className="text-green-700">₹{(bestMarket.modalPrice - lowestMarket.modalPrice).toLocaleString()} per quintal</strong> compared to {lowestMarket.market}.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-md">
                      <TrendingUp className="h-4 w-4" /> Price is trending upward across {selectedDistrict}.
                    </div>
                  </CardContent>
                </Card>

                {/* Smart Recommendation */}
                <Card className="bg-green-700 text-white shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Building2 className="h-32 w-32" />
                  </div>
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="h-5 w-5 text-green-200" />
                      <h3 className="text-lg font-bold text-green-50">Recommended Action</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-green-200 text-xs uppercase tracking-wider">Best Market</p>
                        <p className="font-bold text-lg">{bestMarket.market}</p>
                      </div>
                      <div>
                        <p className="text-green-200 text-xs uppercase tracking-wider">Expected Price</p>
                        <p className="font-bold text-lg">₹{bestMarket.modalPrice.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-green-200 text-xs uppercase tracking-wider">Buyer Demand</p>
                        <p className="font-bold text-lg">High</p>
                      </div>
                      <div>
                        <p className="text-green-200 text-xs uppercase tracking-wider">Market Trend</p>
                        <p className="font-bold text-lg flex items-center gap-1"><ArrowUp className="h-4 w-4"/> Increasing</p>
                      </div>
                    </div>
                    <div className="bg-green-800/50 rounded-md p-3 text-sm font-medium">
                      Recommendation: Sell within the next 2 days to maximize profit margins.
                    </div>
                  </CardContent>
                </Card>

              </div>
            )}

            {/* Dynamic Market Cards */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><MapPin className="h-5 w-5 text-gray-400"/> Local Markets in {selectedDistrict}</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {markets.map((market) => {
                  const isBest = bestMarket?.id === market.id;
                  const isLowest = lowestMarket?.id === market.id && markets.length > 1;
                  
                  return (
                    <Card key={market.id} className={`shadow-sm transition-all border-2 ${isBest ? 'border-green-500 bg-green-50/30' : 'border-gray-200'}`}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base font-bold text-gray-800">{market.market}</CardTitle>
                          {isBest && <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">Highest</span>}
                          {isLowest && <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">Lowest</span>}
                        </div>
                        <CardDescription className="text-xs">{market.variety} • {market.type}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-baseline gap-1 mb-4">
                          <span className="text-3xl font-extrabold text-gray-900">₹{market.modalPrice.toLocaleString()}</span>
                          <span className="text-xs text-gray-500">/ {market.unit}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-y-2 text-sm border-t pt-3">
                          <div><p className="text-gray-500 text-xs">Min Price</p><p className="font-medium text-gray-900">₹{market.minPrice}</p></div>
                          <div><p className="text-gray-500 text-xs">Max Price</p><p className="font-medium text-gray-900">₹{market.maxPrice}</p></div>
                          <div className="col-span-2"><p className="text-gray-500 text-xs">Arrivals Today</p><p className="font-medium text-gray-900">{market.arrivals} {market.unit}s</p></div>
                        </div>

                        {role === 'farmer' && (
                           <Button className="w-full mt-4 bg-gray-900 hover:bg-gray-800" variant="default" size="sm">
                             <Truck className="h-3 w-3 mr-2" /> Book Logistics Here
                           </Button>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Historical Trend Chart */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-4">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Historical Price Trend
                  </CardTitle>
                  <CardDescription>Average modal prices across {selectedDistrict}</CardDescription>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  {TIME_RANGES.map(range => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${timeRange === range ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="h-[350px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorModal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorMinMax" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(val) => `₹${val/1000}k`} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: any, name: any) => [`₹${Number(value).toLocaleString()}`, String(name).charAt(0).toUpperCase() + String(name).slice(1) + ' Price']}
                    />
                    <Area type="monotone" dataKey="max" stroke="none" fillOpacity={1} fill="url(#colorMinMax)" />
                    <Area type="monotone" dataKey="min" stroke="none" fillOpacity={1} fill="white" />
                    <Area type="monotone" dataKey="modal" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorModal)" activeDot={{ r: 6, fill: '#16a34a', stroke: '#fff', strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Sortable Table */}
            <Card className="shadow-sm border-gray-200 overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  Detailed Market Report
                </CardTitle>
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold border-y">
                    <tr>
                      <th className="px-4 py-3 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('market')}>
                        Market {sortKey === 'market' && (sortDesc ? '↓' : '↑')}
                      </th>
                      <th className="px-4 py-3">Variety</th>
                      <th className="px-4 py-3 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('arrivals')}>
                        Arrivals {sortKey === 'arrivals' && (sortDesc ? '↓' : '↑')}
                      </th>
                      <th className="px-4 py-3 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('minPrice')}>
                        Min Price {sortKey === 'minPrice' && (sortDesc ? '↓' : '↑')}
                      </th>
                      <th className="px-4 py-3 cursor-pointer hover:bg-gray-100" onClick={() => handleSort('maxPrice')}>
                        Max Price {sortKey === 'maxPrice' && (sortDesc ? '↓' : '↑')}
                      </th>
                      <th className="px-4 py-3 cursor-pointer hover:bg-gray-100 bg-green-50/50 text-green-800" onClick={() => handleSort('modalPrice')}>
                        Modal Price {sortKey === 'modalPrice' && (sortDesc ? '↓' : '↑')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {sortedMarkets.map((market) => (
                      <tr key={market.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-semibold text-gray-900">{market.market}</td>
                        <td className="px-4 py-3 text-gray-500">{market.variety}</td>
                        <td className="px-4 py-3 font-medium">{market.arrivals} {market.unit}</td>
                        <td className="px-4 py-3 text-gray-500">₹{market.minPrice}</td>
                        <td className="px-4 py-3 text-gray-500">₹{market.maxPrice}</td>
                        <td className="px-4 py-3 font-bold text-gray-900 bg-green-50/30">₹{market.modalPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

          </motion.div>
        </AnimatePresence>
      )}

    </div>
  )
}
