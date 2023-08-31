import React, { useState, useEffect } from 'react'
import { Box, Table, TableCell, TableRow, TablePagination, TableBody, TableHead, TableContainer } from '@mui/material'
import axios from 'axios'

const WalletDepositsScreen = ({ walletAddress }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const columns = [
    {
      field: 'amount',
      headerName: 'USDC Received',
      type: 'number',
      hideable: false,
      disableColumnMenu: true
    },
    {
      field: 'status',
      headerName: 'Status',
      hideable: false,
      disableColumnMenu: true
    },
    { field: 'createdAt', headerName: 'Date', hideable: false, disableColumnMenu: true }
  ]

  const [deposits, setDeposits] = useState<any[]>([])
  useEffect(() => {
    axios.post(`/api/fund/deposit/get-deposit`, { walletAddress: walletAddress }).then(res => {
      if (deposits !== res.data) {
        setDeposits(res.data)
      }
    })
  }, [setDeposits, deposits, walletAddress])

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(({ headerName }) => (
                <TableCell key={headerName}>{headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 ? deposits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : deposits).map(
              transfer => (
                <TableRow key={transfer.chainId}>
                  {columns.map(({ field }) => (
                    <TableCell key={field}>
                      <Box
                        style={
                          field !== 'status'
                            ? {}
                            : {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor:
                                  transfer[field] === 'PROCESSING' || transfer[field] === 'PENDING'
                                    ? '#E7E7E7'
                                    : transfer[field] === 'COMPLETED'
                                    ? '#81D474'
                                    : '#FFFFFF',
                                color: '#1a3e72',
                                fontWeight: '600',
                                borderRadius: '25px'
                              }
                        }
                      >
                        {transfer[field]}
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
        <TablePagination
          component='div'
          count={deposits.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  )
}

export default WalletDepositsScreen
