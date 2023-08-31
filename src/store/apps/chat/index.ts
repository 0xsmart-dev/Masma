// ** Redux Imports
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { Chat } from 'mdi-material-ui'
import moment from 'moment'

// ** Types
import { UserDataType } from 'src/context/types'
import { getMessages, sendMessage, readChat as readChat_ } from 'src/lib/api'
import { ChatsArrType, ChatStoreType, MessageObj, SendMsgDataType, StatusType } from 'src/types/apps/chatTypes'

// ** Fetch Chats & Contacts
export const fetchChatsContacts = createAsyncThunk('appChat/fetchChatsContacts', async () => {
  const response = await axios.get('/apps/chat/chats-and-contacts')

  return response.data
})

export const selectChat = createAsyncThunk('appChat/selectChat', async (id: number) => {
  const response = await getMessages(id)

  return response
})

export const sendMsg = createAsyncThunk('appChat/sendMsg', async (data: SendMsgDataType) => {
  const response = await sendMessage(data)

  return response.message
})

export const readChat = createAsyncThunk('appChat/readChat', async (userId: number) => {
  await readChat_(userId)

  return userId
})

const initialState: ChatStoreType = {
  selectedChat: null,
  contacts: [],
  chats: [],
  totalUnreadMsgs: 0,
  presenceMembers: []
}

const addChat = (state, msg, contact) => {
  if (state.chats === null) state.chats = []
  const status = state.presenceMembers.includes(contact.id) ? 'online' : 'offline'
  state.chats?.push({
    id: msg.id as number,
    fromUserId: msg.fromUserId,
    toUserId: msg.toUserId,
    content: msg.content,
    createdAt: new Date(msg.createdAt),
    updatedAt: new Date(msg.updatedAt),
    readAt: msg.readAt ? new Date(msg.readAt) : null,
    userId: contact.id,
    unseenMsgs: msg.fromUserId === contact.id ? 1 : 0,
    avatar: contact.avatar,
    name: contact.name as string,
    status: status
  })
  const index = state.contacts.findIndex(e => e.id === contact.id)
  if (index > -1) state.contacts.splice(index, 1)
}

const updateChat = (state, chat, msg) => {
  const index = state.chats.findIndex(e => e.id === chat.id)
  if (index > -1) {
    state.chats.splice(index, 1, {
      ...chat,
      unseenMsgs: chat.unseenMsgs + 1,
      content: msg.content,
      id: msg.id as number,
      createdAt: new Date(msg.createdAt),
      updatedAt: new Date(msg.updatedAt),
      readAt: msg.readAt ? null : new Date(msg.readAt)
    })
  }
}

const sortChat = state => {
  if (state.chats != null && state.chats.length > 0) {
    state.chats = state.chats.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }
}

const updateChatStatus = state => {
  state.chats = state.chats.map(e => {
    const status = state.presenceMembers.includes(e.userId) ? 'online' : 'offline'

    return {
      ...e,
      status
    }
  })
}

export const appChatSlice = createSlice({
  name: 'appChat',
  initialState,
  reducers: {
    removeSelectedChat: state => {
      state.selectedChat = null
    },
    pushMessage: (state, action: PayloadAction<MessageObj>) => {
      if (state.selectedChat && state.selectedChat.contact.id === action.payload.fromUserId) {
        state.selectedChat.messages.push(action.payload)
      }
      if (state.chats && state.chats.length > 0) {
        const chat = state.chats?.find(e => e.userId === action.payload.fromUserId)
        if (chat) {
          updateChat(state, chat, action.payload)
        } else {
          const contact = state.contacts?.find(e => e.id === action.payload.fromUserId)
          if (contact) addChat(state, action.payload, contact)
        }
        sortChat(state)
      }
    },
    setContacts: (state, action: PayloadAction<UserDataType[]>) => {
      state.contacts = action.payload
    },
    setPresenceMembers: (state, action: PayloadAction<number[]>) => {
      state.presenceMembers = action.payload
      updateChatStatus(state)
    },
    addPresenceMember: (state, action: PayloadAction<number>) => {
      if (!state.presenceMembers.includes(action.payload)) state.presenceMembers.push(action.payload)
      updateChatStatus(state)
    },
    removePresenceMember: (state, action: PayloadAction<number>) => {
      const index = state.presenceMembers.indexOf(action.payload)
      if (index > -1) state.presenceMembers.splice(index, 1)
      updateChatStatus(state)
    },
    setChats: (state, action: PayloadAction<ChatsArrType[]>) => {
      state.chats = action.payload
      updateChatStatus(state)
    },
    setTotalUnreadMsgs: (state, action: PayloadAction<number>) => {
      state.totalUnreadMsgs = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(selectChat.fulfilled, (state, action) => {
      state.selectedChat = action.payload
      if (state.chats === null || !state.chats.find(e => e.userId === state.selectedChat?.contact.id)) {
        const lastMsg = state.selectedChat?.messages[state.selectedChat?.messages.length - 1]
        if (lastMsg) {
          addChat(state, lastMsg, state.selectedChat?.contact)
        }
      }
      sortChat(state)
    })
    builder.addCase(sendMsg.pending, (state, action) => {
      if (state.selectedChat) {
        state.selectedChat.messages.push({
          id: action.meta.requestId,
          fromUserId: action.meta.arg.fromUserId,
          toUserId: action.meta.arg.userId,
          content: action.meta.arg.message,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          readAt: ''
        })
      }
    })
    builder.addCase(sendMsg.fulfilled, (state, action) => {
      if (state.selectedChat) {
        const message = state.selectedChat.messages.find(e => e.id === action.meta.requestId)
        if (message) {
          message.id = action.payload.id
          if (state.chats && state.chats.length > 0) {
            const chat = state.chats?.find(e => e.userId === action.payload.toUserId)
            if (chat) {
              updateChat(state, chat, message)
            } else {
              const contact = state.contacts?.find(e => e.id === action.payload.toUserId)
              addChat(state, message, contact)
            }
          }
        }
      }
      sortChat(state)
    })
    builder.addCase(readChat.fulfilled, (state, action) => {
      if (state.chats && state.chats.length > 0) {
        const chat = state.chats?.find(e => e.userId === action.payload)
        if (chat) chat.unseenMsgs = 0
      }
    })
  }
})

export const {
  removeSelectedChat,
  pushMessage,
  setContacts,
  setChats,
  setTotalUnreadMsgs,
  setPresenceMembers,
  addPresenceMember,
  removePresenceMember
} = appChatSlice.actions

export default appChatSlice.reducer
