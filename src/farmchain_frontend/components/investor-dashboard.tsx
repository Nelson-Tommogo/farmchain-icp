"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  Vote,
  DollarSign,
  Users,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Clock,
  CheckCircle,
  BarChart3,
} from "lucide-react"

export function InvestorDashboard() {
  const [activeTab, setActiveTab] = useState("proposals")

  // Mock data
  const fundingProposals = [
    {
      id: 1,
      farmer: "John Smith",
      crop: "Corn",
      landSize: 50,
      requestedAmount: 1500,
      description: "Need funding for premium corn seeds and organic fertilizer for 50 hectares.",
      votes: { yes: 12, no: 3 },
      status: "voting",
      timeLeft: "2 days",
    },
    {
      id: 2,
      farmer: "Maria Garcia",
      crop: "Wheat",
      landSize: 75,
      requestedAmount: 2000,
      description: "Equipment upgrade needed for wheat harvesting and processing.",
      votes: { yes: 18, no: 2 },
      status: "approved",
      timeLeft: "Completed",
    },
  ]

  const daoProposals = [
    {
      id: 1,
      title: "Increase Minimum Funding Threshold",
      description: "Proposal to increase minimum funding from $500 to $1000",
      votes: { yes: 45, no: 23 },
      status: "active",
      timeLeft: "5 days",
    },
    {
      id: 2,
      title: "Add New Crop Categories",
      description: "Add support for organic vegetables and herbs",
      votes: { yes: 67, no: 12 },
      status: "passed",
      timeLeft: "Completed",
    },
  ]

  const investments = [
    {
      id: 1,
      farmer: "John Smith",
      crop: "Corn",
      amount: 500,
      roi: 12.5,
      status: "active",
      date: "2024-01-10",
    },
    {
      id: 2,
      farmer: "Sarah Johnson",
      crop: "Rice",
      amount: 750,
      roi: 15.2,
      status: "completed",
      date: "2023-12-15",
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
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Invested</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">$12,500</p>
              </div>
              <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Average ROI</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">14.2%</p>
              </div>
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Active Investments</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">8</p>
              </div>
              <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Voting Power</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">125</p>
              </div>
              <Vote className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 h-auto">
          <TabsTrigger value="proposals" className="text-xs sm:text-sm py-2">
            <span className="hidden sm:inline">Funding Proposals</span>
            <span className="sm:hidden">Proposals</span>
          </TabsTrigger>
          <TabsTrigger value="dao" className="text-xs sm:text-sm py-2">
            <span className="hidden sm:inline">DAO Governance</span>
            <span className="sm:hidden">DAO</span>
          </TabsTrigger>
          <TabsTrigger value="investments" className="text-xs sm:text-sm py-2">
            <span className="hidden sm:inline">Investment History</span>
            <span className="sm:hidden">History</span>
          </TabsTrigger>
        </TabsList>

        {/* Funding Proposals Tab */}
        <TabsContent value="proposals" className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl">Active Funding Proposals</CardTitle>
              <CardDescription className="text-sm">Review and vote on farmer funding requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fundingProposals.map((proposal) => (
                  <div key={proposal.id} className="border rounded-lg p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-4 space-y-2 sm:space-y-0">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg font-medium">{proposal.farmer}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {proposal.crop} • {proposal.landSize} hectares
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-base sm:text-lg font-bold">${proposal.requestedAmount}</p>
                        <Badge
                          variant={proposal.status === "voting" ? "outline" : "default"}
                          className={`text-xs ${proposal.status === "approved" ? "bg-green-100 text-green-800" : ""}`}
                        >
                          {proposal.status === "voting" ? (
                            <>
                              <Clock className="mr-1 h-3 w-3" />
                              {proposal.timeLeft} left
                            </>
                          ) : (
                            <>
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Approved
                            </>
                          )}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-gray-700 mb-4">{proposal.description}</p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                      <div className="flex items-center space-x-4 w-full sm:w-auto">
                        <div className="flex items-center space-x-2">
                          <ThumbsUp className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{proposal.votes.yes}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ThumbsDown className="h-4 w-4 text-red-600" />
                          <span className="text-sm">{proposal.votes.no}</span>
                        </div>
                        <Progress
                          value={(proposal.votes.yes / (proposal.votes.yes + proposal.votes.no)) * 100}
                          className="w-20 sm:w-32"
                        />
                      </div>

                      <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-xs bg-transparent">
                              <Eye className="mr-1 h-3 w-3" />
                              Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Proposal Details</DialogTitle>
                              <DialogDescription>
                                Detailed information about {proposal.farmer}'s funding request
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium">Farmer Information</h4>
                                <p className="text-sm text-gray-600">Name: {proposal.farmer}</p>
                                <p className="text-sm text-gray-600">Land Size: {proposal.landSize} hectares</p>
                                <p className="text-sm text-gray-600">Crop Type: {proposal.crop}</p>
                              </div>
                              <div>
                                <h4 className="font-medium">Funding Details</h4>
                                <p className="text-sm text-gray-600">Amount Requested: ${proposal.requestedAmount}</p>
                                <p className="text-sm text-gray-600">Purpose: {proposal.description}</p>
                              </div>
                              <div>
                                <h4 className="font-medium">Voting Status</h4>
                                <p className="text-sm text-gray-600">Yes Votes: {proposal.votes.yes}</p>
                                <p className="text-sm text-gray-600">No Votes: {proposal.votes.no}</p>
                                <p className="text-sm text-gray-600">Time Remaining: {proposal.timeLeft}</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {proposal.status === "voting" && (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
                              <ThumbsUp className="mr-1 h-3 w-3" />
                              Vote Yes
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent text-xs"
                            >
                              <ThumbsDown className="mr-1 h-3 w-3" />
                              Vote No
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* DAO Governance Tab */}
        <TabsContent value="dao" className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl">Platform Governance</CardTitle>
              <CardDescription className="text-sm">Vote on platform proposals and policy changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {daoProposals.map((proposal) => (
                  <div key={proposal.id} className="border rounded-lg p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-4 space-y-2 sm:space-y-0">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg font-medium">{proposal.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mt-2">{proposal.description}</p>
                      </div>
                      <Badge
                        variant={proposal.status === "active" ? "outline" : "default"}
                        className={`text-xs ${proposal.status === "passed" ? "bg-green-100 text-green-800" : ""}`}
                      >
                        {proposal.status === "active" ? (
                          <>
                            <Clock className="mr-1 h-3 w-3" />
                            {proposal.timeLeft} left
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Passed
                          </>
                        )}
                      </Badge>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                      <div className="flex items-center space-x-4 w-full sm:w-auto">
                        <div className="flex items-center space-x-2">
                          <ThumbsUp className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{proposal.votes.yes}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ThumbsDown className="h-4 w-4 text-red-600" />
                          <span className="text-sm">{proposal.votes.no}</span>
                        </div>
                        <Progress
                          value={(proposal.votes.yes / (proposal.votes.yes + proposal.votes.no)) * 100}
                          className="w-20 sm:w-32"
                        />
                      </div>

                      {proposal.status === "active" && (
                        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
                            <ThumbsUp className="mr-1 h-3 w-3" />
                            Support
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent text-xs"
                          >
                            <ThumbsDown className="mr-1 h-3 w-3" />
                            Oppose
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Investment History Tab */}
        <TabsContent value="investments" className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl">Your Investments</CardTitle>
              <CardDescription className="text-sm">Track your investment performance and returns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investments.map((investment) => (
                  <div
                    key={investment.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg space-y-3 sm:space-y-0"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
                      <div className="min-w-0">
                        <h3 className="font-medium text-sm sm:text-base">{investment.farmer}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {investment.crop} • Invested: {investment.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-4 sm:space-x-6">
                      <div className="text-right">
                        <p className="font-medium text-sm sm:text-base">${investment.amount}</p>
                        <p className="text-xs sm:text-sm text-gray-600">Investment</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600 text-sm sm:text-base">+{investment.roi}%</p>
                        <p className="text-xs sm:text-sm text-gray-600">ROI</p>
                      </div>
                      <Badge
                        variant={investment.status === "active" ? "outline" : "default"}
                        className={`text-xs ${investment.status === "completed" ? "bg-green-100 text-green-800" : ""}`}
                      >
                        {investment.status}
                      </Badge>
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
