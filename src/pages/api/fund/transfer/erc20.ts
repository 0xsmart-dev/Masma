import nextConnect from 'next-connect'
import { NextApiResponse } from 'next/types'
import { NextAuthorizedApiRequest } from 'src/@core/utils/types'
import { prisma } from 'src/lib/prisma'
import withAuth from 'src/middlewares/auth'

import { NotificationType, ActivityType, TransferStatus } from '@prisma/client'
import { pusher } from 'src/lib/pusher'
import { sendEmail } from 'src/lib/utils/sendEmail'
import { EmailTemplateType } from 'src/context/types'

const handler = nextConnect().post(async function (req: NextAuthorizedApiRequest, res: NextApiResponse) {
  try {
    const toSmartWalletAddress = req.body.to
    const amount = parseFloat(req.body.amount) || 0
    const symbol = req.body.symbol
    const tokenAddress = req.body.tokenAddress
    const chainId = req.body.chainId
    const transactionHash = req.body.transactionHash
    const paymentPurpose = req.body.paymentPurpose

    const me = await prisma.user.findFirst({
      where: { email: req.userEmail }
    })

    const toUser = await prisma.user.findFirst({
      where: {
        smartWalletAddress: toSmartWalletAddress
      }
    })

    if (!me || !toUser) {
      return res.status(404).send({
        message: 'Invalid parameters'
      })
    }

    const fromId = me?.id || 0
    const toId = toUser?.id || 0

    await prisma.transfer.create({
      data: {
        fromId,
        toId,
        amount,
        fee: 0,
        chainId,
        tokenAddress: tokenAddress,
        paymentPurpose,
        transactionHash,
        status: TransferStatus.COMPLETED
      }
    })

    const notification = await prisma.notification.create({
      data: {
        fromUserId: fromId,
        toUserId: toId,
        type: NotificationType.RECEIVE_MONEY,
        body: {
          amount,
          symbol
        }
      }
    })

    await prisma.activity.create({
      data: {
        userId: fromId,
        activityType: ActivityType.TRANSFER,
        activityContent: {
          toUserId: toId,
          amount,
          symbol
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
      symbol,
      text: paymentPurpose
    })
    await sendEmail('hello@masma.io', toUser.email, EmailTemplateType.RECEIVE_MONEY, {
      toUser,
      from: me,
      amount,
      symbol,
      text: paymentPurpose
    })

    res.status(200).json({ result: 'success' })
  } catch (e: any) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
})

export default withAuth(handler)
