"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf, Mail, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate password reset email sending
    setTimeout(() => {
      setIsLoading(false)
      setIsEmailSent(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link
            href="/auth/login"
            className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Login</span>
          </Link>

          <div className="flex items-center justify-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              FarmChain
            </span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
            <p className="text-gray-600">
              {isEmailSent ? "Check your email for reset instructions" : "Enter your email to reset your password"}
            </p>
          </div>
        </div>

        <Card className="border-2 border-green-100">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">{isEmailSent ? "Email Sent!" : "Forgot Password"}</CardTitle>
            <CardDescription className="text-center">
              {isEmailSent
                ? "We've sent password reset instructions to your email"
                : "We'll send you a link to reset your password"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isEmailSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-green-800">Reset link sent!</p>
                  <p className="text-sm text-gray-600">
                    Check your email at <strong>{email}</strong> for password reset instructions.
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setIsEmailSent(false)
                    setEmail("")
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Send to different email
                </Button>
              </div>
            )}

            <div className="text-center text-sm text-gray-600">
              Remember your password?{" "}
              <Link href="/auth/login" className="text-green-600 hover:text-green-700 font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mt-0.5">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <div className="text-sm">
              <div className="font-medium text-green-800">Secure Reset Process</div>
              <div className="text-green-700 mt-1">
                Password reset links expire in 1 hour and can only be used once for your security.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
