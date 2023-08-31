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
import { Bitcoin } from 'mdi-material-ui'
import { PlusCircle } from 'mdi-material-ui'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { ethers } from 'ethers'

import Avatar from 'src/@core/components/mui/avatar'
import { useAuth } from 'src/hooks/useAuth'
import { formatBalance } from 'src/lib/utils/format'
import { getUSDCBalance } from 'src/lib/contracts/functions'

import { magic } from 'src/lib/magic/magic-client'

const StyledTypography = styled(Typography)(() => ({
  color: colors.grey[900]
}))

export const CardInvesting = () => {
  const router = useRouter()
  const { user, userBalance } = useAuth()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleAddMoney = () => {}
  const handleViewCrypto = () => {}

  const handleClickTest = async () => {
    if (!magic) return

    const provider = new ethers.providers.Web3Provider(
      magic.rpcProvider as unknown as ethers.providers.ExternalProvider
    )
    const signer = await provider.getSigner()
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
              Crypto Assets
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
            Masma Balance
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
            <Button size='small' variant='contained' onClick={handleAddMoney}>
              Add Money
            </Button>
          </Box>
        </Box>
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
            Crypto Assets
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
            <Button size='small' variant='contained' onClick={handleViewCrypto}>
              View Crypto
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
