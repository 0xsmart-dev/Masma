// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import { getCookie } from 'src/lib/cookies'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const router = useRouter()
  const { loading, user } = useAuth()

  const checkUserLogin = async () => {
    const accessToken = getCookie('access_token')

    if (!accessToken) {
      if (router.asPath !== '/') {
        router.replace({
          pathname: '/login',
          query: { returnUrl: router.asPath }
        })
      } else {
        router.replace('/login')
      }
    }
  }

  useEffect(
    () => {
      if (!router.isReady) {
        return
      }

      checkUserLogin()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route, loading, user]
  )

  if (loading || user === null) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
