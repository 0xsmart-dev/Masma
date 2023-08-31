// ** React Imports
import { createContext, useEffect, useState, ReactNode, useCallback } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, UserDataType } from './types'

import { axiosClient } from 'src/lib/axios'
import { removeCookie } from 'src/lib/cookies'
import { magic } from 'src/lib/magic/magic-client'
import { getUSDCBalance } from 'src/lib/contracts/functions'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  logout: () => {},
  setIsInitialized: () => Boolean,
  fetchUserProfile: () => Promise.resolve(),
  userBalance: 0,
  setUserBalance: () => {}
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [isInitialized, setIsInitialized] = useState<boolean>(defaultProvider.isInitialized)
  const [userBalance, setUserBalance] = useState(0)

  // ** Hooks
  const router = useRouter()

  const fetchUserProfile = useCallback(async () => {
    setLoading(true)

    try {
      const response = await axiosClient.get(authConfig.meEndpoint)
      setUser(response.data.userData)

      setLoading(false)
    } catch (err: any) {
      console.log(err.message)

      removeCookie('access_token')

      setUser(null)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      await fetchUserProfile()
    }
    initAuth()
  }, [fetchUserProfile])

  const fetchUserBalance = () => {
    if (user && user.smartWalletAddress)
      getUSDCBalance(user.smartWalletAddress).then(val => {
        setUserBalance(val)
      })
  }
  useEffect(() => {
    fetchUserBalance()
  }, [user])

  const handleLogout = () => {
    setUser(null)
    setIsInitialized(false)
    if (magic) {
      magic.user.logout()
    }
    removeCookie('did_token')
    removeCookie('access_token')
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    logout: handleLogout,
    fetchUserProfile,
    userBalance,
    setUserBalance
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
