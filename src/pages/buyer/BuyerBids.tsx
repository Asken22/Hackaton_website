import { useState } from 'react';
import { 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Clock, 
  DollarSign, 
  ArrowUpCircle, 
  XOctagon, 
  Eye, 
  Timer 
} from 'lucide-react';

// Dummy data
const dashboardStats = [
  { title: 'Active Bids', value: '12', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-100' },
  { title: 'Won Bids', value: '34', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
  { title: 'Lost Bids', value: '8', icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
  { title: 'Pending Approvals', value: '5', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  { title: 'Total Bid Value', value: '₹4,50,000', icon: DollarSign, color: 'text-purple-600', bg: 'bg-purple-100' },
];

const bidsData = [
  { id: 'BID-001', crop: 'Wheat - Sharbati', seller: 'Ramesh Kumar', quantity: '50 Tonnes', myBid: '₹22,000/T', highestBid: '₹22,000/T', status: 'Winning', expiry: '2026-09-25T10:00:00', countdown: '02:14:28' },
  { id: 'BID-002', crop: 'Basmati Rice', seller: 'Suresh Singh', quantity: '100 Tonnes', myBid: '₹45,000/T', highestBid: '₹46,500/T', status: 'Outbid', expiry: '2026-09-24T18:00:00', countdown: '00:45:12' },
  { id: 'BID-003', crop: 'Soybean', seller: 'Anita Devi', quantity: '20 Tonnes', myBid: '₹38,000/T', highestBid: '₹38,000/T', status: 'Pending', expiry: '2026-09-26T12:00:00', countdown: '48:10:05' },
  { id: 'BID-004', crop: 'Cotton', seller: 'Mohan Lal', quantity: '10 Tonnes', myBid: '₹55,000/T', highestBid: '₹55,000/T', status: 'Accepted', expiry: 'Completed', countdown: '00:00:00' },
  { id: 'BID-005', crop: 'Maize', seller: 'Kisan Traders', quantity: '30 Tonnes', myBid: '₹18,000/T', highestBid: '₹19,500/T', status: 'Rejected', expiry: 'Completed', countdown: '00:00:00' },
];

export function BuyerBids() {
  const [bids] = useState(bidsData);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Winning': return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Winning</span>;
      case 'Outbid': return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">Outbid</span>;
      case 'Pending': return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">Pending</span>;
      case 'Accepted': return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">Accepted</span>;
      case 'Rejected': return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">Rejected</span>;
      default: return null;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Bids</h1>
        <p className="text-gray-600">Track and manage your active and past bids.</p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        {dashboardStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bids Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Recent Bids</h2>
          <div className="flex gap-2">
             <button className="px-4 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
               Filter
             </button>
             <button className="px-4 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
               Sort
             </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Bid ID</th>
                <th className="px-6 py-4">Crop & Seller</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">My Bid</th>
                <th className="px-6 py-4">Current Highest</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Time Remaining</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bids.map((bid, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{bid.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{bid.crop}</div>
                    <div className="text-gray-500 text-xs">{bid.seller}</div>
                  </td>
                  <td className="px-6 py-4">{bid.quantity}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{bid.myBid}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{bid.highestBid}</td>
                  <td className="px-6 py-4">{getStatusBadge(bid.status)}</td>
                  <td className="px-6 py-4">
                    {bid.countdown !== '00:00:00' ? (
                      <div className="flex items-center space-x-1 text-orange-600">
                        <Timer className="w-4 h-4" />
                        <span className="font-mono">{bid.countdown}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 font-medium">Ended</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button title="Increase Bid" className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <ArrowUpCircle className="w-5 h-5" />
                      </button>
                      <button title="Withdraw Bid" className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <XOctagon className="w-5 h-5" />
                      </button>
                      <button title="View Listing" className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
           <span>Showing 1 to 5 of 55 entries</span>
           <div className="flex space-x-1">
             <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Prev</button>
             <button className="px-3 py-1 border border-gray-200 rounded bg-blue-50 text-blue-600">1</button>
             <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">2</button>
             <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">3</button>
             <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
}
