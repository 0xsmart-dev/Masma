import { Magic } from 'magic-sdk'

import { OAuthExtension } from '@magic-ext/oauth'

const customNodeOptions = {
  rpcUrl: 'https://rpc-mumbai.maticvigil.com/', // Polygon RPC URL
  chainId: 80001 // Polygon chain id
}

// Create client-side Magic instance
const createMagic = key => {
  return (
    typeof window != 'undefined' &&
    new Magic(key, {
      extensions: [new OAuthExtension()],
      network: customNodeOptions
    })
  )
}

export const magic = createMagic(process.env.NEXT_PUBLIC_MAGIC_API_KEY)
