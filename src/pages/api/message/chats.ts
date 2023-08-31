import moment from 'moment'
import { prisma } from 'src/lib/prisma'
import withAuth from 'src/middlewares/auth'

type LastChatObj = {
  id: number
  fromUserId: number
  toUserId: number
  content: string
  createdAt: Date
  updatedAt: Date
  readAt: Date | null
  userId: number
  unseenMsgs: number
  avatar: string
  name: string
  status: string
}
const handler = async (req, res) => {
  try {
    const me = await prisma.user.findFirst({
      where: { email: req.userEmail }
    })

    if (!me) throw new Error('Can not find the user')

    const unseenMsgs = await prisma.message.groupBy({
      by: ['fromUserId'],
      where: { toUserId: me.id, readAt: null },
      _count: {
        id: true
      }
    })

    const lastMessages = (
      await prisma.message.findMany({
        where: {
          OR: [
            {
              toUserId: me.id
            },
            {
              fromUserId: me.id
            }
          ]
        },
        include: {
          fromUser: true,
          toUser: true
        },
        distinct: ['fromUserId', 'toUserId'],
        orderBy: {
          createdAt: 'desc'
        }
      })
    )
      .map(e => {
        return {
          ...e,
          userId: e.toUserId === me.id ? e.fromUserId : e.toUserId,
          user: e.toUserId === me.id ? e.fromUser : e.toUser
        }
      })
      .map(e => {
        return {
          avatar: (e.user.avatar as string) || '',
          name: e.user.username || '',
          content: e.content,
          fromUserId: e.fromUserId,
          id: e.id,
          readAt: e.readAt,
          createdAt: e.createdAt,
          updatedAt: e.updatedAt,
          status: 'offline',
          toUserId: e.toUserId,
          unseenMsgs: 0,
          userId: e.userId
        }
      })
      .sort((a, b) => a.userId - b.userId)
      .map(e => {
        const searched = unseenMsgs.find(e_ => e_.fromUserId === e.userId)

        return {
          ...e,
          unseenMsgs: searched ? searched._count.id : 0,

          status: 'offline'
        }
      })
      .reduce((prev: LastChatObj[], current) => {
        const index = prev.findIndex(e => e.userId === current.userId)
        if (index > -1) {
          if (current.createdAt.getTime() > prev[index].createdAt.getTime())
            prev.splice(index, 1, current as LastChatObj)
        } else {
          prev.push(current as LastChatObj)
        }

        return prev
      }, [])
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

    res.status(200).json({ chats: lastMessages })
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
}

export default withAuth(handler)
