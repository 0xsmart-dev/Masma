import React, { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

// ** MUI Imports
import { Card, Typography, CardContent, Stack, TextField, InputAdornment, Box, Avatar, styled } from '@mui/material'
import { useRouter } from 'next/router'

import { UserDataType } from 'src/context/types'
import { getUserProfile, transferMoney } from 'src/lib/api'
import { useAuth } from 'src/hooks/useAuth'
import { formatBalance } from 'src/lib/utils/format'
import { LoadingButton } from 'src/views/components/buttons/Buttons'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import api from 'src/lib/api'
import { searchUsers } from 'src/lib/api'
import UserCard from 'src/views/components/UserSelection/UserCard'
import CloseIcon from '@mui/icons-material/Close'

const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: '100px',
      padding: '10px'
    }
  }
})

const SendFunds = () => {
  const router = useRouter()
  const { user, userBalance, fetchUserProfile } = useAuth()

  const [targetUser, setTargetUser] = useState<UserDataType | null>(null)
  const [recentAccounts, setRecentAccounts] = useState<any[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showResult, setShowResult] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string>('')
  const [users, setUsers] = useState<any[]>([])

  const fetchPreselectedUser = useCallback(
    async profileId => {
      const user = await getUserProfile(profileId as string)
      setTargetUser(user)
    },
    [setTargetUser]
  )

  useMemo(() => {
    setIsLoading(true)
    searchUsers(keyword).then(res => {
      setUsers(res.slice(0, 5))
      setIsLoading(false)
    })
  }, [keyword])

  useEffect(() => {
    const { profileId } = router.query
    if (profileId) {
      fetchPreselectedUser(profileId)
    }
  }, [router.query, fetchPreselectedUser])

  useEffect(() => {
    api.post(`/api/user/popular`).then(res => {
      setRecentAccounts(res.data.slice(0, 3))
    })
  }, [])

  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)

  const changeAmount = (event: any) => {
    setAmount(parseFloat(event.target.value))
  }

  const initSearch = () => {
    setShowResult(false)
    setKeyword('')
  }

  const targetUserChanged = (e: any, selected: UserDataType | null) => {
    if (selected) setTargetUser(selected)
  }

  const isValidAmount = () => amount > 0 && user && userBalance >= amount
  const errorHelperText = () => (isValidAmount() ? '' : 'Invalid amount')

  return (
    <Box sx={{ position: 'relative' }}>
      <CardContent>
        <Stack display='flex' alignItems='center' justifyContent='center' paddingBottom={'30px'}>
          <Box
            sx={{
              borderRadius: '50%',
              width: 65,
              height: 65,
              boxShadow: '0px 2px 10px rgba(76, 78, 100, 0.22)',
              background: '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden'
            }}
          >
            <ArrowOutwardIcon color={'primary'} fontSize={'large'} />
          </Box>
        </Stack>
        <Stack display='flex' alignItems='center' justifyContent='center'>
          <Typography variant='h4'>Send money to anyone</Typography>
        </Stack>
        <Stack sx={{ pt: 10, pb: 10 }} alignItems='center'>
          <Stack maxWidth={'500px'}>
            {/* <UserSelection
              key={targetUser ? targetUser.id : 'userselection'}
              selected={targetUser}
              onChange={targetUserChanged}
            /> */}

            <Box>
              <Box sx={{ position: 'relative' }}>
                <CssTextField
                  label='Name, @username, email, or mobile'
                  sx={{ width: '500px' }}
                  onChange={e => setKeyword(e.target.value)}
                  value={keyword}
                  onFocus={() => setShowResult(true)}
                />
                {showResult && (
                  <Typography>
                    <CloseIcon
                      sx={{ cursor: 'pointer', position: 'absolute', right: '20px', top: '15px' }}
                      onClick={() => initSearch()}
                    />
                  </Typography>
                )}
              </Box>
              {showResult && (
                <Card sx={{ width: '500px', marginTop: '40px' }}>
                  <CardContent sx={{ padding: 0 }}>
                    <Box padding='20px' display={'flex'} justifyContent='space-between'>
                      <Typography fontWeight={'bold'}>People on Masma</Typography>
                      {/* <Typography>
                        <CloseIcon sx={{ cursor: 'pointer' }} onClick={() => initSearch()} />
                      </Typography> */}
                    </Box>
                    <Box>
                      {!isLoading && users.length === 0 && (
                        <Typography padding={'10px 20px'} textAlign='center'>
                          No Result
                        </Typography>
                      )}
                      {!isLoading &&
                        users.length > 0 &&
                        users.map((user, id) => {
                          return <UserCard user={user} key={id} />
                        })}
                      {isLoading && <UserCard loading />}
                    </Box>
                    <Typography padding='10px 20px' fontWeight={500}>
                      Can’t find the right person? Try entering their email or mobile number instead.
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Box>

            {/* <TextField
              onChange={changeAmount}
              label='Amount'
              sx={{ my: 5 }}
              InputProps={{
                endAdornment: (
                  <>
                    <InputAdornment position='end'>$Masma</InputAdornment>
                    <div>(${formatBalance(user?.balance)})</div>
                  </>
                )
              }}
              error={!isValidAmount()}
              defaultValue='0'
              helperText={errorHelperText()}
            /> */}
            {!showResult && (
              <LoadingButton
                variant='contained'
                loading={loading}
                disabled={loading || !isValidAmount()}
                sx={{ borderRadius: '100px', marginTop: '30px', width: '120px' }}
              >
                Next
              </LoadingButton>
            )}
          </Stack>
          {!showResult && (
            <Stack sx={{ paddingTop: '50px' }} maxWidth={'500px'}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {recentAccounts?.map((item, _id) => {
                  return (
                    <>
                      <Stack sx={{ padding: '10px' }}>
                        <Avatar sx={{ width: 65, height: 65, boxShadow: 16 }} src={item.avatar} />
                        <Typography
                          variant='caption'
                          alignContent={'center'}
                          textAlign='center'
                          paddingTop={'10px'}
                          color='black'
                        >
                          {item.firstName}
                        </Typography>
                      </Stack>
                    </>
                  )
                })}
              </Box>
              <Box>
                <Typography
                  variant='caption'
                  alignContent={'center'}
                  textAlign='center'
                  paddingTop={'10px'}
                  color='#1072EB'
                  fontWeight={'bold'}
                  fontSize={'17px'}
                >
                  Manage contacts
                </Typography>
              </Box>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Box>
  )
}

export default SendFunds
