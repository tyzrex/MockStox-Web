"use client";

import type React from "react";
import { RSI, SMA, MACD, Stochastic } from "technicalindicators";
import type { FormattedHistory } from "@/types/dashboard-api-types";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TechnicalIndicatorsProps {
  history: FormattedHistory[];
}

const TechnicalIndicators: React.FC<TechnicalIndicatorsProps> = ({
  history,
}) => {
  if (!history || history.length === 0) {
    return <div>No historical data available</div>;
  }

  const closes = history.map((d) => d.close);

  const rsi = RSI.calculate({ values: closes, period: 14 }) ?? [];
  const sma20 = SMA.calculate({ values: closes, period: 20 }) ?? [];
  const macd =
    MACD.calculate({
      values: closes,
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9,
      SimpleMAOscillator: false,
      SimpleMASignal: false,
    }) ?? [];
  const stochastic =
    Stochastic.calculate({
      high: history.map((d) => d.high),
      low: history.map((d) => d.low),
      close: closes,
      period: 14,
      signalPeriod: 3,
    }) ?? [];

  const indicatorData = history.map((d, i) => ({
    date: d.date,
    close: d.close,
    rsi: rsi[i],
    sma20: sma20[i],
    macd: macd[i]?.MACD,
    signal: macd[i]?.signal,
    histogram: macd[i]?.histogram,
    stochasticK: stochastic[i]?.k,
    stochasticD: stochastic[i]?.d,
  }));

  return (
    <div className="space-y-6">
      <div className="h-64">
        <h3 className="text-lg font-semibold mb-2">RSI</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={indicatorData}>
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="rsi" stroke="#8884d8" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="h-64">
        <h3 className="text-lg font-semibold mb-2">SMA (20)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={indicatorData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="close"
              stroke="#82ca9d"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="sma20"
              stroke="#8884d8"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="h-64">
        <h3 className="text-lg font-semibold mb-2">MACD</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={indicatorData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="macd" stroke="#8884d8" dot={false} />
            <Line
              type="monotone"
              dataKey="signal"
              stroke="#82ca9d"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="h-64">
        <h3 className="text-lg font-semibold mb-2">Stochastic</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={indicatorData}>
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="stochasticK"
              stroke="#8884d8"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="stochasticD"
              stroke="#82ca9d"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TechnicalIndicators;
