// ** React Imports
import { useState, ReactNode } from 'react'

// ** Next Imports
import Link from 'next/link'
import Image from 'next/image'

// ** MUI Components
import MuiLink from '@mui/material/Link'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { Card, CardContent, useMediaQuery } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

import { styled, useTheme } from '@mui/material/styles'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

import LogoImg from 'src/assets/images/login-logo.svg'
import Logo from 'src/assets/images/LogImg.png'
import { useRouter } from 'next/router'
import { setCookie } from 'src/lib/cookies'
import { magic } from 'src/lib/magic/magic-client'
import axios from 'axios'

const RespBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  }
}))

const schema = yup.object().shape({
  email: yup.string().email('Must be a valid email address').required('Email is a required field')
})

const defaultValues = {
  email: ''
}

interface FormData {
  email: string
}

const LoginPage = () => {
  // ** Hooks
  const { setUser, fetchUserProfile } = useAuth()
  const theme = useTheme()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const router = useRouter()
  const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'))

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    const { email } = data
    setLoading(true)

    const response = await axios.post('/api/user/check-user-existence', {
      email: email
    })

    if (response.data && !response.data.existing) {
      setError('email', {
        type: 'manual',
        message: "User doesn't exist!"
      })
      setLoading(false)

      return
    }

    if (!magic) return
    try {
      const didToken = await magic.auth.loginWithEmailOTP({ email, showUI: true })

      const loginResponse = await axios.post('/api/auth/login', {
        didToken
      })

      setCookie('did_token', didToken)
      setCookie('access_token', loginResponse.data.access_token)

      fetchUserProfile()
    } catch (e: any) {
      console.log(e.message)
    }

    setLoading(false)
  }

  return (
    <RespBox sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box
        className={isNotMobile ? 'content-center' : ''}
        sx={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'flex-end!important',
          backgroundColor: theme.palette.grey[100],
          [theme.breakpoints.down('sm')]: {
            mt: '100px',
            backgroundColor: 'white',
            alignItems: 'unset!important',
            marginInline: 'auto'
          }
        }}
      >
        <Box>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', position: 'relative' }}>
            <Image src={LogoImg.src} alt='logo' width={600} height={300} />
          </Box>
          <Box
            sx={{
              [theme.breakpoints.up('sm')]: { mb: 6 },
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <Typography
              variant='h4'
              sx={{ mb: 1.5, fontWeight: 550, letterSpacing: '0.18px', color: 'black', textAlign: 'center' }}
            >
              {`Welcome to Masma`}
            </Typography>
            <Typography variant='h6' sx={{ mb: 1.5, letterSpacing: '0.18px', textAlign: 'center' }}>
              {`Your first step into Web3`}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        className={isNotMobile ? 'content-center' : ''}
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start!important',
          backgroundColor: 'white',
          marginLeft: '50px',
          [theme.breakpoints.down(1024)]: {
            justifyContent: 'unset!important',
            marginLeft: 'unset'
          },
          flex: 1
        }}
      >
        <Card
          sx={{
            zIndex: 1,
            boxShadow: 'none',
            [theme.breakpoints.down(1024)]: {
              marginInline: 'auto'
            },
            [theme.breakpoints.down('sm')]: {
              border: 'none!important'
            }
          }}
        >
          <CardContent sx={{ p: theme => `${theme.spacing(13, 7, 6.5)} !important` }}>
            {isNotMobile ? (
              <Box sx={{ mb: 6 }}>
                <Typography variant='h5' sx={{ mb: 1.5, fontWeight: 600, letterSpacing: '0.18px' }}>
                  {step === 1 ? `Sign into your account` : 'Verify your email'}
                </Typography>
              </Box>
            ) : (
              ''
            )}

            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      label='Email'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      placeholder='hello@masma.com'
                    />
                  )}
                />
                {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
              </FormControl>

              <Button
                fullWidth
                size='large'
                type='submit'
                variant='contained'
                sx={{ mb: 2, borderRadius: 1000 }}
                disabled={loading}
              >
                {loading ? <CircularProgress /> : 'Send Code'}
              </Button>
              <Divider sx={{ mt: 5, mb: 7.5, '& .MuiDivider-wrapper': { px: 4 } }}>Or</Divider>
              <Button fullWidth size='large' variant='outlined' sx={{ mb: 7, borderRadius: 1000 }} disabled={true}>
                <Image src={Logo.src} alt='logo' width={20} height={20} />
                <span style={{ paddingLeft: '10px' }}>{`Masma Connect`}</span>
              </Button>
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
                <Typography sx={{ mr: 2, color: 'text.secondary' }}>New on our platform?</Typography>
                <Typography>
                  <Link passHref href='/register'>
                    <Typography component={MuiLink} sx={{ color: 'primary.main' }}>
                      Create an account
                    </Typography>
                  </Link>
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </RespBox>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
