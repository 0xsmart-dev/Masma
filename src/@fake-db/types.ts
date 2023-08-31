// Type Imports
import { ThemeColor } from 'src/@core/layouts/types'

export type AppBarSearchType = {
  id: number
  url: string
  icon: string
  title: string
  category: string
}

export type AutocompleteType = {
  year: number
  title: string
}

// Types for Faq Page
export type FaqQAndAType = {
  id: string
  answer: string
  question: string
}
export type FaqType = {
  id: string
  icon: string
  title: string
  subtitle: string
  qAndA: FaqQAndAType[]
}

// Types for Knowledge Base
export type KnowledgeBaseData = {
  desc: string
  title: string
  imgSrc: string
  imgWidth: number
  category: string
  imgHeight: number
}
export type KnowledgeBaseCategoryQuestion = {
  slug: string
  question: string
}
export type KnowledgeBaseCategoryData = {
  icon: string
  title: string
  iconColor?: ThemeColor
  questions: KnowledgeBaseCategoryQuestion[]
}
export type KnowledgeBaseType = {
  knowledgeBase: KnowledgeBaseData[]
  knowledgeBaseCategory: KnowledgeBaseCategoryData[]
}

// Types for Card Statistics Page
export type CardStatsHorizontalType = {
  icon: string
  stats: string
  title: string
  color?: ThemeColor
  trendNumber: string
  trend?: 'positive' | 'negative'
}
export type CardStatsVerticalType = {
  icon: string
  stats: string
  title: string
  chipText: string
  color?: ThemeColor
  trendNumber: string
  chipColor?: ThemeColor
  trend?: 'positive' | 'negative'
}
export type CardStatsCharacterType = {
  src: string
  stats: string
  title: string
  chipText: string
  trendNumber: string
  chipColor?: ThemeColor
  trend?: 'positive' | 'negative'
}
export type CardStatsType = {
  statsVertical: CardStatsVerticalType[]
  statsCharacter: CardStatsCharacterType[]
  statsHorizontal: CardStatsHorizontalType[]
}

export type DataGridRowType = {
  id: number
  age: string
  post: string
  city: string
  email: string
  salary: number
  status: number
  avatar: string
  full_name: string
  start_date: string
  experience: string
}

export type DataGridTokenType = {
  id: number
  chainId: number
  address: string
  name: string
  decimals: number
  logoURI: string
  symbol: string
  price: number | string
  change: number | string
  marketcap: number | string
  watched: boolean
}
