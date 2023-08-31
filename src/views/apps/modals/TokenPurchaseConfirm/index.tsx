// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// ** Custom Components
import Avatar from 'src/@core/components/mui/avatar'
// ** Context
import { useAuth } from 'src/hooks/useAuth'
// ** Utils Import
import { avatarOrPlaceholder } from 'src/lib/utils'
import Link from 'next/link'

export const TokenPurchaseConfirm = ({ type = 'buy', onNext, onCancel }) => {
  const { user, logout } = useAuth()

  return (
    <>
      <Box minWidth={360} display='flex' alignItems='center' flexDirection='column' sx={{ color: 'black' }}>
        <Card sx={{ width: '100%' }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Box display='flex' alignItems='center' marginBottom={4}>
              <Avatar alt={user?.username} sx={{ width: 60, height: 60 }} src={avatarOrPlaceholder(user?.avatar)} />
              <Box ml={4}>
                <Typography color='black'>{user?.username}</Typography>
                <Typography fontSize={12} color='blue'>
                  @{user?.username}
                </Typography>
              </Box>
            </Box>
            {type !== 'convert' && (
              <>
                <Typography color='black' fontWeight={700}>
                  $50.00
                </Typography>
                <Typography fontSize={12} color='blue' fontWeight={700}>
                  BTC
                </Typography>
              </>
            )}
            {type === 'convert' && (
              <Box display='flex' columnGap={10}>
                <Box textAlign='center'>
                  <Typography color='black' fontWeight={700}>
                    $50.00
                  </Typography>
                  <Typography fontSize={12} color='blue' fontWeight={700}>
                    BTC
                  </Typography>
                </Box>
                <Box textAlign='center'>
                  <Typography color='black' fontWeight={700}>
                    $50.00
                  </Typography>
                  <Typography fontSize={12} color='blue' fontWeight={700}>
                    ETH
                  </Typography>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
        <Card sx={{ width: '100%', marginTop: 8 }}>
          <CardContent>
            <Box display='flex' justifyContent='space-between'>
              <Typography fontSize={12} color='black'>
                {type === 'buy'
                  ? 'Buying Bitcoin'
                  : type === 'sell'
                  ? 'Selling Bitcoin'
                  : 'Converting Bitcoin to Ethereum'}
              </Typography>
              <Typography fontSize={12} color='blue' fontWeight={700}>
                Public
              </Typography>
            </Box>
            <Divider />
            <Box display='flex' justifyContent='space-between' my={4}>
              <Box display='flex' alignItems='center'>
                <Avatar alt='avatar' src='/images/logo.png' sx={{ width: 40, height: 40 }} />
                <Box>
                  <Typography fontSize={12} color='black' fontWeight={700}>
                    Masma Balance
                  </Typography>
                  <Typography fontSize={12} color='black'>
                    Available $100
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography fontSize={12} color='black' fontWeight={700}>
                  Total:
                </Typography>
                <Typography fontSize={12} color='black'>
                  -51.50 USD
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box display='flex' justifyContent='space-between' mt={4}>
              <Typography fontSize={12} color='black' fontWeight={700}>
                {`You're ${type}ing`}
              </Typography>
              <Typography fontSize={12} color='black' fontWeight={700}>
                0.00443BTC
              </Typography>
            </Box>
            <Box display='flex' justifyContent='space-between'>
              <Typography fontSize={12} color='black'>
                Exchange rate
              </Typography>
              <Typography fontSize={12} color='black'>
                {type !== 'convert' ? '28500 USD = 1 BTC' : '1 BTC = 285 ETH'}
              </Typography>
            </Box>
            <Box display='flex' justifyContent='space-between' mt={4}>
              <Typography fontSize={12} color='black' fontWeight={700}>
                Price
              </Typography>
              <Typography fontSize={12} color='black' fontWeight={700}>
                $50.00
              </Typography>
            </Box>
            <Box display='flex' justifyContent='space-between'>
              <Typography fontSize={12} color='black'>
                Transaction fee
              </Typography>
              <Typography fontSize={12} color='black'>
                $1.50
              </Typography>
            </Box>
            <Box display='flex' justifyContent='space-between' mt={4}>
              <Typography fontSize={12} color='black' fontWeight={700}>
                You'll pay
              </Typography>
              <Typography fontSize={12} color='black' fontWeight={700}>
                $51.50
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Typography fontSize={12} color='black' fontWeight={700} mt={4}>
          For more information, please read <Link href='#'>User Agreement</Link>
        </Typography>
        <Button variant='contained' sx={{ marginTop: 4, width: 200 }} onClick={onNext}>
          {type === 'buy' ? 'Buy now' : type === 'sell' ? 'Sell now' : 'Convert now'}
        </Button>
        <Button variant='text' sx={{ width: 200, marginTop: 1 }} onClick={onCancel}>
          <b>Cancel</b>
        </Button>
      </Box>
    </>
  )
}
