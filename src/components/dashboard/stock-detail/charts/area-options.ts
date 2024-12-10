import { ApexOptions } from "apexcharts";
import { formatNepaliCurrency } from "@/lib/utils";

export const areaChartOptions: ApexOptions = {
  chart: {
    type: "area",
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
  },
  tooltip: {
    theme: "dark",
    x: {
      format: "dd MMM yyyy",
    },
    y: {
      formatter: function (value: number) {
        return formatNepaliCurrency(value);
      },
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  dataLabels: {
    enabled: false,
  },
  colors: ["#00ff00"],
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.2,
      stops: [0, 100],
    },
  },
};

export const areaSeries = (formattedHistory: any[]) => [
  {
    name: "Price",
    data: formattedHistory.map((item) => [item.date, item.close]),
  },
];
