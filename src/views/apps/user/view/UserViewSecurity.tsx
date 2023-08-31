// ** React Imports
import { ChangeEvent, Fragment, MouseEvent, useState, SyntheticEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import AlertTitle from '@mui/material/AlertTitle'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle'
import OutlinedInput from '@mui/material/OutlinedInput'
import DialogContent from '@mui/material/DialogContent'
import InputAdornment from '@mui/material/InputAdornment'
import TableContainer from '@mui/material/TableContainer'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import PencilOutline from 'mdi-material-ui/PencilOutline'

interface State {
  newPassword: string
  showNewPassword: boolean
  confirmNewPassword: string
  showConfirmNewPassword: boolean
}

interface DataType {
  device: string
  browser: string
  location: string
  recentActivity: string
}

const data: DataType[] = [
  {
    device: 'Dell XPS 15',
    location: 'United States',
    browser: 'Chrome on Windows',
    recentActivity: '10, Jan 2020 20:07'
  },
  {
    location: 'Ghana',
    device: 'Google Pixel 3a',
    browser: 'Chrome on Android',
    recentActivity: '11, Jan 2020 10:16'
  },
  {
    location: 'Mayotte',
    device: 'Apple iMac',
    browser: 'Chrome on MacOS',
    recentActivity: '11, Jan 2020 12:10'
  },
  {
    location: 'Mauritania',
    device: 'Apple iPhone XR',
    browser: 'Chrome on iPhone',
    recentActivity: '12, Jan 2020 8:29'
  }
]

const UserViewSecurity = () => {
  // ** States
  const [defaultValues, setDefaultValues] = useState<any>({ mobile: '+1(968) 819-2547' })
  const [mobileNumber, setMobileNumber] = useState<string>(defaultValues.mobile)
  const [openEditMobileNumber, setOpenEditMobileNumber] = useState<boolean>(false)
  const [values, setValues] = useState<State>({
    newPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showConfirmNewPassword: false
  })

  // Handle Password
  const handleNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }
  const handleMouseDownNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle Confirm Password
  const handleConfirmNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }
  const handleMouseDownConfirmNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle edit mobile number dialog
  const handleEditMobileNumberClickOpen = () => setOpenEditMobileNumber(true)
  const handleEditMobileNumberClose = () => setOpenEditMobileNumber(false)

  // Handle button click inside the dialog
  const handleCancelClick = () => {
    setMobileNumber(defaultValues.mobile)
    handleEditMobileNumberClose()
  }
  const handleSubmitClick = () => {
    setDefaultValues({ ...defaultValues, mobile: mobileNumber })
    handleEditMobileNumberClose()
  }

  return (
    <Fragment>
      <Card sx={{ mb: 6 }}>
        <CardHeader title='Change Password' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <Alert icon={false} severity='warning' sx={{ mb: 4 }}>
            <AlertTitle sx={{ mb: theme => `${theme.spacing(1)} !important` }}>
              Ensure that these requirements are met
            </AlertTitle>
            Minimum 8 characters long, uppercase & symbol
          </Alert>

          <form onSubmit={e => e.preventDefault()}>
            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size='small'>
                  <InputLabel htmlFor='user-view-security-new-password'>New Password</InputLabel>
                  <OutlinedInput
                    label='New Password'
                    value={values.newPassword}
                    id='user-view-security-new-password'
                    onChange={handleNewPasswordChange('newPassword')}
                    type={values.showNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowNewPassword}
                          aria-label='toggle password visibility'
                          onMouseDown={handleMouseDownNewPassword}
                        >
                          {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size='small'>
                  <InputLabel htmlFor='user-view-security-confirm-new-password'>Confirm New Password</InputLabel>
                  <OutlinedInput
                    label='Confirm New Password'
                    value={values.confirmNewPassword}
                    id='user-view-security-confirm-new-password'
                    type={values.showConfirmNewPassword ? 'text' : 'password'}
                    onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={handleMouseDownConfirmNewPassword}
                        >
                          {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ mt: 1.5 }}>
                <Button type='submit' variant='contained'>
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Card sx={{ mb: 6 }}>
        <CardHeader
          title='Two-step verification'
          titleTypographyProps={{ variant: 'h6' }}
          subheaderTypographyProps={{ variant: 'body2' }}
          subheader='Keep your account secure with authentication step.'
        />
        <CardContent>
          <Typography variant='body2' sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
            SMS
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant='body1' sx={{ color: 'action.active' }}>
              {mobileNumber}
            </Typography>
            <Box>
              <IconButton aria-label='edit' sx={{ color: 'text.secondary' }} onClick={handleEditMobileNumberClickOpen}>
                <PencilOutline />
              </IconButton>
              <IconButton aria-label='delete' sx={{ color: 'text.secondary' }}>
                <DeleteOutline />
              </IconButton>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Typography variant='body2'>
            Two-factor authentication adds an additional layer of security to your account by requiring more than just a
            password to log in.{' '}
            <Link href='/' onClick={(e: SyntheticEvent) => e.preventDefault()}>
              Learn more
            </Link>
            .
          </Typography>
        </CardContent>

        <Dialog
          open={openEditMobileNumber}
          onClose={handleCancelClick}
          aria-labelledby='user-view-security-edit-mobile-number'
          sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
          aria-describedby='user-view-security-edit-mobile-number-description'
        >
          <DialogTitle
            id='user-view-security-edit-mobile-number'
            sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}
          >
            Enable One Time Password
          </DialogTitle>

          <DialogContent>
            <Typography variant='h6'>Verify Your Mobile Number for SMS</Typography>
            <Typography variant='body2' sx={{ mt: 2, mb: 5 }}>
              Enter your mobile phone number with country code and we will send you a verification code.
            </Typography>
            <form onSubmit={e => e.preventDefault()}>
              <TextField
                fullWidth
                value={mobileNumber}
                label='Mobile number with country code'
                onChange={e => setMobileNumber(e.target.value)}
              />
              <Box sx={{ mt: 6.5, display: 'flex', justifyContent: 'flex-end' }}>
                <Button type='reset' color='secondary' variant='outlined' onClick={handleCancelClick}>
                  Cancel
                </Button>
                <Button type='submit' sx={{ ml: 3 }} variant='contained' onClick={handleSubmitClick}>
                  Send
                </Button>
              </Box>
            </form>
          </DialogContent>
        </Dialog>
      </Card>

      <Card>
        <CardHeader title='Recent devices' titleTypographyProps={{ variant: 'h6' }} />

        <Divider sx={{ m: 0 }} />

        <TableContainer>
          <Table sx={{ minWidth: 500 }}>
            <TableHead
              sx={{ backgroundColor: theme => (theme.palette.mode === 'light' ? 'grey.50' : 'background.default') }}
            >
              <TableRow>
                <TableCell sx={{ py: 3 }}>Browser</TableCell>
                <TableCell sx={{ py: 3 }}>Device</TableCell>
                <TableCell sx={{ py: 3 }}>Location</TableCell>
                <TableCell sx={{ py: 3 }}>Recent Activity</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((item: DataType, index: number) => (
                <TableRow hover key={index} sx={{ '&:last-of-type td': { border: 0 } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img width='22' height='22' alt='Chrome' src='/images/logos/chrome.png' />
                      <Typography sx={{ ml: 2 }}>{item.browser}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{item.device}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{item.location}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{item.recentActivity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Fragment>
  )
}

export default UserViewSecurity
