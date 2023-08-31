import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next/types'
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID as string,
  key: process.env.PUSHER_APP_KEY as string,
  secret: process.env.PUSHER_APP_SECRET as string,
  cluster: process.env.PUSHER_APP_CLUSTER as string,
  encrypted: true
});

const API_ROUTE = '/api/sandbox/notification'
const handler = nextConnect().post(async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const obj = {
      id: Math.random() * 10000,
      message: 'Sandbox: Notification!',
      time: new Date(),
      isRead: false,

      // to: [],
    }
    pusher.trigger('notification', 'test-notification', obj);
    res.status(200).json({ isAuthenticated: true })
  } catch (e: any) {
    console.log(`${API_ROUTE}.error: `, e.message)
    res.status(400).json({ error: e.message })
  }
})

export default handler
