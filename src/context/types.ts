export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
}

export type RegisterParams = {
  email: string
  name: string
  inviteCode: string
}

export type UserFollowingDataType = {
  followings: FollowingDataType[]
  followers: FollowingDataType[]
}

export type FollowingDataType = {
  id: number
  user?: {
    profileId: string
  }
  follower?: {
    profileId: string
  }
  userId?: number
  followerId?: number
}
export type UserDataType = {
  id: number
  role?: string
  email: string
  username: string
  avatar?: string
  profileId: string
  followings: FollowingDataType[]
  followers: FollowingDataType[]
  inviteCount: number
  inviteCode: string
  magicWalletAddress: string
  smartWalletAddress: string
  level: number
  bio: string
  _count?: {
    followings: number
    followers: number
  }
}

export type AuthValuesType = {
  loading: boolean
  setLoading: (value: boolean) => void
  logout: () => void
  isInitialized: boolean
  user: UserDataType | null
  setUser: (value: UserDataType | null) => void
  setIsInitialized: (value: boolean) => void
  fetchUserProfile: () => Promise<any>
  userBalance: number
  setUserBalance: (value: number) => void
}

export enum EmailTemplateType {
  SEND_MONEY = 'SEND_MONEY',
  RECEIVE_MONEY = 'RECEIVE_MONEY',
  FOLLOWED = 'FOLLOWED'
}

export type Erc20Balance =
  | {
      value: string
      token: {
        contractAddress: string
        chain: string
        decimals: number
        name: string
        symbol: string
        logo?: string | null | undefined
        logoHash?: string | null | undefined
        thumbnail?: string | null | undefined
        possibleSpam?: boolean | undefined
      }
    }
  | {
      value: string
      token?: undefined
    }
