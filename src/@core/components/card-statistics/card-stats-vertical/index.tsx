// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import CartPlus from 'mdi-material-ui/ArrowTopRight'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

// ** Types Imports
import { CardStatsVerticalProps } from 'src/@core/components/card-statistics/types'

// ** State Imports
import { useRouter } from 'next/router'

const CardStatsVertical = (props: CardStatsVerticalProps) => {
  // ** Props
  const { title, color, icon, stats, trend, trendNumber } = props

  const TrendIcon = trend === 'positive' ? ChevronUp : ChevronDown
  const router = useRouter()

  const handleGoSendFunds = () => {
    router.replace('/send-funds')
  }
  const handleGoRecieveFunds = () => {
    router.replace('/recieve-funds')
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 3, width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <CustomAvatar skin='light' variant='rounded' color={color}>
            {icon}
          </CustomAvatar>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='subtitle2' sx={{ color: trend === 'positive' ? 'success.main' : 'error.main' }}>
              {trendNumber}
            </Typography>
            <TrendIcon fontSize='small' sx={{ color: trend === 'positive' ? 'success.main' : 'error.main' }} />
          </Box>
        </Box>
        <Typography variant='body1' fontSize={24} sx={{ mb: 1 }}>
          {stats}
        </Typography>
        <Typography variant='h4' sx={{ mb: 5 }}>
          {title}
        </Typography>
        <Grid container mt={3}>
          <Grid item flex={1} onClick={handleGoSendFunds}>
            <CustomAvatar skin='light' variant='rounded' color={color}>
              <CartPlus sx={{ color: '#142C8E' }} />
            </CustomAvatar>
            <Typography>Top-up</Typography>
          </Grid>
          <Grid item flex={1} onClick={handleGoSendFunds}>
            <CustomAvatar skin='light' variant='rounded' color={color}>
              <CartPlus sx={{ color: '#142C8E' }} />
            </CustomAvatar>
            <Typography>Send</Typography>
          </Grid>
          <Grid item flex={1} onClick={handleGoRecieveFunds}>
            <CustomAvatar skin='light' variant='rounded' color={color}>
              <CartPlus sx={{ color: '#142C8E' }} />
            </CustomAvatar>
            <Typography>Receive</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CardStatsVertical

CardStatsVertical.defaultProps = {
  color: 'primary',
  trend: 'positive'
}
