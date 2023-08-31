import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next/types'
import { sendVerificationCode } from 'src/lib/auth0'
import { prisma } from 'src/lib/prisma'
import StatusCodes from 'http-status-codes'

const API_ROUTE = '/api/auth0/send-verification-code'

const handler = nextConnect().post(async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const userEmail = req.body.email
    const isForLogin = req.body?.is_for_login ?? false

    const user = await prisma.user.findFirst({
      where: {
        email: userEmail.toLowerCase() || ''
      }
    })

    if (user && !isForLogin) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        message: 'Register failed: user already exist'
      })
    }

    if (!user && isForLogin) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        message: 'Login failed: user does not exist'
      })
    }

    const sentRes = await sendVerificationCode(userEmail)
    res.status(200).send(true)
  } catch (e: any) {
    console.log(`${API_ROUTE}.error: `, e.message)
    res.status(400).json({ error: e.message })
  }
})

export default handler
