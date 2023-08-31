// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import Circle from 'mdi-material-ui/Circle'
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const CardWidgetsOrganicSessions = () => {
  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      sparkline: { enabled: true }
    },
    colors: [
      theme.palette.warning.main,
      hexToRGBA(theme.palette.warning.main, 0.8),
      hexToRGBA(theme.palette.warning.main, 0.6),
      hexToRGBA(theme.palette.warning.main, 0.4),
      hexToRGBA(theme.palette.warning.main, 0.2)
    ],
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    stroke: { width: 3, lineCap: 'round', colors: [theme.palette.background.paper] },
    labels: ['USA', 'India', 'Canada', 'Japan', 'France'],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    plotOptions: {
      pie: {
        endAngle: 130,
        startAngle: -130,
        customScale: 0.9,
        donut: {
          size: '83%',
          labels: {
            show: true,
            name: {
              offsetY: 25
            },
            value: {
              offsetY: -15,
              formatter: value => `${value}k`
            },
            total: {
              show: true,
              label: '2022',
              formatter: value => `${value.globals.seriesTotals.reduce((total: number, num: number) => total + num)}k`
            }
          }
        }
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title='Organic Sessions'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options'>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent
        sx={{
          '& .apexcharts-datalabel-value': { fontWeight: '500 !important', fontSize: '2rem !important' },
          '& .apexcharts-datalabel-label': {
            fontSize: '1rem !important',
            fill: `${theme.palette.text.secondary} !important`
          }
        }}
      >
        <ReactApexcharts type='donut' height={270} options={options} series={[13, 18, 18, 24, 16]} />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ mx: 3, display: 'flex', alignItems: 'center' }}>
            <Circle sx={{ mr: 1.25, fontSize: '0.75rem', color: 'warning.main' }} />
            <Typography variant='body2' sx={{ color: 'text.primary' }}>
              USA
            </Typography>
          </Box>
          <Box sx={{ mx: 3, display: 'flex', alignItems: 'center' }}>
            <Circle sx={{ mr: 1.25, fontSize: '0.75rem', color: hexToRGBA(theme.palette.warning.main, 0.8) }} />
            <Typography variant='body2' sx={{ color: 'text.primary' }}>
              India
            </Typography>
          </Box>
          <Box sx={{ mx: 3, display: 'flex', alignItems: 'center' }}>
            <Circle sx={{ mr: 1.25, fontSize: '0.75rem', color: hexToRGBA(theme.palette.warning.main, 0.6) }} />
            <Typography variant='body2' sx={{ color: 'text.primary' }}>
              Canada
            </Typography>
          </Box>
          <Box sx={{ mx: 3, display: 'flex', alignItems: 'center' }}>
            <Circle sx={{ mr: 1.25, fontSize: '0.75rem', color: hexToRGBA(theme.palette.warning.main, 0.4) }} />
            <Typography variant='body2' sx={{ color: 'text.primary' }}>
              Japan
            </Typography>
          </Box>
          <Box sx={{ mx: 3, display: 'flex', alignItems: 'center' }}>
            <Circle sx={{ mr: 1.25, fontSize: '0.75rem', color: hexToRGBA(theme.palette.warning.main, 0.2) }} />
            <Typography variant='body2' sx={{ color: 'text.primary' }}>
              France
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardWidgetsOrganicSessions
