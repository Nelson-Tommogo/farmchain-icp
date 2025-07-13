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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Truck, Package, Scan, AlertTriangle, CheckCircle, Clock, Eye, FileText, Shield, BarChart3 } from "lucide-react"

export function AgribusinessDashboard() {
  const [activeTab, setActiveTab] = useState("outputs")

  // Mock data
  const outputTokens = [
    {
      id: "OUT001",
      farmer: "John Otirno",
      crop: "Corn",
      quantity: 950,
      grade: "Premium",
      location: "Warehouse A",
      status: "pending",
      date: "2024-01-16",
    },
    {
      id: "OUT002",
      farmer: "Maria Elated",
      crop: "Wheat",
      quantity: 1200,
      grade: "Standard",
      location: "Warehouse B",
      status: "verified",
      date: "2024-01-15",
    },
  ]

  const inputDistributions = [
    {
      id: "IN001",
      farmer: "jane kimani",
      input: "Seeds",
      quantity: 50,
      status: "delivered",
      date: "2024-01-10",
    },
    {
      id: "IN002",
      farmer: "Common Genius",
      input: "Fertilizer",
      quantity: 25,
      status: "pending",
      date: "2024-01-12",
    },
  ]

  const issues = [
    {
      id: 1,
      type: "Quality Dispute",
      farmer: "John Smith",
      description: "Corn quality below expected grade",
      status: "investigating",
      date: "2024-01-14",
    },
    {
      id: 2,
      type: "Delivery Issue",
      farmer: "Wanjiku John",
      description: "Late delivery of fertilizer tokens",
      status: "resolved",
      date: "2024-01-12",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Tokens Processed</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">1,247</p>
              </div>
              <Package className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Pending Verification</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">23</p>
              </div>
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Active Issues</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">3</p>
              </div>
              <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Success Rate</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">98.5%</p>
              </div>
              <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 h-auto">
          <TabsTrigger value="outputs" className="text-xs sm:text-sm py-2">
            <span className="hidden sm:inline">Redeem Outputs</span>
            <span className="sm:hidden">Outputs</span>
          </TabsTrigger>
          <TabsTrigger value="inputs" className="text-xs sm:text-sm py-2">
            <span className="hidden sm:inline">Input Distribution</span>
            <span className="sm:hidden">Inputs</span>
          </TabsTrigger>
          <TabsTrigger value="issues" className="text-xs sm:text-sm py-2">
            <span className="hidden sm:inline">Report Issues</span>
            <span className="sm:hidden">Issues</span>
          </TabsTrigger>
        </TabsList>

        {/* Redeem Outputs Tab */}
        <TabsContent value="outputs" className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl">Output Token Redemption</CardTitle>
              <CardDescription className="text-sm">
                Scan and verify harvest output tokens for processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Button className="w-full sm:w-auto">
                  <Scan className="mr-2 h-4 w-4" />
                  Scan QR Code
                </Button>
              </div>

              <div className="space-y-4">
                {outputTokens.map((token) => (
                  <div key={token.id} className="border rounded-lg p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-4 space-y-2 sm:space-y-0">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg font-medium">Token #{token.id}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {token.farmer} • {token.crop}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600">Location: {token.location}</p>
                      </div>
                      <Badge
                        variant={token.status === "pending" ? "outline" : "default"}
                        className={`text-xs ${token.status === "verified" ? "bg-green-100 text-green-800" : ""}`}
                      >
                        {token.status === "pending" ? (
                          <>
                            <Clock className="mr-1 h-3 w-3" />
                            Pending
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Verified
                          </>
                        )}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600">Quantity</p>
                        <p className="font-medium text-sm sm:text-base">{token.quantity}kg</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600">Grade</p>
                        <p className="font-medium text-sm sm:text-base">{token.grade}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600">Date</p>
                        <p className="font-medium text-sm sm:text-base">{token.date}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600">Status</p>
                        <p className="font-medium capitalize text-sm sm:text-base">{token.status}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-xs bg-transparent">
                            <Eye className="mr-1 h-3 w-3" />
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Token Details</DialogTitle>
                            <DialogDescription>Complete information for output token #{token.id}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium">Token Information</h4>
                              <p className="text-sm text-gray-600">ID: {token.id}</p>
                              <p className="text-sm text-gray-600">Farmer: {token.farmer}</p>
                              <p className="text-sm text-gray-600">Crop: {token.crop}</p>
                              <p className="text-sm text-gray-600">Quantity: {token.quantity}kg</p>
                              <p className="text-sm text-gray-600">Grade: {token.grade}</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Location & Status</h4>
                              <p className="text-sm text-gray-600">Current Location: {token.location}</p>
                              <p className="text-sm text-gray-600">Status: {token.status}</p>
                              <p className="text-sm text-gray-600">Date: {token.date}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {token.status === "pending" && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Verify & Process
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Input Distribution Tab */}
        <TabsContent value="inputs" className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl">Input Token Distribution</CardTitle>
              <CardDescription className="text-sm">
                Validate and distribute agricultural input tokens to farmers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inputDistributions.map((distribution) => (
                  <div
                    key={distribution.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg space-y-3 sm:space-y-0"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
                      <div className="min-w-0">
                        <h3 className="font-medium text-sm sm:text-base">Token #{distribution.id}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {distribution.farmer} • {distribution.input}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600">Quantity: {distribution.quantity}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4">
                      <Badge
                        variant={distribution.status === "pending" ? "outline" : "default"}
                        className={`text-xs ${distribution.status === "delivered" ? "bg-green-100 text-green-800" : ""}`}
                      >
                        {distribution.status === "pending" ? (
                          <>
                            <Clock className="mr-1 h-3 w-3" />
                            Pending
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Delivered
                          </>
                        )}
                      </Badge>
                      <span className="text-xs sm:text-sm text-gray-600">{distribution.date}</span>
                      {distribution.status === "pending" && (
                        <Button size="sm" className="text-xs">
                          Confirm Delivery
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Report Issues Tab */}
        <TabsContent value="issues" className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl">Issue Management</CardTitle>
              <CardDescription className="text-sm">
                Report and track delivery issues, quality concerns, and insurance claims
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="w-full sm:w-auto">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Report New Issue
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Report Issue</SheetTitle>
                      <SheetDescription>Submit a new issue report for investigation</SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="issue-type" className="text-sm">
                          Issue Type
                        </Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select issue type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="quality">Quality Dispute</SelectItem>
                            <SelectItem value="delivery">Delivery Issue</SelectItem>
                            <SelectItem value="fraud">Fraud Report</SelectItem>
                            <SelectItem value="insurance">Insurance Claim</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="farmer-name" className="text-sm">
                          Farmer Name
                        </Label>
                        <Input id="farmer-name" placeholder="Enter farmer name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="token-id" className="text-sm">
                          Token ID
                        </Label>
                        <Input id="token-id" placeholder="Enter token ID" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm">
                          Description
                        </Label>
                        <Textarea id="description" placeholder="Describe the issue in detail" rows={3} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority" className="text-sm">
                          Priority
                        </Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full mt-4">Submit Issue Report</Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="space-y-4">
                {issues.map((issue) => (
                  <div key={issue.id} className="border rounded-lg p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-4 space-y-2 sm:space-y-0">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg font-medium">{issue.type}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {issue.farmer} • {issue.date}
                        </p>
                      </div>
                      <Badge
                        variant={issue.status === "investigating" ? "outline" : "default"}
                        className={`text-xs ${issue.status === "resolved" ? "bg-green-100 text-green-800" : ""}`}
                      >
                        {issue.status === "investigating" ? (
                          <>
                            <Clock className="mr-1 h-3 w-3" />
                            Investigating
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Resolved
                          </>
                        )}
                      </Badge>
                    </div>

                    <p className="text-sm sm:text-base text-gray-700 mb-4">{issue.description}</p>

                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="text-xs bg-transparent">
                        <FileText className="mr-1 h-3 w-3" />
                        View Details
                      </Button>
                      {issue.status === "investigating" && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
                          <Shield className="mr-1 h-3 w-3" />
                          Mark Resolved
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
