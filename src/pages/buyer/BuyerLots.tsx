import { useState } from 'react';
import { 
  Package, 
  TrendingUp, 
  Award, 
  MapPin, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Users, 
  Truck, 
  ShieldCheck, 
 
  Search,
  Filter,
  DollarSign
} from 'lucide-react';

const summaryData = [
  { title: "Total Virtual Lots", value: "142", icon: Package, color: "text-blue-600", bg: "bg-blue-100" },
  { title: "Total Available Quantity", value: "8,450 MT", icon: TrendingUp, color: "text-green-600", bg: "bg-green-100" },
  { title: "Average Price", value: "₹2,450/q", icon: DollarSign, color: "text-purple-600", bg: "bg-purple-100" },
  { title: "Highest Grade Lot", value: "Grade A+ (Premium)", icon: Award, color: "text-yellow-600", bg: "bg-yellow-100" },
];

const virtualLots = [
  {
    id: "VL-20314",
    commodity: "Wheat (Lokwan)",
    grade: "Grade A",
    verification: "Verified by APMC",
    totalQuantity: "500 MT",
    contributorsCount: 12,
    averagePrice: "₹2,300/q",
    warehouse: "Central Godown, Indore",
    distance: "45 km away",
    expectedDelivery: "2-3 Days",
    qualityConsistency: "98%",
    contributors: [
      { id: 1, name: "Ramesh Farmer", grade: "Grade A", location: "Indore", verification: "Verified", quantity: "150 MT" },
      { id: 2, name: "Suresh Farmer", grade: "Grade A", location: "Dewas", verification: "Verified", quantity: "200 MT" },
      { id: 3, name: "Mahesh Farmer", grade: "Grade A", location: "Ujjain", verification: "Verified", quantity: "150 MT" },
    ]
  },
  {
    id: "VL-20315",
    commodity: "Soybean (JS 9560)",
    grade: "Grade B+",
    verification: "Third-Party Certified",
    totalQuantity: "350 MT",
    contributorsCount: 8,
    averagePrice: "₹4,100/q",
    warehouse: "Kisan Warehouse, Bhopal",
    distance: "120 km away",
    expectedDelivery: "3-5 Days",
    qualityConsistency: "94%",
    contributors: [
      { id: 4, name: "Amit Kumar", grade: "Grade B+", location: "Sehore", verification: "Verified", quantity: "200 MT" },
      { id: 5, name: "Sunil Singh", grade: "Grade B", location: "Vidisha", verification: "Verified", quantity: "150 MT" },
    ]
  }
];

export function BuyerLots() {
  const [expandedLot, setExpandedLot] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedLot(expandedLot === id ? null : id);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Virtual Lot Marketplace</h1>
          <p className="text-gray-500 mt-1">Purchase aggregated produce from multiple verified farmers</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search lots..." 
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryData.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Virtual Lots List */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">Available Virtual Lots</h2>
        
        <div className="grid gap-6">
          {virtualLots.map((lot) => (
            <div key={lot.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Main Card Content */}
              <div className="p-6">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  {/* Left Column - Core Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between lg:justify-start gap-4">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-green-100 text-green-700 font-semibold rounded-md text-sm border border-green-200">
                          {lot.id}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900">{lot.commodity}</h3>
                      </div>
                      <span className="flex items-center gap-1 text-sm font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                        <Award className="w-4 h-4" />
                        {lot.grade}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span>Qty: <span className="font-semibold text-gray-900">{lot.totalQuantity}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>Farmers: <span className="font-semibold text-gray-900">{lot.contributorsCount}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span>Avg: <span className="font-semibold text-gray-900">{lot.averagePrice}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Consistency: <span className="font-semibold text-gray-900">{lot.qualityConsistency}</span></span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm pt-2">
                      <span className="flex items-center gap-1.5 text-gray-600">
                        <ShieldCheck className="w-4 h-4 text-blue-500" />
                        {lot.verification}
                      </span>
                      <span className="flex items-center gap-1.5 text-gray-600">
                        <MapPin className="w-4 h-4 text-red-500" />
                        {lot.warehouse} ({lot.distance})
                      </span>
                      <span className="flex items-center gap-1.5 text-gray-600">
                        <Truck className="w-4 h-4 text-orange-500" />
                        Delivery: {lot.expectedDelivery}
                      </span>
                    </div>
                  </div>

                  {/* Right Column - Actions */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-6">
                    <button className="w-full lg:w-48 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                      Place Bulk Bid
                    </button>
                    <button className="w-full lg:w-48 flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors">
                      <FileText className="w-4 h-4" />
                      Download Report
                    </button>
                  </div>
                </div>
              </div>

              {/* Expand/Collapse Toggle */}
              <div 
                className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => toggleExpand(lot.id)}
              >
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Users className="w-4 h-4" />
                  View Contributors ({lot.contributorsCount})
                </div>
                <button className="flex items-center gap-1 text-sm font-medium text-green-600">
                  {expandedLot === lot.id ? (
                    <>Hide Details <ChevronUp className="w-4 h-4" /></>
                  ) : (
                    <>Expand Details <ChevronDown className="w-4 h-4" /></>
                  )}
                </button>
              </div>

              {/* Expanded Contributors Table */}
              {expandedLot === lot.id && (
                <div className="px-6 py-4 bg-white border-t border-gray-200">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 font-medium">Farmer Contribution</th>
                          <th className="px-4 py-3 font-medium">Location</th>
                          <th className="px-4 py-3 font-medium">Grade</th>
                          <th className="px-4 py-3 font-medium">Quantity</th>
                          <th className="px-4 py-3 font-medium">Verification</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {lot.contributors.map((farmer) => (
                          <tr key={farmer.id} className="hover:bg-gray-50/50">
                            <td className="px-4 py-3 font-medium text-gray-900">{farmer.name}</td>
                            <td className="px-4 py-3 text-gray-600">{farmer.location}</td>
                            <td className="px-4 py-3">
                              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium border border-blue-100">
                                {farmer.grade}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-medium text-gray-900">{farmer.quantity}</td>
                            <td className="px-4 py-3">
                              <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                                <CheckCircle className="w-3 h-3" />
                                {farmer.verification}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
