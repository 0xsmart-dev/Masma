import React, { useState } from 'react'
import { Typography, Stack, Divider, TableContainer, Box } from '@mui/material'
import CryptoAssetItem from './CryptoAssetItem'
import { cryptoAssets } from 'src/@fake-db/table/cryptoAssets'
import { Erc20Balance } from 'src/context/types'
import { useEvmTokenPrice } from '@moralisweb3/next'
import { useAuth } from 'src/hooks/useAuth'

const CryptoAssetsTable = ({ tokenBalances }) => {
  console.log(tokenBalances)
  const token = tokenBalances[0] as Erc20Balance
  const [isLoading, setLoading] = useState<boolean>(false)
  const { user } = useAuth()

  return (
    <TableContainer>
      <Stack
        direction='column'
        minWidth={'585px'}
        divider={<Divider flexItem sx={{ width: '97%', alignSelf: 'center', margin: '0' }} />}
      >
        <Box px={'20px'}>
          <Box display='flex' justifyContent={'space-between'} padding={'10px 0'}>
            <Box display={'flex'} minWidth={'170px'} flex={1}>
              <Stack justifyContent='center'>
                <Typography fontSize={'16px'} color={'black'} fontWeight={600}>
                  Token Name
                </Typography>
              </Stack>
            </Box>
            <Box display={'flex'} minWidth={'130px'} flex={1}>
              <Stack justifyContent='center'>
                <Typography fontSize={'16px'} color={'black'} fontWeight={600}>
                  Balance
                </Typography>
              </Stack>
            </Box>
            <Box display={'flex'} minWidth={'130px'} flex={1}>
              <Stack justifyContent='center'>
                <Typography fontSize={'16px'} color={'black'} fontWeight={600}>
                  Price
                </Typography>
              </Stack>
            </Box>
            <Box display={'flex'} minWidth={'115px'} flex={1}>
              <Stack justifyContent='center'>
                <Typography fontSize={'16px'} color={'black'} fontWeight={600}>
                  Actions
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Box>
        {!isLoading && cryptoAssets.length === 0 && (
          <Typography padding={'10px 20px'} textAlign='center'>
            No Assets
          </Typography>
        )}
        {!isLoading &&
          cryptoAssets.length > 0 &&
          cryptoAssets.map((crypto, id) => {
            return <CryptoAssetItem crypto={crypto} key={id} />
          })}
        {isLoading && <CryptoAssetItem loading />}
      </Stack>
    </TableContainer>
  )
}

export default CryptoAssetsTable
