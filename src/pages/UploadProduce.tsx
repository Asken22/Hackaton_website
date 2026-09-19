import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PackagePlus, ImagePlus, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockDB } from "@/lib/mockDatabase"
import { useUser } from "@/contexts/UserContext"

export function UploadProduce() {
  const navigate = useNavigate()
  const { userId, userName } = useUser()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    crop: '',
    quantity: '',
    expectedPrice: '',
    harvestDate: '',
    description: '',
    location: 'Karnal, Haryana', // Default for demo
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      mockDB.addListing({
        id: `lst_${Date.now()}`,
        farmerId: userId,
        farmerName: userName,
        crop: formData.crop,
        quantity: Number(formData.quantity),
        expectedPrice: Number(formData.expectedPrice),
        harvestDate: formData.harvestDate,
        description: formData.description,
        location: formData.location,
        images: [], // Mocking images for now
        verificationStatus: 'None',
        createdAt: new Date().toISOString()
      })
      setLoading(false)
      navigate('/farmer/listings')
    }, 800)
  }

  return (
    <div className="max-w-3xl mx-auto pb-10 space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Create Listing</h1>
        <p className="text-muted-foreground text-lg">List your produce directly to verified buyers.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PackagePlus className="h-5 w-5 text-green-600" />
            Produce Details
          </CardTitle>
          <CardDescription>Enter the specifics of your harvest.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Crop Type</label>
                <select 
                  name="crop" 
                  required 
                  value={formData.crop} 
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select a crop</option>
                  <option value="Basmati Rice">Basmati Rice</option>
                  <option value="Wheat (Lokwan)">Wheat (Lokwan)</option>
                  <option value="Soybean">Soybean</option>
                  <option value="Maize">Maize</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Available Quantity (Quintals)</label>
                <input 
                  type="number" 
                  name="quantity" 
                  required 
                  min="1"
                  placeholder="e.g. 50"
                  value={formData.quantity} 
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Expected Price (₹ per Quintal)</label>
                <input 
                  type="number" 
                  name="expectedPrice" 
                  required 
                  min="100"
                  placeholder="e.g. 3200"
                  value={formData.expectedPrice} 
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Harvest Date</label>
                <input 
                  type="date" 
                  name="harvestDate" 
                  required 
                  value={formData.harvestDate} 
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description & Quality Details</label>
              <textarea 
                name="description" 
                rows={3} 
                required 
                placeholder="Mention any specific quality parameters (moisture content, grain size, etc.)"
                value={formData.description} 
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Upload Images (Optional)</label>
              <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors">
                <ImagePlus className="h-8 w-8 mb-2 text-gray-400" />
                <p className="text-sm">Click to upload photos of your produce</p>
              </div>
            </div>

            <div className="pt-4 border-t flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
              <Button type="submit" disabled={loading} className="bg-green-700 hover:bg-green-800">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Publish Listing
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
