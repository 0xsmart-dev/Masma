export const CHAIN_IDS = {
  ETHERMAIN: '1',
  POLYGON: '137',
  MUMBAI: '80001'
}

export const UNI_LIST = 'https://tokens.uniswap.org'

const USDC_CONTRACTS = new Map()
USDC_CONTRACTS.set(CHAIN_IDS.ETHERMAIN, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48')
USDC_CONTRACTS.set(CHAIN_IDS.POLYGON, '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174')
USDC_CONTRACTS.set(CHAIN_IDS.MUMBAI, '0xBC301D905Ccee51Dd9e7b60Bb807aCC69bD00913')

export const USDC_LOGO_URL =
  'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png'

export const USDC_DECIMALS = 6

export const USDC_NAME = 'USD Coin'
export const WRAPPED_USDC_NAME = 'Masma Balance'

const INFURA_NETWORKS = new Map()
INFURA_NETWORKS.set(CHAIN_IDS.ETHERMAIN, 'homestead')
INFURA_NETWORKS.set(CHAIN_IDS.POLYGON, 'matic')
INFURA_NETWORKS.set(CHAIN_IDS.MUMBAI, 'maticmum')

const RPC_URLS = new Map()
RPC_URLS.set(CHAIN_IDS.ETHERMAIN, 'https://mainnet.infura.io/v3/')
RPC_URLS.set(CHAIN_IDS.POLYGON, 'https://polygon-rpc.com')
RPC_URLS.set(CHAIN_IDS.MUMBAI, 'https://rpc-mumbai.maticvigil.com/')

export { USDC_CONTRACTS, INFURA_NETWORKS, RPC_URLS }
