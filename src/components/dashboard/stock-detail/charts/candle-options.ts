import { ApexOptions } from "apexcharts";
import { formatNepaliCurrency } from "@/lib/utils";

export const candlestickChartOptions: ApexOptions = {
  chart: {
    type: "candlestick",
    height: 400,
    background: "transparent",
    foreColor: "#ffffff",
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
      easing: "easeinout",
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
  grid: {
    borderColor: "#1a1a1a",
  },
  xaxis: {
    type: "datetime",
    labels: {
      style: {
        colors: "#ffffff",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#ffffff",
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
