import nextConnect from 'next-connect'
import { NextApiResponse } from 'next/types'
import { NextAuthorizedApiRequest } from 'src/@core/utils/types'

import { prisma } from 'src/lib/prisma'
import { excludeSecureFields } from 'src/lib/utils'
import withAuth from 'src/middlewares/auth'

const handler = nextConnect().get(async function (req: NextAuthorizedApiRequest, res: NextApiResponse) {
  try {
    const userEmail = req.userEmail
    const { keyword } = req.query
    const users = await prisma.user.findMany({
      where: {
        OR: [{ email: { contains: keyword as string } }, { username: { contains: keyword as string } }],
        NOT: {
          email: userEmail
        }
      },
      take: 10
    })

    res.status(200).json(excludeSecureFields(users))
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
})

export default withAuth(handler)
