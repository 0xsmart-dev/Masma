import nextConnect from 'next-connect'
import { NextApiResponse } from 'next/types'
import { NextAuthorizedApiRequest } from 'src/@core/utils/types'
import { prisma } from 'src/lib/prisma'
import withAuth from 'src/middlewares/auth'
import { chainId } from 'src/lib/contracts/functions'

import { NotificationType, ActivityType } from '@prisma/client'
import { pusher } from 'src/lib/pusher'
import { sendEmail } from 'src/lib/utils/sendEmail'
import { EmailTemplateType } from 'src/context/types'
import { USDC_CONTRACTS, USDC_LOGO_URL, USDC_NAME } from 'src/lib/constants'

const TRANSFER_FEE = 0

const handler = nextConnect().post(async function (req: NextAuthorizedApiRequest, res: NextApiResponse) {
  try {
    const toUserId = parseInt(req.body.to)
    const amount = parseFloat(req.body.amount) || 0
    const paymentPurpose = req.body.paymentPurpose

    const me = await prisma.user.findFirst({
      where: { email: req.userEmail }
    })

    const toUser = await prisma.user.findFirst({
      where: {
        id: toUserId
      }
    })

    if (!me || !toUser) {
      return res.status(404).send({
        message: 'Invalid parameters'
      })
    }

    if (amount <= 0 || (me?.balance && me?.balance < amount)) {
      return res.status(404).send({
        message: 'Invalid parameters'
      })
    }

    const amountToSend = amount - TRANSFER_FEE * amount

    const fromId = me?.id || 0
    const toId = toUser?.id || 0

    await prisma.transfer.create({
      data: {
        fromId: fromId,
        toId: toUserId,
        amount: amount,
        paymentPurpose: paymentPurpose,
        chainId: parseInt(chainId),
        tokenAddress: USDC_CONTRACTS.get(chainId),
        status: 'COMPLETED',
        fee: TRANSFER_FEE * amount
      }
    })

    const curUserBalance = me?.balance || 0
    await prisma.user.update({
      where: {
        id: fromId
      },
      data: {
        balance: curUserBalance - amount
      }
    })

    const toUserBalance = toUser?.balance || 0
    await prisma.user.update({
      data: {
        balance: toUserBalance + amountToSend
      },
      where: {
        id: toUserId
      }
    })

    const notification = await prisma.notification.create({
      data: {
        fromUserId: fromId,
        toUserId: toId,
        type: NotificationType.RECEIVE_MONEY,
        body: {
          amount: amountToSend
        }
      }
    })

    await prisma.activity.create({
      data: {
        userId: fromId,
        activityType: ActivityType.TRANSFER,
        activityContent: {
          toUserId: toId,
          amount: amountToSend
        }
      }
    })

    const notificationPayload = {
      ...notification,
      fromUser: me,
      toUser: toUser
    }
    pusher.trigger(`private-user-${toId}`, 'notification', notificationPayload)

    await sendEmail('hello@masma.io', me.email, EmailTemplateType.SEND_MONEY, {
      toUser,
      from: me,
      amount,
      text: paymentPurpose
    })
    await sendEmail('hello@masma.io', toUser.email, EmailTemplateType.RECEIVE_MONEY, {
      toUser,
      from: me,
      amount,
      text: paymentPurpose
    })

    res.status(200).json({ userBalance: curUserBalance - amount })
  } catch (e: any) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
})

export default withAuth(handler)
