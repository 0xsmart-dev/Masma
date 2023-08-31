import React from 'react'
import { Avatar, Box, Button, Skeleton, Stack, styled, Typography } from '@mui/material'
import CryptoAssetsMenu from 'src/views/apps/menu/CryptoAssetsMenu'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

interface Props {
  crypto?: any
  loading?: boolean
}

const CryptoAssetBox = styled(Box)({
  ':hover': {
    backgroundColor: '#EBF8FF'
  }
})
const CryptoAssetsItem = ({ crypto, loading }: Props) => {
  // const { data: usdPrice } = useEvmTokenPrice({
  //   address: crypto.token?.contractAddress as string,
  //   chain: process.env.NEXT_PUBLIC_CHAIN_ID
  // })

  // console.log(usdPrice)

  return (
    <CryptoAssetBox px={'20px'}>
      <Box display='flex' justifyContent={'space-between'} padding={'10px 0'}>
        <Box display={'flex'} minWidth={'170px'} flex={1}>
          {!loading && <Avatar sx={{ width: '60px', height: '60px' }} src={crypto.logoURI} />}
          {loading && <Skeleton variant='circular' width={60} height={60} />}
          <Stack padding='0 10px' display={'flex'} justifyContent='center'>
            <Stack>
              {!loading && (
                <Typography color={'black'} fontWeight={600}>
                  {crypto.name}
                </Typography>
              )}
              {loading && (
                <Typography fontWeight={'bold'} width='60px'>
                  <Skeleton />
                </Typography>
              )}
            </Stack>
            <Stack>
              {loading && (
                <Typography fontSize={'10px'} width='100px'>
                  <Skeleton />
                </Typography>
              )}
            </Stack>
          </Stack>
        </Box>
        <Box display={'flex'} minWidth={'130px'} flex={1}>
          <Stack justifyContent='center'>
            {!loading && (
              <Typography color={'black'} fontSize={'18px'} fontWeight={500}>
                ${crypto.price * crypto.balance}
              </Typography>
            )}
            {loading && (
              <Typography width='100px'>
                <Skeleton />
              </Typography>
            )}
          </Stack>
        </Box>
        <Box display={'flex'} minWidth={'130px'} flex={1}>
          <Stack justifyContent='center'>
            {!loading && (
              <>
                <Typography fontSize={'16px'} fontWeight={500}>
                  ${crypto.price}
                </Typography>
                <Typography fontSize={'12px'} justifyContent='center'>
                  {crypto.balance}
                  {crypto.symbol}
                </Typography>
              </>
            )}
            {loading && (
              <Typography width='100px'>
                <Skeleton />
              </Typography>
            )}
          </Stack>
        </Box>
        <Box display={'flex'} minWidth={'115px'} flex={1}>
          <Box display={'flex'} alignItems={'center'}>
            {!loading && (
              <>
                <Button size='small' sx={{ borderRadius: '15px', mr: '15px' }} variant='contained'>
                  <AddShoppingCartIcon fontSize='small' />
                  Buy
                </Button>
                <CryptoAssetsMenu cryptoId={crypto.id} />
              </>
            )}
            {loading && (
              <Typography width='100px'>
                <Skeleton />
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </CryptoAssetBox>
  )
}

export default CryptoAssetsItem
