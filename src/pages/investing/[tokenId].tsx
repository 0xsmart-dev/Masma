// ** Demo Components Imports
import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import FallbackSpinner from 'src/@core/components/spinner'
import { Box, Button, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import TokenPriceChart from 'src/views/apps/chart/TokenPriceChart'
import { QuickTokenPurchase } from 'src/views/apps/modals'
import { Bitcoin, FileDocument, WebBox } from 'mdi-material-ui'
import { useTop100TokensPriceData } from 'src/hooks/useTop100Tokens'
import { HistoryDuration } from 'src/types/apps/investingTypes'
import { formatTokenPrice } from 'src/utils/helper'

const historyDurations: Array<HistoryDuration> = ['HOUR', 'DAY', 'WEEK', 'MONTH', 'YEAR']

const TokenOverview = () => {
  const [historyDuration, setHistoryDuration] = useState<HistoryDuration>('DAY')

  const router = useRouter()
  const { tokenId } = router.query
  const { user } = useAuth()
  const { tokenInfo, tokenPriceData, loading, error } = useTop100TokensPriceData(tokenId as string, historyDuration)
  const tokenPrice = useMemo(
    () => (tokenPriceData.length > 0 ? tokenPriceData[tokenPriceData.length - 1].price : 0),
    [tokenPriceData]
  )

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Stack direction='row' justifyContent='space-between'>
                <Typography variant='h6' fontWeight='bold'>
                  {tokenInfo.symbol} {tokenPriceData.length > 0 && `${formatTokenPrice(tokenPrice)}`}
                </Typography>
                <Box ml={2} columnGap={2} display='flex' alignItems='center'>
                  {historyDurations.map(duration => (
                    <Button
                      key={duration}
                      variant={(duration === historyDuration ? 'outlined' : '') as any}
                      onClick={() => setHistoryDuration(duration)}
                    >
                      {`1${duration[0]}`}
                    </Button>
                  ))}
                </Box>
              </Stack>
              <TokenPriceChart data={tokenPriceData} />
            </CardContent>
          </Card>
          <Card sx={{ marginTop: 4 }}>
            <CardContent>
              <Stack flexDirection='row' alignItems='center' justifyContent='space-around'>
                <Stack flexDirection='row' alignItems='center'>
                  <Bitcoin sx={{ width: '60px', height: '60px', color: 'goldenrod' }} />
                  <Box ml={2}>
                    <Typography fontWeight={700}>Bitcoin</Typography>
                    <Typography>Primary balance</Typography>
                  </Box>
                </Stack>
                <Box ml={2} minWidth={150}>
                  <Typography fontWeight={700}>$2000</Typography>
                  <Typography>0.00432 BTC</Typography>
                </Box>
              </Stack>
              <Stack flexDirection='row' alignItems='center' justifyContent='space-around' mt={10}>
                <Stack flexDirection='row' alignItems='center'>
                  <Bitcoin sx={{ width: '60px', height: '60px', color: 'goldenrod' }} />
                  <Box ml={2}>
                    <Typography fontWeight={700}>Your gain / loss</Typography>
                    <Typography>Current</Typography>
                  </Box>
                </Stack>
                <Box ml={2} minWidth={150}>
                  <Typography fontWeight={700}>$500</Typography>
                  <Typography>12%</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
          <Card sx={{ marginTop: 4 }}>
            <CardContent>
              <Typography variant='h6' fontWeight='bold'>
                Market stats
              </Typography>
              <Stack direction='row' justifyContent='space-between' my={5}>
                <Box>
                  <Typography variant='body2' fontWeight={600}>
                    Market cap
                  </Typography>
                  <Typography variant='body2'>$546.2B</Typography>
                </Box>
                <Box>
                  <Typography variant='body2' fontWeight={600}>
                    Volume(24h)
                  </Typography>
                  <Typography variant='body2'>$13.0B</Typography>
                </Box>
                <Box>
                  <Typography variant='body2' fontWeight={600}>
                    Circulating supply
                  </Typography>
                  <Typography variant='body2'>19.3M BTC</Typography>
                </Box>
                <Box>
                  <Typography variant='body2' fontWeight={600}>
                    Typical hold time
                  </Typography>
                  <Typography variant='body2'>154 days</Typography>
                </Box>
              </Stack>
              <Divider />
              <Stack mt={5} direction='row' alignItems='center' justifyContent='space-between'>
                <Box>
                  <Typography variant='body2' fontWeight={600}>
                    Performance
                  </Typography>
                  <Typography variant='body2'>Updated May 16, 2023 at 10:00 AM GMT-7</Typography>
                </Box>
                <div style={{ borderRight: '1px solid rgba(76, 78, 100, 0.12)', height: 32 }}></div>
                <Box>
                  <Typography variant='body2' fontWeight={600}>
                    Past year
                  </Typography>
                </Box>
                <div style={{ borderRight: '1px solid rgba(76, 78, 100, 0.12)', height: 32 }}></div>
                <Box display='flex' columnGap={5}>
                  <div>
                    <Typography variant='body2'>Bitcoin</Typography>
                    <Typography variant='body2' fontWeight={700} color='red'>
                      -40%
                    </Typography>
                  </div>
                  <div>
                    <Typography variant='body2'>Market</Typography>
                    <Typography variant='body2' fontWeight={700} color='green'>
                      +40%
                    </Typography>
                  </div>
                </Box>
              </Stack>
            </CardContent>
          </Card>
          <Card sx={{ marginTop: 4 }}>
            <CardContent>
              <Typography variant='h6' fontWeight='bold'>
                Overview
              </Typography>
              <Typography variant='body2' mt={6}>
                Bitcoin is the world's first widely-adopted cryptocurrency. With Bitcoin, people can directly and
                securely send each other digital money on the internet. Unlike services like Venmo and paypal, which
                rely on traditional financial system for permission to transfer money and on existing debit/credit
                accounts, Bitcoin is decentralized: any two people, anywhere in the world, can send Bitcoin to each
                other without the involvement of a bank, government, or other institution.
              </Typography>
              <Stack mt={6} rowGap={1}>
                <Typography variant='caption' fontWeight={700}>
                  RESOURCES
                </Typography>
                <Box display='flex' mt={2} fontSize={12} alignItems='center'>
                  <FileDocument />
                  <a href='#'>Whitepaper</a>
                </Box>
                <Box display='flex' fontSize={12} alignItems='center'>
                  <WebBox />
                  <a href='#'>Official Website</a>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <QuickTokenPurchase />
        </Grid>
      </Grid>
    </>
  )
}

export default TokenOverview
