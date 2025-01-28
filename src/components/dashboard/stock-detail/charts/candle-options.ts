import { ApexOptions } from "apexcharts";
import { formatNepaliCurrency } from "@/lib/utils";

export const candlestickChartOptions: ApexOptions = {
  chart: {
    type: "candlestick",
    height: 400,
    background: "transparent",
    foreColor: "#000",
    toolbar: {
      show: true,
      tools: {
        download: false,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
      },
    },
    animations: {
      enabled: true,
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350,
      },
    },
  },
  xaxis: {
    type: "datetime",
    labels: {
      style: {
        colors: "#000",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#000",
      },
      formatter: function (value: number) {
        return formatNepaliCurrency(value);
      },
    },
    tooltip: {
      enabled: true,
    },
  },
  tooltip: {
    theme: "dark",
    x: {
      format: "dd MMM yyyy",
    },
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: "#00ff00",
        downward: "#ff0000",
      },
    },
  },
};

export const candlestickSeries = (formattedHistory: any[]) => [
  {
    data: formattedHistory.map((item) => ({
      x: item.date,
      y: [item.open, item.high, item.low, item.close],
    })),
  },
];
