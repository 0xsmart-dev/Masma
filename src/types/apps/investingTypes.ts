export type TokenType = {
  id?: string
  name?: string
  symbol?: string
  logoUrl?: string
  price?: number
  pricePercentChange?: number
  totalValueLocked?: number
  volume?: number
}

export type HistoryDuration = 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR' | 'ALL'
