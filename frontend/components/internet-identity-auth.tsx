"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Fingerprint, Smartphone, Key, Shield, CheckCircle, Loader2, AlertCircle } from "lucide-react"

interface InternetIdentityAuthProps {
  onClose: () => void
  onSuccess: () => void
}

export function InternetIdentityAuth({ onClose, onSuccess }: InternetIdentityAuthProps) {
  const [step, setStep] = useState<"detecting" | "methods" | "authenticating" | "success">("detecting")
  const [availableMethods, setAvailableMethods] = useState<string[]>([])
  const [selectedMethod, setSelectedMethod] = useState<string>("")

  useEffect(() => {
    // Simulate biometric detection
    const detectBiometrics = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const methods = []

      // Simulate WebAuthn API detection
      if (typeof window !== "undefined" && window.PublicKeyCredential) {
        methods.push("fingerprint", "face-id", "security-key")
      }

      setAvailableMethods(methods)
      setStep("methods")
    }

    detectBiometrics()
  }, [])

  const handleAuthenticate = async (method: string) => {
    setSelectedMethod(method)
    setStep("authenticating")

    // Simulate authentication process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setStep("success")
    setTimeout(() => {
      onSuccess()
    }, 1500)
  }

  const handleClose = () => {
    onClose()
  }

  const authMethods = [
    {
      id: "fingerprint",
      name: "Fingerprint",
      description: "Use fingerprint sensor",
      icon: Fingerprint,
      available: availableMethods.includes("fingerprint"),
    },
    {
      id: "face-id",
      name: "Face ID",
      description: "Use facial recognition",
      icon: Smartphone,
      available: availableMethods.includes("face-id"),
    },
    {
      id: "security-key",
      name: "Security Key",
      description: "Use hardware key",
      icon: Key,
      available: availableMethods.includes("security-key"),
    },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-sm relative">
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-2 h-8 w-8 p-0 z-10"
          onClick={handleClose}
          type="button"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>

        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-3">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-xl">Internet Identity</CardTitle>
          <CardDescription className="text-sm">Secure authentication with WebAuthn</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {step === "detecting" && (
            <div className="text-center py-6">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-3 text-blue-600" />
              <p className="text-sm text-gray-600">Detecting available methods...</p>
            </div>
          )}

          {step === "methods" && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 text-center mb-4">Choose your authentication method:</p>

              {authMethods.map((method) => {
                const IconComponent = method.icon
                return (
                  <Button
                    key={method.id}
                    variant="outline"
                    className="w-full justify-start h-auto p-3 bg-transparent"
                    onClick={() => handleAuthenticate(method.id)}
                    disabled={!method.available}
                    type="button"
                  >
                    <IconComponent className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">{method.name}</div>
                      <div className="text-xs text-gray-500">{method.description}</div>
                    </div>
                    {method.available && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        Available
                      </Badge>
                    )}
                  </Button>
                )
              })}

              {availableMethods.length === 0 && (
                <div className="text-center py-4">
                  <AlertCircle className="h-8 w-8 mx-auto mb-2 text-amber-500" />
                  <p className="text-sm text-gray-600">No biometric methods detected. Please use traditional login.</p>
                  <Button variant="outline" className="mt-3 bg-transparent" onClick={handleClose} type="button">
                    Use Traditional Login
                  </Button>
                </div>
              )}
            </div>
          )}

          {step === "authenticating" && (
            <div className="text-center py-6">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-3 text-blue-600" />
              <p className="text-sm text-gray-600">
                Authenticating with {authMethods.find((m) => m.id === selectedMethod)?.name}...
              </p>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-6">
              <CheckCircle className="h-8 w-8 mx-auto mb-3 text-green-600" />
              <p className="text-sm text-gray-600">Authentication successful!</p>
            </div>
          )}

          {step === "methods" && availableMethods.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                <Shield className="h-3 w-3 inline mr-1" />
                WebAuthn provides secure, passwordless authentication using your device's built-in security features.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
