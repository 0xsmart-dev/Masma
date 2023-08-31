import { prisma } from 'src/lib/prisma'
import withAuth from 'src/middlewares/auth'

const handler = async (req, res) => {
  try {
    const me = await prisma.user.findFirst({
      where: { email: req.userEmail }
    })

    if (!me?.id) throw new Error('Can not find the user')

    const notifications = await prisma.notification.findMany({
      where: {
        toUserId: me.id,
        readAt: null
      },
      orderBy: {
        createdAt: 'desc'
      },

      // take: 5,
      include: {
        fromUser: true,
        toUser: true
      }
    })

    res.status(200).json({ notifications })
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
}

export default withAuth(handler)
