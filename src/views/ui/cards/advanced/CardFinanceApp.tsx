// ** MUI Import
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Icons Imports
import Paperclip from 'mdi-material-ui/Paperclip'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CheckCircleOutline from 'mdi-material-ui/CheckCircleOutline'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

const CardFinanceApp = () => {
  return (
    <Card>
      <CardMedia sx={{ height: 200 }} image='/images/cards/iPhone-bg.png' />
      <CardContent>
        <Box sx={{ mb: 3.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomChip
              skin='light'
              size='small'
              color='success'
              label='UI Design'
              sx={{ mr: 2.5, height: 20, fontSize: '0.75rem', fontWeight: 500 }}
            />
            <CustomChip
              skin='light'
              size='small'
              color='error'
              label='React'
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500 }}
            />
          </Box>
          <IconButton size='small' aria-label='settings' className='card-more-options'>
            <DotsVertical />
          </IconButton>
        </Box>

        <Typography variant='h6' sx={{ mb: 1 }}>
          Finance iOS App
        </Typography>
        <Typography variant='body2' sx={{ mb: 4, fontWeight: 600 }}>
          Due Date: 20/Dec/2022
        </Typography>
        <Typography variant='body2' sx={{ mb: 6.25 }}>
          Managing your money isn’t the easiest thing to do. Now that many of us no longer balance a checkbook, tracking
          and expenses.
        </Typography>
        <Box sx={{ mb: 1.25, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}>
            Progress
          </Typography>
          <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
            68%
          </Typography>
        </Box>
        <LinearProgress value={68} color='success' sx={{ mb: 5.75 }} variant='determinate' />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <AvatarGroup sx={{ mr: 2 }}>
            <Avatar src='/images/avatars/3.png' alt='Olivia Sparks' />
            <Avatar src='/images/avatars/5.png' alt='Howard Lloyd' />
            <Avatar src='/images/avatars/4.png' alt='Hallie Richards' />
            <Avatar src='/images/avatars/2.png' alt='Alice Cobb' />
          </AvatarGroup>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Paperclip sx={{ mr: 1, fontSize: '1.375rem', color: 'text.secondary' }} />
            <Typography variant='body2' sx={{ mr: 2.5, fontWeight: 600 }}>
              24
            </Typography>
            <CheckCircleOutline sx={{ mr: 1, fontSize: '1.375rem', color: 'text.secondary' }} />
            <Typography variant='body2' sx={{ fontWeight: 600 }}>
              74/180
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardFinanceApp
