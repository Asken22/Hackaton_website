import { useNavigate } from "react-router-dom"
import { Tractor, Building2, ShieldCheck, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useUser } from "@/contexts/UserContext"

export function Login() {
  const navigate = useNavigate()
  const { setRole } = useUser()

  const handleLogin = (role: 'farmer' | 'buyer' | 'fpo') => {
    setRole(role)
    navigate(`/${role}/dashboard`)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Sign in to AgriLink
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Select your account type to continue to your dedicated dashboard.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-0">
          
          {/* Farmer Login */}
          <Card 
            className="cursor-pointer hover:border-green-500 hover:shadow-lg transition-all group border-2"
            onClick={() => handleLogin('farmer')}
          >
            <CardHeader className="text-center pb-2">
              <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <Tractor className="h-8 w-8 text-green-700" />
              </div>
              <CardTitle>Farmer Login</CardTitle>
              <CardDescription>Sell produce & discover markets</CardDescription>
            </CardHeader>
            <CardContent className="text-center pt-4">
              <span className="text-green-600 font-semibold flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                Continue <ArrowRight className="h-4 w-4" />
              </span>
            </CardContent>
          </Card>

          {/* Buyer Login */}
          <Card 
            className="cursor-pointer hover:border-blue-500 hover:shadow-lg transition-all group border-2"
            onClick={() => handleLogin('buyer')}
          >
            <CardHeader className="text-center pb-2">
              <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <Building2 className="h-8 w-8 text-blue-700" />
              </div>
              <CardTitle>Buyer Login</CardTitle>
              <CardDescription>Browse listings & place bids</CardDescription>
            </CardHeader>
            <CardContent className="text-center pt-4">
              <span className="text-blue-600 font-semibold flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                Continue <ArrowRight className="h-4 w-4" />
              </span>
            </CardContent>
          </Card>

          {/* FPO Login */}
          <Card 
            className="cursor-pointer hover:border-orange-500 hover:shadow-lg transition-all group border-2"
            onClick={() => handleLogin('fpo')}
          >
            <CardHeader className="text-center pb-2">
              <div className="mx-auto h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                <ShieldCheck className="h-8 w-8 text-orange-700" />
              </div>
              <CardTitle>FPO Login</CardTitle>
              <CardDescription>Verify farmers & manage lots</CardDescription>
            </CardHeader>
            <CardContent className="text-center pt-4">
              <span className="text-orange-600 font-semibold flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                Continue <ArrowRight className="h-4 w-4" />
              </span>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
