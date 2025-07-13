"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Leaf,
  Users,
  TrendingUp,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  Coins,
  Vote,
  Truck,
  BarChart3,
  Lock,
  Clock,
  RecycleIcon as Eco,
  Menu,
} from "lucide-react"
import { AIChatbot } from "@/components/ai-chatbot"
import Image from "next/image"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("farmers")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Image src="/images/icp-logo.jpg" alt="FarmChain Logo" width={32} height={32} className="rounded-lg" />
              <span className="text-xl font-bold text-gray-900">FarmChain</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
                How it Works
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Get Started</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link
                    href="#features"
                    className="text-lg font-medium text-gray-900 hover:text-green-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="text-lg font-medium text-gray-900 hover:text-green-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    How it Works
                  </Link>
                  <Link
                    href="#about"
                    className="text-lg font-medium text-gray-900 hover:text-green-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <div className="border-t pt-4 space-y-3">
                    <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full bg-transparent">
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
              🌱 Revolutionizing Agriculture with Blockchain
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Transparent Agriculture
              <span className="text-green-600 block">Supply Chain</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect farmers, investors, and agribusiness through blockchain technology. Tokenize agricultural inputs
              and outputs for complete supply chain transparency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                  Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Platform Capabilities */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <Card className="text-center border-green-200">
              <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-gray-900">{"< 2 sec"}</div>
                <div className="text-xs sm:text-sm text-gray-600">Lightning Fast</div>
              </CardContent>
            </Card>
            <Card className="text-center border-blue-200">
              <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                <Lock className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-gray-900">256-bit</div>
                <div className="text-xs sm:text-sm text-gray-600">Bank-Grade Security</div>
              </CardContent>
            </Card>
            <Card className="text-center border-purple-200">
              <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-xs sm:text-sm text-gray-600">Global Reach</div>
              </CardContent>
            </Card>
            <Card className="text-center border-emerald-200">
              <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                <Eco className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-gray-900">100%</div>
                <div className="text-xs sm:text-sm text-gray-600">Carbon Neutral</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for Every Stakeholder
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're a farmer, investor, or agribusiness, FarmChain provides the tools you need to succeed.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8">
              <TabsTrigger value="farmers" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <Leaf className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Farmers</span>
                <span className="sm:hidden">Farm</span>
              </TabsTrigger>
              <TabsTrigger value="investors" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Investors</span>
                <span className="sm:hidden">Invest</span>
              </TabsTrigger>
              <TabsTrigger value="agribusiness" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <Truck className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Agribusiness</span>
                <span className="sm:hidden">Agri</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="farmers" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3 sm:pb-4">
                    <Coins className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mb-2" />
                    <CardTitle className="text-lg sm:text-xl">Input Token Management</CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      Track and redeem agricultural input tokens for seeds, fertilizers, and equipment.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        View available tokens
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        Track redemption status
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        Access token history
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3 sm:pb-4">
                    <Vote className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mb-2" />
                    <CardTitle className="text-lg sm:text-xl">DAO Financing</CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      Apply for community-funded agricultural inputs through our decentralized system.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        Submit funding proposals
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        Community voting process
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        Transparent allocation
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3 sm:pb-4">
                    <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mb-2" />
                    <CardTitle className="text-lg sm:text-xl">Harvest Tokenization</CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      Convert your harvest into tradeable output tokens with verified quality metrics.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        Mint output tokens
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        Quality verification
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        Direct market access
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="investors" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3 sm:pb-4">
                    <Vote className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mb-2" />
                    <CardTitle className="text-lg sm:text-xl">Funding Proposals</CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      Review and vote on farmer funding requests with detailed project information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        Detailed proposal review
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        Risk assessment tools
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        Community voting
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3 sm:pb-4">
                    <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mb-2" />
                    <CardTitle className="text-lg sm:text-xl">DAO Governance</CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      Participate in platform governance and shape the future of agricultural finance.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        Platform governance voting
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        Policy proposals
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        Community leadership
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3 sm:pb-4">
                    <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mb-2" />
                    <CardTitle className="text-lg sm:text-xl">Investment Tracking</CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      Monitor your investments with real-time ROI tracking and performance analytics.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        ROI analytics
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        Portfolio management
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        Performance reports
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="agribusiness" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3 sm:pb-4">
                    <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mb-2" />
                    <CardTitle className="text-lg sm:text-xl">Output Redemption</CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      Scan and verify harvest output tokens for seamless supply chain integration.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        QR code scanning
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        Quality verification
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        Instant processing
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3 sm:pb-4">
                    <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mb-2" />
                    <CardTitle className="text-lg sm:text-xl">Input Distribution</CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      Validate and distribute agricultural input tokens to verified farmers.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        Token validation
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        Delivery tracking
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        Farmer verification
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3 sm:pb-4">
                    <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mb-2" />
                    <CardTitle className="text-lg sm:text-xl">Issue Reporting</CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      Report delivery issues, quality concerns, and insurance claims efficiently.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        Fraud detection
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        Insurance claims
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                        Quality disputes
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">How FarmChain Works</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              A simple, transparent process that connects the entire agricultural supply chain.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">1. Join the Network</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Farmers, investors, and agribusiness partners create verified accounts.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4">
                <Vote className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">2. DAO Funding</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Community votes on farmer funding proposals for agricultural inputs.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4">
                <Coins className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">3. Token Exchange</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Input tokens are redeemed for supplies, harvest is tokenized as outputs.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4">
                <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">4. Supply Chain</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Agribusiness partners process output tokens for market distribution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Section with Images */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Empowering Agriculture Worldwide
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              From small family farms to large agricultural enterprises, FarmChain is transforming how we grow, fund,
              and distribute food.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="relative group">
              <div className="aspect-[4/3] relative overflow-hidden rounded-xl">
                <Image
                  src="/images/young-farmer-field.jpg"
                  alt="Young farmer in field"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold mb-1">Modern Farming</h3>
                  <p className="text-sm opacity-90">Technology-driven agriculture</p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-[4/3] relative overflow-hidden rounded-xl">
                <Image
                  src="/images/farmer-corn-field.jpg"
                  alt="Farmer in corn field"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold mb-1">Crop Excellence</h3>
                  <p className="text-sm opacity-90">Quality harvest management</p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-[4/3] relative overflow-hidden rounded-xl">
                <Image
                  src="/images/rice-farmer.jpg"
                  alt="Rice farmer"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold mb-1">Global Reach</h3>
                  <p className="text-sm opacity-90">Worldwide agricultural network</p>
                </div>
              </div>
            </div>

            <div className="relative group sm:col-span-2 lg:col-span-1">
              <div className="aspect-[4/3] relative overflow-hidden rounded-xl">
                <Image
                  src="/images/dao-cityscape.jpg"
                  alt="DAO cityscape"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold mb-1">DAO Governance</h3>
                  <p className="text-sm opacity-90">Decentralized decision making</p>
                </div>
              </div>
            </div>

            <div className="relative group sm:col-span-2">
              <div className="aspect-[4/3] sm:aspect-[8/3] relative overflow-hidden rounded-xl">
                <Image
                  src="/images/blockchain-stone.jpg"
                  alt="Blockchain technology"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold mb-2">Blockchain Security</h3>
                  <p className="text-base opacity-90">
                    Immutable and transparent transactions powered by Internet Computer Protocol
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Agriculture?
          </h2>
          <p className="text-lg sm:text-xl text-green-100 mb-8">
            Join thousands of farmers, investors, and agribusiness partners building the future of food.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 w-full sm:w-auto">
                Get Started Today
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent w-full sm:w-auto"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Image src="/images/icp-logo.jpg" alt="FarmChain Logo" width={24} height={24} className="rounded" />
                <span className="text-lg font-bold">FarmChain</span>
              </div>
              <p className="text-gray-400 text-sm sm:text-base">
                Revolutionizing agriculture through blockchain technology and community-driven financing.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-sm sm:text-base">
            <p>&copy; {new Date().getFullYear()} FarmChain. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AIChatbot />
    </div>
  )
}
