import { Box, Card, CardContent, IconButton, Typography } from '@mui/material'

export const CardSetupProfile = () => {
  return (
    <Card>
      <CardContent>
        <Box display={'flex'} alignItems='center'>
          <Box display={'flex'} flex={1}>
            <img src='/images/icons/profile.svg' alt='prfile_icon' />
            <Box display={'flex'} flexDirection='column' justifyContent={'center'} marginLeft={2}>
              <Typography variant='h6' sx={{ fontWeight: '600' }}>
                Masma balance
              </Typography>
              <Typography variant='body2' sx={{ fontSize: 16 }}>
                Available in your 3Pay account
              </Typography>
            </Box>
          </Box>
          <IconButton>
            <img src='/images/icons/arrow-right-circle.svg' alt='right-arrow' />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  )
}
