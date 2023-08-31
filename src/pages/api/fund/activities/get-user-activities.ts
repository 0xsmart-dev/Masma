import { User } from '@prisma/client'
import { prisma } from 'src/lib/prisma'

export default async function handler(req, res) {
  //access prisma, grab all related tables, deposts, transfers, withdrawls, and sort them by date

  //in reqbody add a param called preview, to limit the size of the prisma grab to 3 or 5
  try {
    const { walletAddress, preview } = req.body

    const user: any = await prisma.user.findUnique({
      where: { smartWalletAddress: walletAddress }
    })

    //grabs all transfers related to user from transfer table.
    const userTransfers = await prisma.transfer.findMany({
      where: {
        OR: [{ fromId: user.id }, { toId: user.id }]
      },
      orderBy: {
        id: 'desc'
      },
      include: {
        fromUser: {
          select: {
            id: true,
            username: true,
            smartWalletAddress: true,
            avatar: true,
            profileId: true
          }
        },
        toUser: {
          select: {
            id: true,
            username: true,
            smartWalletAddress: true,
            avatar: true,
            profileId: true
          }
        }
      }
    })

    // grabs all deposits in the deposits table
    const newDeposits = await prisma.deposit.findMany({
      where: { address: walletAddress },
      orderBy: {
        createdAt: 'desc'
      }
    })

    //Merges data based on when the data was created.
    const mergedData = [...userTransfers, ...newDeposits].sort((a: any, b: any) => {
      return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
    })

    //response is the merged data.
    res.send(mergedData)
  } catch (err) {
    console.log(err)
  }
}
