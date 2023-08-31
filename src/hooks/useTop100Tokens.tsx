import { useState, useEffect } from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { TokenType, HistoryDuration } from 'src/types/apps/investingTypes'
import { UniswapTopTokens100DataQuery, UniswapTokenDetailQuery } from 'src/graphql/queries/uniswap'

const uniswapClient = new ApolloClient({
  uri: 'https://api.uniswap.org/v1/graphql',
  cache: new InMemoryCache()
})

export const useTop100Tokens = () => {
  const [ethPrice, setEthPrice] = useState(0)
  const [tokens, setTokens] = useState<Array<TokenType>>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState(null)

  // Fetch token data from Uniswap GraphQL API
  const fetchTokenData = async () => {
    try {
      setLoading(true)
      const uniswapTokenListResult = await uniswapClient.query({
        query: UniswapTopTokens100DataQuery,
        variables: {
          duration: 'DAY',
          chain: 'ETHEREUM'
        }
      })
      const topTokens = uniswapTokenListResult.data.topTokens

      // Get ETH price
      const ethPrice = topTokens.find((token: any) => token.symbol === 'WETH').market.price.value
      setEthPrice(ethPrice)

      // Get token data
      const tokens: Array<TokenType> = []
      for (const token of topTokens) {
        const newTokenData: TokenType = {}
        newTokenData.id = token.address
        newTokenData.name = token.name
        newTokenData.symbol = token.symbol
        newTokenData.logoUrl = token.project.logoUrl
        newTokenData.price = token.market.price?.value
        newTokenData.volume = token.market.volume?.value
        newTokenData.totalValueLocked = token.market?.totalValueLocked?.value
        newTokenData.pricePercentChange = token.market?.pricePercentChange?.value
        tokens.push(newTokenData)
      }
      setTokens(tokens)
    } catch (error: any) {
      console.log({ error })
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch token data on 1 minute interval
  useEffect(() => {
    fetchTokenData()
    const interval = setInterval(() => {
      fetchTokenData()
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return { ethPrice, tokens, loading, error }
}

// Fetch token price data from Uniswap GraphQL API
export const useTop100TokensPriceData = (tokenAddress: string, duration: HistoryDuration) => {
  const [tokenInfo, setTokenInfo] = useState<TokenType>({})
  const [tokenPriceData, setTokenPriceData] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState(null)

  const fetchTokenPriceData = async () => {
    try {
      setLoading(true)
      const priceHistoryResult = await uniswapClient.query({
        query: UniswapTokenDetailQuery,
        variables: {
          duration: duration || 'DAY',
          chain: 'ETHEREUM',
          address: tokenAddress
        }
      })
      const history = priceHistoryResult.data?.token?.market?.priceHistory
      const chartData = history.map((price: any) => {
        return {
          date: new Date(price.timestamp * 1000).toLocaleDateString(),
          price: price.value
        }
      })
      setTokenPriceData(chartData)
      setTokenInfo({
        id: priceHistoryResult.data?.token?.address,
        name: priceHistoryResult.data?.token?.name,
        symbol: priceHistoryResult.data?.token?.symbol
      })
    } catch (err: any) {
      console.log(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTokenPriceData()
  }, [tokenAddress, duration])

  return { tokenInfo, tokenPriceData, loading, error }
}
