import { magic } from 'src/lib/magic/magic-client'

import { getZeroDevSigner, getRPCProviderOwner } from '@zerodevapp/sdk'
import { getContract, getUSDCContract } from '../contracts/functions'
import { ethers } from 'ethers'

export const getSigner = async () => {
  if (!magic) {
    throw new Error('magic wallet is not implemented')
  }

  const signer = await getZeroDevSigner({
    projectId: process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID || '',
    owner: getRPCProviderOwner(magic.rpcProvider)
  })

  return signer
}

export const getSmartWalletAddress = async () => {
  const address = (await getSigner()).getAddress()

  return address
}

interface IUsdcTransferParams {
  to: string
  amount: string
}

interface IErc20TransferParams {
  contractAddress: string
  to: string
  amount: string
  symbol: string
  decimals: number
}

export const usdcTransfer = async ({ to, amount }: IUsdcTransferParams) => {
  const zeroDevSigner = await getSigner()

  const usdcContract = getUSDCContract().connect(zeroDevSigner)
  const [symbol, decimals] = await Promise.all([usdcContract.symbol(), usdcContract.decimals()])

  console.log(`Transfering ${amount} ${symbol}...`)

  const toAddress = ethers.utils.getAddress(to)

  const amountInWei = ethers.utils.parseUnits(amount, decimals)
  const receipt = await usdcContract.transfer(toAddress, amountInWei)

  await receipt.wait()

  console.log('recepit => ', receipt)

  return receipt.hash
}

export const erc20Transfer = async ({ contractAddress, to, amount, symbol, decimals }: IErc20TransferParams) => {
  const zeroDevSigner = await getSigner()

  const tokenContract = getContract(contractAddress).connect(zeroDevSigner)

  console.log(`Transfering ${amount} ${symbol}...`)

  const toAddress = ethers.utils.getAddress(to)

  const amountInWei = ethers.utils.parseUnits(amount, decimals)
  const receipt = await tokenContract.transfer(toAddress, amountInWei)

  await receipt.wait()

  console.log('recepit => ', receipt)

  return receipt.hash
}
