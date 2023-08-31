import { ChangeEvent, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import QuickSearchToolbar from 'src/views/table/TokensTable/QuickSearchToolbar'
import { useRouter } from 'next/router'
import { TokenType } from 'src/types/apps/investingTypes'
import { formatTokenPrice } from 'src/utils/helper'
import numeral from 'numeral'

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const columns: GridColumns = [
  {
    flex: 3,
    minWidth: 200,
    field: 'name',
    headerName: 'Name',
    renderCell: ({ row }: GridRenderCellParams) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar src={`${row.logoUrl}`} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography noWrap variant='body2' sx={{ color: 'text.primary' }}>
            {row.name}
          </Typography>
          <Typography noWrap variant='caption'>
            {row.symbol}
          </Typography>
        </Box>
      </Box>
    )
  },
  {
    flex: 1.5,
    minWidth: 80,
    headerName: 'Price',
    field: 'price',
    renderCell: ({ row }: GridRenderCellParams) => {
      console.log(row.name)
      console.log(row.price)

      return (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {Number(row.price) ? formatTokenPrice(row.price) : '$0.00'}
        </Typography>
      )
    }
  },
  {
    flex: 1,
    minWidth: 100,
    field: 'change',
    headerName: 'Change',
    renderCell: ({ row }: GridRenderCellParams) => {
      const change = row.pricePercentChange?.toFixed(2)

      return !change ? (
        '---'
      ) : (
        <CustomChip
          size='small'
          skin='light'
          color={change.includes('-') ? 'error' : 'success'}
          label={change.includes('-') ? `${change}%` : `+${change}%`}
        />
      )
    }
  },
  {
    flex: 1,
    field: 'marketcap',
    minWidth: 80,
    headerName: 'TVL',
    renderCell: ({ row }: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary', textTransform: 'uppercase' }}>
        {Number(row.totalValueLocked) ? numeral(row.totalValueLocked).format('($0.00a)') : '---'}
      </Typography>
    )
  },
  {
    flex: 1,
    field: 'buy',
    minWidth: 80,
    headerName: 'Action',
    renderCell: () => (
      <Button
        size='small'
        variant='contained'
        onClick={e => {
          e.stopPropagation()
        }}
      >
        Buy
      </Button>
    )
  },
  {
    flex: 0.5,
    field: 'watched',
    minWidth: 80,
    headerName: 'Watch',
    renderCell: ({ row }: GridRenderCellParams) => <Rating value={row.watched ? 1 : null} name='watch' max={1} />
  }
]

interface CoinMarketTableProps {
  tokens: TokenType[]
  isFetchingTokens?: boolean
}

const CoinMarketTable = ({ tokens, isFetchingTokens = false }: CoinMarketTableProps) => {
  const [data, setData] = useState<TokenType[]>(tokens)
  const [pageSize, setPageSize] = useState<number>(20)
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<TokenType[]>(tokens)
  const router = useRouter()

  useEffect(() => {
    setData(tokens)
    setFilteredData(tokens)
  }, [tokens])

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = data.filter(row => {
      return Object.values(row).some(value => {
        return searchRegex.test(value?.toString())
      })
    })
    if (searchValue) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData(data)
    }
  }

  return (
    <Card>
      <DataGrid
        autoHeight
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[7, 10, 25, 50]}
        components={{ Toolbar: QuickSearchToolbar }}
        rows={filteredData}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        componentsProps={{
          toolbar: {
            value: searchText,
            clearSearch: () => handleSearch(''),
            onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
          }
        }}
        onRowClick={row => {
          console.log(row)
          router.push(`/investing/${row.id}`)
        }}
        loading={isFetchingTokens}
      />
    </Card>
  )
}

export default CoinMarketTable
