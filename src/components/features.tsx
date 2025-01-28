"use client";

import { motion } from "framer-motion";
import {
  Zap,
  TrendingUp,
  DollarSign,
  BarChart2,
  BookOpen,
  Users,
  Shield,
  Smartphone,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    name: "AI-Powered Predictions",
    description:
      "Leverage cutting-edge AI models to forecast stock trends and make informed decisions.",
    icon: Zap,
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Virtual Trading",
    description:
      "Practice trading with virtual currency in a risk-free environment that mimics real market conditions.",
    icon: TrendingUp,
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Portfolio Management",
    description:
      "Track and manage your virtual portfolio with ease, gaining insights into your performance over time.",
    icon: DollarSign,
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Real-Time Analytics",
    description:
      "Access comprehensive analytics and visualizations to understand market trends and your trading patterns.",
    icon: BarChart2,
    color: "bg-yellow-100 text-yellow-600",
  },
];

export default function Features() {
  return (
    <div className="py-12 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-10">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to become a trading pro
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            MockStox offers a comprehensive set of tools to help you learn,
            practice, and master stock trading.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <div className={`p-2 rounded-full ${feature.color} mr-3`}>
                        <feature.icon className="h-6 w-6" />
                      </div>
                      {feature.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
