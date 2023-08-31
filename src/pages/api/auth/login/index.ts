import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { Magic } from '@magic-sdk/admin'
import { prisma } from 'src/lib/prisma'

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

export default async function handler(req, res) {
  try {
    const didToken = req.body.didToken
    await magic.token.validate(didToken)
    const userData = await magic.users.getMetadataByToken(didToken)

    console.log('userData => ', userData)

    const loggedUser = await prisma.user.findFirst({
      where: {
        email: userData.email?.toLowerCase() || ''
      }
    })

    if (!loggedUser) {
      throw new Error('Unregistered user')
    }

    const accessToken = jwt.sign(
      {
        user_email: loggedUser.email
      },
      process.env.JWT_SECRET || '123456',
      {
        expiresIn: '1d'
      }
    )

    res.status(200).json({ access_token: accessToken })
  } catch (e: any) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: e.message })
  }
}
