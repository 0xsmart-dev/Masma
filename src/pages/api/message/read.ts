import nextConnect from 'next-connect'
import { NextApiResponse } from 'next/types'
import { NextAuthorizedApiRequest } from 'src/@core/utils/types'
import { prisma } from 'src/lib/prisma'
import withAuth from 'src/middlewares/auth'

const handler = nextConnect().post(async function (req: NextAuthorizedApiRequest, res: NextApiResponse) {
  try {
    const fromUserId = parseInt(req.body.userId)

    const me = await prisma.user.findFirst({
      where: { email: req.userEmail }
    })

    if (!me) throw new Error('Can not find the user')

    await prisma.message.updateMany({
      data: {
        readAt: new Date()
      },
      where: {
        fromUserId,
        toUserId: me.id
      }
    })

    res.status(200).json({ read: true })
  } catch (e: any) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
})

export default withAuth(handler)
