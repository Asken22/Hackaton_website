import { Link, useLocation, useNavigate } from "react-router-dom"
import { 
  LayoutDashboard, ShoppingCart, List, Send, PackagePlus, 
  Warehouse, Truck, History, FileText, CheckSquare, 
  Bell, User, LogOut, Activity
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useUser } from "@/contexts/UserContext"

const roleNavItems = {
  farmer: [
    { title: "Dashboard", href: "/farmer/dashboard", icon: LayoutDashboard },
    { title: "Market Intelligence", href: "/farmer/market", icon: Activity },
    { title: "Warehouses", href: "/farmer/warehouses", icon: Warehouse },
    { title: "Create Listing", href: "/farmer/create-listing", icon: PackagePlus },
    { title: "My Listings", href: "/farmer/listings", icon: List },
    { title: "Quality Verification", href: "/farmer/verification", icon: CheckSquare },
    { title: "Virtual Lots", href: "/farmer/lots", icon: Truck }, // Repurposing Truck icon
    { title: "Buyer Bids", href: "/farmer/bids", icon: Send },
    { title: "Notifications", href: "/farmer/notifications", icon: Bell },
    { title: "Profile", href: "/farmer/profile", icon: User },
  ],
  buyer: [
    { title: "Dashboard", href: "/buyer/dashboard", icon: LayoutDashboard },
    { title: "Browse Listings", href: "/buyer/browse", icon: ShoppingCart },
    { title: "Virtual Lots", href: "/buyer/lots", icon: Truck },
    { title: "Recommended", href: "/buyer/recommended", icon: List },
    { title: "My Bids", href: "/buyer/bids", icon: Send },
    { title: "Orders", href: "/buyer/orders", icon: History },
    { title: "Notifications", href: "/buyer/notifications", icon: Bell },
    { title: "Profile", href: "/buyer/profile", icon: User },
  ],
  fpo: [
    { title: "Dashboard", href: "/fpo/dashboard", icon: LayoutDashboard },
    { title: "Verification Requests", href: "/fpo/verifications", icon: FileText },
    { title: "Completed", href: "/fpo/completed", icon: CheckSquare },
    { title: "Profile", href: "/fpo/profile", icon: User },
  ]
}

export function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { role, setRole, userName } = useUser()

  const navItems = role ? roleNavItems[role] : []

  const handleLogout = () => {
    setRole(null)
    navigate("/login")
  }

  return (
    <nav className="w-64 border-r bg-card hidden md:flex flex-col shrink-0 min-h-screen">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          <Warehouse className="h-6 w-6" />
          AgriLink
        </h2>
        {role && (
          <p className="text-sm text-muted-foreground mt-2 font-medium capitalize">
            {role} Portal
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1 px-4 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {item.title}
            </Link>
          )
        })}
      </div>

      {role && (
        <div className="p-4 border-t mt-auto">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {userName.charAt(0)}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold truncate">{userName}</span>
              <span className="text-xs text-muted-foreground capitalize">{role}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Switch Role / Logout
          </button>
        </div>
      )}
    </nav>
  )
}
