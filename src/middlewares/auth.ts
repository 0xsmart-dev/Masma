import { Middleware, use } from 'next-api-middleware'
import { StatusCodes } from 'http-status-codes'
import * as jwt from 'jsonwebtoken'

export const auth: Middleware = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.substring(7) || ''
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET || '123456') as any
    req.userEmail = decoded?.user_email || ''

    await next()
  } catch (err: any) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: err.message })
  }
}

const withAuth = use(auth)
export default withAuth
