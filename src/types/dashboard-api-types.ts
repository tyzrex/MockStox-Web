export interface StockListItem {
  id: number;
  symbol: string;
  ltp: string;
  point_change: string;
  percentage_change: string;
  open_price: string;
  high_price: string;
  low_price: string;
  volume: number;
  prev_close: string;
  sector: string;
}
