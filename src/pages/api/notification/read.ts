import { prisma } from 'src/lib/prisma'
import withAuth from 'src/middlewares/auth'

const handler = async (req, res) => {
  try {
    const notification = await prisma.notification.update({
      where: {
        id: parseInt(req.query.id)
      },
      data: {
        readAt: new Date()
      }
    })

    res.status(200).json({ notification })
  } catch (e: any) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
}

export default withAuth(handler)
