// ** React Imports
import { ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TableContainer from '@mui/material/TableContainer'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

interface DataType {
  title: string
  sales: string
  trend: ReactNode
  trendNumber: string
}

const data: DataType[] = [
  {
    sales: '18,879',
    title: 'Australia',
    trendNumber: '15%',
    trend: <ChevronDown sx={{ color: 'error.main' }} />
  },
  {
    sales: '10,357',
    title: 'Canada',
    trendNumber: '85%',
    trend: <ChevronUp sx={{ color: 'success.main' }} />
  },
  {
    sales: '4,860',
    title: 'India',
    trendNumber: '48%',
    trend: <ChevronUp sx={{ color: 'success.main' }} />
  },
  {
    sales: '899',
    title: 'US',
    trendNumber: '16%',
    trend: <ChevronDown sx={{ color: 'error.main' }} />
  },
  {
    sales: '43',
    title: 'Japan',
    trendNumber: '35%',
    trend: <ChevronUp sx={{ color: 'success.main' }} />
  },
  {
    sales: '18',
    title: 'Brazil',
    trendNumber: '12%',
    trend: <ChevronUp sx={{ color: 'success.main' }} />
  }
]

const CardSalesInCountries = () => {
  return (
    <Card>
      <CardHeader
        title='Most Sales in Countries'
        titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options'>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent>
        <Box sx={{ mb: 5, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ mb: 1.25, display: 'flex', alignItems: 'center' }}>
            <Typography variant='h3' sx={{ mr: 3.5 }}>
              22,842
            </Typography>
            <CustomChip
              skin='light'
              size='small'
              label='+42%'
              color='success'
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500 }}
            />
          </Box>
          <Typography variant='caption'>Sales Last 90 Days</Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableBody>
              {data.map((row: DataType) => {
                return (
                  <TableRow
                    key={row.title}
                    sx={{
                      '&:last-of-type td': { border: 0, pb: 0 },
                      '&:first-of-type td': { borderTop: theme => `1px solid ${theme.palette.divider}` },
                      '& .MuiTableCell-root': {
                        '&:last-of-type': { pr: 0 },
                        '&:first-of-type': { pl: 0 },
                        py: theme => `${theme.spacing(2.75)} !important`
                      }
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '0.875rem' }}>{row.title}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align='right'>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{row.sales}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Typography sx={{ mr: 1.5, fontWeight: 600, fontSize: '0.875rem' }}>
                          {row.trendNumber}
                        </Typography>
                        {row.trend}
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default CardSalesInCountries
