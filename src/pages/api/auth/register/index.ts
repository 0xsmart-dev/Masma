import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next/types'
import { prisma } from 'src/lib/prisma'
import { ActivityType, ReferalStatus } from '@prisma/client'
import { ethers } from 'ethers'
import { verifyCode } from 'src/lib/auth0'
import jwt from 'jsonwebtoken'

import { Magic } from '@magic-sdk/admin'

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

const API_ROUTE = '/api/auth/register'

const generateProfileId = ({ name }: { name: string }) => {
  const randomStr = Math.random().toString(36).slice(2, 9)

  return `${sanitizeStr(name).toLowerCase()}-${randomStr}`
}

const sanitizeStr = (str: string) => str.replace(/\s/g, '')

const handler = nextConnect().post(async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const userEmail = req.body.email
    const userName = req.body.username
    const didToken = req.body.didToken
    const aaAddress = req.body.aaAddress
    const referredBy = (req.body?.inviteCode || '').toUpperCase()
    let avatarUrl = req.body.avatarUrl

    if (!userEmail || !userName || !didToken || !aaAddress) {
      return res.status(401).json({ error: 'Missing required information' })
    }

    try {
      await magic.token.validate(didToken)
    } catch (e) {
      return res.status(401).json({ error: 'Invalid did token' })
    }

    const userData = await magic.users.getMetadataByToken(didToken)

    if (!avatarUrl) {
      // get avatar from avatars
      const avatar = await prisma.avatar.findFirst()

      if (!avatar) {
        throw new Error('Not available avatar for new user')
      }

      avatarUrl = avatar?.url || ''
    }

    const profileId = generateProfileId({ name: userName })

    const me = await prisma.user.create({
      data: {
        email: userEmail.toLowerCase() || '',
        username: userName,
        avatar: avatarUrl,
        profileId: profileId,
        magicWalletAddress: userData.publicAddress as string,
        smartWalletAddress: req.body?.aaAddress as string,
        issuer: userData.issuer,
        oauthProvider: userData.oauthProvider,
        inviteCode: generateUID()
      }
    })
    console.log('aaaaaaaaa', me)
    if (referredBy || referredBy !== '') {
      const userProfile = await prisma.user.findFirst({
        where: {
          inviteCode: referredBy
        }
      })

      if (userProfile === null) {
        throw new Error('Invalide invite code')
      }

      await prisma.referal.create({
        data: {
          userId: me.id,
          referredBy: referredBy || undefined,
          status: ReferalStatus.ACCEPTED
        }
      })

      await prisma.activity.create({
        data: {
          userId: me.id,
          activityType: ActivityType.ACCEPT_INVITE,
          activityContent: {
            toUserId: userProfile.id
          }
        }
      })
    } else {
      await prisma.activity.create({
        data: {
          userId: me.id,
          activityType: ActivityType.SIGN_UP,
          activityContent: {}
        }
      })
    }

    const accessToken = jwt.sign(
      {
        user_email: userEmail
      },
      process.env.JWT_SECRET || '123456',
      {
        expiresIn: '1d'
      }
    )

    res.status(200).json({ access_token: accessToken })
  } catch (e: any) {
    console.log(`${API_ROUTE}.error: `, e.message)
    res.status(500).json({ error: e.message })
  }
})

const generateUID = () => {
  const firstPart = (Math.random() * 46656) | 0
  const secondPart = (Math.random() * 46656) | 0
  const res = ('000' + firstPart.toString(36)).slice(-3) + ('000' + secondPart.toString(36)).slice(-3)

  return res.toUpperCase()
}

export default handler
