"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, TrendingUp, TrendingDown } from "lucide-react"

export default function AIPredictor() {
  const [stock, setStock] = useState("")
  const [prediction, setPrediction] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate AI prediction
    const randomPrediction = (Math.random() * 20 - 10).toFixed(2)
    setPrediction(randomPrediction)
  }

  return (
    <section className="py-12 bg-blue-50" id="ai-predictor">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-10">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">AI Predictor</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Forecast the Future of Stocks
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Experience the power of our AI model in predicting stock trends. Enter a stock symbol to get started.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-6 w-6 mr-2 text-blue-600" />
                  Stock Prediction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="stock">Stock Symbol</Label>
                    <Input
                      id="stock"
                      type="text"
                      placeholder="Enter stock symbol (e.g., AAPL)"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Predict
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
                  {prediction && Number.parseFloat(prediction) >= 0 ? (
                    <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
                  ) : (
                    <TrendingDown className="h-6 w-6 mr-2 text-red-600" />
                  )}
                  Prediction Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                {prediction ? (
                  <>
                    <h3 className="text-lg font-semibold mb-2">AI Prediction for {stock.toUpperCase()}</h3>
                    <p className="text-3xl font-bold text-blue-600">
                      {prediction > 0 ? "+" : ""}
                      {prediction}%
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      This is a simulated prediction. Real AI models analyze vast amounts of data to make forecasts.
                    </p>
                  </>
                ) : (
                  <p className="text-gray-500">Enter a stock symbol and click "Predict" to see the AI forecast.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

