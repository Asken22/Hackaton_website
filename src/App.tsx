import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { MainLayout } from "./components/layout/MainLayout"
import { LandingPage } from "./pages/LandingPage"
import { Login } from "./pages/Login"
import { useUser } from "./contexts/UserContext"

// Common / Existing Pages (To be refactored)
import { Dashboard } from "./pages/Dashboard"
import { MarketIntelligence } from "./pages/MarketIntelligence"
import { Storage } from "./pages/Storage"
import { UploadProduce } from "./pages/UploadProduce"
import { MyListings } from "./pages/MyListings"
import { LotCreation } from "./pages/LotCreation"
import { Offers } from "./pages/Offers"
import { Marketplace } from "./pages/Marketplace"
import { FPODashboard } from "./pages/fpo/FPODashboard"
import { Profile } from "./pages/Profile"
import { Notifications } from "./pages/Notifications"

import { BuyerDashboard } from "./pages/buyer/BuyerDashboard"
import { BuyerLots } from "./pages/buyer/BuyerLots"
import { BuyerRecommended } from "./pages/buyer/BuyerRecommended"
import { BuyerBids } from "./pages/buyer/BuyerBids"
import { BuyerOrders } from "./pages/buyer/BuyerOrders"

// Placeholders for new pages
const Placeholder = ({ title }: { title: string }) => <div className="p-10 text-2xl font-bold">{title}</div>

// Role-based Route Guard
const RoleRoute = ({ allowedRole, children }: { allowedRole: string, children: React.ReactNode }) => {
  const { role } = useUser()
  if (role !== allowedRole) return <Navigate to="/login" replace />
  return <>{children}</>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        
        {/* Farmer Routes */}
        <Route path="/farmer" element={<RoleRoute allowedRole="farmer"><MainLayout /></RoleRoute>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="market" element={<MarketIntelligence />} />
          <Route path="warehouses" element={<Storage />} />
          <Route path="create-listing" element={<UploadProduce />} />
          <Route path="listings" element={<MyListings />} />
          <Route path="lots" element={<LotCreation />} />
          <Route path="bids" element={<Offers />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Buyer Routes */}
        <Route path="/buyer" element={<RoleRoute allowedRole="buyer"><MainLayout /></RoleRoute>}>
          <Route path="dashboard" element={<BuyerDashboard />} />
          <Route path="browse" element={<Marketplace />} />
          <Route path="lots" element={<BuyerLots />} />
          <Route path="recommended" element={<BuyerRecommended />} />
          <Route path="bids" element={<BuyerBids />} />
          <Route path="orders" element={<BuyerOrders />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* FPO Routes */}
        <Route path="/fpo" element={<RoleRoute allowedRole="fpo"><MainLayout /></RoleRoute>}>
          <Route path="dashboard" element={<Placeholder title="FPO Dashboard" />} />
          <Route path="verifications" element={<FPODashboard />} />
          <Route path="completed" element={<Placeholder title="Completed Verifications" />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
