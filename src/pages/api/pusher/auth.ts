import { prisma } from 'src/lib/prisma'
import Pusher from 'pusher'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  try {
    const accessToken = req.headers.authorization?.substring(7) || ''
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET || '123456')

    const email = (req.userEmail = (decoded as any)?.user_email)
    const user = await prisma.user.findFirst({
      where: { email }
    })

    if (!user) throw new Error('User not found')

    const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID as string,
      key: process.env.PUSHER_APP_KEY as string,
      secret: process.env.PUSHER_APP_SECRET as string,
      cluster: process.env.PUSHER_APP_CLUSTER as string,
      encrypted: true
    })

    const socketId = req.body.socket_id
    const channel = req.body.channel_name
    const presenceData = {
      user_id: user.id + '',
      user_info: user
    }
    const authResponse = pusher.authorizeChannel(socketId, channel, presenceData)

    res.send(authResponse)
  } catch (e: any) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: e.message })
  }
}
