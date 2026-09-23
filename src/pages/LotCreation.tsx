import { useState, useEffect } from "react"
import { Users, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockDB } from "@/lib/mockDatabase"
import type { VirtualLot } from "@/lib/mockDatabase"
import { useUser } from "@/contexts/UserContext"

export function LotCreation() {
  const { userId } = useUser()
  const [lots, setLots] = useState<VirtualLot[]>([])

  useEffect(() => {
    // Initial fetch
    setLots(mockDB.getVirtualLots())
  }, [])

  const createLot = () => {
    const newLot: VirtualLot = {
      id: `lot_${Date.now()}`,
      crop: 'Basmati Rice', // Hardcoded for demo
      targetQuantity: 500,
      currentQuantity: 50,
      farmerIds: [userId],
      status: 'Forming'
    }
    mockDB.addVirtualLot(newLot)
    setLots(mockDB.getVirtualLots())
    alert('Virtual Lot Created!')
  }

  const joinLot = (lotId: string) => {
    const lot = lots.find(l => l.id === lotId)
    if (!lot) return
    mockDB.updateVirtualLot(lotId, { 
      farmerIds: [...lot.farmerIds, userId],
      currentQuantity: lot.currentQuantity + 50 // Assuming 50 qtl added for demo
    })
    setLots(mockDB.getVirtualLots())
    alert('Joined Virtual Lot!')
  }

  return (
    <div className="max-w-7xl mx-auto pb-10 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Virtual Lots</h1>
          <p className="text-muted-foreground text-lg">Combine your harvest with nearby farmers to sell to institutional buyers.</p>
        </div>
        <Button className="w-full sm:w-auto bg-green-700 hover:bg-green-800" onClick={createLot}>
          <Plus className="mr-2 h-4 w-4" /> Create New Lot
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lots.map(lot => (
          <Card key={lot.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                {lot.crop} Lot
              </CardTitle>
              <CardDescription>Status: {lot.status}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span className="font-bold">{lot.currentQuantity} / {lot.targetQuantity} Qtl</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-600" 
                    style={{ width: `${Math.min((lot.currentQuantity / lot.targetQuantity) * 100, 100)}%` }} 
                  />
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Farmers in lot: {lot.farmerIds.length}
              </div>
              
              {!lot.farmerIds.includes(userId) && lot.status === 'Forming' && (
                <Button className="w-full" variant="outline" onClick={() => joinLot(lot.id)}>
                  Join Lot (+50 Qtl)
                </Button>
              )}
              {lot.farmerIds.includes(userId) && (
                <div className="w-full text-center p-2 bg-green-50 text-green-700 rounded-md font-medium text-sm">
                  You are part of this lot
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        {lots.length === 0 && (
          <p className="text-gray-500 col-span-full">No active virtual lots nearby. Create one to get started!</p>
        )}
      </div>
    </div>
  )
}
