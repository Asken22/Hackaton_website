import { Bell, CheckCircle, IndianRupee, AlertTriangle, Clock, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useUser } from "@/contexts/UserContext"

export function Notifications() {
  const { role } = useUser()

  const farmerNotifications = [
    {
      id: 1,
      type: 'bid',
      title: 'New Bid Received',
      message: 'FreshKart Organics placed a bid of ₹3,100/Qtl for your Basmati Rice (50 Qtl).',
      time: '10 minutes ago',
      read: false,
      icon: <IndianRupee className="h-5 w-5 text-blue-600" />
    },
    {
      id: 2,
      type: 'success',
      title: 'Quality Verification Approved',
      message: 'Your Wheat (Lokwan) has been certified Grade A (Score: 92%) by your local FPO.',
      time: '2 hours ago',
      read: false,
      icon: <CheckCircle className="h-5 w-5 text-green-600" />
    },
    {
      id: 3,
      type: 'alert',
      title: 'Market Alert',
      message: 'Maize prices in Karnal Mandi have risen by 5% today. Consider listing your harvest soon.',
      time: '1 day ago',
      read: true,
      icon: <AlertTriangle className="h-5 w-5 text-orange-600" />
    }
  ]

  const buyerNotifications = [
    {
      id: 1,
      type: 'success',
      title: 'Bid Accepted!',
      message: 'Ramesh Kumar accepted your bid of ₹3,100/Qtl for Basmati Rice. Proceed to payment.',
      time: '5 minutes ago',
      read: false,
      icon: <CheckCircle className="h-5 w-5 text-green-600" />
    },
    {
      id: 2,
      type: 'info',
      title: 'New Verified Listing',
      message: '120 Qtl of Grade A Wheat (FPO Verified) is now available near Pune, Maharashtra.',
      time: '1 hour ago',
      read: false,
      icon: <Info className="h-5 w-5 text-blue-600" />
    },
    {
      id: 3,
      type: 'logistics',
      title: 'Logistics Update',
      message: 'Kisan Rath transport has been booked and dispatched for Order #4092.',
      time: '1 day ago',
      read: true,
      icon: <Clock className="h-5 w-5 text-gray-600" />
    }
  ]

  const fpoNotifications = [
    {
      id: 1,
      type: 'alert',
      title: 'New Verification Request',
      message: 'Amit Singh requested an FPO Quality Check for Wheat (Lokwan).',
      time: '10 minutes ago',
      read: false,
      icon: <AlertTriangle className="h-5 w-5 text-orange-600" />
    },
    {
      id: 2,
      type: 'info',
      title: 'System Update',
      message: 'New grading parameters and guidelines released for upcoming Kharif crops.',
      time: '2 days ago',
      read: true,
      icon: <Info className="h-5 w-5 text-blue-600" />
    }
  ]

  let activeNotifications = farmerNotifications
  if (role === 'buyer') activeNotifications = buyerNotifications
  if (role === 'fpo') activeNotifications = fpoNotifications

  return (
    <div className="max-w-4xl mx-auto pb-10 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 flex items-center gap-3">
            <Bell className="h-8 w-8 text-green-700" /> Notifications
          </h1>
          <p className="text-muted-foreground text-lg">Stay updated on your marketplace activity.</p>
        </div>
        <button className="text-sm font-medium text-green-700 hover:text-green-800 underline">
          Mark all as read
        </button>
      </div>

      <Card className="border-t-4 border-t-green-600 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>You have {activeNotifications.filter(n => !n.read).length} unread messages.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {activeNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 sm:p-6 flex gap-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-green-50/30' : ''}`}
              >
                <div className={`mt-1 shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                  notification.type === 'success' ? 'bg-green-100' :
                  notification.type === 'bid' ? 'bg-blue-100' :
                  notification.type === 'alert' ? 'bg-orange-100' :
                  'bg-gray-100'
                }`}>
                  {notification.icon}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <p className={`text-sm font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                      {notification.title}
                    </p>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                </div>
                {!notification.read && (
                  <div className="shrink-0 flex items-center justify-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-600"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
