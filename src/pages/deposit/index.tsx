import { useState } from 'react'

// ** import MUI components
import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  Select,
  MenuItem,
  Box,
  Container,
  Grid,
  Button
} from '@mui/material'
import { ContentCopy } from 'mdi-material-ui'

import toast from 'react-hot-toast'

// ** import internal hooks
import { useAuth } from 'src/hooks/useAuth'
import openTransak from 'src/utils/openTransak'

const DepositPage = () => {
  const [network, setNetwork] = useState('eth')
  const [coin, setCoin] = useState('usdc')
  const { user } = useAuth()

  const handleOpenTransak = () => {
    openTransak(user)
  }

  return (
    <Container>
      <Grid container spacing={10}>
        <Grid item xs={8}>
          <Card>
            <CardHeader title='Deposit Crypto'>
              <Typography variant='h3'>Depsoit</Typography>
            </CardHeader>
            <CardContent>
              <Stack style={{ padding: '10px' }} direction='row' alignItems={'center'}>
                <Box style={{ flex: 0.2 }}>
                  <Typography variant='body1'>Select Coin:</Typography>
                </Box>
                <Box style={{ flex: 0.8 }}>
                  <Select value={coin} onChange={e => setCoin(e.target.value)} label='Age' fullWidth>
                    <MenuItem value={'usdc'}>USDC</MenuItem>
                  </Select>
                </Box>
              </Stack>
              <Stack style={{ padding: '10px' }} direction='row' alignItems={'center'}>
                <Box style={{ flex: 0.2 }}>
                  <Typography variant='body1'>Select Network:</Typography>
                </Box>
                <Box style={{ flex: 0.8 }}>
                  <Select value={network} onChange={e => setNetwork(e.target.value)} label='Age' fullWidth>
                    <MenuItem value={'eth'}>ETH</MenuItem>
                  </Select>
                </Box>
              </Stack>
              <Stack style={{ padding: '10px' }} direction='row' alignItems={'start'}>
                <Box style={{ flex: 0.2 }}>
                  <Typography variant='body1'>Address:</Typography>
                </Box>
                <Stack direction='row' style={{ flex: 0.8 }}>
                  <Typography variant='body1' color={'black'}>
                    {user?.smartWalletAddress}
                  </Typography>
                  <ContentCopy
                    fontSize='inherit'
                    sx={{ marginLeft: '10px', cursor: 'pointer' }}
                    onClick={() => {
                      navigator.clipboard.writeText(user?.smartWalletAddress || '')
                      toast.success('Wallet address copied')
                    }}
                  />
                </Stack>
              </Stack>
              <Stack style={{ padding: '10px' }}></Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card>
            <CardHeader title='Deposit with On-ramp' />
            <CardContent>
              <Stack direction='column'>
                <Button variant='contained' onClick={handleOpenTransak}>
                  Transak
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title='Deposit History' />
            <CardContent></CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default DepositPage
