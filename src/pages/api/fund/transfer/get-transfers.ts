import { User } from '@prisma/client'
import { prisma } from 'src/lib/prisma'

export default async function getUserTransfers(req, res) {
  const { walletAddress }: { walletAddress: string } = req.body
  const { page, rowsPerPage } = req.body
  try {
    const user: User | null = await prisma.user.findUnique({
      where: { smartWalletAddress: walletAddress }
    })

    if (user) {
      const totalCount = await prisma.transfer.count({
        where: {
          OR: [{ fromId: user.id }, { toId: user.id }]
        }
      })
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
        },
        skip: page * rowsPerPage,
        take: rowsPerPage
      })

      //console.log(userTransfers)

      return res.send({ userTransfers, totalCount })
    }
  } catch (err) {
    //console.log(err)
  }
}
