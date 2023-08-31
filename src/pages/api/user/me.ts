import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next/types'
import { prisma } from 'src/lib/prisma'
import * as _ from 'lodash'
import withAuth from 'src/middlewares/auth'
import { StatusCodes } from 'http-status-codes'

const API_ROUTE = '/api/user/me'
async function handler(req, res) {
  try {
    const userEmail = req?.userEmail

    console.log(`${API_ROUTE}.userEmail => `, userEmail)

    const user = await prisma.user.findFirst({
      where: { email: userEmail.toLowerCase() || '' },
      include: {
        followings: {
          select: {
            id: true,
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
        },
        followers: {
          select: {
            id: true,
            follower: {
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
        }
      }
    })

    if (!user) {
      throw new Error('user not found')
    }

    // const refId = await prisma.referal.findFirst({
    //   where: {
    //     userId: user.id
    //   }
    // })

    let inviteCount = 0
    const inviteCode = user.inviteCode
    if (inviteCode)
      inviteCount = await prisma.referal.count({
        where: {
          referredBy: inviteCode
        }
      })

    if (!user?.avatar) user.avatar = '/images/avatars/Avatar-light.png'
    res.status(200).json({
      userData: {
        ..._.omit(user, ['privateKey']),
        role: 'admin',
        inviteCount,
        level: getUserLevel(inviteCount)
      }
    })
  } catch (e: any) {
    console.log(`${API_ROUTE}.error: `, e.message)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message })
  }
}

const getUserLevel = (inviteCount: number) => {
  if (inviteCount < 4) {
    return 0
  } else if (inviteCount < 10) {
    return 1
  } else if (inviteCount < 25) {
    return 2
  } else if (inviteCount < 55) {
    return 3
  } else if (inviteCount < 100) {
    return 4
  } else return 5
}

export default withAuth(handler)
