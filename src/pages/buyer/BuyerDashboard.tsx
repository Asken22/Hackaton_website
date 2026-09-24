
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import {
  Package, LayoutGrid, Gavel, ShoppingCart, DollarSign,
  Search, Bell, Truck, ArrowUpRight,
  MoreVertical, Clock, Filter, ChevronRight, Home, Zap
} from 'lucide-react';

// --- Dummy Data ---
const monthlyProcurement = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
];


const priceTrends = [
  { name: 'Week 1', wheat: 120, rice: 110, corn: 90 },
  { name: 'Week 2', wheat: 130, rice: 115, corn: 92 },
  { name: 'Week 3', wheat: 125, rice: 112, corn: 88 },
  { name: 'Week 4', wheat: 135, rice: 118, corn: 95 },
];

const upcomingDeliveries = [
  { id: 1, crop: 'Premium Wheat', supplier: 'Ramesh Singh', qty: '500 kg', status: 'In Transit', est: '2 hrs' },
  { id: 2, crop: 'Organic Rice', supplier: 'Suresh Kumar', qty: '200 kg', status: 'Packing', est: 'Tomorrow' },
  { id: 3, crop: 'Sweet Corn', supplier: 'Amit Patel', qty: '100 kg', status: 'Pending', est: '24 Sep' },
];

const recommendedProduce = [
  { id: 1, name: 'Grade A Soybean', price: '₹45/kg', trend: '+2%', bestValue: true },
  { id: 2, name: 'Basmati Rice', price: '₹90/kg', trend: '-1%', bestValue: false },
  { id: 3, name: 'Yellow Corn', price: '₹22/kg', trend: '0%', bestValue: true },
];

const recentActivity = [
  { id: 1, text: 'Bid accepted for Premium Wheat', time: '10 mins ago', type: 'bid' },
  { id: 2, text: 'Order #4892 delivered successfully', time: '1 hour ago', type: 'order' },
  { id: 3, text: 'New listings in your saved locations', time: '3 hours ago', type: 'alert' },
];

export function BuyerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <nav className="flex text-sm text-gray-500 mb-2">
            <ol className="flex items-center space-x-2">
              <li className="flex items-center"><Home className="w-4 h-4 mr-1" /> Home</li>
              <li><ChevronRight className="w-4 h-4" /></li>
              <li className="text-gray-900 font-medium">Dashboard</li>
            </ol>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">Buyer Dashboard</h1>
        </div>

        <div className="flex items-center space-x-4 mt-4 md:mt-0 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search listings, orders..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="p-2 bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <button className="flex items-center justify-center p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-sm">
          <Search className="w-5 h-5 mr-2" /> Browse Listings
        </button>
        <button className="flex items-center justify-center p-4 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition shadow-sm">
          <Gavel className="w-5 h-5 mr-2 text-blue-600" /> Create Bid
        </button>
        <button className="flex items-center justify-center p-4 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition shadow-sm">
          <Truck className="w-5 h-5 mr-2 text-green-600" /> Track Orders
        </button>
        <button className="flex items-center justify-center p-4 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition shadow-sm">
          <LayoutGrid className="w-5 h-5 mr-2 text-purple-600" /> Virtual Lots
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Available Listings</p>
            <h3 className="text-2xl font-bold text-gray-900">1,245</h3>
            <p className="text-sm text-green-600 flex items-center mt-2">
              <ArrowUpRight className="w-3 h-3 mr-1" /> +12% this week
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Active Bids</p>
            <h3 className="text-2xl font-bold text-gray-900">24</h3>
            <p className="text-sm text-gray-500 flex items-center mt-2">
              <Clock className="w-3 h-3 mr-1" /> 5 closing soon
            </p>
          </div>
          <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
            <Gavel className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Active Orders</p>
            <h3 className="text-2xl font-bold text-gray-900">12</h3>
            <p className="text-sm text-green-600 flex items-center mt-2">
              <Truck className="w-3 h-3 mr-1" /> 3 in transit
            </p>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
            <ShoppingCart className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Revenue Saved</p>
            <h3 className="text-2xl font-bold text-gray-900">₹45.2K</h3>
            <p className="text-sm text-green-600 flex items-center mt-2">
              <ArrowUpRight className="w-3 h-3 mr-1" /> +8% vs avg market
            </p>
          </div>
          <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Procurement */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Monthly Procurement (Tons)</h3>
            <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyProcurement}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Price Trends */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Market Price Trends (₹/kg)</h3>
            <div className="flex space-x-2">
              <span className="flex items-center text-xs text-gray-500"><div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>Wheat</span>
              <span className="flex items-center text-xs text-gray-500"><div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>Rice</span>
              <span className="flex items-center text-xs text-gray-500"><div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>Corn</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceTrends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                <Line type="monotone" dataKey="wheat" stroke="#3B82F6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="rice" stroke="#10B981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="corn" stroke="#F59E0B" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section: Tables & Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upcoming Deliveries */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Upcoming Deliveries</h3>
            <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-sm text-gray-500">
                  <th className="pb-3 font-medium">Crop</th>
                  <th className="pb-3 font-medium">Supplier</th>
                  <th className="pb-3 font-medium">Quantity</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Est. Arrival</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {upcomingDeliveries.map((delivery) => (
                  <tr key={delivery.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-4 font-medium text-gray-900">{delivery.crop}</td>
                    <td className="py-4 text-gray-600 flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 flex items-center justify-center text-xs text-gray-600 font-bold">
                        {delivery.supplier.charAt(0)}
                      </div>
                      {delivery.supplier}
                    </td>
                    <td className="py-4 text-gray-600">{delivery.qty}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        delivery.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                        delivery.status === 'Packing' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {delivery.status}
                      </span>
                    </td>
                    <td className="py-4 text-gray-600 flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-gray-400" /> {delivery.est}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommended Produce */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recommended for You</h3>
            <button className="text-gray-400 hover:text-gray-600"><Filter className="w-4 h-4" /></button>
          </div>
          <div className="space-y-4">
            {recommendedProduce.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:border-blue-200 hover:shadow-sm transition cursor-pointer">
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    {item.bestValue && (
                      <span className="flex items-center bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                        <Zap className="w-3 h-3 mr-0.5" /> Best Value
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{item.price}</p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium ${item.trend.startsWith('+') ? 'text-green-600' : item.trend.startsWith('-') ? 'text-red-500' : 'text-gray-500'}`}>
                    {item.trend}
                  </span>
                  <button className="block mt-1 text-xs text-blue-600 hover:underline">View Lots</button>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Recent Activity</h3>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="relative flex items-center justify-between group">
                  <div className="flex items-center space-x-3 w-full">
                    <div className="z-10 flex items-center justify-center w-5 h-5 rounded-full bg-white border-2 border-blue-500 shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{activity.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
