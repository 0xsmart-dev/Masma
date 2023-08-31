// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import StarOutline from 'mdi-material-ui/StarOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

// Styled Box component
const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const CardMembership = () => {
  return (
    <Card>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={7}>
          <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important` }}>
            <Typography variant='h6' sx={{ mb: 2 }}>
              Lifetime Membership
            </Typography>
            <Typography variant='body2'>
              Here, I focus on a range of items and features that we use in life without giving them a second thought
              such as Coca Cola, body muscles and holding ones own breath. Though, most of these notes are not
              fundamentally necessary, they are such that you can use them for a good laugh, at a drinks party or for
              picking up women or men.
            </Typography>
            <Divider sx={{ my: 7 }} />
            <Grid container spacing={4}>
              <Grid item xs={12} sm={5}>
                <StyledBox>
                  <Box sx={{ py: 1.25, mb: 4, display: 'flex', alignItems: 'center' }}>
                    <LockOpenOutline sx={{ color: 'primary.main', mr: 2.5 }} fontSize='small' />
                    <Typography variant='body2'>Full Access</Typography>
                  </Box>
                  <Box sx={{ py: 1.25, display: 'flex', alignItems: 'center' }}>
                    <AccountOutline sx={{ color: 'primary.main', mr: 2.5 }} fontSize='small' />
                    <Typography variant='body2'>15 Members</Typography>
                  </Box>
                </StyledBox>
              </Grid>
              <Grid item xs={12} sm={7}>
                <Box sx={{ py: 1.25, mb: 4, display: 'flex', alignItems: 'center' }}>
                  <StarOutline sx={{ color: 'primary.main', mr: 2.5 }} fontSize='small' />
                  <Typography variant='body2'>Access all Features</Typography>
                </Box>
                <Box sx={{ py: 1.25, display: 'flex', alignItems: 'center' }}>
                  <TrendingUp sx={{ color: 'primary.main', mr: 2.5 }} fontSize='small' />
                  <Typography variant='body2'>Lifetime Free Update</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
        <Grid
          item
          sm={5}
          xs={12}
          sx={{ pt: ['0 !important', '1.5rem !important'], pl: ['1.5rem !important', '0 !important'] }}
        >
          <CardContent
            sx={{
              height: '100%',
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'action.hover'
            }}
          >
            <Box>
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <Typography variant='h6'>$</Typography>
                <Typography variant='h3' sx={{ lineHeight: 0.9334, fontSize: '3.75rem !important' }}>
                  899
                </Typography>
                <Typography variant='h6'>USD</Typography>
              </Box>
              <Typography variant='body2' sx={{ mb: 7, display: 'flex', flexDirection: 'column' }}>
                <span>5 Tips For Offshore</span>
                <span>Software Development</span>
              </Typography>
              <Button variant='contained'>Contact Now</Button>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default CardMembership
