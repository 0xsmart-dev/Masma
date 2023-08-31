import { prisma } from 'src/lib/prisma'
import { excludeSecureFields } from 'src/lib/utils'
import withAuth from 'src/middlewares/auth'

const API_ROUTE = '/api/user/update'
async function handler(req, res) {
  try {
    const userEmail = req.userEmail
    const username = req.body?.username
    const bio = req.body?.bio

    const user = await prisma.user.update({
      where: {
        email: userEmail
      },
      data: {
        ...(username ? { username } : {}),
        ...(bio ? { bio } : {})
      }
    })

    res.status(200).json(excludeSecureFields(user))
  } catch (e: any) {
    console.log(`${API_ROUTE}.error: `, e.message)
    res.status(400).json({ error: e.message })
  }
}

export default withAuth(handler)
