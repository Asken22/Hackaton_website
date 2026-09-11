import { useState, Fragment } from "react"
import { ArrowDownToLine, CheckCircle2, Clock, IndianRupee, FileText, Search, Filter, ChevronDown, ChevronUp, Check, CircleDot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const transactions = [
  {
    id: "TRX-89210",
    date: "14 May 2024",
    buyer: "FreshKart Organics",
    crop: "Basmati Rice (40 Qtl)",
    amount: "1,43,200",
    status: "Completed",
    type: "Credit",
    progress: 6
  },
  {
    id: "TRX-89209",
    date: "12 May 2024",
    buyer: "GreenBasket Foods",
    crop: "Wheat (120 Qtl)",
    amount: "2,82,000",
    status: "Escrow",
    type: "Hold",
    progress: 4
  },
  {
    id: "TRX-89188",
    date: "05 May 2024",
    buyer: "Bharat Grains Ltd.",
    crop: "Soybean (50 Qtl)",
    amount: "2,10,000",
    status: "Completed",
    type: "Credit",
    progress: 6
  },
  {
    id: "TRX-89150",
    date: "28 Apr 2024",
    buyer: "AgriTech Processing",
    crop: "Mustard (30 Qtl)",
    amount: "1,73,400",
    status: "Completed",
    type: "Credit",
    progress: 6
  },
  {
    id: "TRX-89145",
    date: "25 Apr 2024",
    buyer: "Haryana State Transport",
    crop: "Logistics Fee",
    amount: "4,500",
    status: "Pending",
    type: "Debit",
    progress: 2
  }
]

// Steps for the transaction timeline
const timelineSteps = [
  { title: "Offer accepted", date: "21 May · 09:40 AM" },
  { title: "Pickup scheduled", date: "23 May · 08:00 AM" },
  { title: "Delivery", date: "Expected 24 May" },
  { title: "Payment pending", date: "Expected 25 May" },
  { title: "Payment completed", date: "Awaiting delivery" },
  { title: "Invoice generated", date: "Awaiting payment" }
]

export function Transactions() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold tracking-wider text-green-600 uppercase">Payments</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">Transactions</h1>
          <p className="text-muted-foreground text-lg">Manage your payments, view invoices, and track escrow balances.</p>
        </div>
        <Button variant="outline" className="text-green-700 border-green-200 hover:bg-green-50 shrink-0">
          <ArrowDownToLine className="mr-2 h-4 w-4" /> Download Statement
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-[#1e8b4b] text-white border-none shadow-md">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-green-100 mb-1">Total Earnings (This Season)</p>
            <div className="flex items-baseline gap-1">
              <IndianRupee className="h-6 w-6" />
              <h3 className="text-4xl font-bold">5,26,600</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-200">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500 mb-1">Funds in Escrow</p>
            <div className="flex items-baseline gap-1 text-gray-900 dark:text-white">
              <IndianRupee className="h-6 w-6" />
              <h3 className="text-4xl font-bold">2,82,000</h3>
            </div>
            <p className="text-xs text-orange-500 font-medium mt-2 flex items-center">
              <Clock className="h-3 w-3 mr-1" /> Awaiting buyer confirmation
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-200">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500 mb-1">Pending Payables</p>
            <div className="flex items-baseline gap-1 text-gray-900 dark:text-white">
              <IndianRupee className="h-6 w-6" />
              <h3 className="text-4xl font-bold">4,500</h3>
            </div>
            <p className="text-xs text-red-500 font-medium mt-2 flex items-center">
              <Clock className="h-3 w-3 mr-1" /> Transport fee due soon
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card className="shadow-sm border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
          <div className="relative flex-1 max-w-sm w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by ID or Buyer..."
              className="w-full rounded-md border border-gray-300 bg-white dark:bg-gray-950 pl-9 pr-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
            />
          </div>
          <Button variant="outline" className="text-gray-600 bg-white shrink-0 w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th className="px-6 py-4 font-semibold">Transaction ID / Date</th>
                <th className="px-6 py-4 font-semibold">Description</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {transactions.map((trx) => (
                <Fragment key={trx.id}>
                  <tr 
                    onClick={() => toggleExpand(trx.id)}
                    className="hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        {expandedId === trx.id ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-700" />}
                        {trx.id}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5 ml-6">{trx.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white">{trx.buyer}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{trx.crop}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`font-bold flex items-center ${trx.type === 'Debit' ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>
                        {trx.type === 'Debit' ? '-' : '+'}₹{trx.amount}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {trx.status === 'Completed' && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
                        </span>
                      )}
                      {trx.status === 'Escrow' && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          <Clock className="w-3 h-3 mr-1" /> In Escrow
                        </span>
                      )}
                      {trx.status === 'Pending' && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <Clock className="w-3 h-3 mr-1" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="text-green-700 hover:text-green-800 hover:bg-green-50" onClick={(e) => { e.stopPropagation(); toggleExpand(trx.id); }}>
                        <FileText className="h-4 w-4 mr-2" /> Details
                      </Button>
                    </td>
                  </tr>
                  
                  {/* Expanded Timeline View */}
                  {expandedId === trx.id && (
                    <tr className="bg-gray-50/30 dark:bg-gray-900/30 border-t-0">
                      <td colSpan={5} className="px-6 py-8">
                        
                        <div className="relative max-w-4xl mx-auto">
                          {/* Background connecting line */}
                          <div className="absolute top-5 left-10 right-10 h-0.5 bg-gray-200 dark:bg-gray-700 -z-10"></div>
                          <div 
                            className="absolute top-5 left-10 h-0.5 bg-green-300 dark:bg-green-800 -z-10 transition-all duration-500" 
                            style={{ width: `${(Math.max(0, trx.progress - 1) / (timelineSteps.length - 1)) * 100}%` }}
                          ></div>
                          
                          <div className="flex justify-between relative">
                            {timelineSteps.map((step, idx) => {
                              const stepNumber = idx + 1;
                              const isCompleted = stepNumber < trx.progress;
                              const isCurrent = stepNumber === trx.progress;
                              
                              return (
                                <div key={idx} className="flex flex-col items-center w-24 text-center">
                                  {isCompleted ? (
                                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-green-100 border-2 border-green-200 mb-3 text-green-600 shadow-sm">
                                      <Check className="h-5 w-5" />
                                    </div>
                                  ) : isCurrent ? (
                                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-orange-50 border-2 border-orange-300 mb-3 text-orange-500 shadow-sm ring-4 ring-orange-50">
                                      <CircleDot className="h-5 w-5" />
                                    </div>
                                  ) : (
                                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-100 border-2 border-gray-200 mb-3 text-gray-400 font-bold">
                                      {stepNumber}
                                    </div>
                                  )}
                                  
                                  <span className={`text-xs font-bold mb-1 ${isCurrent ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                                    {step.title}
                                  </span>
                                  <span className="text-[10px] text-gray-500 leading-tight">
                                    {step.date}
                                  </span>
                                </div>
                              )
                            })}
                          </div>
                        </div>

                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
