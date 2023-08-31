import { Box, Card, CardContent, Typography } from '@mui/material'

export const CardMasmaAppDownload = () => {
  return (
    <Card>
      <CardContent>
        <Box display='flex' gap={2} alignItems='center'>
          <img src='/images/logo.png' alt='logo' />
          <Box display='flex' flex={1} justifyContent={'space-between'}>
            <Box>
              <Typography variant='h6' sx={{ fontSize: 20, fontWeight: '500' }}>
                Get the Masma app
              </Typography>
              <Typography variant='body1' sx={{ fontSize: 16 }}>
                Start doing more with Masma.
              </Typography>
            </Box>
            <Typography variant='body2' sx={{ fontSize: 18, fontWeight: '600' }}>
              Coming Soon
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
