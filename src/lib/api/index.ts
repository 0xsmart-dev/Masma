import { UserDataType, UserFollowingDataType } from 'src/context/types'
import { axiosClient } from '../axios'

export const searchUsers = async (keyword = ''): Promise<Array<UserDataType>> => {
  const response = await axiosClient.get<Array<UserDataType>>('/api/user/search', { params: { keyword } })

  return response.data
}

export const getUserProfile = async (profileId: string): Promise<UserDataType> => {
  const response = await axiosClient.get<UserDataType>(`/api/user/${profileId}`)

  return response.data
}

export const followUser = async (profileId: string): Promise<UserFollowingDataType> => {
  const response = await axiosClient.post(`/api/user/${profileId}/follow`)

  return response.data
}

export const unfollowUser = async (profileId: string): Promise<UserFollowingDataType> => {
  const response = await axiosClient.post(`/api/user/${profileId}/unfollow`)

  return response.data
}

export const getFollowings = async params => {
  const response = await axiosClient.get('/api/user/followings', { params })

  return response.data
}

export const getFollowers = async params => {
  const response = await axiosClient.get('/api/user/followers', { params })

  return response.data
}

export const getOtherFollowings = async (profileId, params) => {
  const response = await axiosClient.get(`/api/user/${profileId}/followings`, { params })

  return response.data
}

export const getOtherFollowers = async (profileId, params) => {
  const response = await axiosClient.get(`/api/user/${profileId}/followers`, { params })

  return response.data
}

export const getActivities = async (params: any = null) => {
  const response = await axiosClient.get('/api/recent-activities', { params })

  return response.data
}

export const updateUser = async data => {
  const response = await axiosClient.put('/api/user/update', data)

  return response.data
}

export const getNotifications = async () => {
  const response = await axiosClient.get('/api/notifications')

  return response.data
}

export const readNotification = async (id: number) => {
  const response = await axiosClient.get(`/api/notification/read?id=${id}`)

  return response.data
}

export const readAllNotification = async () => {
  const response = await axiosClient.get(`/api/notification/readAll`)

  return response.data
}

export const getInvites = async params => {
  const response = await axiosClient.get('/api/invite/getInvites', { params })

  return response.data
}

export const getInviteCode = async () => {
  const response = await axiosClient.get('/api/invite/getInviteCode')

  return response.data
}

export const getMessages = async (id: number) => {
  const response = await axiosClient.get(`/api/message?userId=${id}`)

  return response.data
}

export const sendMessage = async data => {
  const response = await axiosClient.post('/api/message/send', data)

  return response.data
}

export const getChats = async () => {
  const response = await axiosClient.get('/api/message/chats')

  return response.data.chats
}

export const readChat = async (userId: number) => {
  const response = await axiosClient.post('/api/message/read', { userId })

  return response.data.chats
}

export const transferMoney = async ({
  from,
  to,
  amount,
  paymentPurpose
}: {
  from: number | undefined
  to: number | undefined
  amount: number
  paymentPurpose: string
}) => {
  const response = await axiosClient.post('/api/fund/transfer', {
    from,
    to,
    amount,
    paymentPurpose
  })

  return response.data
}

export const getUserTransfers = async (walletAddress: string, page: number, rowsPerPage: number) => {
  const response = await axiosClient.post('/api/fund/transfer/get-transfers', { walletAddress, page, rowsPerPage })

  return response.data
}

export const transferErc20Token = async ({
  to,
  amount,
  symbol,
  paymentPurpose,
  tokenAddress,
  chainId,
  transactionHash
}: {
  to: string
  amount: number
  symbol: string
  paymentPurpose: string
  tokenAddress: string
  chainId: number
  transactionHash: string
}) => {
  const response = await axiosClient.post('/api/fund/transfer/erc20', {
    to,
    amount,
    symbol,
    paymentPurpose,
    tokenAddress,
    chainId,
    transactionHash
  })

  return response.data
}
export default axiosClient
