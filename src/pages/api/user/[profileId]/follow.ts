import nextConnect from 'next-connect'
import { NextApiResponse } from 'next/types'
import { NextAuthorizedApiRequest } from 'src/@core/utils/types'
import { prisma } from 'src/lib/prisma'
import withAuth from 'src/middlewares/auth'
import Pusher from 'pusher'
import { NotificationType, ActivityType } from '@prisma/client'
import { sendEmail } from 'src/lib/utils/sendEmail'
import { EmailTemplateType } from 'src/context/types'

const handler = nextConnect().post(async function (req: NextAuthorizedApiRequest, res: NextApiResponse) {
  try {
    const { profileId } = req.query

    const me = await prisma.user.findFirst({
      where: { email: req.userEmail }
    })

    if (!me?.id) throw new Error('Can not find the user')

    const userProfile = await prisma.user.findFirst({
      where: {
        profileId: profileId as string
      }
    })

    if (!userProfile) {
      throw Error('User not exist!')
    }

    const following = await prisma.following.create({
      data: {
        followerId: me.id,
        userId: userProfile.id
      }
    })

    await prisma.activity.create({
      data: {
        userId: me.id,
        activityType: ActivityType.FOLLOW,
        activityContent: {
          toUserId: userProfile.id
        }
      }
    })

    // create notification
    const notification = await prisma.notification.create({
      data: {
        fromUserId: me.id,
        toUserId: userProfile.id,
        type: NotificationType.FOLLOW,
        body: {
          followingId: following.id
        }
      }
    })

    const notificationPayload = {
      ...notification,
      fromUser: me,
      toUser: userProfile
    }

    // trigger
    const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID as string,
      key: process.env.PUSHER_APP_KEY as string,
      secret: process.env.PUSHER_APP_SECRET as string,
      cluster: process.env.PUSHER_APP_CLUSTER as string,
      encrypted: true
    })
    pusher.trigger(`private-user-${userProfile.id}`, 'notification', notificationPayload)

    const followings = await prisma.following.findMany({
      where: { followerId: me.id },
      include: {
        user: {
          select: {
            profileId: true,
            id: true,
            avatar: true,
            username: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    const followers = await prisma.following.findMany({
      where: { userId: me.id },
      include: {
        follower: {
          select: {
            profileId: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    await sendEmail('hello@masma.io', userProfile.email, EmailTemplateType.FOLLOWED, { toUser: me })

    res.status(200).json({ followings, followers })
  } catch (e: any) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
})

export default withAuth(handler)
