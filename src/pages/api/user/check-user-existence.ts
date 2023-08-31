import { prisma } from 'src/lib/prisma'

export default async function handler(req, res) {
  try {
    const userEmail = req.body?.email
    if (!userEmail) {
      throw new Error('No email provided')
    }

    const user = await prisma.user.findFirst({
      where: { email: userEmail.toLowerCase() }
    })
    if (user) res.status(200).json({ existing: true })
    else res.status(200).json({ existing: false })
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
}
