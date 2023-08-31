import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next/types'
import { verifyCode as checkAuthenticationCode } from 'src/lib/auth0'

const API_ROUTE = '/api/auth0/verify-code'

const handler = nextConnect().post(async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const userEmail = req.body.email
    const code = req.body.code

    await checkAuthenticationCode(userEmail, code)
    res.status(200).send(true)
  } catch (e: any) {
    console.log(`${API_ROUTE}.error: `, e.message)
    res.status(400).json({ error: e.message })
  }
})

export default handler
