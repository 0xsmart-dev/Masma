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

const CardWidgetsPerformanceOverview = () => {
  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    stroke: {
      curve: 'stepline'
    },
    colors: [hexToRGBA(theme.palette.warning.main, 1)],
    grid: {
      yaxis: {
        lines: { show: false }
      }
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      labels: { show: false }
    }
  }

  return (
    <Card>
      <CardHeader
        title='Performance Overview'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options'>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent>
        <ReactApexcharts
          type='line'
          height={202}
          options={options}
          series={[{ data: [7, 65, 40, 7, 40, 80, 45, 65, 65] }]}
        />
        <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Circle sx={{ mr: 1.5, fontSize: '0.75rem', color: 'warning.main' }} />
          <Typography variant='body2' sx={{ color: 'text.disabled' }}>
            Avarage cost per interaction is $5.65
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardWidgetsPerformanceOverview
