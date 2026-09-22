export interface StockInfo {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePct: number;
  dayHigh: number;
  dayLow: number;
  volume: string;
  marketCap: string;
  pe: number;
  dividendYield: string;
  week52High: number;
  week52Low: number;
}

export interface HistoricalPrice {
  date: string;
  price: number;
  volume: number;
}

export interface PeerStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePct: number;
  marketCap: string;
}

export interface PortfolioHolding {
  symbol: string;
  name: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
}

export interface InvestmentNewsArticle {
  id: string;
  title: string;
  source: string;
  date: string;
  excerpt: string;
  category: "KO" | "Beverages" | "Earnings" | "Dividends";
  url: string;
}

export interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePct: number;
  sparkline: number[];
}

export const koStock: StockInfo = {
  symbol: "KO",
  name: "The Coca-Cola Company",
  price: 62.41,
  change: 0.42,
  changePct: 0.68,
  dayHigh: 62.88,
  dayLow: 61.95,
  volume: "14.28M",
  marketCap: "$269.45B",
  pe: 24.8,
  dividendYield: "3.12%",
  week52High: 64.98,
  week52Low: 51.55,
};

export const historicalPrices: HistoricalPrice[] = [
  { date: "Aug 24", price: 60.15, volume: 11.2 },
  { date: "Aug 25", price: 60.45, volume: 12.4 },
  { date: "Aug 26", price: 60.82, volume: 10.9 },
  { date: "Aug 27", price: 61.10, volume: 14.1 },
  { date: "Aug 28", price: 60.90, volume: 9.8 },
  { date: "Aug 29", price: 61.35, volume: 13.5 },
  { date: "Aug 30", price: 61.60, volume: 12.0 },
  { date: "Sep 01", price: 61.40, volume: 8.9 },
  { date: "Sep 02", price: 61.92, volume: 15.3 },
  { date: "Sep 03", price: 62.15, volume: 14.8 },
  { date: "Sep 04", price: 61.80, volume: 11.6 },
  { date: "Sep 05", price: 62.05, volume: 13.2 },
  { date: "Sep 06", price: 62.40, volume: 16.0 },
  { date: "Sep 08", price: 62.10, volume: 10.5 },
  { date: "Sep 09", price: 62.55, volume: 14.4 },
  { date: "Sep 10", price: 62.80, volume: 15.7 },
  { date: "Sep 11", price: 62.45, volume: 12.1 },
  { date: "Sep 12", price: 62.90, volume: 17.2 },
  { date: "Sep 13", price: 63.15, volume: 18.5 },
  { date: "Sep 15", price: 62.75, volume: 13.8 },
  { date: "Sep 16", price: 62.50, volume: 11.4 },
  { date: "Sep 17", price: 62.95, volume: 14.0 },
  { date: "Sep 18", price: 63.30, volume: 16.9 },
  { date: "Sep 19", price: 63.10, volume: 12.7 },
  { date: "Sep 20", price: 62.85, volume: 10.8 },
  { date: "Sep 21", price: 62.20, volume: 14.6 },
  { date: "Sep 22", price: 62.41, volume: 14.28 },
];

export const peers: PeerStock[] = [
  {
    symbol: "PEP",
    name: "PepsiCo, Inc.",
    price: 168.20,
    change: -0.31,
    changePct: -0.18,
    marketCap: "$231.5B",
  },
  {
    symbol: "MNST",
    name: "Monster Beverage Corp.",
    price: 54.10,
    change: 0.88,
    changePct: 1.65,
    marketCap: "$56.2B",
  },
  {
    symbol: "KDP",
    name: "Keurig Dr Pepper Inc.",
    price: 33.45,
    change: 0.22,
    changePct: 0.66,
    marketCap: "$46.8B",
  },
  {
    symbol: "CELH",
    name: "Celsius Holdings, Inc.",
    price: 38.60,
    change: -1.15,
    changePct: -2.89,
    marketCap: "$8.9B",
  },
];

export const portfolioHoldings: PortfolioHolding[] = [
  {
    symbol: "KO",
    name: "The Coca-Cola Co.",
    shares: 85,
    avgCost: 58.20,
    currentPrice: 62.41,
  },
  {
    symbol: "PEP",
    name: "PepsiCo, Inc.",
    shares: 18,
    avgCost: 162.50,
    currentPrice: 168.20,
  },
  {
    symbol: "MNST",
    name: "Monster Beverage Corp.",
    shares: 40,
    avgCost: 51.00,
    currentPrice: 54.10,
  },
  {
    symbol: "KDP",
    name: "Keurig Dr Pepper Inc.",
    shares: 50,
    avgCost: 31.80,
    currentPrice: 33.45,
  },
  {
    symbol: "CELH",
    name: "Celsius Holdings, Inc.",
    shares: 25,
    avgCost: 42.10,
    currentPrice: 38.60,
  },
];

