import { Box, Grid, Typography } from '@mui/material'

const Balance = () => {
  return (
    <Grid container spacing={6}>
      <Grid item container md={6}>
        <Grid xs={12}>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Box display={'flex'} flexDirection='column' alignItems={'center'}>
              <img src='/images/icons/bank.svg' alt='bank_icon' />
              <Typography>Link a bank</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid xs={12}></Grid>
        <Grid xs={12}></Grid>
      </Grid>
      <Grid item md={6}></Grid>
    </Grid>
  )
}

export default Balance
