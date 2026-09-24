import { useState } from 'react';
import { 
  TrendingUp, 
  MapPin, 
  Leaf, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  IndianRupee,
  Activity,
  Star,
  ThumbsUp,
  Tag,
  ArrowRight,
  Bookmark
} from 'lucide-react';

const DUMMY_RECOMMENDATIONS = [
  {
    id: '1',
    crop: 'Premium Wheat',
    matchScore: 98,
    reason: 'Based on Previous Orders',
    priceDifference: 150,
    expectedSavings: 15000,
    isVerified: true,
    demandTrend: 'High',
    sellerLocation: 'Punjab, India',
    quantityAvailable: '100 Tons',
    basePrice: 2200,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=300&h=200'
  },
  {
    id: '2',
    crop: 'Organic Tomatoes',
    matchScore: 95,
    reason: 'Nearby Sellers',
    priceDifference: 50,
    expectedSavings: 2500,
    isVerified: true,
    demandTrend: 'Rising',
    sellerLocation: 'Local (15km away)',
    quantityAvailable: '5 Tons',
    basePrice: 1200,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=300&h=200'
  },
  {
    id: '3',
    crop: 'Basmati Rice',
    matchScore: 92,
    reason: 'Current Market Demand',
    priceDifference: 200,
    expectedSavings: 20000,
    isVerified: false,
    demandTrend: 'Very High',
    sellerLocation: 'Haryana, India',
    quantityAvailable: '50 Tons',
    basePrice: 3500,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=300&h=200'
  }
];

const TOP_SECTIONS = [
  { title: 'Recommended Categories', icon: Tag, count: '12 new' },
  { title: 'Trending Crops', icon: TrendingUp, count: 'Top 5' },
  { title: 'Recently Viewed', icon: Clock, count: '8 items' },
  { title: 'High Demand Produce', icon: Activity, count: 'Alerts active' }
];

export function BuyerRecommended() {
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());

  const toggleSave = (id: string) => {
    setSavedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Star className="text-yellow-500 fill-current" />
            Recommended For You
          </h1>
          <p className="text-gray-500 mt-2">
            Personalized listings based on your preferences, history, and market trends.
          </p>
        </div>

        {/* Top Section / Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOP_SECTIONS.map((section, idx) => (
            <div 
              key={idx} 
              className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 text-green-600 rounded-lg group-hover:bg-green-100 transition-colors">
                  <section.icon size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{section.title}</h3>
                  <p className="text-xs text-gray-500">{section.count}</p>
                </div>
              </div>
              <ChevronRight className="text-gray-400 group-hover:text-green-500 transition-colors" size={18} />
            </div>
          ))}
        </div>

        {/* Filters/Reasons */}
        <div className="flex flex-wrap gap-2 items-center text-sm text-gray-600">
          <span className="font-medium mr-2 flex items-center gap-1"><ThumbsUp size={16}/> Match Reasons:</span>
          {['Previous Orders', 'Current Market Demand', 'Preferred Crops', 'Nearby Sellers'].map(reason => (
            <span key={reason} className="px-3 py-1 bg-white border border-gray-200 rounded-full shadow-sm">
              {reason}
            </span>
          ))}
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DUMMY_RECOMMENDATIONS.map(item => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all flex flex-col">
              {/* Image & Badges */}
              <div className="relative h-48">
                <img src={item.image} alt={item.crop} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <div className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Activity size={12} /> {item.matchScore}% Match
                  </div>
                  {item.isVerified && (
                    <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1 w-max">
                      <ShieldCheck size={12} /> Verified
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => toggleSave(item.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white text-gray-600 transition-colors"
                >
                  <Bookmark size={18} className={savedItems.has(item.id) ? "fill-green-600 text-green-600" : ""} />
                </button>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-900">{item.crop}</h2>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600 flex items-center">
                      <IndianRupee size={16} />{item.basePrice}
                    </div>
                    <div className="text-xs text-gray-500">per quintal</div>
                  </div>
                </div>

                <div className="space-y-3 mb-4 flex-1">
                  <div className="flex items-center text-sm text-gray-600 gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    {item.sellerLocation}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 gap-2">
                    <Leaf size={16} className="text-gray-400" />
                    Qty: <span className="font-medium text-gray-900">{item.quantityAvailable}</span>
                  </div>
                  
                  {/* Stats Box */}
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2 border border-gray-100">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Price Difference:</span>
                      <span className="font-semibold text-green-600">₹{item.priceDifference} cheaper</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Expected Savings:</span>
                      <span className="font-semibold text-green-600">~₹{item.expectedSavings}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Demand Trend:</span>
                      <span className={`font-semibold flex items-center gap-1 ${
                        item.demandTrend.includes('High') ? 'text-orange-500' : 'text-blue-500'
                      }`}>
                        <TrendingUp size={14} /> {item.demandTrend}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-lg flex items-center gap-2">
                    <Activity size={14} /> {item.reason}
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <button className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors">
                    View <ArrowRight size={16} />
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-sm shadow-green-600/20">
                    Place Bid
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
