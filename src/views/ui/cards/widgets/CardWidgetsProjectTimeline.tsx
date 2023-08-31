// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid, { GridProps } from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'

// ** Icons Imports
import Creation from 'mdi-material-ui/Creation'
import Cellphone from 'mdi-material-ui/Cellphone'
import PencilRuler from 'mdi-material-ui/PencilRuler'
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// Styled Grid component
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const labels = ['Development Apps', 'UI Design', 'IOS Application', 'Web App Wireframing', 'Prototyping']

const series = [
  {
    data: [
      {
        x: 'Catherine',
        y: [
          new Date(`${new Date().getFullYear()}-01-01`).getTime(),
          new Date(`${new Date().getFullYear()}-04-02`).getTime()
        ]
      },
      {
        x: 'Janelle',
        y: [
          new Date(`${new Date().getFullYear()}-02-18`).getTime(),
          new Date(`${new Date().getFullYear()}-05-30`).getTime()
        ]
      },
      {
        x: 'Wellington',
        y: [
          new Date(`${new Date().getFullYear()}-02-07`).getTime(),
          new Date(`${new Date().getFullYear()}-04-31`).getTime()
        ]
      },
      {
        x: 'Blake',
        y: [
          new Date(`${new Date().getFullYear()}-01-14`).getTime(),
          new Date(`${new Date().getFullYear()}-06-30`).getTime()
        ]
      },
      {
        x: 'Quinn',
        y: [
          new Date(`${new Date().getFullYear()}-04-01`).getTime(),
          new Date(`${new Date().getFullYear()}-07-31`).getTime()
        ]
      }
    ]
  }
]

const CardWidgetsProjectTimeline = () => {
  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: { enabled: false },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 15,
        distributed: true,
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    stroke: {
      width: 2,
      colors: [theme.palette.background.paper]
    },
    colors: [
      hexToRGBA(theme.palette.primary.main, 1),
      hexToRGBA(theme.palette.success.main, 1),
      hexToRGBA(theme.palette.secondary.main, 1),
      hexToRGBA(theme.palette.info.main, 1),
      hexToRGBA(theme.palette.warning.main, 1)
    ],
    dataLabels: {
      enabled: true,
      formatter: (val, opts) => labels[opts.dataPointIndex]
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    legend: { show: false },
    grid: {
      strokeDashArray: 6,
      xaxis: {
        lines: { show: true }
      },
      yaxis: {
        lines: { show: false }
      },
      padding: {
        top: -22,
        left: 34,
        right: 18,
        bottom: 4
      }
    },
    xaxis: {
      type: 'datetime',
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: {
        datetimeFormatter: {
          year: 'MMM',
          month: 'MMM'
        }
      }
    },
    yaxis: {
      labels: { show: true, align: theme.direction === 'rtl' ? 'right' : 'left' }
    }
  }

  return (
    <Card>
      <Grid container>
        <StyledGrid item xs={12} sm={8}>
          <CardHeader
            title='Project Timeline'
            subheader='Total 840 Task Completed'
            subheaderTypographyProps={{ sx: { lineHeight: 1.429 } }}
            titleTypographyProps={{ sx: { letterSpacing: '0.15px' } }}
          />
          <Box
            sx={{
              '& .apexcharts-data-labels .apexcharts-datalabel': { fill: theme.palette.common.white },
              '& .apexcharts-canvas': {
                '& .apexcharts-yaxis-label': { fontSize: '0.875rem' },
                '& .apexcharts-xaxis-label': { letterSpacing: '0.4px', fill: theme.palette.text.disabled }
              }
            }}
          >
            <ReactApexcharts height={240} type='rangeBar' series={series} options={options} />
          </Box>
        </StyledGrid>
        <Grid item xs={12} sm={4}>
          <CardHeader
            title='Project List'
            subheader='3 Ongoing Projects'
            subheaderTypographyProps={{ sx: { lineHeight: 1.429 } }}
            titleTypographyProps={{ sx: { letterSpacing: '0.15px' } }}
            action={
              <IconButton size='small' aria-label='settings' className='card-more-options'>
                <DotsVertical />
              </IconButton>
            }
          />
          <CardContent sx={{ pt: `${theme.spacing(5)} !important` }}>
            <Box sx={{ mb: 7.5, display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3, width: 45, height: 45 }}>
                <Cellphone />
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                  IOS Application
                </Typography>
                <Typography variant='caption'>Task 840/2.5k</Typography>
              </Box>
            </Box>
            <Box sx={{ mb: 7.5, display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' color='success' variant='rounded' sx={{ mr: 3, width: 45, height: 45 }}>
                <Creation />
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                  Web Application
                </Typography>
                <Typography variant='caption'>Task 99/1.42k</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' color='info' variant='rounded' sx={{ mr: 3, width: 45, height: 45 }}>
                <PencilRuler />
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                  UI Kit Design
                </Typography>
                <Typography variant='caption'>Task 120/350</Typography>
              </Box>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default CardWidgetsProjectTimeline
