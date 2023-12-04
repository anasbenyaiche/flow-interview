export interface ISymbol {
  baseAsset: string;
  quoteAsset: string;
  symbol: string;
}

export interface IExchangeInfo {
  symbols: ISymbol[];
}

export interface ITrade {
  id: number;
  price: string;
  qty: string;
  time: number;
}

export interface ITickerData {
  askPrice: string;
  symbol: string;
  price: string;
  askQty: string;
}
export interface IOption {
  label: string;
  value: string;
}
