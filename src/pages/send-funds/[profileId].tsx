import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Input,
  InputAdornment,
  Modal,
  Skeleton,
  Stack,
  styled,
  TextField,
  Typography,
  Grid,
  Chip,
  Zoom,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  CardHeader
} from '@mui/material'
import MuiLink from '@mui/material/Link'
import FormControl from '@mui/material/FormControl'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { getUserProfile, transferErc20Token, transferMoney } from 'src/lib/api'
import { LoadingButton } from 'src/views/components/buttons/Buttons'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import nft1 from 'src/assets/images/gift/1.svg'
import nft2 from 'src/assets/images/gift/2.svg'
import nft3 from 'src/assets/images/gift/3.svg'
import nft4 from 'src/assets/images/gift/4.svg'
import nft5 from 'src/assets/images/gift/5.svg'
import GreenCheckMark from 'src/assets/images/green_check_mark.svg'
import Image from 'next/image'

import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import { useAuth } from 'src/hooks/useAuth'
import toast from 'react-hot-toast'
import { formatBalance } from 'src/lib/utils/format'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import FormHelperText from '@mui/material/FormHelperText'
import { erc20Transfer } from 'src/lib/zerodev'
import { Erc20Balance, UserDataType } from 'src/context/types'
import { useEvmWalletTokenBalances } from '@moralisweb3/next'
import { EvmChain } from '@moralisweb3/common-evm-utils'

import { magic } from 'src/lib/magic/magic-client'
import { USDC_CONTRACTS, USDC_DECIMALS, USDC_LOGO_URL, WRAPPED_USDC_NAME } from 'src/lib/constants'

const defaultValues = {
  amount: 0
}

const NFTBox = styled(Box)({
  position: 'relative',
  width: '100%',
  maxWidth: '570px',
  minHeight: '100px'
})

const GiftButton = styled(Button)({
  textTransform: 'none',
  backgroundColor: '#FF4D49',
  color: 'white',
  borderRadius: '100px',
  fontSize: '12px',
  '& > span': {
    paddingLeft: '20px'
  }
})

const CustomInput = styled(Input)({
  display: 'flex`',
  '&:hover:before': {
    border: 'none !important'
  },
  '&:focus:before': {
    border: '1px solid red'
  },
  ':before': {
    border: 'none'
  },
  ':after': {
    border: 'none'
  },
  '& input::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    margin: 0
  },
  '& input::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    margin: 0
  },
  '& input': {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '30px'
  }
})

