import { prisma } from 'src/lib/prisma'
import withAuth from 'src/middlewares/auth'

const handler = async (req, res) => {
  try {
    const { keyword } = req.query
    const sortColumn = req.query.column || 'createdAt'
    const sort = req.query.sort || 'desc'
    const size = parseInt(req.query.size)
    const page = parseInt(req.query.page)

    const me = await prisma.user.findFirst({
      where: { email: req.userEmail }
    })

    if (!me?.id) throw new Error('user not found')

    const total = await prisma.following.count({
      where: { followerId: me.id }
    })

    const followings = await prisma.following.findMany({
      where: {
        followerId: me.id,
        user: {
          OR: [{ email: { contains: keyword as string } }, { username: { contains: keyword as string } }]
        }
      },
      include: {
        user: true
      },
      take: size,
      ...(page ? { skip: page * size } : {}),
      ...(sortColumn === 'createdAt'
        ? {
            orderBy: {
              [sortColumn]: sort
            }
          }
        : sortColumn
        ? {
            orderBy: {
              user: {
                [sortColumn]: sort
              }
            }
          }
        : {})
    })

    res.status(200).json({ data: followings, total, page, size })
  } catch (e: any) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
}

export default withAuth(handler)
