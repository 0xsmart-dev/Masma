import { useRouter } from 'next/router'
import { ReactNode } from 'react'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Register from './'

const RegisterInviteCode = () => {
  const router = useRouter()
  const { inviteCode } = router.query

  return <Register inviteCode={inviteCode} />
}

RegisterInviteCode.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

RegisterInviteCode.guestGuard = true

export default RegisterInviteCode
