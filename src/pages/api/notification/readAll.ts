import { prisma } from 'src/lib/prisma'
import withAuth from 'src/middlewares/auth'

const handler = async (req, res) => {
  try {
    const me = await prisma.user.findFirst({
      where: { email: req.userEmail }
    })

    if (!me?.id) throw new Error('Can not find the user')

    await prisma.notification.updateMany({
      where: {
        toUserId: me.id,
        readAt: null
      },
      data: {
        readAt: new Date()
      }
    })

    res.status(200).json({ success: true })
  } catch (e: any) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
}

export default withAuth(handler)
