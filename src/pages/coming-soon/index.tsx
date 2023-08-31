/* eslint-disable newline-before-return */
// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { styled } from '@mui/material/styles'

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  marginTop: theme.spacing(15),
  marginBottom: theme.spacing(15),
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  }
}))

const ComingSoon = () => {
  return (
    <Grid item xs={12} md={12}>
      <Box className='content-center'>
        <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <BoxWrapper>
            <Typography variant='h5' sx={{ mb: 2.5, letterSpacing: '0.18px', fontSize: '1.5rem !important' }}>
              Something Big is Coming Your Way
            </Typography>
          </BoxWrapper>
          <Img alt='error-illustration' src='/images/pages/404.png' />
        </Box>
      </Box>
    </Grid>
  )
}

export default ComingSoon
