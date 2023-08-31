import { prisma } from 'src/lib/prisma'
import withAuth from 'src/middlewares/auth'
import { excludeSecureFields } from 'src/lib/utils'

const handler = async (req, res) => {
  try {
    const userId = req.query.userId

    const me = await prisma.user.findFirst({
      where: { email: req.userEmail }
    })

    if (!me?.id) throw new Error('Can not find the user')

    const contact = await prisma.user.findFirst({
      where: { id: parseInt(userId) }
    })

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            fromUserId: parseInt(userId),
            toUserId: me.id
          },
          {
            toUserId: parseInt(userId),
            fromUserId: me.id
          }
        ]
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    res.status(200).json({ contact: excludeSecureFields(contact), messages })
  } catch (e: any) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
}

export default withAuth(handler)
