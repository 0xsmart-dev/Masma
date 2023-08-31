// ** React Imports
import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

const Error404 = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/coming-soon')
  })

  return null

}

Error404.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Error404
