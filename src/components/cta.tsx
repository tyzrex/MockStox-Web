"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CTA() {
  return (
    <section className="bg-blue-600 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold text-center text-gray-900">Ready to dive in?</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mt-2 text-xl text-gray-500 max-w-3xl mx-auto">
                Start your trading journey today with MockStox. Join thousands of users who are already benefiting from
                our platform.
              </p>
              <div className="mt-8 flex justify-center space-x-4">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/signup">Get started</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-blue-600 hover:bg-blue-50">
                  <Link href="#features">Learn more</Link>
                </Button>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

