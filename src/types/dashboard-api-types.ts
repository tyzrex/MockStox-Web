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

interface StockHistory {
  [date: string]: {
    open: string;
    close: string;
    low: string;
    high: string;
    volume: string;
  };
}

export interface StockData {
  symbol: string;
  number_of_stocks: number;
  history: StockHistory;
}

export interface FormattedHistory {
  date: string;
  open: number;
  close: number;
  low: number;
  high: number;
}

export interface CompanyDetail {
  id: string; // Unique identifier for the company
  name: string; // Name of the company
  symbol: string; // Stock symbol
  created_at: string; // Timestamp for when the record was created
  updated_at: string; // Timestamp for when the record was last updated
  promoter_shares: string; // Percentage of promoter shares
  public_shares: string; // Percentage of public shares
  share_registar: string; // Share registrar
  is_merged: string; // Whether the company is merged ("true" or "false")
  is_delisted: string; // Whether the company is delisted ("true" or "false")
  core_capital: string; // Core capital of the company
  listed_date: string; // Date the company was listed (if available)
  expired_date: string; // Expiration date (if applicable)
  sister_holding: string; // Sister company holdings
  government: string; // Government holding percentage
  foreign: string; // Foreign holding percentage
  local: string; // Local holding percentage
  sector: string; // Sector the company belongs to
}

export interface StockPrediction {
  predictions: Record<string, number>;
  potential_gain: number;
  potential_loss: number;
  risk_reward_ratio: number;
  volatility: number;
  buy_probability: number;
  sell_probability: number;
  hold_probability: number;
}
export interface StockHolding {
  id: number;
  stock: number;
  quantity: number;
  buyin_price: string;
  symbol: string;
  created_at: string;
}

export interface PortfolioObject {
  id: number;
  stocks: StockHolding[];
  created_at: string;
  updated_at: string;
  deleted_at: string;
  user: number;
}
