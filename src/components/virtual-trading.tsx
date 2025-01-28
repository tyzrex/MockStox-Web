"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, CheckCircle, XCircle } from "lucide-react"

export default function VirtualTrading() {
  const [shares, setShares] = useState("")
  const [tradeResult, setTradeResult] = useState(null)

  const handleTrade = (e) => {
    e.preventDefault()
    // Simulate trade result
    const result = Math.random() > 0.5 ? "success" : "failure"
    setTradeResult(result)
  }

  return (
    <section className="py-12 bg-white" id="virtual-trading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-10">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Virtual Trading</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Practice Trading Risk-Free
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Experience the thrill of trading without the financial risk. Use our virtual currency to make trades and
            learn from the outcomes.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-6 w-6 mr-2 text-blue-600" />
                  Execute Virtual Trade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTrade} className="space-y-4">
                  <div>
                    <Label htmlFor="shares">Number of Shares</Label>
                    <Input
                      id="shares"
                      type="number"
                      placeholder="Enter number of shares"
                      value={shares}
                      onChange={(e) => setShares(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Execute Trade
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  {tradeResult === "success" ? (
                    <CheckCircle className="h-6 w-6 mr-2 text-green-600" />
                  ) : tradeResult === "failure" ? (
                    <XCircle className="h-6 w-6 mr-2 text-red-600" />
                  ) : (
                    <DollarSign className="h-6 w-6 mr-2 text-blue-600" />
                  )}
                  Trade Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                {tradeResult ? (
                  <>
                    <p
                      className={`text-2xl font-bold ${tradeResult === "success" ? "text-green-600" : "text-red-600"}`}
                    >
                      {tradeResult === "success" ? "Trade Successful!" : "Trade Failed"}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      {tradeResult === "success"
                        ? "Your virtual trade was executed successfully. Monitor your portfolio to see how it performs."
                        : "Your virtual trade could not be executed. This can happen due to market volatility or insufficient virtual funds."}
                    </p>
                  </>
                ) : (
                  <p className="text-gray-500">Execute a trade to see the result here.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

