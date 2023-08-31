// ** React Imports
import { ReactNode, useState, Fragment, MouseEvent } from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Components
import Card from '@mui/material/Card'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// load image
import LogoImg from 'src/assets/images/login-logo.svg'

import { EmailInputForm } from 'src/views/page-components/register/EmailInputForm'
import { UsernameInputForm } from 'src/views/page-components/register/UsernameInputForm'

interface FormData {
  email: string
  terms: boolean
  username: string
}

const defaultValues: FormData = {
  email: '',
  username: '',
  terms: false
}

// ** Styled Components
const RespBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  }
}))

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const Register = ({ inviteCode }) => {
  // ** Hooks
  const theme = useTheme()
  const [step, setStep] = useState(1)
  const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'))
  const [email, setEmail] = useState('')
  const [smartWalletAddress, setSmartWalletAddress] = useState('')

  const onSubmitEmail = (email: string, aaAddress: string) => {
    setEmail(email)
    setSmartWalletAddress(aaAddress)
    setStep(2)
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
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <Image src={LogoImg.src} alt='logo' width={600} height={300} />
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography
              variant='h4'
              sx={{ mb: 1.5, fontWeight: 550, letterSpacing: '0.18px', color: 'black', textAlign: 'center' }}
            >
              {isNotMobile ? `Lets get you started` : `Create your Account`}
            </Typography>
            {isNotMobile ? (
              <Typography variant='h6' sx={{ mb: 1.5, letterSpacing: '0.18px', textAlign: 'center' }}>
                {` Your journey starts now`}
              </Typography>
            ) : (
              ''
            )}
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
        <RightWrapper
          sx={{
            [theme.breakpoints.down(1024)]: {
              marginInline: 'auto'
            }
          }}
        >
          <Card
            sx={{
              p: theme => `${theme.spacing(13, 7, 6.5)} !important`,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'background.paper',
              boxShadow: 'none',
              [theme.breakpoints.down('sm')]: {
                border: 'none!important'
              }
            }}
          >
            <BoxWrapper>
              {isNotMobile ? (
                <Box sx={{ mb: 6 }}>
                  <Typography variant='h5' sx={{ mb: 1.5, fontWeight: 600, letterSpacing: '0.18px' }}>
                    {step === 1 ? `Input your email address` : 'Input your username'}
                  </Typography>
                </Box>
              ) : (
                ''
              )}
              {step === 1 && <EmailInputForm email='' onEmailSubmit={onSubmitEmail} />}
              {step === 2 && <UsernameInputForm email={email} smartWallet={smartWalletAddress} />}
            </BoxWrapper>
          </Card>
        </RightWrapper>
        {/* <FooterIllustrationsV1 /> */}
      </Box>
    </RespBox>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Register.guestGuard = true

export default Register