export const news: InvestmentNewsArticle[] = [
  {
    id: "news_1",
    title: "Coca-Cola Delivers Organic Revenue Growth of 7% in Latest Quarterly Report",
    source: "Wall Street Journal",
    date: "Sep 20, 2026",
    excerpt: "Robust pricing power and surging international volume for Coca-Cola Zero Sugar drove earnings outperformance despite persistent foreign exchange headwinds.",
    category: "Earnings",
    url: "#",
  },
  {
    id: "news_2",
    title: "Dividend King Status Extended: 64 Consecutive Years of Annual Payout Increases",
    source: "Bloomberg Intelligence",
    date: "Sep 18, 2026",
    excerpt: "The Board of Directors approved an annualized dividend lift to $1.94 per common share, reinforcing KO's historic track record of defensive shareholder cash return.",
    category: "Dividends",
    url: "#",
  },
  {
    id: "news_3",
    title: "Global RTD Coffee & Tea Expansion: New Strategic Bottling Joint Venture in Asia",
    source: "Reuters Financial",
    date: "Sep 15, 2026",
    excerpt: "Expanding outside traditional sparkling sodas, Coca-Cola invests $600M into localized supply chain infrastructure targeting the rapidly growing premium RTD market.",
    category: "KO",
    url: "#",
  },
  {
    id: "news_4",
    title: "Beverage Sector Analysis: Defensive Stocks Outperform Volatile Tech Indexes",
    source: "Financial Times",
    date: "Sep 12, 2026",
    excerpt: "Institutional wealth managers reallocate into staple consumer giants with sticky demand curves, high operating margins, and proven pricing resilience.",
    category: "Beverages",
    url: "#",
  },
  {
    id: "news_5",
    title: "Packaging Sustainability Update: 40% Virgin Resin Reduction Benchmark Surpassed",
    source: "ESG Investor Review",
    date: "Sep 09, 2026",
    excerpt: "New closed-loop PET recycling agreements across North American bottling networks accelerate timeline toward 100% circular package manufacturing by 2030.",
    category: "KO",
    url: "#",
  },
  {
    id: "news_6",
    title: "Quarterly Peer Review: Monster Beverage and Celsius Face Tightening Grocery Shelf Space",
    source: "Barron's",
    date: "Sep 05, 2026",
    excerpt: "Energy drinks battle rising warehouse storage charges while legacy direct-store-delivery (DSD) titans like Coca-Cola leverage superior logistics routes.",
    category: "Beverages",
    url: "#",
  },
  {
    id: "news_7",
    title: "Federal Reserve Interest Rate Trajectory: What Lower Yields Mean for Dividend Aristocrats",
    source: "CNBC Markets",
    date: "Aug 31, 2026",
    excerpt: "Yield-hunting investors rotate capital out of money market funds and into high-grade equities yielding upwards of 3.0% with consistent capital appreciation.",
    category: "Dividends",
    url: "#",
  },
  {
    id: "news_8",
    title: "Executive Leadership Keynote: Digital Transformation and Direct-To-Consumer Vending",
    source: "Forbes Tech",
    date: "Aug 27, 2026",
    excerpt: "AI-optimized automated dispensing units in 50,000 corporate hubs drive a 22% increase in recurring daily consumer interactions.",
    category: "KO",
    url: "#",
  },
];

export const watchlist: WatchlistItem[] = [
  {
    symbol: "KO",
    name: "Coca-Cola Co.",
    price: 62.41,
    change: 0.42,
    changePct: 0.68,
    sparkline: [61.2, 61.5, 61.8, 62.0, 62.2, 62.41],
  },
  {
    symbol: "PEP",
    name: "PepsiCo, Inc.",
    price: 168.20,
    change: -0.31,
    changePct: -0.18,
    sparkline: [169.1, 168.8, 168.5, 168.4, 168.2],
  },
  {
    symbol: "MNST",
    name: "Monster Beverage",
    price: 54.10,
    change: 0.88,
    changePct: 1.65,
    sparkline: [52.8, 53.2, 53.5, 53.9, 54.1],
  },
  {
    symbol: "KDP",
    name: "Keurig Dr Pepper",
    price: 33.45,
    change: 0.22,
    changePct: 0.66,
    sparkline: [33.1, 33.2, 33.3, 33.4, 33.45],
  },
];
