"use client"

import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

interface CandlestickChartProps {
  data: any[]
  sma20: number[]
  sma50: number[]
  patterns: { pattern: string; index: number; date: string }[]
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data, sma20, sma50, patterns }) => {
  const chartData = data.map((d, index) => ({
    date: new Date(d.date).toLocaleDateString(),
    open: d.open,
    high: d.high,
    low: d.low,
    close: d.close,
    sma20: index >= 19 ? sma20[index - 19] : null,
    sma50: index >= 49 ? sma50[index - 49] : null,
    pattern: patterns.find((p) => p.index === index)?.pattern || null,
  }))

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload
              return (
                <div className="custom-tooltip bg-white p-2 border border-gray-300 rounded shadow">
                  <p className="label">{`Date: ${data.date}`}</p>
                  <p className="intro">{`Open: ${data.open}`}</p>
                  <p className="intro">{`High: ${data.high}`}</p>
                  <p className="intro">{`Low: ${data.low}`}</p>
                  <p className="intro">{`Close: ${data.close}`}</p>
                  {data.sma20 && <p className="intro">{`SMA20: ${data.sma20.toFixed(2)}`}</p>}
                  {data.sma50 && <p className="intro">{`SMA50: ${data.sma50.toFixed(2)}`}</p>}
                  {data.pattern && <p className="intro">{`Pattern: ${data.pattern}`}</p>}
                </div>
              )
            }
            return null
          }}
        />
        <Legend />
        <Bar dataKey="low" fill="#8884d8" />
        <Bar dataKey="high" fill="#82ca9d" />
        <Line type="monotone" dataKey="open" stroke="#8884d8" />
        <Line type="monotone" dataKey="close" stroke="#82ca9d" />
        <Line type="monotone" dataKey="sma20" stroke="#ff7300" dot={false} />
        <Line type="monotone" dataKey="sma50" stroke="#387908" dot={false} />
        {patterns.map((pattern, index) => (
          <ReferenceLine
            key={index}
            x={pattern.date}
            stroke="red"
            label={{ value: pattern.pattern, position: "top" }}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default CandlestickChart

