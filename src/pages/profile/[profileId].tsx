// ** Demo Components Imports
import { useRouter } from 'next/router'
import FallbackSpinner from 'src/@core/components/spinner'
import { useAuth } from 'src/hooks/useAuth'
import OtherProfile from 'src/views/apps/profile/OtherProfile'

import UserProfile from 'src/views/apps/profile/UserProfile'

const Profile = () => {
  const router = useRouter()
  const { profileId } = router.query

  const { user } = useAuth()

  if (user?.profileId === profileId) return <UserProfile />

  if (profileId) return <OtherProfile profileId={profileId as string} />

  return <FallbackSpinner />
}

export default Profile