const Profile = () => {
  const router = useRouter()
  const { profileId } = router.query

  const { user, userBalance, fetchUserProfile } = useAuth()
  const { data: balances } = useEvmWalletTokenBalances({
    address: user?.smartWalletAddress as string,

    // chain: EvmChain.MUMBAI.hex,
    chain: process.env.NEXT_PUBLIC_CHAIN_ID
  })

  const USDC_BALANCE = useMemo(() => {
    return {
      token: {
        chain: '0x' + parseInt(process.env.NEXT_PUBLIC_CHAIN_ID as string).toString(16),
        contractAddress: USDC_CONTRACTS.get(process.env.NEXT_PUBLIC_CHAIN_ID),
        decimals: USDC_DECIMALS,
        logo: '/images/logo.png',
        name: WRAPPED_USDC_NAME,
        symbol: 'USD'
      },
      value: formatBalance(userBalance) as string
    }
  }, [userBalance])

  const tokenBalances = useMemo(() => {
    const balancesFromMoralis =
      balances?.map(token => token.toJSON()).filter(token => token.token?.symbol !== 'USDC') || []

    return balancesFromMoralis.concat([USDC_BALANCE])
  }, [balances, USDC_BALANCE])

  const [selectedToken, setSelectedToken] = useState<Erc20Balance>(USDC_BALANCE)

  const handleTokenClick = (balance: Erc20Balance) => {
    setSelectedToken(balance)
    setIsOpenTokenList(false)
  }

  const [targetUser, setTargetUser] = useState<UserDataType | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const [width, setWidth] = useState<string>('66px')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOpenTokenList, setIsOpenTokenList] = useState<boolean>(false)

  const [overGift, setOverGift] = useState<boolean>(false)
  const [paymentPurpose, setPaymentPurpose] = useState<string>('')

  const schema = yup.object().shape({
    amount: yup
      .number()
      .typeError('Invalid amount')
      .required('Please input amount to send')
      .moreThan(0, 'Amount should be greater than 0')
      .max(parseFloat(selectedToken.value) || 0, 'Insufficient balance on your wallet')
  })

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const { amount } = getValues()

  type StepType = 'amount_input' | 'payment_type_selection' | 'confirmation' | 'result'
  const [step, setStep] = useState<StepType>('amount_input')

  useMemo(() => {
    getUserProfile(profileId as string).then(res => setTargetUser(res))
  }, [profileId])

  const handleChange = e => {
    const intToString = e.target.value.toString()
    if (intToString.length === 0) {
      setWidth('66px')
    } else {
      setWidth(`${intToString.length * 22}px`)
    }
  }

  const onSubmit = async () => {
    const { amount } = getValues()
    setLoading(true)
    try {
      if (!magic) {
        throw new Error('magic is not setup')
      }
      const isLoggedIn = await magic.user.isLoggedIn()
      if (!isLoggedIn) await magic.auth.loginWithEmailOTP({ email: user?.email || '', showUI: true })

      if (selectedToken.token) {
        const transactionHash = await erc20Transfer({
          contractAddress: selectedToken.token?.contractAddress,
          to: targetUser?.smartWalletAddress || '',
          amount: amount.toString(),
          symbol: selectedToken.token.symbol,
          decimals: selectedToken.token.decimals
        })

        await transferErc20Token({
          to: targetUser?.smartWalletAddress || '',
          amount,
          symbol: selectedToken.token.symbol,
          tokenAddress: selectedToken.token.contractAddress,
          chainId: parseInt(selectedToken.token?.chain as string, 16),
          transactionHash,
          paymentPurpose
        })

        toast.success(`${amount}$ has transferred successfully`)

        setStep('result')
      }
    } catch (e) {
      console.log(e)
      toast.error(`Error while transfer`)
    }
    setLoading(false)
  }

  return (
    <>
      {step === 'amount_input' && (
        <Card>
          <CardContent>
            <Stack justifyContent={'center'} display={'flex'} flexDirection='column' alignItems='center' padding='30px'>
              <Stack justifyContent={'center'} display={'flex'} flexDirection='column' alignItems='center'>
                {targetUser && <Avatar src={targetUser.avatar} sx={{ width: '100px', height: '100px' }} />}
                {!targetUser && <Skeleton variant='circular' width={100} height={100} />}
                <Typography textAlign={'center'} paddingTop='20px' fontWeight={'bold'}>
                  {targetUser ? targetUser.username : <Skeleton width={'80px'} />}
                </Typography>
                <Typography textAlign={'center'} fontSize='14px' color='#142C8E' fontWeight={500}>
                  {targetUser ? '@' + targetUser.profileId : <Skeleton width={'150px'} />}
                </Typography>
              </Stack>
              <Stack paddingTop={'40px'}>
                <Typography textAlign={'center'} paddingBottom='20px' variant='h4'>
                  You'll Send
                </Typography>
                <Typography
                  textAlign={'center'}
                  color='black'
                  fontWeight='bold'
                  fontSize='26px'
                  justifyContent={'center'}
                  alignItems='center'
                  display={'flex'}
                >
                  <FormControl sx={{ mb: 4 }}>
                    <Controller
                      name='amount'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomInput
                          sx={{
                            width: width
                          }}
                          startAdornment={
                            <InputAdornment
                              position='start'
                              sx={{ '& > p': { fontWeight: 'bold', color: 'black', mt: '-25px' } }}
                            >
                              $
                            </InputAdornment>
                          }
                          type='number'
                          autoFocus
                          value={value}
                          onFocus={onChange}
                          onChange={e => {
                            onChange(e)
                            handleChange(e)
                          }}
                          placeholder={'0.0'}
                        />
                      )}
                    />
                  </FormControl>
                </Typography>
                <Typography
                  textAlign={'center'}
                  paddingTop='5px'
                  fontWeight='bold'
                  color='#1072EB'
                  onClick={() => setIsOpenTokenList(true)}
                  sx={{ cursor: 'pointer' }}
                >
                  {selectedToken.token?.symbol}
                </Typography>
              </Stack>
              <Stack padding={'10px'}>
                {errors.amount && <FormHelperText sx={{ color: 'error.main' }}>{errors.amount.message}</FormHelperText>}
              </Stack>
              <Stack width={'100%'} alignItems={'center'} display={'flex'}>
                <NFTBox>
                  <Typography textAlign={'right'} fontSize='16px'>
                    Balance : {selectedToken.token ? selectedToken.value : '$' + formatBalance(userBalance)}
                  </Typography>
                  <TextField
                    multiline={true}
                    rows={4}
                    placeholder='+ What is this payment for?'
                    sx={{
                      position: 'relative',
                      width: '100%',
                      maxWidth: '570px',
                      minHeight: '100px'
                    }}
                    value={paymentPurpose}
                    onChange={e => {
                      setPaymentPurpose(e.target.value)
                    }}
                  />
                  <Zoom in={overGift}>
                    <GiftButton
                      variant='contained'
                      sx={{ position: 'absolute', right: 10, top: 35 }}
                      onClick={() => setIsOpen(true)}
                      onPointerLeave={() => setOverGift(false)}
                    >
                      <CardGiftcardIcon />
                      <span>Add NFT</span>
                    </GiftButton>
                  </Zoom>
                  <Zoom in={!overGift}>
                    <Box
                      sx={{
                        position: 'absolute',
                        right: 20,
                        top: 35,
                        width: 10,
                        height: 10,
                        cursor: 'pointer',
                        backgroundColor: '#FF4D49',
                        borderRadius: '100px'
                      }}
                      onPointerOver={() => setOverGift(true)}
                    />
                  </Zoom>
                </NFTBox>
              </Stack>
              <Stack width={'100%'} alignItems='center'>
                <LoadingButton
                  variant='contained'
                  sx={{
                    borderRadius: '100px',
                    marginTop: '30px',
                    fontSize: '15px',
                    width: '200px',
                    '& span': {
                      height: '25px !important',
                      width: '25px !important'
                    }
                  }}
                  onClick={() => setStep('confirmation')}
                  loading={loading}
                  disabled={Boolean(errors.amount) || loading}
                >
                  Next
                </LoadingButton>

                <Typography
                  textAlign={'center'}
                  paddingTop='15px'
                  fontWeight='bold'
                  color='#1072EB'
                  sx={{ cursor: 'pointer' }}
                  onClick={() => router.back()}
                >
                  Cancel
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      )}
      {step === 'confirmation' && (
        <>
          <Card sx={{ maxWidth: '570px', mx: 'auto' }}>
            <CardContent>
              <Stack justifyContent={'center'} display={'flex'} flexDirection='column' alignItems='center'>
                <Box display={'flex'}>
                  {targetUser && <Avatar sx={{ width: '100px', height: '100px' }} src={targetUser.avatar} />}
                  {!targetUser && <Skeleton variant='circular' width={100} height={100} />}
                  <Stack padding='0 10px' display={'flex'} justifyContent='center'>
                    <Stack>
                      {targetUser && (
                        <Typography fontSize={'25px'} color='black' fontWeight={700}>
                          {targetUser.username}
                        </Typography>
                      )}
                      {!targetUser && <Typography fontSize={'25px'} fontWeight={700} width='100px'></Typography>}
                    </Stack>
                    <Stack>
                      {targetUser && (
                        <Typography color='primary' fontWeight={700} fontSize={'15px'}>
                          @{targetUser.username}
                        </Typography>
                      )}
                      {!targetUser && (
                        <Typography fontSize={'15px'} fontWeight={700} width='100px'>
                          <Skeleton />
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                </Box>
                <Stack paddingTop={'20px'} flexDirection={'row'}>
                  {!selectedToken.token && (
                    <Typography variant='h6' mt={'-13px'} color={'black'}>
                      $
                    </Typography>
                  )}
                  <Typography textAlign={'center'} paddingBottom='20px' variant='h3' color={'black'}>
                    {amount}
                  </Typography>
                </Stack>
                <Typography
                  textAlign={'center'}
                  paddingLeft={'10px'}
                  fontWeight='bold'
                  color='#1072EB'
                  sx={{ cursor: 'pointer' }}
                  variant='h6'
                >
                  {selectedToken.token?.symbol}
                </Typography>

                <Grid container spacing={2} padding={'5px'}>
                  <Grid item xs={8}>
                    <Typography textAlign={'left'} fontWeight='bold' color='black'>
                      Sending to a friend
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography textAlign={'right'} fontWeight='bold' color='#1072EB' sx={{ cursor: 'pointer' }}>
                      Change
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={4} padding={'20px'}>
                  <Grid item xs={8}>
                    <Typography
                      component={'p'}
                      textAlign={'left'}
                      marginTop={'10px'}
                      sx={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                    >
                      {paymentPurpose || '+ What is this payment for?'}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <GiftButton variant='contained' onClick={() => setIsOpen(true)}>
                      <CardGiftcardIcon />
                      <span>Add NFT</span>
                    </GiftButton>
                  </Grid>
                </Grid>
              </Stack>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: '570px', mx: 'auto', mt: '10px' }}>
            <CardContent>
              <Card
                sx={{
                  border: 'none',
                  flex: 1
                }}
              >
                <Grid container spacing={2} padding={'5px'}>
                  <Grid item xs={8}>
                    <Typography textAlign={'left'} fontWeight='bold' color='black'>
                      Sending to a friend
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography textAlign={'right'} fontWeight='bold' color='#1072EB' sx={{ cursor: 'pointer' }}>
                      Public
                    </Typography>
                  </Grid>
                </Grid>
                <Divider flexItem sx={{ alignSelf: 'center', my: '1.5rem', mx: 'auto' }} />
                <Grid container spacing={2} padding={'5px'}>
                  <Grid item xs={1} />
                  <Grid item xs={2}>
                    <Card
                      sx={{
                        borderWidth: '3px',
                        borderColor: 'rgba(76, 78, 100, 0.5)',
                        display: 'flex',
                        justifyContent: 'center'
                      }}
                    >
                      <Image style={{ margin: 'auto' }} src='/images/logo.png' width={'44px'} height={'44px'} />
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container direction='column'>
                      <Grid>
                        <Typography textAlign={'left'} fontWeight='bold' color='black' fontSize={'17px'}>
                          Masma Balance
                        </Typography>
                      </Grid>
                      <Grid>
                        <Typography textAlign={'left'} fontWeight='bold' color='Black'>
                          Availabe ${formatBalance(userBalance)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography textAlign={'left'} fontWeight={'bold'} color={'black'}>
                      Total:
                    </Typography>
                    <Typography textAlign={'left'} mt={'5px'} color={'black'}>
                      {selectedToken.token?.symbol === 'USDC' ? '$' : ''}
                      {amount} {selectedToken.token?.symbol}
                    </Typography>
                  </Grid>
                </Grid>
                {/* <Grid container padding={'5px'}>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={10}>
                    <Chip label='PREFERRED' color='success' variant='outlined' />
                  </Grid>
                </Grid> */}
                <Divider flexItem sx={{ alignSelf: 'center', my: '1.5rem', mx: 'auto' }} />
                <Grid container spacing={2} padding={'5px'}>
                  <Grid item xs={8}>
                    <Typography textAlign={'left'} fontWeight='bold' color='black'>
                      You'll send
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography textAlign={'right'} fontWeight='bold' color='black'>
                      {selectedToken.token?.symbol === 'USDC' ? '$' : ''}
                      {amount} {selectedToken.token?.symbol}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} padding={'5px'}>
                  <Grid item xs={8}>
                    <Typography textAlign={'left'} color='black'>
                      Transaction fee
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography textAlign={'right'} color='black'>
                      free
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} padding={'5px'} paddingTop={'20px'}>
                  <Grid item xs={8}>
                    <Typography textAlign={'left'} fontWeight='bold' color='black'>
                      You'll pay
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography textAlign={'right'} fontWeight='bold' color='black'>
                      {selectedToken.token?.symbol === 'USDC' ? '$' : ''}
                      {amount} {selectedToken.token?.symbol}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} padding={'5px'}>
                  <Grid item xs={8}>
                    {targetUser && (
                      <Typography textAlign={'left'} color='black'>
                        {targetUser.username} will receive
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={4}>
                    <Typography textAlign={'right'} color='black'>
                      {selectedToken.token?.symbol === 'USDC' ? '$' : ''}
                      {amount} {selectedToken.token?.symbol}
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </CardContent>
          </Card>
          <Grid alignItems={'center'} sx={{ maxWidth: '570px', mx: 'auto', mt: '10px' }} paddingTop={'20px'}>
            <Typography sx={{ textAlignLast: 'center' }}>
              For more information please read{' '}
              <Typography
                component={MuiLink}
                sx={{ color: 'primary.main' }}
                href='https://masma.gitbook.io/masma-whitepaper/legal/terms-of-service'
              >
                User Agreement
              </Typography>
            </Typography>
          </Grid>
          <Stack width={'100%'} alignItems='center'>
            <LoadingButton
              variant='contained'
              sx={{
                borderRadius: '100px',
                marginTop: '30px',
                fontSize: '15px',
                width: '250px',
                '& span': {
                  height: '25px !important',
                  width: '25px !important'
                }
              }}
              onClick={onSubmit}
              disabled={loading}
              loading={loading}
            >
              Send Money Now
            </LoadingButton>

            <Typography
              textAlign={'center'}
              paddingTop='15px'
              fontWeight='bold'
              color='#1072EB'
              sx={{ cursor: 'pointer' }}
              onClick={() => setStep('amount_input')}
            >
              Cancel
            </Typography>
          </Stack>
        </>
      )}

      {step === 'result' && (
        <Stack justifyContent={'center'} display={'flex'} flexDirection='column' alignItems='center' padding='10px'>
          <Stack justifyContent={'center'} display={'flex'} flexDirection='column' alignItems='center'>
            {targetUser && <Avatar src={targetUser.avatar} sx={{ width: '100px', height: '100px' }} />}
            {!targetUser && <Skeleton variant='circular' width={100} height={100} />}
            <Typography textAlign={'center'} paddingTop='20px' fontWeight={'bold'} variant='h5'>
              {targetUser ? targetUser.username : <Skeleton width={'80px'} />}
            </Typography>
          </Stack>
          <Typography textAlign={'center'} paddingTop='20px' variant='h5' color={'black'}>
            You've sent {selectedToken.token?.symbol === 'USDC' ? '$' : ''}
            {amount} {selectedToken.token?.symbol}
          </Typography>
          <Stack>
            <Box sx={{ color: 'green', padding: '20px 0px' }}>
              <Image src={GreenCheckMark} alt='GreenCheckMark' />
            </Box>
          </Stack>
          <Card sx={{ maxWidth: '570px', mx: 'auto', mt: '10px', width: '100%' }}>
            <CardContent>
              <Card
                sx={{
                  border: 'none',
                  flex: 1
                }}
              >
                <div style={{ padding: '5px' }}>
                  <Grid container padding={'5px'}>
                    <Grid item xs={8}>
                      <Typography textAlign={'left'} fontWeight='bold' color='black' fontSize='26px'>
                        Paid with
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} padding={'5px'}>
                    <Grid item xs={8}>
                      <Typography textAlign={'left'} fontWeight='bold' color='black' fontSize={'20px'}>
                        Masma Balance
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography textAlign={'right'}>${amount} USD</Typography>
                    </Grid>
                  </Grid>
                  <Grid paddingTop={'30px'}>
                    <Typography fontWeight='bold' color='black' fontSize={'20px'} padding={'5px'}>
                      Transaction details
                    </Typography>
                    <Typography padding={'5px'} textAlign={'left'} color='black'>
                      Receipt number:
                    </Typography>
                    <Typography padding={'5px'} textAlign={'left'} color='black'>
                      {' '}
                      We'll send a confirmation to:
                    </Typography>
                    <Typography padding={'5px'} textAlign={'left'} color='black'>
                      {targetUser ? targetUser?.email : ''}
                    </Typography>
                  </Grid>
                </div>
              </Card>
            </CardContent>
          </Card>

          <LoadingButton
            variant='contained'
            sx={{
              borderRadius: '100px',
              marginTop: '15px',
              fontSize: '15px',
              width: '200px',
              '& span': {
                height: '25px !important',
                width: '25px !important'
              }
            }}
            onClick={() => router.push('/wallet')}
          >
            Return To Home
          </LoadingButton>
        </Stack>
      )}
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}
      >
        <Card>
          <CardContent>
            <Stack display={'flex'} alignItems='center'>
              <Typography fontWeight={'bold'} color='black' fontSize='35px' padding={'20px'}>
                Select your NFT as a Gift
              </Typography>
              <Stack width={'100%'}>
                <Image src={nft1} width='400px' />
              </Stack>
              <Box
                display={'flex'}
                justifyContent='space-between'
                width={'100%'}
                sx={{ '& img': { cursor: 'pointer' } }}
              >
                <Image src={nft2} width='80px' height='80px' />
                <Image src={nft3} width='80px' height='80px' />
                <Image src={nft4} width='80px' height='80px' />
                <Image src={nft5} width='80px' height='80px' />
              </Box>
              <Stack
                display={'flex'}
                width='100%'
                justifyContent={'space-between'}
                flexDirection='row'
                paddingTop={'20px'}
              >
                <Button variant='outlined' sx={{ textTransform: 'none', borderRadius: '50px' }}>
                  <BusinessCenterIcon />
                  <Typography color={'inherit'} fontSize='inherit' paddingLeft='10px'>
                    Select From Inventory
                  </Typography>
                </Button>
                <Button variant='contained' sx={{ textTransform: 'none', borderRadius: '50px', width: '50%' }}>
                  <Typography color={'inherit'} fontSize='inherit' paddingLeft='10px'>
                    Next
                  </Typography>
                </Button>
              </Stack>
              <Typography
                textAlign={'center'}
                paddingTop='15px'
                fontWeight='bold'
                color='#1072EB'
                sx={{ cursor: 'pointer' }}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Modal>
      <Modal
        open={isOpenTokenList}
        onClose={() => setIsOpenTokenList(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}
      >
        <Card>
          <CardHeader variant='h6' title='Select asset to transfer'></CardHeader>
          <CardContent>
            <List component='nav'>
              {tokenBalances.map((balance: Erc20Balance) => (
                <ListItem disablePadding key={balance.token?.symbol}>
                  <ListItemButton
                    selected={
                      selectedToken.token?.contractAddress === balance.token?.contractAddress &&
                      selectedToken.token?.chain === balance.token?.chain
                    }
                    onClick={() => handleTokenClick(balance)}
                    sx={{
                      minWidth: '400px'
                    }}
                  >
                    <ListItemIcon>
                      <Avatar
                        src={balance.token?.logo as string}
                        variant='rounded'
                        sx={{ mr: 3, width: 38, height: 38 }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={balance.token?.symbol} secondary={balance.token?.name} />
                    <ListItemSecondaryAction>
                      <Typography variant='body1'>{balance.value}</Typography>
                    </ListItemSecondaryAction>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Modal>
    </>
  )
}

export default Profile
