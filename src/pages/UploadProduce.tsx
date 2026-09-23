import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { PackagePlus, ImagePlus, Loader2, ShieldCheck, Check, AlertCircle, FileText, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockDB } from "@/lib/mockDatabase"
import type { Listing } from "@/lib/mockDatabase"
import { useUser } from "@/contexts/UserContext"
import { motion, AnimatePresence } from "framer-motion"

import riceImg from "@/assets/rice.jpg"
import wheatImg from "@/assets/wheat.jpg"
import soybeanImg from "@/assets/soybean.jpg"
import maizeImg from "@/assets/maize.jpg"

// -----------------------------------------------------------------
// DYNAMIC CROP CONFIGURATIONS
// -----------------------------------------------------------------
type ScoringType = 'higher' | 'lower' | 'ideal';

interface QualityParamDef {
  id: string;
  label: string;
  min: number;
  max: number;
  default: number;
  weight: number;
  scoring: ScoringType;
  ideal?: number;
}

interface CropConfig {
  params: QualityParamDef[];
  getExplanations: (values: Record<string, number>) => string[];
}

const CROP_CONFIGS: Record<string, CropConfig> = {
  'Rice': {
    params: [
      { id: 'moisture', label: 'Moisture Content (%)', min: 0, max: 25, default: 12, weight: 0.20, scoring: 'ideal', ideal: 12 },
      { id: 'broken', label: 'Broken Grains (%)', min: 0, max: 20, default: 2, weight: 0.20, scoring: 'lower' },
      { id: 'foreign', label: 'Foreign Matter (%)', min: 0, max: 10, default: 1, weight: 0.15, scoring: 'lower' },
      { id: 'damaged', label: 'Damaged Grains (%)', min: 0, max: 15, default: 2, weight: 0.15, scoring: 'lower' },
      { id: 'uniformity', label: 'Grain Uniformity (%)', min: 0, max: 100, default: 90, weight: 0.15, scoring: 'higher' },
      { id: 'color', label: 'Grain Color (0-100)', min: 0, max: 100, default: 90, weight: 0.10, scoring: 'higher' },
      { id: 'pest', label: 'Pest / Insect Damage (%)', min: 0, max: 10, default: 0, weight: 0.05, scoring: 'lower' },
    ],
    getExplanations: (v) => [
      v.moisture >= 10 && v.moisture <= 14 ? '✔ Moisture within ideal range' : '❌ Moisture outside ideal range',
      v.broken < 5 ? '✔ Broken grains below acceptable limit' : '❌ High broken grains',
      v.uniformity > 85 ? '✔ High grain uniformity' : '❌ Poor grain uniformity',
      v.pest === 0 ? '✔ No pest damage' : '❌ Pest damage detected',
      v.foreign < 2 ? '✔ Very low foreign matter' : '❌ High foreign matter'
    ]
  },
  'Orange': {
    params: [
      { id: 'color', label: 'Color Uniformity (0-100)', min: 0, max: 100, default: 90, weight: 0.15, scoring: 'higher' },
      { id: 'size', label: 'Fruit Size (mm)', min: 40, max: 120, default: 75, weight: 0.15, scoring: 'higher' },
      { id: 'weight', label: 'Fruit Weight (g)', min: 50, max: 250, default: 150, weight: 0.10, scoring: 'higher' },
      { id: 'peel', label: 'Peel Quality (0-100)', min: 0, max: 100, default: 90, weight: 0.15, scoring: 'higher' },
      { id: 'firmness', label: 'Firmness (0-100)', min: 0, max: 100, default: 85, weight: 0.15, scoring: 'higher' },
      { id: 'juice', label: 'Juice Content (%)', min: 0, max: 70, default: 45, weight: 0.10, scoring: 'higher' },
      { id: 'brix', label: 'Brix (Sweetness %)', min: 0, max: 25, default: 12, weight: 0.10, scoring: 'higher' },
      { id: 'damage', label: 'Surface Damage (%)', min: 0, max: 30, default: 2, weight: 0.05, scoring: 'lower' },
      { id: 'pest', label: 'Disease / Pest Damage (%)', min: 0, max: 20, default: 0, weight: 0.05, scoring: 'lower' },
    ],
    getExplanations: (v) => [
      v.color > 85 ? '✔ Uniform bright orange color' : '❌ Uneven color',
      v.peel > 80 ? '✔ Excellent peel quality' : '❌ Poor peel quality',
      v.juice > 40 ? '✔ High juice content' : '❌ Low juice content',
      v.brix >= 11 ? '✔ High sweetness level' : '❌ Low sweetness',
      v.pest === 0 && v.damage < 5 ? '✔ No disease or major damage detected' : '❌ Damage/Disease detected'
    ]
  },
  'Banana': {
    params: [
      { id: 'length', label: 'Finger Length (cm)', min: 5, max: 35, default: 20, weight: 0.15, scoring: 'higher' },
      { id: 'weight', label: 'Average Weight (g)', min: 50, max: 200, default: 120, weight: 0.10, scoring: 'higher' },
      { id: 'ripeness', label: 'Ripeness (0-100)', min: 0, max: 100, default: 80, weight: 0.15, scoring: 'ideal', ideal: 80 },
      { id: 'color', label: 'Peel Color (0-100)', min: 0, max: 100, default: 90, weight: 0.15, scoring: 'higher' },
      { id: 'bruising', label: 'Bruising (%)', min: 0, max: 30, default: 5, weight: 0.15, scoring: 'lower' },
      { id: 'firmness', label: 'Firmness (0-100)', min: 0, max: 100, default: 80, weight: 0.15, scoring: 'higher' },
      { id: 'uniformity', label: 'Uniformity of Bunch (0-100)', min: 0, max: 100, default: 85, weight: 0.10, scoring: 'higher' },
      { id: 'pest', label: 'Disease / Pest Damage (%)', min: 0, max: 20, default: 0, weight: 0.05, scoring: 'lower' },
    ],
    getExplanations: (v) => [
      v.length >= 18 && v.uniformity > 80 ? '✔ Uniform fruit size' : '❌ Irregular size',
      v.color > 80 ? '✔ Good peel color' : '❌ Poor peel color',
      v.bruising > 0 && v.bruising <= 5 ? '✔ Slight bruising detected' : v.bruising === 0 ? '✔ No bruising' : '❌ Heavy bruising',
      v.firmness > 75 ? '✔ Good firmness' : '❌ Soft/Overripe',
      v.pest === 0 ? '✔ No pest damage' : '❌ Pest damage detected'
    ]
  },
  'Generic': {
    params: [
      { id: 'color', label: 'Color Quality (0-100)', min: 0, max: 100, default: 80, weight: 0.3, scoring: 'higher' },
      { id: 'sizeUniformity', label: 'Size Uniformity (0-100)', min: 0, max: 100, default: 80, weight: 0.3, scoring: 'higher' },
      { id: 'damage', label: 'Damage Percentage (%)', min: 0, max: 20, default: 2, weight: 0.3, scoring: 'lower' },
      { id: 'moisture', label: 'Moisture (%)', min: 5, max: 25, default: 12, weight: 0.1, scoring: 'ideal', ideal: 12 },
    ],
    getExplanations: (v) => [
      v.color >= 80 ? '✔ Excellent Color' : '❌ Fair Color',
      v.damage < 5 ? `✔ Damage below 5%` : '❌ High Damage',
      Math.abs(12 - v.moisture) < 3 ? '✔ Moisture within range' : '❌ Moisture out of range'
    ]
  }
}

