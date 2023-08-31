// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import { getCookie } from 'src/lib/cookies'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props
  const router = useRouter()
  const { user, loading } = useAuth()

  const redirectForSignedUser = async () => {
    const accessToken = getCookie('access_token')
    if (!user || !accessToken) return

    const returnUrl = router.query.returnUrl
    const redirectUrl = returnUrl && returnUrl !== '/' ? returnUrl : '/'
    router.replace(redirectUrl as string)
  }

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    redirectForSignedUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route, loading, user])

  if (loading) {
    return fallback
  }

  return <>{children}</>
}

export default GuestGuard
