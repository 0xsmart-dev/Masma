/* eslint-disable newline-before-return */
// ** MUI Imports
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ImageList from '@mui/material/ImageList'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardCongratulations from 'src/views/ui/cards/gamification/CardCongratulations'
import CardActivityTimeline from 'src/views/ui/cards/advanced/CardActivityTimeline'
import CardMedia from '@mui/material/CardMedia'
import { useEffect, useRef, useState } from 'react'

import { CardMasmaBalance } from 'src/views/ui/cards/advanced/CardMasmaBalance'
import { CardHeader, Skeleton } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { ArrowLeft, ArrowRight } from 'mdi-material-ui'
import { UserDataType } from 'src/context/types'

import api from 'src/lib/api'
import openTransak from 'src/utils/openTransak'

const GridHiddenOnMobile = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const Home = () => {
  const scrollBox = useRef<HTMLUListElement>(null)
  const { user }: { user: UserDataType | null } = useAuth()
  const [popularAccounts, setPopularAccounts] = useState<any[] | undefined>(undefined)

  // ** Hooks
  const router = useRouter()

  /*if we ever want to use wyre again */
  // const [reservationOrderData, setReservation] = useState({ url: '', reservation: '' })
  const handleOpen = () => {
    openTransak(user)
  }

  useEffect(() => {
    if (!user) return

    api.post(`/api/user/popular`).then(res => {
      setPopularAccounts(res.data)
    })
  }, [user])

  return (
    <Grid container spacing={6}>
      <GridHiddenOnMobile item xs={12} md={12}>
        <CardCongratulations />
      </GridHiddenOnMobile>
      <Grid item container spacing={12}>
        <Grid item xs={12}>
          <CardMasmaBalance setModalStatus={handleOpen} />
        </Grid>
        <Grid item xs={12}>
          <CardActivityTimeline setModalStatus={handleOpen} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Card sx={{ border: 'none' }}>
          <CardHeader variant='h6' title='Popular Accounts'></CardHeader>
          <CardContent sx={{ padding: 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                onClick={() => {
                  if (scrollBox != null && scrollBox.current != null) scrollBox.current.scrollLeft -= 500
                }}
              >
                <ArrowLeft />
              </Button>
              <Button
                onClick={() => {
                  if (scrollBox != null && scrollBox.current != null) scrollBox.current.scrollLeft += 500
                }}
              >
                <ArrowRight />
              </Button>
            </Box>
            <ImageList
              className='popular_accounts'
              sx={{
                scrollBehavior: 'smooth',
                gridAutoFlow: 'column',
                gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr)) !important',
                gridAutoColumns: 'minmax(160px, 1fr)',
                paddingBottom: 2,
                overflow: 'hidden'
              }}
              ref={scrollBox}
            >
              {popularAccounts === undefined
                ? [...Array(10)].map((ele, _id) => {
                    return (
                      <Card key={_id} sx={{ width: 150, marginRight: 10, boxShadow: 'none', cursor: 'pointer' }}>
                        <Skeleton variant='rectangular' width={150} height={150} sx={{ borderRadius: '10px' }} />
                        <CardContent sx={{ p: 2 }}>
                          <Typography variant='body2' sx={{ color: '#000', fontWeight: '500' }}>
                            <Skeleton />
                          </Typography>
                          <Typography variant='caption'>
                            <Skeleton />
                          </Typography>
                        </CardContent>
                      </Card>
                    )
                  })
                : popularAccounts.map((user: any, index) => {
                    return (
                      <Card
                        key={index}
                        sx={{ width: 150, marginRight: 10, boxShadow: 'none', cursor: 'pointer' }}
                        onClick={() => router.push(`/profile/${user?.profileId}`)}
                      >
                        <CardMedia sx={{ height: 150, width: 150, borderRadius: 1 }} image={user.avatar} />
                        <CardContent sx={{ p: 2 }}>
                          <Typography variant='body2' sx={{ color: '#000', fontWeight: '500' }}>
                            {user.username}
                          </Typography>
                          <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
                            <Typography variant='caption'>Followers</Typography>
                            <Typography variant='caption'>{user.followers.length}</Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    )
                  })}
            </ImageList>
          </CardContent>
        </Card>
      </Grid>
      {/* <Grid item xs={12}>
        <Typography variant='h6'>Trending Digital Collectibles</Typography>
        <Typography variant='body1' m={3}>
          Coming soon...
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6'>Discover investment opportunities</Typography>
        <Typography variant='body1' m={3}>
          Coming soon...
        </Typography>
      </Grid> */}
    </Grid>
  )
}

export default Home
