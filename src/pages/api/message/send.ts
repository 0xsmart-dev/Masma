import nextConnect from 'next-connect'
import { NextApiResponse } from 'next/types'
import { NextAuthorizedApiRequest } from 'src/@core/utils/types'
import { prisma } from 'src/lib/prisma'
import withAuth from 'src/middlewares/auth'
import Pusher from 'pusher'
import { NotificationType } from '@prisma/client'

const handler = nextConnect().post(async function (req: NextAuthorizedApiRequest, res: NextApiResponse) {
  try {
    const toUserId = parseInt(req.body.userId)

    const me = await prisma.user.findFirst({
      where: { email: req.userEmail }
    })

    if (!me?.id) throw new Error('Can not find user')

    const message = await prisma.message.create({
      data: {
        fromUserId: me.id,
        toUserId,
        content: req.body.message
      }
    })

    // trigger
    const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID as string,
      key: process.env.PUSHER_APP_KEY as string,
      secret: process.env.PUSHER_APP_SECRET as string,
      cluster: process.env.PUSHER_APP_CLUSTER as string,
      encrypted: true
    })

    // create notification
    const notification = await prisma.notification.create({
      data: {
        fromUserId: me.id,
        toUserId: toUserId,
        type: NotificationType.MESSAGE,
        body: {
          content: req.body.message
        }
      }
    })

    const notificationPayload = {
      ...notification,
      fromUser: me
    }

    pusher.trigger(`private-user-${toUserId}`, 'message', message)
    pusher.trigger(`private-user-${toUserId}`, 'notification', notificationPayload)

    res.status(200).json({ message })
  } catch (e: any) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
})

export default withAuth(handler)
