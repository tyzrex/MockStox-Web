"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, BarChart2 } from "lucide-react"

const trends = [
  { symbol: "AAPL", name: "Apple Inc.", change: 2.5, volume: "32.4M" },
  { symbol: "GOOGL", name: "Alphabet Inc.", change: -1.2, volume: "15.7M" },
  { symbol: "AMZN", name: "Amazon.com Inc.", change: 3.7, volume: "22.1M" },
  { symbol: "MSFT", name: "Microsoft Corporation", change: 1.8, volume: "28.9M" },
]

export default function MarketTrends() {
  return (
    <section className="py-12 bg-blue-50" id="market-trends">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-10">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Market Trends</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Stay Updated with Latest Market Movements
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Keep track of the most significant market trends and make informed decisions.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trends.map((trend, index) => (
            <motion.div
              key={trend.symbol}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg font-medium">{trend.symbol}</span>
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-2">{trend.name}</p>
                  <div className="flex justify-between items-center">
                    <div className={`flex items-center ${trend.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {trend.change >= 0 ? (
                        <TrendingUp className="h-5 w-5 mr-1" />
                      ) : (
                        <TrendingDown className="h-5 w-5 mr-1" />
                      )}
                      <span className="text-2xl font-bold">{trend.change}%</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <BarChart2 className="h-4 w-4 mr-1" />
                      <span className="text-sm">{trend.volume}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

