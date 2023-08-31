import { prisma } from 'src/lib/prisma'
import withAuth from 'src/middlewares/auth'

const handler = async (req, res) => {
  try {
    const invite = await prisma.user.findFirst({
      where: {
        email: req.userEmail
      }
    })
    res.status(200).json({ data: invite })
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
}

export default withAuth(handler)
