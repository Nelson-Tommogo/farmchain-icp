"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Leaf, User, TrendingUp, Building2 } from "lucide-react"
import { InternetIdentityAuth } from "@/components/internet-identity-auth"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userRole, setUserRole] = useState("farmer")
  const [showInternetIdentity, setShowInternetIdentity] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Store user role in localStorage for dashboard personalization
    localStorage.setItem("userRole", userRole)
    router.push("/dashboard")
  }

  const handleInternetIdentitySuccess = () => {
    // Store user role in localStorage for dashboard personalization
    localStorage.setItem("userRole", userRole)
    router.push("/dashboard")
  }

  const roleOptions = [
    {
      value: "farmer",
      label: "Farmer",
      description: "Grow crops, apply for financing, tokenize harvest",
      icon: Leaf,
      color: "text-green-600",
    },
    {
      value: "investor",
      label: "Investor",
      description: "Fund projects, participate in DAO governance",
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      value: "agribusiness",
      label: "Agribusiness",
      description: "Process tokens, manage supply chain",
      icon: Building2,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">FarmChain</span>
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Role Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">I am a:</Label>
            <RadioGroup value={userRole} onValueChange={setUserRole} className="space-y-3">
              {roleOptions.map((role) => {
                const IconComponent = role.icon
                return (
                  <div
                    key={role.value}
                    className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
                  >
                    <RadioGroupItem value={role.value} id={role.value} />
                    <div className="flex items-center space-x-3 flex-1">
                      <IconComponent className={`h-5 w-5 ${role.color}`} />
                      <div className="flex-1">
                        <Label htmlFor={role.value} className="font-medium cursor-pointer">
                          {role.label}
                        </Label>
                        <p className="text-xs text-gray-500 mt-1">{role.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </RadioGroup>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Sign In
            </Button>
          </form>

          {/* Internet Identity Option */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full bg-transparent"
            onClick={() => setShowInternetIdentity(true)}
          >
            <User className="mr-2 h-4 w-4" />
            Internet Identity
          </Button>

          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <Link href="/auth/signup" className="text-green-600 hover:underline">
              Sign up
            </Link>
          </div>

          <div className="text-center">
            <Link href="/auth/forgot-password" className="text-sm text-green-600 hover:underline">
              Forgot your password?
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Internet Identity Modal */}
      {showInternetIdentity && (
        <InternetIdentityAuth
          onClose={() => setShowInternetIdentity(false)}
          onSuccess={handleInternetIdentitySuccess}
        />
      )}
    </div>
  )
}
