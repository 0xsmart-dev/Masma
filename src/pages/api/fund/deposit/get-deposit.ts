import { User } from '@prisma/client'
import { prisma } from 'src/lib/prisma'

export default async function getDeposits(req, res) {
  const { walletAddress }: { walletAddress: string } = req.body
  try {
    const newDeposits = await prisma.deposit.findMany({
      where: { address: walletAddress },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return res.send(newDeposits)
  } catch (err) {
    //console.log(err)
  }
}
