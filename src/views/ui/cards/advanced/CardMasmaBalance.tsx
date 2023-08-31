// ** Next Import
import { useRouter } from 'next/router'

// ** MUI imports
import {
  Box,
  Button,
  Card,
  CardContent,
  colors,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
  Grid,
  CardHeader,
  Skeleton
} from '@mui/material'
import { PlusCircle } from 'mdi-material-ui'

import { ethers } from 'ethers'

import Avatar from 'src/@core/components/mui/avatar'
import { useAuth } from 'src/hooks/useAuth'
import { formatBalance } from 'src/lib/utils/format'
import { magic } from 'src/lib/magic/magic-client'

const StyledTypography = styled(Typography)(() => ({
  color: colors.grey[900]
}))

export const CardMasmaBalance = ({ setModalStatus }) => {
  const router = useRouter()
  const { user, userBalance } = useAuth()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleGoWallet = () => {
    router.push('/wallet')
  }
  const handleGoSendFunds = () => {
    router.replace('/send-funds')
  }

  return isMobile ? (
    <div>
      <Card sx={{ padding: '20px', boxShadow: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Avatar alt='avatar' src='/images/logo.png' sx={{ width: 65, height: 65, boxShadow: 10, padding: 3 }} />
          </Grid>
          <Grid item xs={9}>
            <Typography color='black' fontWeight='bold' fontSize='26px' alignItems='left' display={'flex'}>
              ${formatBalance(userBalance)}
            </Typography>
            <Typography fontSize='16px' alignItems='left'>
              Masma Balance
            </Typography>
          </Grid>
        </Grid>
      </Card>
      {/* <Card
        sx={{
          border: 'none',
          flex: 1,
          marginTop: '1rem'
        }}
      >
        <CardHeader sx={{ paddingTop: '1.5rem' }} title='Shortcuts' />
        <Box sx={{ display: 'flex' }}>
          <Button size='small' variant='text' onClick={handleGoSendFunds}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <Avatar
                sx={{ width: 60, height: 60, boxShadow: 16, padding: 3, alignItems: 'center' }}
                src='/images/icons/send-to-mobile.svg'
              />
              <StyledTypography textTransform={'capitalize'} fontSize={12}>
                Send Money
              </StyledTypography>
            </Box>
          </Button>
          <Button size='small' variant='text' onClick={() => setModalStatus(true)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <Box sx={{ width: 60, height: 60, borderRadius: '50%', boxShadow: 16, padding: 3, alignItems: 'center' }}>
                <PlusCircle fontSize='large' color='secondary' />
              </Box>
              <StyledTypography textTransform={'capitalize'} fontSize={12}>
                Deposit Funds
              </StyledTypography>
            </Box>
          </Button>
        </Box>
      </Card> */}
      <Card sx={{ padding: '20px', boxShadow: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Avatar alt='avatar' src='/images/logo.png' sx={{ width: 65, height: 65, boxShadow: 10, padding: 3 }} />
          </Grid>
          <Grid item xs={9}>
            <Typography color='black' fontWeight='bold' fontSize='26px' alignItems='left' display={'flex'}>
              ${formatBalance(userBalance)}
            </Typography>
            <Typography fontSize='16px' alignItems='left'>
              Crypto Balance
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </div>
  ) : (
    <Card sx={{ p: theme => `${theme.spacing(7, 7.5)} !important` }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box
          flex={1}
          sx={{
            borderRight: '1px solid rgba(76, 78, 100, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            paddingBottom: 'none'
          }}
        >
          <StyledTypography variant='h6' sx={{ fontWeight: '600' }}>
            Masma balance
          </StyledTypography>
          <Box>
            <StyledTypography variant='body1' sx={{ fontSize: 40, lineHeight: 1.2, textAlign: 'center' }}>
              ${formatBalance(userBalance)}
            </StyledTypography>
            <StyledTypography variant='body2' sx={{ fontSize: 14, marginBottom: 3 }}>
              Available to spend
            </StyledTypography>
          </Box>
          <Box>
            <Button size='small' variant='contained' onClick={handleGoWallet}>
              View Wallet
            </Button>
          </Box>
        </Box>
        {/* <Box
          flex={1}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 'none'
          }}
        >
          <StyledTypography variant='h6' sx={{ fontWeight: '600', marginBottom: 4 }}>
            Shortcuts
          </StyledTypography>
          <Box sx={{ display: 'flex' }}>
            <Button size='small' variant='text' onClick={handleGoSendFunds} sx={{ marginRight: '15px' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <Avatar
                  sx={{ width: 50, height: 50, boxShadow: 16, padding: 3 }}
                  src='/images/icons/send-to-mobile.svg'
                />
                <StyledTypography textTransform={'capitalize'} fontSize={14}>
                  Send Money
                </StyledTypography>
              </Box>
            </Button>
            <Button size='small' variant='text' onClick={() => setModalStatus(true)} sx={{ marginLeft: '15px' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <Box sx={{ width: 50, height: 50, borderRadius: '50%', boxShadow: 16, padding: 3 }}>
                  <PlusCircle fontSize='medium' color='secondary' />
                </Box>
                <StyledTypography textTransform={'capitalize'} fontSize={14}>
                  Deposit Funds
                </StyledTypography>
              </Box>
            </Button>
          </Box>
        </Box> */}
        <Box
          flex={1}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            paddingBottom: 'none'
          }}
        >
          <StyledTypography variant='h6' sx={{ fontWeight: '600' }}>
            Crypto balance
          </StyledTypography>
          <Box>
            <StyledTypography variant='body1' sx={{ fontSize: 40, lineHeight: 1.2, textAlign: 'center' }}>
              ${formatBalance(userBalance)}
            </StyledTypography>
            <StyledTypography variant='body2' sx={{ fontSize: 14, marginBottom: 3 }}>
              Current value
            </StyledTypography>
          </Box>
          <Box>
            <Button size='small' variant='contained' onClick={handleGoWallet}>
              Buy & Sell
            </Button>
            {/* <Button size='small' variant='contained' onClick={handleClickTest}>
              Test
            </Button> */}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