// -----------------------------------------------------------------
// COMPONENT
// -----------------------------------------------------------------

export function UploadProduce() {
  const navigate = useNavigate()
  const { userId, userName } = useUser()
  const [loading, setLoading] = useState(false)
  const [agmarkLoading, setAgmarkLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    crop: 'Rice',
    quantity: '',
    expectedPrice: '',
    harvestDate: '',
    description: '',
    location: 'Karnal, Haryana', 
  })

  // Verification State
  const [verificationType, setVerificationType] = useState<'Self' | 'FPO' | 'AGMARK'>('Self')
  
  // Dynamic FPO State
  const [qualityParams, setQualityParams] = useState<Record<string, number>>({})
  
  // AGMARK State
  const [certNumber, setCertNumber] = useState("")
  const [agmarkData, setAgmarkData] = useState<any>(null)

  // Derived FPO Grade & Score
  const [score, setScore] = useState(0)
  const [grade, setGrade] = useState<'A' | 'B' | 'C'>('C')
  const [explanations, setExplanations] = useState<string[]>([])

  // Re-initialize parameters when crop changes
  useEffect(() => {
    const config = CROP_CONFIGS[formData.crop] || CROP_CONFIGS['Generic']
    const initialParams: Record<string, number> = {}
    config.params.forEach(p => initialParams[p.id] = p.default)
    setQualityParams(initialParams)
  }, [formData.crop])

  // Calculate Grade when parameters change
  useEffect(() => {
    if (verificationType !== 'FPO') return
    const config = CROP_CONFIGS[formData.crop] || CROP_CONFIGS['Generic']
    
    let totalScore = 0
    config.params.forEach(p => {
      const val = qualityParams[p.id] || 0
      let paramScore = 0
      
      if (p.scoring === 'higher') {
        paramScore = (val / p.max) * 100
      } else if (p.scoring === 'lower') {
        paramScore = Math.max(0, 100 - ((val / p.max) * 100))
      } else if (p.scoring === 'ideal' && p.ideal !== undefined) {
        const diff = Math.abs(p.ideal - val)
        const maxDiff = Math.max(Math.abs(p.ideal - p.min), Math.abs(p.max - p.ideal))
        paramScore = Math.max(0, 100 - ((diff / maxDiff) * 100))
      }
      
      totalScore += paramScore * p.weight
    })

    const finalScore = Math.round(totalScore)
    setScore(finalScore)

    if (finalScore >= 90) setGrade('A')
    else if (finalScore >= 75) setGrade('B')
    else setGrade('C')

    setExplanations(config.getExplanations(qualityParams))
  }, [qualityParams, verificationType, formData.crop])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFpoParamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQualityParams(prev => ({ ...prev, [e.target.name]: Number(e.target.value) }))
  }

  const fetchAgmark = () => {
    if (!certNumber) return
    setAgmarkLoading(true)
    setTimeout(() => {
      setAgmarkData({
        certificateNumber: certNumber,
        holder: userName,
        commodity: formData.crop || "Unknown",
        grade: "Grade A",
        lab: "National Quality Lab, Delhi",
        date: new Date().toLocaleDateString(),
        expiry: "2025-12-31",
        status: "Active"
      })
      setAgmarkLoading(false)
    }, 1000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const listing: Listing = {
      id: `lst_${Date.now()}`,
      farmerId: userId,
      farmerName: userName,
      crop: formData.crop,
      quantity: Number(formData.quantity) || 0,
      expectedPrice: Number(formData.expectedPrice) || 0,
      harvestDate: formData.harvestDate,
      description: formData.description,
      location: formData.location,
      images: [],
      verificationType: verificationType,
      createdAt: new Date().toISOString()
    }

    if (verificationType === 'FPO') {
      listing.qualityScore = score
      listing.grade = grade
      listing.qualityParams = qualityParams
    } else if (verificationType === 'AGMARK' && agmarkData) {
      listing.agmarkData = agmarkData
    }

    setTimeout(() => {
      mockDB.addListing(listing)
      setLoading(false)
      navigate('/farmer/listings')
    }, 800)
  }

  const getPreviewImage = () => {
    const cropStr = formData.crop.toLowerCase()
    if (cropStr.includes('rice')) return riceImg
    if (cropStr.includes('soybean')) return soybeanImg
    if (cropStr.includes('maize')) return maizeImg
    return wheatImg // Generic fallback
  }

  const currentConfig = CROP_CONFIGS[formData.crop] || CROP_CONFIGS['Generic']

  return (
    <div className="max-w-7xl mx-auto pb-10 space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Create Listing</h1>
        <p className="text-muted-foreground text-lg">List your produce with verifiable quality metrics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* FORM SECTION */}
        <div className="lg:col-span-2 space-y-6">
          <form id="listing-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Basic Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PackagePlus className="h-5 w-5 text-green-600" />
                  Produce Details
                </CardTitle>
                <CardDescription>Enter the specifics of your harvest.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Crop Type</label>
                    <select name="crop" required value={formData.crop} onChange={handleChange} className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 bg-white">
                      <option value="Rice">Rice</option>
                      <option value="Orange">Orange</option>
                      <option value="Banana">Banana</option>
                      <option value="Tomato">Tomato</option>
                      <option value="Onion">Onion</option>
                      <option value="Wheat">Wheat</option>
                      <option value="Soybean">Soybean</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Available Quantity (Quintals)</label>
                    <input type="number" name="quantity" required min="1" placeholder="e.g. 50" value={formData.quantity} onChange={handleChange} className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Expected Price (₹ per Quintal)</label>
                    <input type="number" name="expectedPrice" required min="100" placeholder="e.g. 3200" value={formData.expectedPrice} onChange={handleChange} className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Harvest Date</label>
                    <input type="date" name="harvestDate" required value={formData.harvestDate} onChange={handleChange} className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"/>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea name="description" rows={2} required placeholder="Optional details..." value={formData.description} onChange={handleChange} className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-500" />
                </div>
              </CardContent>
            </Card>

            {/* Verification Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-blue-600" />
                  Verification Type
                </CardTitle>
                <CardDescription>Select how buyers will verify the quality of this listing.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Self Verified */}
                  <div 
                    onClick={() => setVerificationType('Self')}
                    className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${verificationType === 'Self' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-blue-800">Self Verified</span>
                      {verificationType === 'Self' && <Check className="h-4 w-4 text-blue-600"/>}
                    </div>
                    <p className="text-xs text-gray-600">Upload photos and declare parameters yourself.</p>
                  </div>

                  {/* FPO Verified */}
                  <div 
                    onClick={() => setVerificationType('FPO')}
                    className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${verificationType === 'FPO' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-200'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-orange-800">FPO Verified</span>
                      {verificationType === 'FPO' && <Check className="h-4 w-4 text-orange-600"/>}
                    </div>
                    <p className="text-xs text-gray-600">Physical inspection generating automated Grade & Score.</p>
                  </div>

                  {/* AGMARK Certified */}
                  <div 
                    onClick={() => setVerificationType('AGMARK')}
                    className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${verificationType === 'AGMARK' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-200'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-green-800">AGMARK</span>
                      {verificationType === 'AGMARK' && <Check className="h-4 w-4 text-green-600"/>}
                    </div>
                    <p className="text-xs text-gray-600">Official Govt. quality certification API sync.</p>
                  </div>
                </div>

                {/* Dynamic Content based on Selection */}
                <AnimatePresence mode="wait">
                  {verificationType === 'Self' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="pt-4 border-t">
                       <div className="space-y-2">
                        <label className="text-sm font-medium">Upload Images</label>
                        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer">
                          <ImagePlus className="h-8 w-8 mb-2 text-gray-400" />
                          <p className="text-sm">Click to upload photos</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {verificationType === 'FPO' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="pt-4 border-t space-y-6">
                      <div className="bg-orange-100/50 p-4 rounded-lg border border-orange-200 flex gap-3">
                        <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                        <div className="text-sm text-orange-900">
                          <strong>Dynamic Config ({formData.crop}):</strong> The fields and scoring rules below have dynamically changed to match the standards for {formData.crop}. Adjust the sliders to see the live rule-based grading!
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                          {currentConfig.params.map(param => (
                            <div key={param.id} className="space-y-1">
                              <label className="text-xs font-medium text-gray-500 flex justify-between">
                                {param.label} 
                                <span>{qualityParams[param.id] ?? param.default}</span>
                              </label>
                              <input 
                                type="range" 
                                name={param.id} 
                                min={param.min} 
                                max={param.max} 
                                step={param.max <= 20 ? 0.5 : 1}
                                value={qualityParams[param.id] ?? param.default} 
                                onChange={handleFpoParamChange} 
                                className="w-full accent-orange-600"
                              />
                            </div>
                          ))}
                        </div>

                        {/* Grading Summary Box */}
                        <div className="bg-white border rounded-xl p-5 shadow-sm flex flex-col justify-center items-center text-center space-y-4 relative overflow-hidden h-fit sticky top-0">
                          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-green-500" />
                          <div>
                            <p className="text-sm text-gray-500 font-medium mb-1">Overall Quality Score</p>
                            <div className="text-5xl font-extrabold text-gray-900">{score}%</div>
                          </div>
                          
                          <div className={`px-4 py-1 rounded-full text-lg font-bold border-2 ${
                            grade === 'A' ? 'bg-green-100 text-green-700 border-green-200' :
                            grade === 'B' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                            'bg-red-100 text-red-700 border-red-200'
                          }`}>
                            Grade {grade}
                          </div>

                          <div className="w-full text-left space-y-1 mt-2 border-t pt-3">
                            <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Rule-Based Explanation</p>
                            {explanations.map((exp, idx) => (
                              <p key={idx} className={`text-sm flex items-start gap-1 ${exp.startsWith('✔') ? 'text-green-700' : 'text-red-600'}`}>
                                {exp}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {verificationType === 'AGMARK' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="pt-4 border-t space-y-4">
                      {!agmarkData ? (
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="text"
                              value={certNumber}
                              onChange={(e) => setCertNumber(e.target.value)}
                              className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                              placeholder="Enter AGMARK Certificate Number (e.g. AG-123)"
                            />
                          </div>
                          <Button type="button" onClick={fetchAgmark} disabled={!certNumber || agmarkLoading} className="bg-green-700 hover:bg-green-800">
                            {agmarkLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
                            Fetch API
                          </Button>
                        </div>
                      ) : (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                          <div className="flex items-center gap-2 mb-4 text-green-800 border-b border-green-200 pb-2">
                            <ShieldCheck className="h-5 w-5" />
                            <span className="font-bold">Verified from Government Records</span>
                          </div>
                          <div className="grid grid-cols-2 gap-y-3 text-sm">
                            <div><p className="text-green-700/70 text-xs uppercase">Holder</p><p className="font-semibold text-gray-900">{agmarkData.holder}</p></div>
                            <div><p className="text-green-700/70 text-xs uppercase">Certificate</p><p className="font-semibold text-gray-900">{agmarkData.certificateNumber}</p></div>
                            <div><p className="text-green-700/70 text-xs uppercase">Grade</p><p className="font-semibold text-gray-900">{agmarkData.grade}</p></div>
                            <div><p className="text-green-700/70 text-xs uppercase">Expiry</p><p className="font-semibold text-gray-900">{agmarkData.expiry}</p></div>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button type="button" variant="ghost" size="sm" onClick={() => setAgmarkData(null)} className="text-red-600 hover:bg-red-50">Reset</Button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
              <Button type="submit" disabled={loading || (verificationType==='AGMARK' && !agmarkData)} className="bg-green-700 hover:bg-green-800 text-lg px-8">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Publish Listing
              </Button>
            </div>
          </form>
        </div>

        {/* PREVIEW SECTION */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Live Buyer Preview</h3>
            
            <Card className="overflow-hidden shadow-xl border-gray-200">
              <div className="bg-gray-100 aspect-video relative overflow-hidden">
                <img src={getPreviewImage()} alt="Preview" className="object-cover w-full h-full" />
                
                {/* Dynamic Badge */}
                <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                  {verificationType === 'AGMARK' && (
                    <div className="bg-green-100 border border-green-300 px-2 py-1 rounded-md text-xs font-bold text-green-800 flex items-center gap-1 shadow-sm">
                      <ShieldCheck className="h-3 w-3" /> AGMARK Certified
                    </div>
                  )}
                  {verificationType === 'FPO' && (
                    <>
                      <div className="bg-orange-100 border border-orange-300 px-2 py-1 rounded-md text-xs font-bold text-orange-800 flex items-center gap-1 shadow-sm">
                        <ShieldCheck className="h-3 w-3" /> FPO Grade {grade}
                      </div>
                      <div className="bg-white/90 px-2 py-0.5 rounded text-[10px] font-bold text-gray-600 shadow-sm">
                        Score: {score}%
                      </div>
                    </>
                  )}
                  {verificationType === 'Self' && (
                    <div className="bg-blue-100 border border-blue-300 px-2 py-1 rounded-md text-xs font-bold text-blue-800 flex items-center gap-1 shadow-sm">
                      <ShieldCheck className="h-3 w-3" /> Self Verified
                    </div>
                  )}
                </div>
              </div>

              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="truncate pr-2">
                    <h3 className="font-bold text-xl truncate">{formData.crop || 'Crop Name'}</h3>
                    <p className="text-sm text-gray-600 font-medium">{userName}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-green-700 text-lg">₹{formData.expectedPrice || '0'}</p>
                    <p className="text-xs text-gray-500">per Qtl</p>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 pt-2 border-t">
                  <span className="font-semibold text-gray-900">{formData.quantity || '0'} Qtl Available</span>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 p-4 bg-gray-50 border rounded-lg text-sm text-gray-500">
              <p><strong>Note:</strong> This is exactly how your listing will appear to buyers in the Marketplace.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
