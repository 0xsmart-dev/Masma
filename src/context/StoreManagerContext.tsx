// ** React Imports
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { useAuth } from 'src/hooks/useAuth'
import { getChats, getUserProfile } from 'src/lib/api'
import { setChats, setContacts, setTotalUnreadMsgs } from 'src/store/apps/chat'
import { UserDataType } from './types'

type Props = {
  children: ReactNode
}

type StoreManagerContextState = {
  fetchChatsAndContacts: () => void
}

const StoreManagerContext = createContext<StoreManagerContextState>({
  fetchChatsAndContacts: () => {}
})

export const StoreManagerProvider = ({ children }: Props) => {
  const { user } = useAuth()
  const dispatch = useDispatch<AppDispatch>()
  const chatStore = useSelector((state: RootState) => state.chat)

  const fetchChatsAndContacts = useCallback(async () => {
    const chats = await getChats()
    dispatch(setChats(chats))

    const contacts: UserDataType[] = []
    if (user?.followings && user?.followings.length > 0) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      for (const e of user?.followings) {
        if (e.user && e.user.profileId) {
          const user_ = await getUserProfile(e.user?.profileId)
          contacts.push(user_)
        }
      }
    }
    if (user?.followers && user?.followers.length > 0) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      for (const e of user?.followers) {
        if (e.follower && e.follower.profileId && !contacts.find(e_ => e_.profileId === e.follower?.profileId)) {
          const user_ = await getUserProfile(e.follower?.profileId)
          contacts.push(user_)
        }
      }
    }

    const contactToShow = contacts.filter(e => {
      return !chats.some(e_ => {
        return e_.userId === e.id
      })
    })
    dispatch(setContacts(contactToShow))
  }, [dispatch, user])

  useEffect(() => {
    let unreadMsgs = 0
    if (chatStore.chats && chatStore.chats.length > 0) {
      unreadMsgs = chatStore.chats.map(chat => chat.unseenMsgs || 0).reduce((prev, curr) => prev + curr, 0)
    }
    dispatch(setTotalUnreadMsgs(unreadMsgs))
  }, [chatStore.chats, dispatch])

  useEffect(() => {
    fetchChatsAndContacts()
  }, [dispatch, fetchChatsAndContacts, user])

  const values = {
    fetchChatsAndContacts
  }

  return <StoreManagerContext.Provider value={values}>{children}</StoreManagerContext.Provider>
}
