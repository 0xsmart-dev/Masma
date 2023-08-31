// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const series = [
  {
    name: 'Income',
    data: [70, 90, 80, 95, 75, 90]
  },
  {
    name: 'Net Worth',
    data: [110, 72, 62, 65, 100, 75]
  }
]

const CardWidgetsPerformance = () => {
  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      radar: {
        size: 110,
        polygons: { strokeColors: ['transparent'] }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: [theme.palette.warning.main, theme.palette.primary.main],
        shadeIntensity: 1,
        type: 'vertical',
        opacityFrom: 1,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    },
    colors: [theme.palette.warning.main, theme.palette.primary.main],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    markers: { size: 0 },
    xaxis: {
      labels: {
        show: true,
        style: { fontSize: '14px' }
      }
    },
    yaxis: { show: false },
    grid: { show: false }
  }

  return (
    <Card>
      <CardHeader
        title='Performance'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options'>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent
        sx={{
          '& .apexcharts-canvas .apexcharts-datalabel': { fill: theme.palette.text.secondary },
          '& .apexcharts-canvas .apexcharts-legend-series .apexcharts-legend-text': {
            letterSpacing: '0.4px',
            color: `${theme.palette.text.secondary} !important`
          }
        }}
      >
        <ReactApexcharts type='radar' height={294} series={series} options={options} />
      </CardContent>
    </Card>
  )
}

export default CardWidgetsPerformance
