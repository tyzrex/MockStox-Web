interface Metrics {
  open: number;
  high: number;
  low: number;
  close: number;
}

interface StockMetricsCardsProps {
  metrics: Metrics;
}

export function StockMetricsCards({ metrics }: StockMetricsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-6 rounded-lg border-l-4 text-foreground border-blue-500">
        <div>Open</div>
        <div className="text-2xl text-foreground font-bold">
          Rs. {metrics.open.toLocaleString()}
        </div>
      </div>

      <div className="p-6 rounded-lg border-l-4 text-foreground border-green-500">
        <div>High</div>
        <div className="text-2xl text-foreground font-bold">
          Rs. {metrics.high.toLocaleString()}
        </div>
      </div>

      <div className="p-6 rounded-lg border-l-4 text-foreground border-red-500">
        <div>Low</div>
        <div className="text-2xl text-foreground font-bold">
          Rs. {metrics.low.toLocaleString()}
        </div>
      </div>

      <div className="p-6 rounded-lg border-l-4 text-foreground border-yellow-500">
        <div>Close</div>
        <div className="text-2xl text-foreground font-bold">
          Rs. {metrics.close.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
