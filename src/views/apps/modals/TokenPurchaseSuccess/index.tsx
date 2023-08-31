// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// ** MUI Icons
import SuccessIcon from '@mui/icons-material/CheckCircleSharp'

// ** Custom Components
import Avatar from 'src/@core/components/mui/avatar'
// ** Context
import { useAuth } from 'src/hooks/useAuth'
// ** Utils Import
import { avatarOrPlaceholder } from 'src/lib/utils'
import Link from 'next/link'

export const TokenPurchaseSuccess = ({ type, onNext }) => {
  const { user, logout } = useAuth()

  return (
    <>
      <Box
        minWidth={360}
        display='flex'
        alignItems='center'
        flexDirection='column'
        sx={{ color: 'black' }}
        paddingY={10}
      >
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' marginBottom={4}>
          <Avatar alt={user?.username} sx={{ width: 60, height: 60 }} src={avatarOrPlaceholder(user?.avatar)} />
          <Typography color='black' sx={{ marginTop: 1 }}>
            {user?.username}
          </Typography>
          <Typography color='black' sx={{ marginTop: 3 }}>
            {type === 'buy' && (
              <>
                You bought <b>$50.00 BTC</b>
              </>
            )}
            {type === 'sell' && (
              <>
                You sold <b>$50.00 BTC</b>
              </>
            )}
            {type === 'convert' && (
              <>
                You converted <b>$50.00 BTC into $50.00 ETH</b>
              </>
            )}
          </Typography>
          <Typography color='black' fontSize={12}>
            {type === 'convert' ? '(0.0043 BTC = 0.40 ETH)' : '(0.0043 BTC)'}
          </Typography>
        </Box>
        <SuccessIcon sx={{ width: 120, height: 120, color: 'green' }} />
        <Card sx={{ width: '100%', marginTop: 8 }}>
          <CardContent>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <Box width='50%' borderRight='1px solid'>
                <Typography color='black' fontSize={14} fontWeight={700}>
                  {type === 'buy' ? 'Paid with' : type === 'sell' ? 'Adding to' : 'Paid with'}
                </Typography>
                <Typography color='black' fontSize={14} fontWeight={700}>
                  Masma Balance
                </Typography>
              </Box>
              <Box>
                <Typography color='black' fontSize={12} fontWeight={700}>
                  Total:
                </Typography>
                <Typography color='black' fontSize={12}>
                  $51.50 USD
                </Typography>
              </Box>
            </Box>
            <Box mt={10}>
              <Typography color='black' fontSize={12} fontWeight={700}>
                Transaction details
              </Typography>
              <Typography color='black' fontSize={12}>
                Receipt number: H439FK88FS
              </Typography>
              <Typography color='black' fontSize={12}>
                We'll send a confirmation to:
              </Typography>
              <Typography color='black' fontSize={12}>
                {user?.email}
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Button variant='contained' sx={{ marginTop: 4, width: 200 }} onClick={onNext}>
          Return back
        </Button>
      </Box>
    </>
  )
}
