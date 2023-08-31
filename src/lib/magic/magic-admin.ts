// use this library from only backend side

import { Magic } from '@magic-sdk/admin'

const customNodeOptions = {
  rpcUrl: 'https://rpc-mumbai.maticvigil.com/', // Polygon RPC URL
  chainId: 80001 // Polygon chain id
}

export const magic = new Magic(process.env.MAGIC_SECRET_KEY)
