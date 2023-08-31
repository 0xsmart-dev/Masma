import { ethers } from 'ethers'
import ERC20 from 'src/lib/contracts/abis/erc20.json'
import { CHAIN_IDS, RPC_URLS, USDC_CONTRACTS } from '../constants'

export const chainId = process.env.NEXT_PUBLIC_CHAIN_ID || CHAIN_IDS.POLYGON

export const getProvider = () =>
  new ethers.providers.StaticJsonRpcProvider(RPC_URLS.get(chainId), {
    chainId: Number(chainId),
    name: 'Mumbai'
  })

export const getUSDCContract = (provider?: ethers.providers.Provider) => {
  const contractAddress = USDC_CONTRACTS.get(chainId)

  return new ethers.Contract(contractAddress, ERC20.abi, provider)
}

export const getUSDCBalance = async (userAddress: string) => {
  const usdcContract = getUSDCContract(getProvider())
  const balanceData = await usdcContract.balanceOf(userAddress)

  if (chainId === CHAIN_IDS.MUMBAI) return parseFloat(ethers.utils.formatUnits(balanceData, 18))

  return parseFloat(ethers.utils.formatUnits(balanceData, 6))
}

export const getContract = (contractAddress, provider?: ethers.providers.Provider) => {
  return new ethers.Contract(contractAddress, ERC20.abi, provider)
}
