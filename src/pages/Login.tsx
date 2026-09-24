import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Lock, Mail, AlertCircle, Warehouse, Tractor, Building2, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useUser } from "@/contexts/UserContext"

export function Login() {
  const navigate = useNavigate()
  const { setRole } = useUser()
  
  const [selectedRole, setSelectedRole] = useState<'farmer' | 'buyer' | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleRoleSelect = (role: 'farmer' | 'buyer') => {
    setSelectedRole(role)
    setError("")
    // Auto-fill for hackathon demo convenience
    if (role === 'farmer') {
      setEmail('farmer@agrilink.in')
      setPassword('farmer123')
    } else {
      setEmail('buyer@agrilink.in')
      setPassword('buyer123')
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (email === "farmer@agrilink.in" && password === "farmer123") {
      setRole("farmer")
      navigate("/farmer/dashboard")
    } else if (email === "buyer@agrilink.in" && password === "buyer123") {
      setRole("buyer")
      navigate("/buyer/dashboard")
    } else if (email === "fpo@agrilink.in" && password === "fpo123") {
      setRole("fpo")
      navigate("/fpo/dashboard")
    } else {
      setError("Invalid credentials. Please check the dummy credentials.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md text-center mb-8 flex flex-col items-center">
        <Warehouse className="h-12 w-12 text-green-700 mb-2" />
        <h2 className="text-3xl font-extrabold text-gray-900">
          Sign in to AgriLink
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {selectedRole 
            ? `Enter your credentials to access the ${selectedRole} dashboard.`
            : 'Select your account type to continue.'
          }
        </p>
      </div>

      {!selectedRole ? (
        <div className="mx-auto w-full max-w-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <Card 
              className="cursor-pointer hover:border-green-500 hover:shadow-lg transition-all group border-2"
              onClick={() => handleRoleSelect('farmer')}
            >
              <CardHeader className="text-center pb-2">
                <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <Tractor className="h-8 w-8 text-green-700" />
                </div>
                <CardTitle>Login as Farmer</CardTitle>
                <CardDescription>Sell produce & discover markets</CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:border-blue-500 hover:shadow-lg transition-all group border-2"
              onClick={() => handleRoleSelect('buyer')}
            >
              <CardHeader className="text-center pb-2">
                <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Building2 className="h-8 w-8 text-blue-700" />
                </div>
                <CardTitle>Login as Buyer</CardTitle>
                <CardDescription>Browse listings & place bids</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-md">
          <Card className={`shadow-lg border-t-4 ${selectedRole === 'farmer' ? 'border-t-green-600' : 'border-t-blue-600'}`}>
            <CardHeader className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute left-4 top-4"
                onClick={() => setSelectedRole(null)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <CardTitle className="text-center capitalize">{selectedRole} Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${selectedRole === 'farmer' ? 'focus:ring-green-500' : 'focus:ring-blue-500'}`}
                      placeholder="Enter email..."
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${selectedRole === 'farmer' ? 'focus:ring-green-500' : 'focus:ring-blue-500'}`}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <Button type="submit" className={`w-full text-lg py-6 ${selectedRole === 'farmer' ? 'bg-green-700 hover:bg-green-800' : 'bg-blue-700 hover:bg-blue-800'}`}>
                  Sign In
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
