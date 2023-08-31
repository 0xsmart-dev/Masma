import nextConnect from 'next-connect'
import { NextApiResponse } from 'next/types'
import { NextAuthorizedApiRequest } from 'src/@core/utils/types'

import { prisma } from 'src/lib/prisma'
import withAuth from 'src/middlewares/auth'
import { excludeSecureFields } from 'src/lib/utils'

const handler = nextConnect().post(async function (req: NextAuthorizedApiRequest, res: NextApiResponse) {
  try {
    const userEmail = req.userEmail
    const users = await prisma.user.findMany({
      take: 10,
      where: {
        NOT: {
          email: userEmail
        }
      },
      include: {
        followers: {
          select: {
            id: true,
            follower: {
              select: {
                profileId: true
              }
            }
          }
        }
      },
      orderBy: {
        followers: {
          _count: 'desc'
        }
      }
    })

    res.status(200).json(excludeSecureFields(users))
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
})

export default withAuth(handler)
