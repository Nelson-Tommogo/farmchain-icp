"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Sprout, TrendingUp, Building2, ArrowLeft } from "lucide-react"
import { InternetIdentityAuth } from "@/components/internet-identity-auth"

export default function SignupPage() {
  const [userRole, setUserRole] = useState("")
  const [showRoleSelection, setShowRoleSelection] = useState(false)
  const router = useRouter()

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userRole) {
      setShowRoleSelection(true)
      return
    }

    // Store user role in localStorage
    localStorage.setItem("userRole", userRole)

    // Redirect to dashboard
    router.push("/dashboard")
  }

  const handleRoleSelect = (role: string) => {
    setUserRole(role)
    localStorage.setItem("userRole", role)
    router.push("/dashboard")
  }

  const roleOptions = [
    {
      value: "farmer",
      icon: <Sprout className="h-6 w-6 text-green-600" />,
      title: "Farmer",
      description: "Grow crops, apply for financing, and mint harvest tokens",
    },
    {
      value: "investor",
      icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
      title: "Investor",
      description: "Fund farming projects and participate in DAO governance",
    },
    {
      value: "agribusiness",
      icon: <Building2 className="h-6 w-6 text-purple-600" />,
      title: "Agribusiness",
      description: "Process harvest tokens and manage supply chain operations",
    },
  ]

  if (showRoleSelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowRoleSelection(false)}
              className="absolute left-4 top-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl">Choose Your Role</CardTitle>
            <CardDescription>Select how you'll be using FarmChain to customize your experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {roleOptions.map((role) => (
                <Card
                  key={role.value}
                  className="cursor-pointer border-2 hover:border-green-300 hover:bg-green-50/50 transition-all duration-200"
                  onClick={() => handleRoleSelect(role.value)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">{role.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{role.title}</h3>
                        <p className="text-gray-600 text-sm">{role.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Sprout className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl">Join FarmChain</CardTitle>
          <CardDescription>Create your account to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Smith" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Create a strong password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm your password" required />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <Link href="#" className="text-green-600 hover:text-green-700">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-green-600 hover:text-green-700">
                  Privacy Policy
                </Link>
              </Label>
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Create Account
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <InternetIdentityAuth onClose={function (): void {
            throw new Error("Function not implemented.")
          } } onSuccess={function (): void {
            throw new Error("Function not implemented.")
          } } />

          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-green-600 hover:text-green-700 font-medium">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
