// ** React Imports
import { useEffect, useState, useCallback, ChangeEvent, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColumns, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types Imports
import { DataGridRowType } from 'src/@fake-db/types'

// ** Utils Import
import ServerSideToolbar from './ServerSideToolbar'
import { getOtherFollowings } from 'src/lib/api'
import { Button, CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'

type SortType = 'asc' | 'desc' | undefined | null

const OtherFollowingTable = ({ profileId }) => {
  const router = useRouter()
  const handleSendMoney = profileId => {
    event?.stopPropagation()
    router.replace(`/send-funds?profileId=${profileId}`)
  }

  const columns: GridColumns = [
    {
      flex: 0.175,
      minWidth: 290,
      field: 'name',
      headerName: 'Name',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar src={row.user.avatar} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.user.username}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.175,
      minWidth: 110,
      field: 'action',
      headerName: 'Actions',
      renderCell: (params: GridRenderCellParams) => (
        <Button
          size='small'
          variant='outlined'
          color='secondary'
          onClick={() => handleSendMoney(params.row.user.profileId)}
        >
          Send Money
        </Button>
      )
    }
  ]

  // ** State
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState<number>(0)
  const [sort, setSort] = useState<SortType>('desc')
  const [pageSize, setPageSize] = useState<number>(7)
  const [rows, setRows] = useState<DataGridRowType[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [sortColumn, setSortColumn] = useState<string>('createdAt')

  const fetchTableData = useCallback(
    async (sort: SortType, keyword: string, column: string, page: number, size: number) => {
      setLoading(true)
      const res = await getOtherFollowings(profileId, {
        keyword,
        sort,
        column,
        page,
        size
      })
      setLoading(false)
      setTotal(res.total)
      setRows(res.data)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, pageSize]
  )

  useEffect(() => {
    fetchTableData(sort, searchValue, sortColumn, page, pageSize)
  }, [fetchTableData, page, pageSize, searchValue, sort, sortColumn])

  const handleSortModel = (newModel: GridSortModel) => {
    if (newModel.length) {
      setSort(newModel[0].sort)
      setSortColumn(newModel[0].field)
      fetchTableData(newModel[0].sort, searchValue, newModel[0].field, page, pageSize)
    } else {
      setSort('desc')
      setSortColumn('createdAt')
    }
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)
    fetchTableData(sort, value, sortColumn, page, pageSize)
  }

  return (
    <Fragment>
      {loading ? (
        <Box
          sx={{
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <CircularProgress disableShrink sx={{ mt: 6 }} />
        </Box>
      ) : (
        <DataGrid
          autoHeight
          pagination
          rows={rows}
          rowCount={total}
          columns={columns}
          pageSize={pageSize}
          sortingMode='server'
          paginationMode='server'
          onSortModelChange={handleSortModel}
          rowsPerPageOptions={[7, 10, 25, 50]}
          onPageChange={newPage => setPage(newPage)}
          components={{ Toolbar: ServerSideToolbar }}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          componentsProps={{
            toolbar: {
              value: searchValue,
              clearSearch: () => handleSearch(''),
              onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
            }
          }}
          onRowClick={params => router.push(`/profile/${params.row.user.profileId}`)}
        />
      )}
    </Fragment>
  )
}

export default OtherFollowingTable
