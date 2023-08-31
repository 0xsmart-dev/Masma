// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import LinkVariant from 'mdi-material-ui/LinkVariant'

// ** Styled component for the Facebook image
const Img = styled('img')(({ theme }) => ({
  marginLeft: theme.spacing(1.75),
  marginRight: theme.spacing(1.75)
}))

const UserViewConnection = () => {
  return (
    <Fragment>
      <Card sx={{ mb: 6 }}>
        <CardHeader
          title='Connected Accounts'
          titleTypographyProps={{ variant: 'h6' }}
          subheaderTypographyProps={{ variant: 'body2' }}
          subheader='Display content from your connected accounts on your site'
        />
        <CardContent>
          <Box
            sx={{
              mb: 7,
              mt: 2.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img width='35' height='35' alt='Google' src='/images/logos/google.png' />
              <Box sx={{ ml: 4 }}>
                <Typography sx={{ fontWeight: 600 }}>Google</Typography>
                <Typography variant='body2'>Calendar and contacts</Typography>
              </Box>
            </Box>
            <Switch defaultChecked />
          </Box>

          <Box sx={{ display: 'flex', mb: 7, alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img width='35' height='35' alt='Slack' src='/images/logos/slack.png' />
              <Box sx={{ ml: 4 }}>
                <Typography sx={{ fontWeight: 600 }}>Slack</Typography>
                <Typography variant='body2'>Communication</Typography>
              </Box>
            </Box>
            <Switch defaultChecked />
          </Box>

          <Box sx={{ display: 'flex', mb: 7, alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img width='35' height='35' alt='Github' src='/images/logos/github.png' />
              <Box sx={{ ml: 4 }}>
                <Typography sx={{ fontWeight: 600 }}>Github</Typography>
                <Typography variant='body2'>Manage your Git repositories</Typography>
              </Box>
            </Box>
            <Switch defaultChecked />
          </Box>

          <Box sx={{ display: 'flex', mb: 7, alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img width='35' height='35' alt='Mailchimp' src='/images/logos/mail-chimp.png' />
              <Box sx={{ ml: 4 }}>
                <Typography sx={{ fontWeight: 600 }}>Mailchimp</Typography>
                <Typography variant='body2'>Email marketing service</Typography>
              </Box>
            </Box>
            <Switch defaultChecked />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img width='35' height='35' alt='Asana' src='/images/logos/asana.png' />
              <Box sx={{ ml: 4 }}>
                <Typography sx={{ fontWeight: 600 }}>Asana</Typography>
                <Typography variant='body2'>Communication</Typography>
              </Box>
            </Box>
            <Switch defaultChecked />
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          title='Social Accounts'
          titleTypographyProps={{ variant: 'h6' }}
          subheaderTypographyProps={{ variant: 'body2' }}
          subheader='Display content from social accounts on your site'
        />
        <CardContent>
          <Box
            sx={{
              mb: 6,
              mt: 2.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Img height='35' alt='Facebook' src='/images/logos/facebook.png' />
              <Box sx={{ ml: 4 }}>
                <Typography sx={{ fontWeight: 600 }}>Facebook</Typography>
                <Typography variant='body2'>Not connected</Typography>
              </Box>
            </Box>
            <Button color='secondary' sx={{ p: 2, minWidth: 38 }}>
              <LinkVariant />
            </Button>
          </Box>

          <Box sx={{ display: 'flex', mb: 6, alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Img width='35' height='35' alt='Twitter' src='/images/logos/twitter.png' />
              <Box sx={{ ml: 4 }}>
                <Typography sx={{ fontWeight: 600 }}>Twitter</Typography>
                <Typography variant='body2'>@Theme_Selection</Typography>
              </Box>
            </Box>
            <Button color='secondary' sx={{ p: 2, minWidth: 38 }}>
              <DeleteOutline />
            </Button>
          </Box>

          <Box sx={{ display: 'flex', mb: 6, alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Img width='35' height='35' alt='LinkedIn' src='/images/logos/linkedin.png' />
              <Box sx={{ ml: 4 }}>
                <Typography sx={{ fontWeight: 600 }}>LinkedIn</Typography>
                <Typography variant='body2'>@Pixinvent</Typography>
              </Box>
            </Box>
            <Button color='secondary' sx={{ p: 2, minWidth: 38 }}>
              <DeleteOutline />
            </Button>
          </Box>

          <Box sx={{ display: 'flex', mb: 6, alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Img width='35' height='35' alt='Dribbble' src='/images/logos/dribbble.png' />
              <Box sx={{ ml: 4 }}>
                <Typography sx={{ fontWeight: 600 }}>Dribbble</Typography>
                <Typography variant='body2'>Not connected</Typography>
              </Box>
            </Box>
            <Button color='secondary' sx={{ p: 2, minWidth: 38 }}>
              <LinkVariant />
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Img width='35' height='35' alt='Behance' src='/images/logos/behance.png' />
              <Box sx={{ ml: 4 }}>
                <Typography sx={{ fontWeight: 600 }}>Behance</Typography>
                <Typography variant='body2'>Not connected</Typography>
              </Box>
            </Box>
            <Button color='secondary' sx={{ p: 2, minWidth: 38 }}>
              <LinkVariant />
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          title='Defi'
          titleTypographyProps={{ variant: 'h6' }}
          subheaderTypographyProps={{ variant: 'body2' }}
          subheader='Display content from wallets on your site'
        />
        <CardContent>
          <Box
            sx={{
              mb: 6,
              mt: 2.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Img height='35' alt='Facebook' src='/images/logos/facebook.png' />
              <Box sx={{ ml: 4 }}>
                <Typography sx={{ fontWeight: 600 }}>Metamask</Typography>
                <Typography variant='body2'>Not connected</Typography>
              </Box>
            </Box>
            <Button color='secondary' sx={{ p: 2, minWidth: 38 }}>
              <LinkVariant />
            </Button>
          </Box>

          <Box sx={{ display: 'flex', mb: 6, alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Img width='35' height='35' alt='Twitter' src='/images/logos/twitter.png' />
              <Box sx={{ ml: 4 }}>
                <Typography sx={{ fontWeight: 600 }}>Walletconnect</Typography>
                <Typography variant='body2'>@Theme_Selection</Typography>
              </Box>
            </Box>
            <Button color='secondary' sx={{ p: 2, minWidth: 38 }}>
              <DeleteOutline />
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Fragment>
  )
}

export default UserViewConnection
