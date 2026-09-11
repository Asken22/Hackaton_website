import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, ShoppingCart, List, Send, PackagePlus, Warehouse, Truck, History, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Market Intelligence", href: "/market", icon: History },
  { title: "Upload Produce", href: "/upload", icon: PackagePlus },
  { title: "My Listings", href: "/listings", icon: List },
  { title: "Marketplace", href: "/marketplace", icon: ShoppingCart },
  { title: "Offers", href: "/offers", icon: Send },
  { title: "Lot Creation", href: "/lots", icon: PackagePlus },
  { title: "Storage", href: "/storage", icon: Warehouse },
  { title: "Logistics", href: "/logistics", icon: Truck },
  { title: "Transactions", href: "/transactions", icon: History },
  { title: "Support", href: "/support", icon: HelpCircle },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <nav className="w-64 border-r bg-card hidden md:block shrink-0">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
          <Warehouse className="h-6 w-6" />
          AgriLink AI
        </h2>
      </div>
      <div className="flex flex-col gap-1 px-4">
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
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
