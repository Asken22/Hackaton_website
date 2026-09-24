import { useState, useEffect } from "react"
import { Save, User, Phone, MapPin, Package } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useUser } from "@/contexts/UserContext"

export function Profile() {
  const { role, userName } = useUser()
  
  // Dummy state for profile info (ideally this goes to mockDB or a real backend)
  const [profileData, setProfileData] = useState({
    name: userName,
    mobile: "9876543210",
    address: "123 Agri Lane, Karnal, Haryana",
    willingToLot: true,
  })

  // Ensure name matches the context if it changes
  useEffect(() => {
    setProfileData(prev => ({ ...prev, name: userName }))
  }, [userName])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Profile saved successfully!")
    // In a real app, this would dispatch to mockDatabase or backend
  }

  return (
    <div className="max-w-4xl mx-auto pb-10 space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 capitalize">
          {role} Profile
        </h1>
        <p className="text-muted-foreground text-lg">Manage your personal information and preferences.</p>
      </div>

      <Card className="shadow-sm border-t-4 border-t-green-600">
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
          <CardDescription>Update your contact and location information.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" /> Full Name
                </label>
                <input
                  type="text"
                  required
                  value={profileData.name}
                  onChange={e => setProfileData({...profileData, name: e.target.value})}
                  className="w-full border rounded-md px-3 py-2 bg-gray-50 text-gray-600"
                  readOnly
                />
                <p className="text-xs text-gray-400">Name is synced with your role identity.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" /> Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  value={profileData.mobile}
                  onChange={e => setProfileData({...profileData, mobile: e.target.value})}
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" /> Complete Address
                </label>
                <textarea
                  required
                  rows={3}
                  value={profileData.address}
                  onChange={e => setProfileData({...profileData, address: e.target.value})}
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                />
              </div>
            </div>

            {role === 'farmer' && (
              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-gray-500" /> 
                  Lot Creation Preference
                </h3>
                <label className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input 
                    type="checkbox" 
                    className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500"
                    checked={profileData.willingToLot}
                    onChange={e => setProfileData({...profileData, willingToLot: e.target.checked})}
                  />
                  <div>
                    <span className="font-medium text-gray-900 block mb-1">Willing to create a Virtual Lot?</span>
                    <span className="text-sm text-gray-500 block">
                      Check this box if you are open to combining your harvest with nearby farmers to sell in bulk to institutional buyers.
                    </span>
                  </div>
                </label>
              </div>
            )}

            {role === 'buyer' && (
              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-gray-500" /> 
                  Company & Business Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Business Name</label>
                    <input type="text" className="w-full border rounded-md px-3 py-2" defaultValue="AgroFood Processors Ltd." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">GST Number</label>
                    <input type="text" className="w-full border rounded-md px-3 py-2" defaultValue="27AADCB2230M1Z2" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">FSSAI License</label>
                    <input type="text" className="w-full border rounded-md px-3 py-2" defaultValue="11520036000155" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Annual Procurement Volume (Tons)</label>
                    <input type="text" className="w-full border rounded-md px-3 py-2" defaultValue="5000+" />
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 border-t flex justify-end">
              <Button type="submit" className="bg-green-700 hover:bg-green-800">
                <Save className="h-4 w-4 mr-2" /> Save Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {role === 'fpo' && (
        <Card className="mt-6 border-orange-200 bg-orange-50/50">
          <CardHeader>
            <CardTitle className="text-orange-800">Specific Section: Quality Verification</CardTitle>
            <CardDescription className="text-orange-700/80">
              As an FPO, your main responsibility is verifying crop quality for farmers in your district.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100" asChild>
              <a href="/fpo/verifications">Go to Pending Verifications Dashboard &rarr;</a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
