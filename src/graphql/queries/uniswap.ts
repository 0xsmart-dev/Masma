import { gql } from '@apollo/client'

// Uniswap GraphQL API query for top 100 tokens
export const UniswapTopTokens100DataQuery = gql`
  query TopTokens100($duration: HistoryDuration!, $chain: Chain!) {
    topTokens(pageSize: 100, page: 1, chain: $chain, orderBy: VOLUME) {
      id
      name
      chain
      address
      symbol
      standard
      market(currency: USD) {
        id
        totalValueLocked {
          id
          value
          currency
          __typename
        }
        price {
          id
          value
          currency
          __typename
        }
        pricePercentChange(duration: $duration) {
          id
          currency
          value
          __typename
        }
        volume(duration: $duration) {
          id
          value
          currency
          __typename
        }
        __typename
      }
      project {
        id
        logoUrl
        __typename
      }
      __typename
    }
  }
`

// Uniswap GraphQL API query for price history of a token
export const UniswapTokenDetailQuery = gql`
  query TokenPrice($chain: Chain!, $address: String = null, $duration: HistoryDuration!) {
    token(chain: $chain, address: $address) {
      id
      name
      symbol
      address
      chain
      market(currency: USD) {
        id
        price {
          id
          value
          __typename
        }
        pricePercentChange(duration: $duration) {
          id
          currency
          value
          __typename
        }
        priceHistory(duration: $duration) {
          id
          timestamp
          value
          __typename
        }
        __typename
      }
      __typename
    }
  }
`
