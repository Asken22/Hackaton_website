import { Link } from "react-router-dom"
import { ArrowRight, Leaf, Sprout, TrendingUp, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background pt-24 pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                <Sprout className="h-4 w-4" />
                <span>Smart India Hackathon 2026</span>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-gray-900 dark:text-white"
            >
              The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">Agricultural</span> Commerce
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              AgriLink AI seamlessly connects farmers with buyers, providing real-time market intelligence, fair pricing, and secure transactions in a unified modern platform.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" asChild className="w-full sm:w-auto h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                <Link to="/dashboard">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto h-14 px-8 text-lg rounded-full">
                <Link to="/marketplace">Explore Marketplace</Link>
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[800px] h-[800px] bg-green-200/40 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-emerald-200/40 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      </header>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Platform Overview</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Discover how AgriLink AI transforms the traditional agricultural supply chain into a transparent, efficient ecosystem.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
              <div className="h-12 w-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Market Intelligence</h3>
              <p className="text-muted-foreground">Real-time price tracking, historical trends, and predictive analytics to help farmers sell at the best time.</p>
            </div>
            
            <div className="glass p-8 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
              <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                <Leaf className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Lot Creation</h3>
              <p className="text-muted-foreground">Automatically combine smaller harvests from multiple farmers into larger, buyer-ready lots for better bargaining power.</p>
            </div>
            
            <div className="glass p-8 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
              <div className="h-12 w-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified Quality</h3>
              <p className="text-muted-foreground">Standardized grading and FPO verification ensures buyers receive exactly the quality they pay for.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-green-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10k+</div>
              <div className="text-green-200">Active Farmers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-green-200">Verified Buyers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">₹50Cr</div>
              <div className="text-green-200">Trade Volume</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-green-200">Secure Payments</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
