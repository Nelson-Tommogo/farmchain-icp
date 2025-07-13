"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut, Bell, Menu } from "lucide-react"
import { FarmerDashboard } from "@/components/farmer-dashboard"
import { InvestorDashboard } from "@/components/investor-dashboard"
import { AgribusinessDashboard } from "@/components/agribusiness-dashboard"
import { AIChatbot } from "@/components/ai-chatbot"
import Image from "next/image"

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<string>("")
  const [userName, setUserName] = useState("John Smith")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "farmer"
    setUserRole(role)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    router.push("/")
  }

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "farmer":
        return "Farmer"
      case "investor":
        return "Investor"
      case "agribusiness":
        return "Agribusiness Partner"
      default:
        return "User"
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "farmer":
        return "bg-green-100 text-green-800"
      case "investor":
        return "bg-blue-100 text-blue-800"
      case "agribusiness":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderDashboard = () => {
    switch (userRole) {
      case "investor":
        return <InvestorDashboard />
      case "agribusiness":
        return <AgribusinessDashboard />
      default:
        return <FarmerDashboard />
    }
  }

  if (!userRole) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Image src="/images/icp-logo.jpg" alt="FarmChain Logo" width={32} height={32} className="rounded-lg" />
              <div className="hidden sm:block">
                <h1 className="text-xl font-semibold text-gray-900">FarmChain</h1>
                <p className="text-sm text-gray-500">{getRoleDisplayName(userRole)} Dashboard</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-semibold text-gray-900">FarmChain</h1>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <Badge className={`${getRoleBadgeColor(userRole)} text-xs sm:text-sm px-2 py-1`}>
                <span className="hidden sm:inline">{getRoleDisplayName(userRole)}</span>
                <span className="sm:hidden">
                  {userRole === "farmer" ? "Farm" : userRole === "investor" ? "Invest" : "Agri"}
                </span>
              </Badge>

              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Bell className="h-4 w-4" />
              </Button>

              {/* Desktop User Menu */}
              <div className="hidden sm:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-user.jpg" alt={userName} />
                        <AvatarFallback>
                          {userName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userName}</p>
                        <p className="text-xs leading-none text-gray-500">{getRoleDisplayName(userRole)}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="sm:hidden">
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px]">
                  <div className="flex flex-col space-y-4 mt-8">
                    <div className="flex items-center space-x-3 pb-4 border-b">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder-user.jpg" alt={userName} />
                        <AvatarFallback>
                          {userName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{userName}</p>
                        <p className="text-sm text-gray-500">{getRoleDisplayName(userRole)}</p>
                      </div>
                    </div>

                    <Button variant="ghost" className="justify-start" onClick={() => setMobileMenuOpen(false)}>
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Button>

                    <Button variant="ghost" className="justify-start" onClick={() => setMobileMenuOpen(false)}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>

                    <Button variant="ghost" className="justify-start" onClick={() => setMobileMenuOpen(false)}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>

                    <div className="border-t pt-4">
                      <Button
                        variant="ghost"
                        className="justify-start w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                          setMobileMenuOpen(false)
                          handleLogout()
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Welcome back, {userName}!</h2>
          <p className="text-sm sm:text-base text-gray-600">
            Here's what's happening with your {getRoleDisplayName(userRole).toLowerCase()} account today.
          </p>
        </div>

        {renderDashboard()}
      </main>

      <AIChatbot />
    </div>
  )
}
