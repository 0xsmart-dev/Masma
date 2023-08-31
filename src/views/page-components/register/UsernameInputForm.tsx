// ** React Imports
import { ReactNode, useState, Fragment, MouseEvent, useRef, useEffect } from 'react'
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
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
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
import { CircularProgress, IconButton } from '@mui/material'

import { getCookie, setCookie } from 'src/lib/cookies'

// load image

import Logo from 'src/assets/images/LogImg.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { magic } from 'src/lib/magic/magic-client'
import { getSmartWalletAddress } from 'src/lib/zerodev'
import Avatar from '@mui/material/Avatar'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Next Import
import { useRouter } from 'next/router'

export const UsernameInputForm = ({ smartWallet, email }: { smartWallet: string; email: string }) => {
  const [loading, setLoading] = useState(false)
  const [s3FileUrl, setS3FileUrl] = useState<string>('')
  const theme = useTheme()
  const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'))
  const { fetchUserProfile } = useAuth()
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  // ** Vars
  const usernameFormSchema = yup.object().shape({
    username: yup.string().required('Username is a required value'),
    smartWallet: yup.string().required('Smart Wallet is a required value'),
    terms: yup.bool().oneOf([true], 'You must accept the privacy policy & terms')
  })

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm({
    defaultValues: { username: '', smartWallet, terms: false },
    mode: 'onBlur',
    resolver: yupResolver(usernameFormSchema)
  })

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]!
    const filename = file.name
    const fileType = file.type
    const res = await fetch(`/api/upload?file=${filename}&fileType=${fileType}`)
    const { url } = await res.json()
    const upload = await fetch(url, {
      method: 'PUT',
      body: file,
      headers: { 'Content-Type': fileType }
    })
    if (upload.ok) {
      console.log('Uploaded successfully!')
      const fileUrl = `https://masma.s3.us-east-1.amazonaws.com/${filename}`
      setS3FileUrl(fileUrl)
      console.log('File URL', fileUrl)
    } else {
      console.error('Upload failed.')
    }
  }

  const onSubmitAccount = async (data: any) => {
    // TODO: regiser
    setLoading(true)
    const didToken = getCookie('did_token')
    const registerResponse = await axios.post('/api/auth/register', {
      email,
      aaAddress: smartWallet,
      didToken,
      username: data.username,
      avatarUrl: s3FileUrl
    })

    setCookie('access_token', registerResponse.data.access_token)

    fetchUserProfile()
      .then(() => router.push('/'))
      .finally(() => setLoading(false))
  }

  const alphanumericRegex = /^[a-zA-Z0-9]*$/
  const validateInput = value => {
    return alphanumericRegex.test(value)
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmitAccount)}>
      <FormControl fullWidth sx={{ mb: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <input
            type='file'
            style={{ display: 'none' }}
            ref={inputRef}
            accept='image/png, image/jpeg'
            onChange={uploadPhoto}
          />
          <IconButton
            style={{
              margin: '10px',
              width: '100px',
              height: '100px'
            }}
            onClick={() => inputRef.current && inputRef.current.click()}
          >
            <Avatar
              style={{
                margin: '10px',
                width: '80px',
                height: '80px'
              }}
              src={s3FileUrl}
            />
          </IconButton>
        </div>
        <Typography
          style={{ color: 'grey', display: 'flex', justifyContent: 'center', fontSize: '15px', paddingBottom: '10px' }}
        >
          Select your profile photo
        </Typography>
        <Controller
          name='username'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              value={value}
              onBlur={onBlur}
              label='Username'
              onChange={onChange}
              placeholder='@johndoe'
              error={!validateInput(value)}
              helperText={!validateInput(value) ? 'Invalid username' : ''}
            />
          )}
        />
        {errors.username && <FormHelperText sx={{ color: 'error.main' }}>{errors.username.message}</FormHelperText>}
      </FormControl>
      <FormControl fullWidth sx={{ mb: 4 }}>
        <Controller
          name='smartWallet'
          control={control}
          rules={{ required: true }}
          render={() => <TextField value={smartWallet} label='Smart Wallet' disabled />}
        />
      </FormControl>
      <FormControl sx={{ my: 0 }} error={Boolean(errors.terms)}>
        <Controller
          name='terms'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => {
            return (
              <FormControlLabel
                sx={{
                  ...(errors.terms ? { color: 'error.main' } : null),
                  '& .MuiFormControlLabel-label': { fontSize: '0.875rem' }
                }}
                control={
                  <Checkbox checked={value} onChange={onChange} sx={errors.terms ? { color: 'error.main' } : null} />
                }
                label={
                  <Fragment>
                    <Typography variant='body2' component='span' sx={{ color: errors.terms ? 'error.main' : '' }}>
                      I agree to{' '}
                    </Typography>
                    <a
                      href='https://masma.gitbook.io/masma-whitepaper/legal/privacy-policy'
                      target='_blank'
                      rel='noreferrer'
                      onClick={e => e.stopPropagation()}
                    >
                      <Typography variant='body2' sx={{ color: 'primary.main', display: 'inline' }}>
                        privacy policy
                      </Typography>
                    </a>
                    <Typography variant='body2' component={MuiLink} sx={{ color: 'primary.main', display: 'inline' }}>
                      {` & `}
                    </Typography>
                    <a
                      href='https://masma.gitbook.io/masma-whitepaper/legal/terms-of-service'
                      target='_blank'
                      rel='noreferrer'
                      onClick={e => e.stopPropagation()}
                    >
                      <Typography variant='body2' sx={{ color: 'primary.main', display: 'inline' }}>
                        terms
                      </Typography>
                    </a>
                  </Fragment>
                }
              />
            )
          }}
        />
        {errors.terms && <FormHelperText sx={{ mt: 0, color: 'error.main' }}>{errors.terms.message}</FormHelperText>}
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
        {loading ? <CircularProgress /> : 'Create Account'}
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
