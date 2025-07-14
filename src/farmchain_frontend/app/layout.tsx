import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AIChatbot } from "@/components/ai-chatbot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FarmChain - Decentralized Agriculture Platform",
  description:
    "Revolutionizing agriculture with blockchain technology. Connect farmers, investors, and agribusinesses through tokenized inputs, outputs, and DAO-based financing.",
  keywords: "blockchain, agriculture, farming, tokenization, DAO, decentralized finance, crop tokens",
  authors: [{ name: "FarmChain Team" }],
  openGraph: {
    title: "FarmChain - Decentralized Agriculture Platform",
    description: "Revolutionizing agriculture with blockchain technology",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <AIChatbot />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
