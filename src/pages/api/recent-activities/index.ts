import { prisma } from 'src/lib/prisma'
import withAuth from 'src/middlewares/auth'
import { ActivityType } from '@prisma/client'

const handler = async (req, res) => {
  try {
    const me = await prisma.user.findFirst({
      where: { email: req.userEmail }
    })

    if (!me?.id) throw new Error('Can not find the user')

    const size = parseInt(req.query.size)
    const page = parseInt(req.query.page)

    const activities = await prisma.activity.findMany({
      where: {
        userId: me.id
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: size || 5,
      ...(page ? { skip: (page - 1) * (size || 5) } : {})
    })

    const activities_: any[] = []
    for (const e of activities) {
      if (e.activityContent && e.activityContent['toUserId']) {
        const toUser = await prisma.user.findFirst({
          where: {
            id: e.activityContent['toUserId']
          }
        })
        activities_.push({
          ...e,
          content: {
            ...(e.activityContent as object),
            toUser
          }
        })
      }
    }

    const total = await prisma.activity.count({
      where: {
        userId: me.id
      }
    })

    res.status(200).json({ data: activities_, total, page, size })
  } catch (e: any) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
}

export default withAuth(handler)
