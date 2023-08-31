// ** React Imports
import { createContext, ReactNode, useEffect, useState } from 'react'

import Pusher, { Channel, Members } from 'pusher-js'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { pushNotification } from 'src/store/apps/notification'
import { NotificationObj } from 'src/types/apps/notificationTypes'
import { useAuth } from 'src/hooks/useAuth'
import notify from 'src/views/components/notification/Notification'
import { pushMessage, setPresenceMembers, addPresenceMember, removePresenceMember } from 'src/store/apps/chat'
import { UserDataType } from './types'
import { getCookie } from 'src/lib/cookies'

type PusherContextState = {
  notification: Channel | null
  chat: Channel | null
  sendNotification: (body: NotificationObj) => void
}

export const PusherContext = createContext<PusherContextState>({
  notification: null,
  chat: null,
  sendNotification: () => {}
})

type Props = {
  children: ReactNode
}

export const PusherProvider = ({ children }: Props) => {
  setTimeout(async () => {})
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useAuth()

  const [notification, setNotification] = useState<Channel | null>(null)
  const [chat, setChat] = useState<Channel | null>(null)
  const [pusher, setPusher] = useState<Pusher | null>(null)

  useEffect(() => {
    const authToken = getCookie('access_token')
    if (user === null || notification !== null || !authToken) return

    const pusher = new Pusher(process.env.PUSHER_APP_KEY as string, {
      cluster: process.env.PUSHER_APP_CLUSTER,
      forceTLS: true,
      authEndpoint: '/api/pusher/auth',
      auth: {
        headers: { ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}) }
      }
    })
    setPusher(pusher)

    const notification_ = pusher.subscribe(`private-user-${user?.id}`)
    const chat_ = pusher.subscribe('presence-chat')

    notification_.bind('notification', (payload: NotificationObj) => {
      dispatch(pushNotification(payload))
      notify(payload)
    })

    notification_.bind('message', payload => {
      dispatch(pushMessage(payload))
    })

    chat_.bind('pusher:subscription_succeeded', (members: Members) => {
      dispatch(setPresenceMembers(Object.values(members.members).map(e => (e as UserDataType).id)))
    })

    chat_.bind('pusher:member_added', member => {
      dispatch(addPresenceMember(parseInt(member.user_id)))
    })

    chat_.bind('pusher:member_removed', member => {
      dispatch(removePresenceMember((member.info as UserDataType).id))
    })

    setNotification(notification_)
    setChat(chat_)
  }, [user, notification, dispatch])

  useEffect(() => {
    return () => {
      if (pusher && user) {
        pusher.unsubscribe(`private-user-${user?.id}`)
        pusher.unsubscribe('presence-chat')
        pusher.disconnect()
      }
    }
  }, [])

  const sendNotification = () => {}

  const values = {
    notification,
    chat,
    sendNotification
  }

  return <PusherContext.Provider value={values}>{children}</PusherContext.Provider>
}
