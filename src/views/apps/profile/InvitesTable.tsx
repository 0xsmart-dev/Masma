// ** React Imports
import { useEffect, useState, useCallback, ChangeEvent, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColumns, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'

// ** Types Imports
import { DataGridRowType } from 'src/@fake-db/types'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import ServerSideToolbar from '../profile/ServerSideToolbar'
import { getInvites } from 'src/lib/api'
import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'

type SortType = 'asc' | 'desc' | undefined | null

const InvitesTable = ({ profileId }) => {
  const router = useRouter()
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
            <CustomAvatar src={row.userInfo.avatar} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.userInfo.name}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.175,
      minWidth: 290,
      field: 'email',
      headerName: 'User Email',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.userInfo.email}
              </Typography>
            </Box>
          </Box>
        )
      }
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
      console.log(profileId)
      setLoading(true)
      const res = await getInvites({
        keyword,
        sort,
        column,
        page,
        size,
        profileId
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
  }, [fetchTableData, page, pageSize, searchValue, sort, sortColumn, router])

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
          onRowClick={params => router.push(`/profile/${params.row.userInfo.profileId}`)}
        />
      )}
    </Fragment>
  )
}

export default InvitesTable
