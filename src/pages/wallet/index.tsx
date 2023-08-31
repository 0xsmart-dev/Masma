import React, { useMemo } from 'react'
import { Card, Box, Typography, Button, Grid, CardContent, useMediaQuery, useTheme, CardHeader } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import { formatBalance } from 'src/lib/utils/format'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { useRouter } from 'next/router'
import Image from 'next/image'
import CryptoAssetsTable from 'src/layouts/components/CryptoAssetsTable'
import { useEvmWalletTokenBalances } from '@moralisweb3/next'
import { Erc20Balance } from 'src/context/types'

type TCard = {
  id: number
  name: string
  value: number
  flair: { color: string; label: string }
  background: string
  text: string
  img: string
}

export const DesktopBalanceCard = ({
  data,
  active,
  onSelect
}: {
  data: TCard
  active: boolean
  onSelect: (b: number) => void
}) => {
  const { user }: { user: any } = useAuth()
  const { id, flair, img, name, value } = data

  return (
    <Grid item xs={12}>
      <Card
        sx={{
          background: active ? '#fff' : null,
          boxShadow: active ? ' ' : 'none',
          cursor: 'pointer'
        }}
        onClick={() => (name == 'Masma' ? onSelect(id) : null)}
      >
        <CardContent>
          <Box sx={{ display: 'flex' }}>
            <img src={img} width={65} height={65} alt='bank_icon' />
            <Box marginLeft={2}>
              <Typography sx={{ color: active ? '#1072EB' : 'black' }}>{name} Balance</Typography>
              {name == 'Masma' ? (
                <Typography>${formatBalance(user?.balance)} Available</Typography>
              ) : (
                <Typography>${value.toFixed(2)} Available</Typography>
              )}
              <Box
                sx={{
                  borderRadius: '16px',
                  backgroundColor: flair.color,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: 1
                }}
              >
                <Typography variant={'body2'} sx={{ fontSize: '12px', m: 0 }}>
                  {flair.label}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}

const WalletHomeScreen = () => {
  const router = useRouter()

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  const { user, userBalance, fetchUserProfile } = useAuth()
  const { data: balances } = useEvmWalletTokenBalances({
    address: user?.smartWalletAddress as string,
    chain: process.env.NEXT_PUBLIC_CHAIN_ID
  })
  const tokenBalances = useMemo(() => {
    return balances?.map(token => token.toJSON()) || []
  }, [balances])
  let total = 0
  tokenBalances.map((token: Erc20Balance) => {
    total += +token.value
  })

  return (
    <Box>
      <Card
        sx={{
          background: '#fff',
          width: '100%',
          boxShadow: '0 4px 50px rgba(182, 197, 205, 0.3)'
        }}
      >
        <CardContent
          sx={{
            display: 'flex  !important',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            '&:last-child': {
              paddingBottom: 0
            },
            borderRadius: '16px'
          }}
        >
          <Box sx={{ display: 'flex', width: '100%', flexDirection: matches ? 'column' : 'row' }}>
            <Box
              sx={{
                borderRight: matches ? 'none' : '1px solid #E5E5E5',
                borderBottom: matches ? '1px solid #E5E5E5' : 'none',
                padding: '2.5rem',
                [theme.breakpoints.down('md')]: {
                  padding: '1.25rem'
                },
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}
            >
              <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <Image
                  src='/images/logo.png'
                  width={'34px'}
                  height={'34px'}
                  style={{ marginRight: '5px' }}
                  alt={'Logo'}
                />
                <Typography
                  sx={{
                    color: '#142C8E',
                    [theme.breakpoints.down('sm')]: {
                      fontSize: '16px'
                    }
                  }}
                  fontWeight='bold'
                  fontSize={20}
                >
                  Masma Balance
                </Typography>
              </Box>
              <Box display={'flex'} alignItems='center'>
                <Typography fontSize={14} padding='5px'>
                  USD
                </Typography>
                <Typography
                  color='black'
                  fontWeight={'bold'}
                  sx={{
                    [theme.breakpoints.down('md')]: {
                      fontWeight: '400'
                    }
                  }}
                  fontSize={40}
                >
                  ${formatBalance(userBalance)}
                </Typography>
                <Typography padding='0 5px'>
                  <AutorenewIcon />
                </Typography>
              </Box>
              <Typography fontSize={14}>Friendship Tokens: 0</Typography>
              <Box paddingTop={'20px'} sx={{ display: 'block', [theme.breakpoints.down('md')]: { display: 'none' } }}>
                <Button
                  color='primary'
                  variant='contained'
                  sx={{ fontSize: matches ? '8px' : '10px', borderRadius: '15px' }}
                  onClick={() => {
                    router.push('/deposit')
                  }}
                >
                  Deposit
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                padding: '2.5rem',
                [theme.breakpoints.down('md')]: {
                  padding: '1.25rem'
                },
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}
            >
              <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <Image
                  src='/images/icons/cryptoAsset.svg'
                  width={'34px'}
                  height={'34px'}
                  style={{ marginRight: '5px' }}
                  alt={'cryptoAssetsLogo'}
                />
                <Typography
                  sx={{
                    display: 'flex',
                    color: '#142C8E',
                    [theme.breakpoints.down('sm')]: {
                      fontSize: '16px'
                    }
                  }}
                  fontWeight='bold'
                  fontSize={20}
                >
                  Crypto Assets
                </Typography>
              </Box>
              <Box display={'flex'} alignItems={'center'}>
                <Typography
                  color='black'
                  fontWeight={'bold'}
                  sx={{
                    [theme.breakpoints.down('md')]: {
                      fontWeight: '400'
                    }
                  }}
                  fontSize={40}
                >
                  ${total}
                </Typography>
                <Typography padding='0 5px' color={'#64C623'}>
                  <ArrowUpwardIcon /> {'10%'}
                </Typography>
              </Box>
              <Typography fontSize={14}>Current value</Typography>
              <Box paddingTop={'20px'} sx={{ display: 'block' }}>
                <Button
                  color='primary'
                  variant='contained'
                  sx={{ fontSize: matches ? '8px' : '10px', borderRadius: '15px' }}
                  onClick={() => {
                    router.push('/investing')
                  }}
                >
                  Buy & Sell
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ width: '100%', mt: 6 }}>
        <CardContent>
          <CryptoAssetsTable tokenBalances={tokenBalances} />
        </CardContent>
      </Card>
    </Box>
  )
}

export default WalletHomeScreen
