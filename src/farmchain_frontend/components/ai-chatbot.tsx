"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your FarmChain AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("token") || lowerMessage.includes("input")) {
      return "Input tokens represent agricultural supplies like seeds, fertilizers, and equipment. You can redeem them through your dashboard or apply for DAO funding to get more tokens."
    }

    if (lowerMessage.includes("dao") || lowerMessage.includes("voting")) {
      return "The DAO (Decentralized Autonomous Organization) allows community members to vote on funding proposals and platform governance. Investors can participate in voting on farmer funding requests."
    }

    if (lowerMessage.includes("harvest") || lowerMessage.includes("output")) {
      return "Output tokens represent your harvested crops. You can mint these tokens after submitting harvest details, and agribusiness partners can redeem them for processing and distribution."
    }

    if (lowerMessage.includes("financing") || lowerMessage.includes("loan")) {
      return "Farmers can apply for DAO-funded financing by submitting proposals with details about land size, crop type, and input needs. The community votes on these proposals."
    }

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! Welcome to FarmChain. I'm here to help you navigate our agricultural blockchain platform. What would you like to know about?"
    }

    return "I can help you with questions about tokens, DAO voting, harvest management, financing applications, and general platform features. What would you like to know more about?"
  }

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg z-40"
        size="sm"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] shadow-xl z-50">
          <Card className="h-full flex flex-col overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-green-600 text-white rounded-t-lg flex-shrink-0">
              <CardTitle className="text-sm font-medium">FarmChain AI Assistant</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0 text-white hover:bg-green-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
              <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
                <div className="space-y-4 pr-2">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex items-start space-x-2 max-w-[85%] ${
                          message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.sender === "user" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {message.sender === "user" ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                        </div>
                        <div
                          className={`rounded-lg px-3 py-2 text-sm break-words overflow-wrap-anywhere ${
                            message.sender === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t flex-shrink-0">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 text-sm"
                    maxLength={500}
                  />
                  <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-700 flex-shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
