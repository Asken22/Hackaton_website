import { Link } from "react-router-dom"
import { ArrowRight, Sprout, TrendingUp, ShieldCheck, Warehouse, Users, Search, Gavel, Smartphone, Database, Zap, ShieldAlert, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-green-700 font-bold text-xl">
            <Sprout className="h-6 w-6" /> AgriLink
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <a href="#home" className="hover:text-green-600">Home</a>
            <a href="#features" className="hover:text-green-600">Features</a>
            <a href="#how-it-works" className="hover:text-green-600">How It Works</a>
            <a href="#integrations" className="hover:text-green-600">Government Integrations</a>
          </div>
          <Button asChild className="bg-green-700 hover:bg-green-800 text-white rounded-full px-6">
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white pt-24 pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-semibold mb-6 uppercase tracking-wider">
              Smart India Hackathon
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-gray-900 leading-tight">
              Government-Data-Powered <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                Agricultural Decision Support
              </span> <br/>
              & Verified Trading Platform
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Helping farmers make smarter selling decisions through market intelligence, quality verification, buyer discovery, and transparent trading.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="h-14 px-8 text-lg rounded-full bg-green-700 hover:bg-green-800 shadow-lg">
                <Link to="/login">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[800px] h-[800px] bg-green-200/40 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Core Features</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">A comprehensive ecosystem designed to empower farmers and ensure transparent trading.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-green-200 transition-colors">
              <TrendingUp className="h-10 w-10 text-green-600 mb-6" />
              <h3 className="text-xl font-bold mb-3 text-gray-900">Market Intelligence</h3>
              <p className="text-gray-600 leading-relaxed">Compare mandi prices using trusted government datasets to make informed selling decisions.</p>
            </div>
            
            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-green-200 transition-colors">
              <Warehouse className="h-10 w-10 text-green-600 mb-6" />
              <h3 className="text-xl font-bold mb-3 text-gray-900">Warehouse Discovery</h3>
              <p className="text-gray-600 leading-relaxed">Discover nearby storage facilities and cold storage when market prices are temporarily low.</p>
            </div>
            
            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-green-200 transition-colors">
              <ShieldCheck className="h-10 w-10 text-green-600 mb-6" />
              <h3 className="text-xl font-bold mb-3 text-gray-900">Quality Verification</h3>
              <p className="text-gray-600 leading-relaxed">Support for Self Verification, FPO Verification, and official AGMARK Verification.</p>
            </div>

            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-green-200 transition-colors">
              <Search className="h-10 w-10 text-green-600 mb-6" />
              <h3 className="text-xl font-bold mb-3 text-gray-900">Intelligent Matchmaking</h3>
              <p className="text-gray-600 leading-relaxed">Recommend relevant verified buyers based on crop type, quantity, quality, and location.</p>
            </div>

            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-green-200 transition-colors">
              <Gavel className="h-10 w-10 text-green-600 mb-6" />
              <h3 className="text-xl font-bold mb-3 text-gray-900">Buyer Bidding</h3>
              <p className="text-gray-600 leading-relaxed">Verified buyers can place competitive bids on farmer listings, allowing farmers to choose the best offer.</p>
            </div>

            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-green-200 transition-colors">
              <Users className="h-10 w-10 text-green-600 mb-6" />
              <h3 className="text-xl font-bold mb-3 text-gray-900">Virtual Lot Creation</h3>
              <p className="text-gray-600 leading-relaxed">Farmers growing the same crop can combine produce digitally to sell collectively to institutional buyers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Government Integrations */}
      <section id="integrations" className="py-24 bg-green-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl font-bold mb-6">Government Service Integration</h2>
          <p className="text-green-100 max-w-3xl mx-auto mb-16 text-lg">
            AgriLink uses trusted government datasets and seamlessly integrates with existing government services instead of rebuilding them.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            {['AGMARKNET', 'eNAM', 'MSAMB', 'MSWC', 'Kisan Rath'].map(gov => (
              <div key={gov} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-6 flex items-center justify-center font-bold text-xl min-w-[200px]">
                {gov}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Technology Stack</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Built with modern, scalable, and secure technologies.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-10">
            <div className="flex flex-col items-center gap-3">
              <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><Smartphone className="h-8 w-8"/></div>
              <span className="font-bold text-gray-900">Flutter (Mobile Ready)</span>
              <span className="text-sm text-gray-500">Frontend</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><Code className="h-8 w-8"/></div>
              <span className="font-bold text-gray-900">Django REST</span>
              <span className="text-sm text-gray-500">Backend Framework</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="h-16 w-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center"><Database className="h-8 w-8"/></div>
              <span className="font-bold text-gray-900">PostgreSQL</span>
              <span className="text-sm text-gray-500">Database</span>
            </div>
          </div>
        </div>
      </section>

      {/* Future Scope */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Future Enhancements</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
              <ShieldAlert className="h-8 w-8 text-green-600 mb-4" />
              <h4 className="font-bold text-gray-900 mb-2">AI Crop Quality Grading</h4>
            </div>
            <div className="border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
              <Smartphone className="h-8 w-8 text-green-600 mb-4" />
              <h4 className="font-bold text-gray-900 mb-2">Voice Assistance</h4>
            </div>
            <div className="border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mb-4" />
              <h4 className="font-bold text-gray-900 mb-2">Predictive Market Analytics</h4>
            </div>
            <div className="border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
              <Zap className="h-8 w-8 text-green-600 mb-4" />
              <h4 className="font-bold text-gray-900 mb-2">Digital Payments</h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
