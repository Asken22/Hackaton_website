import { useState } from 'react';
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  MapPin,
  User,
  FileText,
  Phone,
  Calendar,
  DollarSign,
  Box,
  Map,
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';

const SUMMARY_DATA = [
  { label: 'Total Orders', value: 128, icon: Package, color: 'text-blue-600', bg: 'bg-blue-100' },
  { label: 'Delivered', value: 85, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
  { label: 'In Transit', value: 24, icon: Truck, color: 'text-purple-600', bg: 'bg-purple-100' },
  { label: 'Pending', value: 15, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  { label: 'Cancelled', value: 4, icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' }
];

const TIMELINE_STEPS = [
  'Ordered',
  'Confirmed',
  'Packed',
  'Dispatched',
  'Warehouse',
  'Delivered'
];

const ORDERS_DATA = [
  {
    id: 'ORD-2026-8901',
    crop: 'Premium Basmati Rice',
    farmer: 'Harjeet Singh (Punjab Farms)',
    warehouse: 'Karnal Central Storage',
    quantity: '200 Quintals',
    price: '₹3,500/Qtl',
    totalCost: '₹7,00,000',
    orderDate: '2026-09-18',
    expectedDelivery: '2026-09-25',
    transportPartner: 'Bharat Logistics Hub',
    trackingStatus: 'In Transit',
    currentStep: 3,
    verification: 'Quality Assured - Grade A',
    statusColor: 'text-purple-700 bg-purple-100 border-purple-200'
  },
  {
    id: 'ORD-2026-8902',
    crop: 'Organic Red Onions',
    farmer: 'Ramesh Patil',
    warehouse: 'Nashik Cold Storage Unit 4',
    quantity: '50 Tons',
    price: '₹1,800/Qtl',
    totalCost: '₹9,00,000',
    orderDate: '2026-09-22',
    expectedDelivery: '2026-09-26',
    transportPartner: 'AgriExpress Transports',
    trackingStatus: 'Packed',
    currentStep: 2,
    verification: 'APMC Verified',
    statusColor: 'text-blue-700 bg-blue-100 border-blue-200'
  },
  {
    id: 'ORD-2026-8903',
    crop: 'Sona Masuri Rice',
    farmer: 'Venkatesh Rao',
    warehouse: 'Guntur Regional Hub',
    quantity: '150 Quintals',
    price: '₹2,800/Qtl',
    totalCost: '₹4,20,000',
    orderDate: '2026-09-10',
    expectedDelivery: '2026-09-15',
    transportPartner: 'Deccan Cargo Movers',
    trackingStatus: 'Delivered',
    currentStep: 5,
    verification: 'FSSAI Certified',
    statusColor: 'text-green-700 bg-green-100 border-green-200'
  }
];

export function BuyerOrders() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-500 mt-1">Track and manage your agricultural purchases.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search orders..." 
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Top Summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {SUMMARY_DATA.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className={`p-3 rounded-full ${item.bg}`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{item.label}</p>
                <p className="text-xl font-bold text-gray-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Cards */}
        <div className="space-y-6">
          {ORDERS_DATA.filter(o => 
            o.crop.toLowerCase().includes(searchTerm.toLowerCase()) || 
            o.id.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Order Number</p>
                    <p className="font-bold text-gray-900">{order.id}</p>
                  </div>
                  <div className="hidden md:block w-px h-8 bg-gray-300"></div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Order Date</p>
                    <p className="font-semibold text-gray-700 flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {order.orderDate}
                    </p>
                  </div>
                  <div className="hidden md:block w-px h-8 bg-gray-300"></div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Cost</p>
                    <p className="font-bold text-green-700">{order.totalCost}</p>
                  </div>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${order.statusColor}`}>
                  {order.trackingStatus}
                </span>
              </div>

              {/* Order Details Body */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Info Column 1 */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <Package className="w-5 h-5 text-green-600" />
                      {order.crop}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-500" />
                      {order.verification}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Quantity</p>
                      <p className="font-medium text-gray-800 flex items-center gap-1">
                        <Box className="w-4 h-4 text-gray-400" /> {order.quantity}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Price</p>
                      <p className="font-medium text-gray-800 flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-gray-400" /> {order.price}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info Column 2 */}
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Farmer / Seller</p>
                    <p className="font-medium text-gray-800 flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" /> {order.farmer}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Source Warehouse</p>
                    <p className="font-medium text-gray-800 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" /> {order.warehouse}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Transport Partner</p>
                    <p className="font-medium text-gray-800 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-gray-400" /> {order.transportPartner}
                    </p>
                  </div>
                </div>

                {/* Timeline / Status */}
                <div className="md:border-l md:border-gray-200 md:pl-8 flex flex-col justify-center">
                  <p className="text-sm text-gray-600 font-medium mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    Expected: {order.expectedDelivery}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-200">
                      <div 
                        style={{ width: `${(order.currentStep / (TIMELINE_STEPS.length - 1)) * 100}%` }} 
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500"
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs font-medium text-gray-400">
                      {TIMELINE_STEPS.map((step, idx) => (
                        <div key={idx} className={`flex flex-col items-center ${idx <= order.currentStep ? 'text-green-600' : ''}`}>
                          <div className={`w-3 h-3 rounded-full mb-1 ${idx <= order.currentStep ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <span className="hidden sm:block text-[10px]">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
              </div>

              {/* Order Actions */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-wrap gap-3 justify-end">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors mr-auto">
                  <XCircle className="w-4 h-4" /> Cancel Order
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Phone className="w-4 h-4" /> Contact Seller
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <FileText className="w-4 h-4" /> Download Invoice
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors shadow-sm">
                  <Map className="w-4 h-4" /> Track Order
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
