import getTransactionStatus from './wyre/getTransactionStatus'
import { prisma } from 'src/lib/prisma'

export default async function useTransactionStatus(transactionId: string) {
  try {
    const updatedTransaction = await getTransactionStatus(transactionId)
    const { orderId, status, dest, purchaseAmount, sourceAmount, blockchainNetworkTx } = updatedTransaction

    // await prisma.deposit.upsert({
    //   where: { orderId: orderId },
    //   update: {
    //     status: updatedTransaction.status,
    //     blockchainNetworkTx: updatedTransaction.blockchainNetworkTx || ''
    //   },
    //   create: {
    //     orderId: orderId || '',
    //     status: status || 'PENDING',
    //     publicAddress: dest.slice(6) || '',
    //     amountRecieved: purchaseAmount,
    //     amountSpent: sourceAmount,
    //     blockchainNetworkTx: blockchainNetworkTx || ''
    //   }
    // })

    return status
  } catch (err) {
    console.log('an Error has occurred.')
  }
}
