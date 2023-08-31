// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import MenuUp from 'mdi-material-ui/MenuUp'
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

interface DataType {
  title: string
  imgAlt: string
  imgSrc: string
  amount: string
  subtitle: string
  chipText: string
  chipColor: ThemeColor
}

const data: DataType[] = [
  {
    amount: '12,348',
    chipText: '+12%',
    title: 'Facebook',
    imgAlt: 'facebook',
    chipColor: 'success',
    subtitle: 'Social Media',
    imgSrc: '/images/cards/social-facebook.png'
  },
  {
    amount: '8,450',
    chipText: '+32%',
    title: 'Dribbble',
    imgAlt: 'dribbble',
    chipColor: 'success',
    subtitle: 'Community',
    imgSrc: '/images/cards/social-dribbble.png'
  },
  {
    amount: '350',
    chipText: '-18%',
    title: 'Twitter',
    imgAlt: 'twitter',
    chipColor: 'error',
    subtitle: 'Social Media',
    imgSrc: '/images/cards/social-twitter.png'
  },
  {
    amount: '25,566',
    chipText: '+45%',
    title: 'Instagram',
    imgAlt: 'instagram',
    chipColor: 'success',
    subtitle: 'Social Media',
    imgSrc: '/images/cards/social-instagram.png'
  }
]

const CardSocialNetworkVisits = () => {
  return (
    <Card>
      <CardHeader
        title='Social Network Visits'
        titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options'>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent>
        <Box sx={{ mb: 0.5, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ mr: 0.5 }}>
            28,468
          </Typography>
          <MenuUp sx={{ mr: 0.5, fontSize: '1.875rem', color: 'success.main' }} />
          <Typography variant='body2' sx={{ fontWeight: 600, color: 'success.main' }}>
            62%
          </Typography>
        </Box>

        <Typography component='p' variant='caption' sx={{ mb: 5 }}>
          Last 1 Year Visits
        </Typography>
        {data.map((item: DataType, index: number) => {
          return (
            <Box
              key={item.title}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: index !== data.length - 1 ? 5.75 : undefined
              }}
            >
              <img width={34} height={34} alt={item.imgAlt} src={item.imgSrc} />
              <Box
                sx={{ ml: 3, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {item.title}
                  </Typography>
                  <Typography variant='caption'>{item.subtitle}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {item.amount}
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={item.chipText}
                    color={item.chipColor}
                    sx={{ ml: 4.5, height: 20, fontSize: '0.75rem', fontWeight: 500 }}
                  />
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default CardSocialNetworkVisits
