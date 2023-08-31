// ** MUI Imports
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import BitcoinIcon from 'mdi-material-ui/Bitcoin'
import EthereumIcon from 'mdi-material-ui/Ethereum'
import { ChevronRight } from '@mui/icons-material'

import Avatar from 'src/@core/components/mui/avatar'
import ButtonGroupSplit from 'src/views/components/button-group/ButtonGroupSplit'

export const TokenPurchaseInit = ({ type = 'buy', onNext, style = {} }) => {
  return (
    <>
      <Box display='flex' sx={style} alignItems='center' flexDirection='column'>
        <Box display='flex' alignItems='center' gap={1}>
          <Typography fontSize={14} fontWeight={700} textAlign='center'>
            USD
          </Typography>
          <Typography fontSize={48} fontWeight='bold' color='black' py={10}>
            $0.00
          </Typography>
        </Box>
        {type === 'buy' ? <ButtonGroupSplit /> : type === 'sell' ? null : <ButtonGroupSplit selectedOption={1} />}
        <Card sx={{ width: '100%', marginTop: 4 }}>
          <CardContent>
            <Button
              fullWidth
              sx={{
                display: 'flex',
                paddingX: 0,
                alignItems: 'center',
                justifyContent: 'space-between',
                textTransform: 'initial'
              }}
            >
              <Typography fontSize={14} fontWeight={700} minWidth={75} textAlign='left'>
                {type === 'buy' ? 'Buy' : type === 'sell' ? 'Sell' : 'From'}
              </Typography>
              <Box display='flex' alignItems={'center'} flexGrow={1}>
                <BitcoinIcon sx={{ width: '20px', height: '20px', color: 'goldenrod' }} />
                <Typography fontSize={14} fontWeight={700} marginLeft={2}>
                  Bitcoin
                </Typography>
              </Box>
              <ChevronRight />
            </Button>
            <Divider />
            <Button
              fullWidth
              sx={{
                display: 'flex',
                paddingX: 0,
                alignItems: 'center',
                justifyContent: 'space-between',
                textTransform: 'initial'
              }}
            >
              <Typography fontSize={14} fontWeight={700} minWidth={75} textAlign='left'>
                {type === 'buy' ? 'Pay with' : type === 'sell' ? 'Send to' : 'To'}
              </Typography>
              <Box display='flex' alignItems={'center'} flexGrow={1}>
                {type === 'convert' ? (
                  <EthereumIcon sx={{ width: '20px', height: '20px' }} />
                ) : (
                  <Avatar alt='avatar' src='/images/logo.png' sx={{ width: 20, height: 20 }} />
                )}
                <Typography fontSize={14} fontWeight={700} marginLeft={2}>
                  {type === 'buy' || type === 'sell' ? 'Masma Balance' : 'Ethereum'}
                </Typography>
              </Box>
              <ChevronRight />
            </Button>
          </CardContent>
        </Card>
        <Button variant='contained' color='primary' sx={{ width: '100%', marginTop: 4 }} onClick={onNext}>
          Next
        </Button>
        <Button variant='text' color='primary' sx={{ width: '100%', marginTop: 2 }}>
          Cancel
        </Button>
        <Box display='flex' width='100%' justifyContent='space-between'>
          <Typography fontSize={14} fontWeight={700}>
            Masma Balance
          </Typography>
          <Typography fontSize={14} fontWeight={700}>
            ~ USD 0.00
          </Typography>
        </Box>
      </Box>
    </>
  )
}
