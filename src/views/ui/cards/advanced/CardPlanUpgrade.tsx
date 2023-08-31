// ** React Imports
import { useState, SyntheticEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import ArrowRight from 'mdi-material-ui/ArrowRight'
import StarOutline from 'mdi-material-ui/StarOutline'
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Hooks Imports
import useBgColor from 'src/@core/hooks/useBgColor'

const CardPlanUpgrade = () => {
  // ** States
  const [cvc1, setCvc1] = useState<number | string>('')
  const [cvc2, setCvc2] = useState<number | string>('')

  // ** Hook
  const colorClasses = useBgColor()

  return (
    <Card>
      <CardHeader
        title='Upgrade Your Plan'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options'>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent>
        <Typography component='p' variant='caption' sx={{ mb: 3.5 }}>
          Please make the payment to start enjoying all the features of our premium plan as soon as possible.
        </Typography>

        <Box
          sx={{
            mb: 3.5,
            borderRadius: 1,
            color: 'text.primary',
            p: theme => theme.spacing(2.75, 3.5),
            backgroundColor: colorClasses.primaryLight.backgroundColor
          }}
        >
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <Avatar
              variant='rounded'
              sx={{
                mr: 3,
                width: 40,
                height: 40,
                backgroundColor: 'transparent',
                border: theme => `2px solid ${theme.palette.primary.main}`
              }}
            >
              <StarOutline sx={{ color: 'primary.main' }} />
            </Avatar>

            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ fontWeight: 600 }}>Platinum</Typography>
                <Typography
                  href='/'
                  component={Link}
                  variant='caption'
                  sx={{ color: 'primary.main' }}
                  onClick={(e: SyntheticEvent) => e.preventDefault()}
                >
                  Upgrade Plan
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography
                  component='sup'
                  variant='body2'
                  sx={{ mt: 0.5, color: 'text.primary', alignSelf: 'flex-start' }}
                >
                  $
                </Typography>
                <Typography variant='h5'>2,199</Typography>
                <Typography component='sub' variant='body2' sx={{ alignSelf: 'flex-end' }}>
                  /Year
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Typography variant='body2' sx={{ mb: 4, fontWeight: 600, fontSize: '0.875rem' }}>
          Payment details
        </Typography>

        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <img width={42} height={30} alt='mastercard' src='/images/cards/logo-mastercard-2.png' />
          <Box
            sx={{
              ml: 3,
              flexGrow: 1,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ mr: 2, display: 'flex', mb: 0.4, flexDirection: 'column' }}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                Credit card
              </Typography>
              <Typography variant='caption'>2566 xxxx xxxx 8908</Typography>
            </Box>
            <TextField
              label='CVC'
              size='small'
              value={cvc1}
              type='number'
              sx={{ width: 80, mt: 0.4 }}
              onChange={e =>
                e.target.value.length > 3
                  ? setCvc1(parseInt(e.target.value.slice(0, 3)))
                  : setCvc1(parseInt(e.target.value))
              }
            />
          </Box>
        </Box>

        <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
          <img width={42} height={30} alt='credit-card' src='/images/cards/logo-credit-card-2.png' />
          <Box
            sx={{
              ml: 3,
              flexGrow: 1,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ mr: 2, display: 'flex', mb: 0.4, flexDirection: 'column' }}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                Credit card
              </Typography>
              <Typography variant='caption'>8990 xxxx xxxx 6852</Typography>
            </Box>
            <TextField
              label='CVC'
              size='small'
              value={cvc2}
              type='number'
              sx={{ width: 80, mt: 0.4 }}
              onChange={e =>
                e.target.value.length > 3
                  ? setCvc2(parseInt(e.target.value.slice(0, 3)))
                  : setCvc2(parseInt(e.target.value))
              }
            />
          </Box>
        </Box>

        <Typography
          href='/'
          component={Link}
          variant='caption'
          sx={{ color: 'primary.main' }}
          onClick={(e: SyntheticEvent) => e.preventDefault()}
        >
          Add Payment Method
        </Typography>

        <TextField
          fullWidth
          size='small'
          label='Email Address'
          sx={{ mt: 2.75, mb: 3.5 }}
          placeholder='john.doe@email.com'
        />
        <Button fullWidth variant='contained' endIcon={<ArrowRight />}>
          Proceed to payment
        </Button>
      </CardContent>
    </Card>
  )
}

export default CardPlanUpgrade
