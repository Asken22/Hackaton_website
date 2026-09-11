import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { MainLayout } from "./components/layout/MainLayout"
import { LandingPage } from "./pages/LandingPage"
import { Dashboard } from "./pages/Dashboard"
import { UploadProduce } from "./pages/UploadProduce"
import { Marketplace } from "./pages/Marketplace"
import { MarketIntelligence } from "./pages/MarketIntelligence"
import { MyListings } from "./pages/MyListings"
import { Offers } from "./pages/Offers"
import { Storage } from "./pages/Storage"
import { Logistics } from "./pages/Logistics"
import { Support } from "./pages/Support"
import { Transactions } from "./pages/Transactions"
import { LotCreation } from "./pages/LotCreation"

// Placeholder pages to be implemented
const Placeholder = ({ title }: { title: string }) => <div className="p-10 text-2xl font-bold">{title}</div>

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/market" element={<MarketIntelligence />} />
          <Route path="/upload" element={<UploadProduce />} />
          <Route path="/listings" element={<MyListings />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/lots" element={<LotCreation />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="/logistics" element={<Logistics />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/support" element={<Support />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
