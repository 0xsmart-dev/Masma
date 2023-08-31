import { Avatar, Box, Skeleton, Stack, styled, Typography } from '@mui/material'
import { useRouter } from 'next/router'

interface Props {
  user?: any
  loading?: boolean
}

const UserBox = styled(Box)({
  cursor: 'pointer',
  ':hover': {
    backgroundColor: '#EBF8FF'
  }
})
const UserCard = ({ user, loading }: Props) => {
  const router = useRouter()
  const shortAddress = (address: string | undefined) => {
    return address ? (address?.length > 8 ? address.slice(0, 6) + '...' + address.slice(-4) : address) : address
  }

  return (
    <UserBox padding={'0 20px'} onClick={() => router.push(`/send-funds/${user.profileId}`)}>
      <Box
        display='flex'
        justifyContent={'space-between'}
        sx={{ borderBottom: '1px solid #E5E5E5' }}
        padding={'10px 0'}
      >
        <Box display={'flex'}>
          {!loading && <Avatar sx={{ width: '60px', height: '60px' }} src={user.avatar} />}
          {loading && <Skeleton variant='circular' width={60} height={60} />}
          <Stack padding='0 10px' display={'flex'} justifyContent='center'>
            <Stack>
              {!loading && <Typography fontWeight={'bold'}>{user.username}</Typography>}
              {loading && (
                <Typography fontWeight={'bold'} width='60px'>
                  <Skeleton />
                </Typography>
              )}
            </Stack>
            <Stack>
              {!loading && <Typography fontSize={'10px'}>@{user.username}</Typography>}
              {loading && (
                <Typography fontSize={'10px'} width='100px'>
                  <Skeleton />
                </Typography>
              )}
            </Stack>
          </Stack>
        </Box>
        <Box>
          {!loading && <Typography fontSize={'10px'}>{shortAddress(user.smartWalletAddress)}</Typography>}
          {loading && (
            <Typography fontSize={'10px'} width='100px'>
              <Skeleton />
            </Typography>
          )}
        </Box>
      </Box>
    </UserBox>
  )
}

export default UserCard
