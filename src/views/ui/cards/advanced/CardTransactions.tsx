// ** React Imports
import { ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

interface DataType {
  title: string
  imgAlt: string
  imgSrc: string
  amount: string
  trend: ReactNode
  subtitle: string
  imgWidth: number
  imgHeight: number
  avatarColor: ThemeColor
}

const data: DataType[] = [
  {
    imgHeight: 18,
    imgWidth: 22.5,
    amount: '-$850',
    title: 'Credit Card',
    imgAlt: 'credit-card',
    avatarColor: 'success',
    subtitle: 'Digital Ocean',
    imgSrc: '/images/cards/credit-card.png',
    trend: <ChevronDown sx={{ color: 'error.main' }} />
  },
  {
    imgWidth: 17,
    title: 'Paypal',
    imgHeight: 18.4,
    imgAlt: 'paypal',
    amount: '+$34,456',
    avatarColor: 'primary',
    subtitle: 'Received Money',
    imgSrc: '/images/cards/paypal.png',
    trend: <ChevronUp sx={{ color: 'success.main' }} />
  },
  {
    imgHeight: 18,
    imgWidth: 22.5,
    amount: '-$199',
    title: 'Mastercard',
    subtitle: 'Netflix',
    avatarColor: 'info',
    imgAlt: 'mastercard',
    imgSrc: '/images/cards/mastercard.png',
    trend: <ChevronDown sx={{ color: 'error.main' }} />
  },
  {
    imgWidth: 20,
    imgHeight: 18,
    title: 'Wallet',
    amount: '-$156',
    imgAlt: 'wallet',
    subtitle: "Mac'D",
    avatarColor: 'error',
    imgSrc: '/images/cards/wallet.png',
    trend: <ChevronDown sx={{ color: 'error.main' }} />
  },
  {
    imgWidth: 17,
    title: 'Paypal',
    imgHeight: 18.4,
    imgAlt: 'paypal',
    amount: '+$12,872',
    subtitle: 'Refund',
    avatarColor: 'primary',
    imgSrc: '/images/cards/paypal.png',
    trend: <ChevronUp sx={{ color: 'success.main' }} />
  },
  {
    imgHeight: 18,
    imgWidth: 22.8,
    title: 'Stripe',
    amount: '-$299',
    imgAlt: 'stripe',
    avatarColor: 'warning',
    subtitle: 'Buy Apple Watch',
    imgSrc: '/images/cards/stripe.png',
    trend: <ChevronDown sx={{ color: 'error.main' }} />
  }
]

const CardTransactions = () => {
  return (
    <Card>
      <CardHeader
        title='Transactions'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options'>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent>
        {data.map((item: DataType, index: number) => {
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: index !== data.length - 1 ? 7 : undefined
              }}
            >
              <CustomAvatar skin='light' color={item.avatarColor} variant='rounded' sx={{ mr: 3 }}>
                <img alt={item.imgAlt} src={item.imgSrc} width={item.imgWidth} height={item.imgHeight} />
              </CustomAvatar>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                    {item.title}
                  </Typography>
                  <Typography variant='caption'>{item.subtitle}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant='body2' sx={{ mr: 1.5, fontWeight: 600, color: 'text.primary' }}>
                    {item.amount}
                  </Typography>
                  {item.trend}
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default CardTransactions
