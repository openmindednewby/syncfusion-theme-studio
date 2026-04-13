export interface TradeRecord {
  id: string;
  ticker: string;
  side: 'Buy' | 'Sell';
  quantity: number;
  price: number;
  total: number;
  status: 'Cancelled' | 'Expired' | 'Filled' | 'Partially Filled';
  executedAt: string;
  exchange: string;
  broker: string;
}
