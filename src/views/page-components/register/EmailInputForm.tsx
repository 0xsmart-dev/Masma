// ** React Imports
import { ReactNode, useState, Fragment, MouseEvent } from 'react'
import axios from 'axios'

// ** Next Imports
import Link from 'next/link'
import Image from 'next/image'

// ** MUI Components
import MuiLink from '@mui/material/Link'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import * as _ from 'lodash'

// ** Demo Imports
import { CircularProgress } from '@mui/material'

// load image

import Logo from 'src/assets/images/LogImg.png'
import { setCookie } from 'src/lib/cookies'
import { magic } from 'src/lib/magic/magic-client'
import { getSmartWalletAddress } from 'src/lib/zerodev'

export const EmailInputForm = ({
  email,
  onEmailSubmit
}: {
  email: string
  onEmailSubmit: (email: string, aaWallet: string) => void
}) => {
  const [loading, setLoading] = useState(false)
  const [smartWallet, setSmartWallet] = useState('')
  const theme = useTheme()
  const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'))

  // ** Vars
  const emailFormSchema = yup.object().shape({
    email: yup.string().email().required('Email is a required value')
  })

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm({
    defaultValues: { email: '' },
    mode: 'onBlur',
    resolver: yupResolver(emailFormSchema)
  })

  const onSubmitEmail = async data => {
    setLoading(true)

    console.log('onSubmitEmail => ', data)

    const response = await axios.post('/api/user/check-user-existence', {
      email: data.email
    })

    if (response.data && response.data.existing) {
      setError('email', {
        type: 'manual',
        message: 'Email already exists'
      })

      setLoading(false)

      return
    }

    if (!magic) return
    try {
      const didToken = await magic.auth.loginWithEmailOTP({ email: data.email, showUI: true })
      setCookie('did_token', didToken)
      const aaAddress = await getSmartWalletAddress()
      console.log('aaAddress => ', aaAddress)

      onEmailSubmit(data.email, aaAddress)
    } catch (e: any) {
      console.log(e.message)
    }

    setLoading(false)
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmitEmail)}>
      <FormControl fullWidth sx={{ mb: 4 }}>
        <Controller
          name='email'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => {
            return (
              <TextField
                autoFocus
                value={value}
                label='Email'
                onBlur={onBlur}
                onChange={onChange}
                error={Boolean(errors.email)}
                placeholder='user@email.com'
              />
            )
          }}
        />
        {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
      </FormControl>

      <Button
        fullWidth
        size='large'
        type='submit'
        variant='contained'
        sx={{
          mb: 2,
          [theme.breakpoints.down('sm')]: {
            mb: 7
          },
          borderRadius: 100
        }}
        disabled={loading}
      >
        {loading ? <CircularProgress /> : 'Next'}
      </Button>
      {isNotMobile ? (
        <>
          <Divider sx={{ mt: 5, mb: 7.5, '& .MuiDivider-wrapper': { px: 4 } }}>or</Divider>
          <Button fullWidth size='large' variant='outlined' sx={{ mb: 7, borderRadius: 1000 }} disabled={true}>
            <Image src={Logo.src} alt='logo' width={20} height={20} />
            <span style={{ paddingLeft: '10px' }}>{`Masma Connect`}</span>
          </Button>
        </>
      ) : (
        ''
      )}
      <Box
        sx={{
          [theme.breakpoints.down('sm')]: {
            mt: '80px!important'
          },
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        <Typography sx={{ mr: 2, color: 'text.secondary' }}>Already have an account?</Typography>
        <Typography>
          <Link passHref href='/login'>
            <Typography component={MuiLink} sx={{ color: 'primary.main' }}>
              Sign in
            </Typography>
          </Link>
        </Typography>
      </Box>
    </form>
  )
}
