"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Hero() {
  const [stockPrice, setStockPrice] = useState(100)

  useEffect(() => {
    const interval = setInterval(() => {
      setStockPrice((prev) => prev + (Math.random() - 0.5) * 2)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-blue-50">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1
            className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="block">Master the Market with</span>
            <span className="block text-blue-600">MockStox</span>
          </motion.h1>
          <motion.p
            className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Learn, practice, and perfect your trading strategies with our AI-powered stock market simulator. Risk-free.
            Real-time. Revolutionary.
          </motion.p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/signup">
                  Get started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <Button variant="outline" size="lg" asChild className="text-blue-600 hover:bg-blue-50">
                <Link href="#features">Learn more</Link>
              </Button>
            </div>
          </div>
        </div>
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-2 text-gray-700">Live Demo Stock</h2>
              <p className="text-3xl font-bold text-blue-600">
                ${stockPrice.toFixed(2)}
                <span className={`ml-2 text-sm ${stockPrice > 100 ? "text-green-500" : "text-red-500"}`}>
                  {stockPrice > 100 ? "▲" : "▼"} {Math.abs(stockPrice - 100).toFixed(2)}%
                </span>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

