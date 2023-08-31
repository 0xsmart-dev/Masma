import { Avatar, Box, Skeleton, Stack, styled, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'

interface Props {
  transfer?: any
  loading?: boolean
}

const TransferBox = styled(Box)({
  cursor: 'pointer',
  ':hover': {
    backgroundColor: '#EBF8FF'
  }
})
const TransferHistoryItem = ({ transfer, loading }: Props) => {
  const { user } = useAuth()
  const [transferUser, setTransferUser] = useState({
    id: '',
    name: '',
    publicAddress: '',
    avatar: '',
    profileId: ''
  })

  useEffect(() => {
    if (!loading) {
      setTransferUser(user?.profileId === transfer.fromUser.profileId ? transfer.toUser : transfer.fromUser)
    }
  }, [loading, transfer, user])

  const showAmountWithColor = () => {
    const transferFlag = user?.profileId === transfer.fromUser.profileId

    return (
      <Typography fontWeight={700} sx={transferFlag ? { color: 'red' } : { color: 'green' }} justifyContent='center'>
        {transferFlag ? '-' : '+'} ${transfer.amount}
      </Typography>
    )
  }

  const formatDate = () => {
    const today = new Date()
    const created = new Date(transfer.createdAt)
    const todayflag =
      today.getDate() === created.getDate() &&
      today.getMonth() === created.getMonth() &&
      today.getFullYear() === today.getFullYear()
    const date = todayflag
      ? 'Today, ' +
        created.toLocaleDateString([], {
          month: 'short',
          day: 'numeric'
        })
      : created.toLocaleDateString([], {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })

    return date
  }

  return (
    <TransferBox padding={'0 20px'}>
      <Box display='flex' justifyContent={'space-between'} padding={'10px 0'}>
        <Box display={'flex'}>
          {!loading && <Avatar sx={{ width: '60px', height: '60px' }} src={transferUser.avatar} />}
          {loading && <Skeleton variant='circular' width={60} height={60} />}
          <Stack padding='0 10px' display={'flex'} justifyContent='center'>
            <Stack>
              {!loading && (
                <Typography color={'black'} fontWeight={600}>
                  {transferUser.name}
                </Typography>
              )}
              {loading && (
                <Typography fontWeight={'bold'} width='60px'>
                  <Skeleton />
                </Typography>
              )}
            </Stack>
            <Stack>
              {!loading && (
                <Typography fontSize={'13px'} fontWeight={500}>
                  {formatDate()}
                </Typography>
              )}
              {loading && (
                <Typography fontSize={'10px'} width='100px'>
                  <Skeleton />
                </Typography>
              )}
            </Stack>
          </Stack>
        </Box>
        <Box display={'flex'}>
          <Stack justifyContent='center'>
            {!loading && showAmountWithColor()}
            {loading && (
              <Typography width='100px'>
                <Skeleton />
              </Typography>
            )}
          </Stack>
        </Box>
      </Box>
    </TransferBox>
  )
}

export default TransferHistoryItem
