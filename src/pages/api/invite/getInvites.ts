import { prisma } from 'src/lib/prisma'
import withAuth from 'src/middlewares/auth'

const handler = async (req, res) => {
  try {
    const { profileId, keyword } = req.query
    const sortColumn = req.query.column || 'createdAt'
    const sort = req.query.sort || 'desc'
    const size = parseInt(req.query.size)
    const page = parseInt(req.query.page)
    let userProfile

    if (profileId !== '' && profileId !== undefined) {
      userProfile = await prisma.user.findFirst({
        where: {
          profileId: profileId as string
        }
      })
    } else {
      userProfile = await prisma.user.findFirst({
        where: {
          email: req.userEmail
        }
      })
    }

    // const refId = await prisma.referal.findFirst({
    //   where: {
    //     userEmail: userProfile.email
    //   }
    // })

    const total = await prisma.referal.count({
      where: {
        referredBy: userProfile.inviteCode || ''
      }
    })

    const invites = await prisma.referal.findMany({
      where: {
        referredBy: userProfile.inviteCode || '',
        userInfo: {
          OR: [{ email: { contains: keyword as string } }, { username: { contains: keyword as string } }]
        }
      },
      include: {
        userInfo: true
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
              userInfo: {
                [sortColumn]: sort
              }
            }
          }
        : {})
    })

    res.status(200).json({ data: invites, total, page, size })
  } catch (e: any) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
}

export default withAuth(handler)
