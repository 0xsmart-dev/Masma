import { prisma } from 'src/lib/prisma'
import * as _ from 'lodash'
import { excludeSecureFields } from 'src/lib/utils'

export default async function handler(req, res) {
  try {
    const { profileId } = req.query

    const userProfile = await prisma.user.findFirst({
      where: {
        profileId: profileId as string
      },
      include: {
        _count: {
          select: { followings: true, followers: true }
        },
        followers: {
          select: { follower: true, followerId: true }
        },
        followings: {
          select: { userId: true, followerId: true }
        }
      }
    })

    if (!userProfile) throw new Error('user not found')

    // const referral = await prisma.referal.findFirst({
    //   where: {
    //     userEmail: userProfile.email
    //   }
    // })

    let inviteCount = 0
    inviteCount = await prisma.referal.count({
      where: {
        referredBy: userProfile.inviteCode
      }
    })
    res.status(200).json({ ...excludeSecureFields(userProfile), inviteCount })
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
}
