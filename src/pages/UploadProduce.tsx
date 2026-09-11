import { useState } from "react"
import { Upload, Calendar, IndianRupee, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

export function UploadProduce() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      navigate("/listings")
    }, 1500)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload Produce</h1>
        <p className="text-muted-foreground">List your crop on the marketplace for buyers to see.</p>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle>Produce Details</CardTitle>
          <CardDescription>Enter the specifications of your harvest.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Crop</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option>Wheat</option>
                  <option>Rice (Paddy)</option>
                  <option>Maize</option>
                  <option>Cotton</option>
                  <option>Soybean</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Variety</label>
                <input required type="text" placeholder="e.g. Sharbati" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Quantity (in Quintals)</label>
                <div className="relative">
                  <input required type="number" min="1" placeholder="0" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Expected Price (per Quintal)</label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input required type="number" min="1" placeholder="0" className="w-full rounded-md border border-input bg-background pl-9 pr-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Harvest Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input required type="date" className="w-full rounded-md border border-input bg-background pl-9 pr-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Quality Verification</label>
              <div className="grid grid-cols-3 gap-4">
                <label className="flex flex-col items-center justify-center p-4 border rounded-md cursor-pointer hover:bg-muted bg-green-50/50 border-green-200">
                  <input type="radio" name="quality" value="self" className="sr-only" defaultChecked />
                  <span className="font-medium">Self Declared</span>
                  <span className="text-xs text-muted-foreground">No verification</span>
                </label>
                <label className="flex flex-col items-center justify-center p-4 border rounded-md cursor-pointer hover:bg-muted relative">
                  <input type="radio" name="quality" value="fpo" className="sr-only" />
                  <ShieldCheck className="absolute top-2 right-2 h-4 w-4 text-blue-500" />
                  <span className="font-medium">FPO Verified</span>
                  <span className="text-xs text-muted-foreground">Certified by FPO</span>
                </label>
                <label className="flex flex-col items-center justify-center p-4 border rounded-md cursor-pointer hover:bg-muted relative">
                  <input type="radio" name="quality" value="lab" className="sr-only" />
                  <ShieldCheck className="absolute top-2 right-2 h-4 w-4 text-green-500" />
                  <span className="font-medium">Lab Certified</span>
                  <span className="text-xs text-muted-foreground">NABL Grade A</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Upload Images</label>
              <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-green-600" />
                </div>
                <p className="font-medium mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (max. 5MB)</p>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-lg" disabled={isSubmitting}>
              {isSubmitting ? "Uploading..." : "Submit Listing"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
