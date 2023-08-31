// ** Types
import { Dispatch } from 'redux'
import { ThemeColor } from 'src/@core/layouts/types'
import { UserDataType } from 'src/context/types'

export type StatusType = 'busy' | 'away' | 'online' | 'offline'

export type StatusObjType = {
  busy: ThemeColor
  away: ThemeColor
  online: ThemeColor
  offline: ThemeColor
}

export type MsgFeedbackType = {
  isSent: boolean
  isSeen: boolean
  isDelivered: boolean
}

export type ChatType = {
  message: string
  senderId: number
  time: Date | string
  feedback: MsgFeedbackType
}

export type ChatsObj = {
  id: number
  userId: number
  chat: ChatType[]
  unseenMsgs: number
  lastMessage?: ChatType
}

export type ChatsArrType = {
  id: number
  fromUserId: number
  toUserId: number
  content: string
  createdAt: Date
  updatedAt: Date
  readAt: Date | null
  userId: number
  unseenMsgs: number
  avatar?: string
  name: string
  status: StatusType
}

export type MessageObj = {
  id: number | string
  fromUserId: number
  toUserId: number
  content: string
  createdAt: string
  updatedAt: string
  readAt: string
}

export type SelectedChatType = null | {
  messages: MessageObj[]
  contact: UserDataType
}

export type SendMsgDataType = {
  userId: number
  fromUserId: number
  message: string
}

export type ChatStoreType = {
  chats: ChatsArrType[] | null
  contacts: UserDataType[] | null
  selectedChat: SelectedChatType
  totalUnreadMsgs: number
  presenceMembers: number[]
}

export type SendMsgParamsType = {
  chat?: ChatsObj
  message: string
  contact?: ChatsArrType
}

export type ChatContentType = {
  hidden: boolean
  mdAbove: boolean
  store: ChatStoreType
  sidebarWidth: number
  dispatch: Dispatch<any>
  statusObj: StatusObjType
  userProfileRightOpen: boolean
  handleLeftSidebarToggle: () => void
  getInitials: (val: string) => string

  // sendMsg: (params: SendMsgParamsType) => void
  handleUserProfileRightSidebarToggle: () => void
}

export type ChatSidebarLeftType = {
  hidden: boolean
  mdAbove: boolean
  store: ChatStoreType
  sidebarWidth: number
  userStatus: StatusType
  dispatch: Dispatch<any>
  leftSidebarOpen: boolean
  statusObj: StatusObjType
  userProfileLeftOpen: boolean
  removeSelectedChat: () => void
  selectChat: (id: number) => void
  handleLeftSidebarToggle: () => void
  getInitials: (val: string) => string
  setUserStatus: (status: StatusType) => void
  handleUserProfileLeftSidebarToggle: () => void
  formatDateToMonthShort: (value: Date, toTimeForCurrentDay: boolean) => void
}

export type UserProfileLeftType = {
  hidden: boolean
  store: ChatStoreType
  sidebarWidth: number
  userStatus: StatusType
  statusObj: StatusObjType
  userProfileLeftOpen: boolean
  setUserStatus: (status: StatusType) => void
  handleUserProfileLeftSidebarToggle: () => void
}

export type UserProfileRightType = {
  hidden: boolean
  store: ChatStoreType
  sidebarWidth: number
  statusObj: StatusObjType
  userProfileRightOpen: boolean
  getInitials: (val: string) => string
  handleUserProfileRightSidebarToggle: () => void
}

export type SendMsgComponentType = {
  store: ChatStoreType
  dispatch: Dispatch<any>

  // sendMsg: (params: SendMsgParamsType) => void
}

export type ChatLogType = {
  hidden: boolean
  data: {
    chat: ChatsObj
    contact: UserDataType
  }
}

export type MessageType = {
  time: string | Date
  message: string
  senderId: number
  feedback: MsgFeedbackType
}

export type ChatLogChatType = {
  msg: string
  time: string | Date

  // feedback: MsgFeedbackType
}

export type FormattedChatsType = {
  fromUserId: number
  messages: ChatLogChatType[]
}

export type MessageGroupType = {
  fromUserId: number
  messages: ChatLogChatType[]
}
