// "use client";

// import type React from "react";
// import dynamic from "next/dynamic";
// import type { ApexOptions } from "apexcharts";
// import { formatNepaliCurrency } from "@/lib/utils";

// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// interface CandlestickChartProps {
//   data: any[];
//   sma20: number[];
//   sma50: number[];
//   patterns: { pattern: string; index: number; date: string }[];
// }

// const CandlestickChart: React.FC<CandlestickChartProps> = ({
//   data,
//   sma20,
//   sma50,
//   patterns,
// }) => {
//   const series = [
//     {
//       name: "candle",
//       type: "candlestick",
//       data: data.map((d) => ({
//         x: new Date(d.date).getTime(),
//         y: [d.open, d.high, d.low, d.close],
//       })),
//     },
//     {
//       name: "SMA20",
//       type: "line",
//       data: sma20.map((value, index) => ({
//         x: new Date(data[index + 19].date).getTime(),
//         y: value,
//       })),
//       color: "#4169E1",
//     },
//     {
//       name: "SMA50",
//       type: "line",
//       data: sma50.map((value, index) => ({
//         x: new Date(data[index + 49].date).getTime(),
//         y: value,
//       })),
//       color: "#FF69B4",
//     },
//   ];

//   const options: ApexOptions = {
//     chart: {
//       type: "candlestick",
//       height: 800,
//       animations: {
//         enabled: false,
//       },
//     },
//     title: {
//       text: "Candlestick Chart with SMA and Patterns",
//       align: "left",
//     },
//     xaxis: {
//       type: "datetime",
//     },

//     yaxis: {
//       labels: {
//         style: {
//           colors: "#000",
//         },
//         formatter: function (value: number) {
//           return formatNepaliCurrency(value);
//         },
//       },
//       tooltip: {
//         enabled: true,
//       },
//     },
//     stroke: {
//       curve: "straight", // Changed to straight for more accurate representation
//       width: [1, 2.5, 2.5],
//     },
//     grid: {
//       borderColor: "#f1f1f1",
//       xaxis: {
//         lines: {
//           show: true,
//         },
//       },
//     },

//     plotOptions: {
//       candlestick: {
//         colors: {
//           upward: "#26A69A",
//           downward: "#EF5350",
//         },
//         wick: {
//           useFillColor: true,
//         },
//       },
//     },
//     tooltip: {
//       shared: true,
//       custom: ({ seriesIndex, dataPointIndex, w }) => {
//         const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
//         const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
//         const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
//         const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
//         const sma20 = w.globals.series[1][dataPointIndex];
//         const sma50 = w.globals.series[2][dataPointIndex];
//         const date = new Date(
//           w.globals.seriesX[seriesIndex][dataPointIndex]
//         ).toLocaleDateString();
//         const pattern = patterns.find((p) => p.date === date)?.pattern;

//         return `
//           <div class="apexcharts-tooltip-box">
//             <div>Date: ${date}</div>
//             <div>Open: ${o}</div>
//             <div>High: ${h}</div>
//             <div>Low: ${l}</div>
//             <div>Close: ${c}</div>
//             ${sma20 ? `<div>SMA20: ${sma20}</div>` : ""}
//             ${sma50 ? `<div>SMA50: ${sma50}</div>` : ""}
//             ${pattern ? `<div>Pattern: ${pattern}</div>` : ""}
//           </div>
//         `;
//       },
//     },
//     annotations: {
//       xaxis: patterns.map((pattern) => ({
//         x: new Date(pattern.date).getTime(),
//         borderColor: "#775DD0",
//         label: {
//           style: {
//             color: "#fff",
//             background: "#775DD0",
//           },
//           text: pattern.pattern,
//         },
//       })),
//     },
//   };

//   return (
//     <div className="w-full h-full">
//       <Chart
//         options={options}
//         series={series}
//         type="candlestick"
//         height={700}
//       />
//     </div>
//   );
// };

// export default CandlestickChart;

"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import { createChart, ColorType, type UTCTimestamp } from "lightweight-charts";
import { FormattedHistory } from "@/types/dashboard-api-types";

interface Pattern {
  pattern: string;
  index: number;
  date: string;
}

interface TradingViewChartProps {
  stocksData: FormattedHistory[];
  sma20: number[];
  sma50: number[];
  patterns: Pattern[];
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({
  stocksData,
  sma20,
  sma50,
  patterns,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const handleResize = () => {
        chartRef.current?.applyOptions({
          width: chartContainerRef.current?.clientWidth,
        });
      };

      // Filter out weekends and invalid dates
      const filteredData = stocksData.filter((d) => {
        const date = new Date(d.date);
        return (
          !isNaN(date.getTime()) && date.getDay() !== 5 && date.getDay() !== 6
        );
      });

      // Prepare data for TradingView chart
      const chartData = filteredData.map((d) => ({
        time: (new Date(d.date).getTime() / 1000) as UTCTimestamp,
        open: d.open,
        high: d.high,
        low: d.low,
        close: d.close,
      }));

      // Prepare SMA data
      const sma20Data = filteredData
        .slice(19)
        .map((d, index) => ({
          time: (new Date(d.date).getTime() / 1000) as UTCTimestamp,
          value: sma20[index],
        }))
        .filter((d) => typeof d.value === "number" && !isNaN(d.value));

      const sma50Data = filteredData
        .slice(49)
        .map((d, index) => ({
          time: (new Date(d.date).getTime() / 1000) as UTCTimestamp,
          value: sma50[index],
        }))
        .filter((d) => typeof d.value === "number" && !isNaN(d.value));

      // Adjust pattern indices based on filtered data
      const adjustedPatterns = patterns
        .map((pattern) => {
          const newIndex = filteredData.findIndex(
            (d) => d.date === pattern.date
          );
          return { ...pattern, index: newIndex };
        })
        .filter((pattern) => pattern.index !== -1);

      chartRef.current = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: "white" },
          textColor: "black",
        },
        width: chartContainerRef.current.clientWidth,
        height: 400,
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
        },
      });

      const candlestickSeries = chartRef.current.addCandlestickSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });

      candlestickSeries.setData(chartData);

      const sma20Series = chartRef.current.addLineSeries({
        color: "#FF69B4",
        lineWidth: 2,
        title: "SMA20",
      });

      sma20Series.setData(sma20Data);

      const sma50Series = chartRef.current.addLineSeries({
        color: "#4169E1",
        lineWidth: 2,
        title: "SMA50",
      });

      sma50Series.setData(sma50Data);

      candlestickSeries.setMarkers(
        adjustedPatterns.map((pattern) => ({
          time: chartData[pattern.index].time,
          position: "aboveBar",
          color: "#f68410",
          shape: "arrowDown",
          text: pattern.pattern,
        }))
      );

      chartRef.current.timeScale().fitContent();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        chartRef.current?.remove();
      };
    }
  }, [stocksData, sma20, sma50, patterns]);

  return <div ref={chartContainerRef} className="w-full h-[400px]" />;
};

export default TradingViewChart;
