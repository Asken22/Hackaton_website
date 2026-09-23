import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Lock, Mail, AlertCircle, Warehouse } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useUser } from "@/contexts/UserContext"

export function Login() {
  const navigate = useNavigate()
  const { setRole } = useUser()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Dummy logic to route based on credentials
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
      setError("Invalid credentials. Please check the dummy credentials below.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8 flex flex-col items-center">
        <Warehouse className="h-12 w-12 text-green-700 mb-2" />
        <h2 className="text-3xl font-extrabold text-gray-900">
          Sign in to AgriLink
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your credentials to access your dashboard.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="shadow-lg border-t-4 border-t-green-600">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Login as a Farmer, Buyer, or FPO.</CardDescription>
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
                    className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                    className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-lg py-6">
                Sign In
              </Button>
            </form>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-md p-4 text-sm text-blue-800">
              <h4 className="font-bold mb-2">Hackathon Demo Credentials:</h4>
              <ul className="space-y-2 font-mono text-xs">
                <li><strong className="text-blue-900">Farmer:</strong> farmer@agrilink.in / farmer123</li>
                <li><strong className="text-blue-900">Buyer:</strong> buyer@agrilink.in / buyer123</li>
                <li><strong className="text-blue-900">FPO:</strong> fpo@agrilink.in / fpo123</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
