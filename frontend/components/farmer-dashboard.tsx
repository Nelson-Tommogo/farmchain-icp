"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Coins, FileText, Plus, Eye, Clock, CheckCircle, DollarSign, Sprout, Package } from "lucide-react"

export function FarmerDashboard() {
  const [activeTab, setActiveTab] = useState("inputs")

  // Mock data
  const inputTokens = [
    { id: 1, type: "Seeds", quantity: 50, status: "available", value: 500 },
    { id: 2, type: "Fertilizer", quantity: 25, status: "redeemed", value: 750 },
    { id: 3, type: "Equipment", quantity: 1, status: "pending", value: 2000 },
  ]

  const harvestData = [
    { id: 1, crop: "Corn", quantity: 1000, status: "ready", date: "2024-01-15" },
    { id: 2, crop: "Wheat", quantity: 800, status: "growing", date: "2024-02-20" },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Available Tokens</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">75</p>
              </div>
              <Coins className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Token Value</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">$3,250</p>
              </div>
              <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Active Crops</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">2</p>
              </div>
              <Sprout className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Pending Harvest</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">1,800kg</p>
              </div>
              <Package className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 h-auto">
          <TabsTrigger value="inputs" className="text-xs sm:text-sm py-2">
            <span className="hidden sm:inline">My Inputs</span>
            <span className="sm:hidden">Inputs</span>
          </TabsTrigger>
          <TabsTrigger value="financing" className="text-xs sm:text-sm py-2">
            <span className="hidden sm:inline">Apply for Financing</span>
            <span className="sm:hidden">Finance</span>
          </TabsTrigger>
          <TabsTrigger value="harvest" className="text-xs sm:text-sm py-2">
            <span className="hidden sm:inline">My Harvest</span>
            <span className="sm:hidden">Harvest</span>
          </TabsTrigger>
        </TabsList>

        {/* My Inputs Tab */}
        <TabsContent value="inputs" className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl">Input Tokens</CardTitle>
              <CardDescription className="text-sm">
                Manage your agricultural input tokens and redemption status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inputTokens.map((token) => (
                  <div
                    key={token.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg space-y-3 sm:space-y-0"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <Coins className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
                      <div className="min-w-0">
                        <h3 className="font-medium text-sm sm:text-base">{token.type}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">Quantity: {token.quantity}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4">
                      <Badge
                        variant={
                          token.status === "available"
                            ? "default"
                            : token.status === "redeemed"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {token.status}
                      </Badge>
                      <span className="font-medium text-sm sm:text-base">${token.value}</span>
                      <div className="flex space-x-2">
                        {token.status === "available" && (
                          <Button size="sm" className="text-xs">
                            Redeem
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="p-2 bg-transparent">
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Apply for Financing Tab */}
        <TabsContent value="financing" className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl">DAO Financing Application</CardTitle>
              <CardDescription className="text-sm">Apply for community-funded agricultural inputs</CardDescription>
            </CardHeader>
            <CardContent>
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Submit New Application
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Financing Application</SheetTitle>
                    <SheetDescription>Fill out the form to apply for DAO funding</SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="land-size" className="text-sm">
                        Land Size (hectares)
                      </Label>
                      <Input id="land-size" placeholder="Enter land size" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="crop-type" className="text-sm">
                        Crop Type
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select crop type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="corn">Corn</SelectItem>
                          <SelectItem value="wheat">Wheat</SelectItem>
                          <SelectItem value="rice">Rice</SelectItem>
                          <SelectItem value="soybeans">Soybeans</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="input-needed" className="text-sm">
                        Input Needed
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select input type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="seeds">Seeds</SelectItem>
                          <SelectItem value="fertilizer">Fertilizer</SelectItem>
                          <SelectItem value="equipment">Equipment</SelectItem>
                          <SelectItem value="pesticides">Pesticides</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expected-harvest" className="text-sm">
                        Expected Harvest (kg)
                      </Label>
                      <Input id="expected-harvest" placeholder="Enter expected harvest" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="funding-amount" className="text-sm">
                        Funding Amount ($)
                      </Label>
                      <Input id="funding-amount" placeholder="Enter funding amount" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm">
                        Project Description
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your farming project and how the funding will be used"
                        rows={3}
                      />
                    </div>
                    <Button className="w-full mt-4">Submit to DAO</Button>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Recent Applications */}
              <div className="mt-8">
                <h3 className="text-base sm:text-lg font-medium mb-4">Recent Applications</h3>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
                      <div className="min-w-0">
                        <h4 className="font-medium text-sm sm:text-base">Corn Seeds & Fertilizer</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Applied 3 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="mr-1 h-3 w-3" />
                        Pending Vote
                      </Badge>
                      <span className="font-medium text-sm sm:text-base">$1,500</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
                      <div className="min-w-0">
                        <h4 className="font-medium text-sm sm:text-base">Wheat Equipment</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Applied 1 week ago</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4">
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Approved
                      </Badge>
                      <span className="font-medium text-sm sm:text-base">$2,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Harvest Tab */}
        <TabsContent value="harvest" className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl">Harvest Management</CardTitle>
              <CardDescription className="text-sm">Submit harvest details and mint output tokens</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {harvestData.map((harvest) => (
                  <div
                    key={harvest.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg space-y-3 sm:space-y-0"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <Sprout className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
                      <div className="min-w-0">
                        <h3 className="font-medium text-sm sm:text-base">{harvest.crop}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">Expected: {harvest.quantity}kg</p>
                        <p className="text-xs sm:text-sm text-gray-600">Harvest Date: {harvest.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4">
                      <Badge variant={harvest.status === "ready" ? "default" : "outline"} className="text-xs">
                        {harvest.status}
                      </Badge>
                      {harvest.status === "ready" && (
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button size="sm" className="text-xs">
                              <Plus className="mr-1 h-3 w-3" />
                              Mint Token
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                            <SheetHeader>
                              <SheetTitle>Mint Output Token</SheetTitle>
                              <SheetDescription>Submit harvest details to mint your output token</SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="actual-quantity" className="text-sm">
                                  Actual Harvest (kg)
                                </Label>
                                <Input id="actual-quantity" placeholder="Enter actual harvest quantity" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="quality-grade" className="text-sm">
                                  Quality Grade
                                </Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select quality grade" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="premium">Premium</SelectItem>
                                    <SelectItem value="standard">Standard</SelectItem>
                                    <SelectItem value="basic">Basic</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="delivery-location" className="text-sm">
                                  Delivery Location
                                </Label>
                                <Input id="delivery-location" placeholder="Enter delivery location" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="notes" className="text-sm">
                                  Additional Notes
                                </Label>
                                <Textarea
                                  id="notes"
                                  placeholder="Any additional information about the harvest"
                                  rows={3}
                                />
                              </div>
                              <Button className="w-full mt-4">Confirm & Mint Token</Button>
                            </div>
                          </SheetContent>
                        </Sheet>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Minted Tokens */}
              <div className="mt-8">
                <h3 className="text-base sm:text-lg font-medium mb-4">Minted Output Tokens</h3>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg bg-green-50 space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <Package className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
                      <div className="min-w-0">
                        <h4 className="font-medium text-sm sm:text-base">Corn Output Token #001</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Quantity: 950kg | Grade: Premium</p>
                        <p className="text-xs sm:text-sm text-gray-600">Minted: 2024-01-16</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4">
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Active
                      </Badge>
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        Transfer
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
