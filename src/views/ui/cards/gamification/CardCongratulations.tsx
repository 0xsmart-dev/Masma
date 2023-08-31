import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid, { GridProps } from '@mui/material/Grid'

// ** Hook
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import { avatarOrPlaceholder } from 'src/lib/utils'
import { colors } from '@mui/material'

// Styled Grid component
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    order: -1,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  }
}))

const StyledTitle = styled(Typography)(({ theme }) => ({
  color: colors.grey[900],
  [theme.breakpoints.down('md')]: {
    fontSize: 30
  }
}))

const StyledDescription = styled(Typography)(({ theme }) => ({
  color: colors.grey[900],
  [theme.breakpoints.down('md')]: {
    fontSize: 14
  }
}))

const CardCongratulations: React.FC = () => {
  // ** Hook
  const router = useRouter()
  const { user } = useAuth()

  const handleGoProfile = () => {
    router.push(`/profile/${user?.profileId}`)
  }

  return (
    <Card sx={{ position: 'relative', border: 'none' }}>
      <div>
        <CardContent sx={{ p: theme => `${theme.spacing(7, 7.5)} !important`, padding: 15 }}>
          <Grid container spacing={10} width='100%'>
            <Grid item flex={1}>
              <StyledTitle sx={{ mb: 4.5, fontFamily: 'Inter', fontSize: 40 }}>
                Welcome{' '}
                <Box component='span' sx={{ fontWeight: 'bold' }}>
                  {user?.username}
                </Box>
                ! 🎉
              </StyledTitle>
              <StyledDescription sx={{ marginBottom: 7 }}>
                Masma is your first step into Web3. Send
                <br /> money. Follow friends. Discover NFTs. Invest
                <br /> your money. Shop around, and more.
              </StyledDescription>
              <Button onClick={handleGoProfile} variant='contained'>
                Set Up Your Profile
              </Button>
            </Grid>

            <StyledGrid item xs={12} sm={'auto'} sx={{ position: 'relative' }}>
              <img alt='avatar-bg' src='/images/bgs/avatar-bg.png' width={549} />
              <img
                alt='avatar'
                src={avatarOrPlaceholder(user?.avatar)}
                width={189}
                height={184}
                style={{ borderRadius: '10px', position: 'absolute', left: 'calc(50% - 70px)', top: 80 }}
              />
            </StyledGrid>
          </Grid>
        </CardContent>
      </div>
    </Card>
  )
}

export default CardCongratulations
