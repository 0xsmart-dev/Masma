import React, { useState, useCallback, useEffect } from 'react'
import { Typography, Stack, Divider, TablePagination, TableContainer, TableBody } from '@mui/material'
import TransferHistoryItem from './TransferHistoryItem'
import { getUserTransfers } from 'src/lib/api'

const WalletTransfersScreen = ({ walletAddress }) => {
  const [transfers, setTransfers] = useState({
    userTransfers: [],
    totalCount: 0
  })
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const fetchUserTransfers = useCallback(async () => {
    setIsLoading(true)
    getUserTransfers(walletAddress, page, rowsPerPage).then(res => {
      setTransfers(res)
      setIsLoading(false)
    })
  }, [walletAddress, page, rowsPerPage])

  useEffect(() => {
    fetchUserTransfers()
  }, [fetchUserTransfers])

  return (
    <TableContainer>
      <Stack direction='column' divider={<Divider flexItem sx={{ width: '97%', alignSelf: 'center', margin: '0' }} />}>
        {!isLoading && transfers.totalCount === 0 && (
          <Typography padding={'10px 20px'} textAlign='center'>
            No History
          </Typography>
        )}
        {!isLoading &&
          transfers.totalCount > 0 &&
          transfers.userTransfers.map((transfer, id) => {
            return <TransferHistoryItem transfer={transfer} key={id} />
          })}
        {isLoading && <TransferHistoryItem loading />}
      </Stack>
      <TablePagination
        component='div'
        count={transfers.totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  )
}

export default WalletTransfersScreen
