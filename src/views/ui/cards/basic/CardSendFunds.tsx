import React, { useState } from 'react'
import { Box, Card, OutlinedInput, Typography, Button, Avatar, Modal } from '@mui/material'
import { Magnify } from 'mdi-material-ui'

const CardSendFunds = ({ recentContacts = null }: { recentContacts: any }) => {
  const [modalStatus, setModal] = useState(false)
  const handleOpen = () => {
    setModal(true)
  }

  const handleClose = () => {
    setModal(false)
  }

  return (
    <Card
      sx={{
        padding: 4,
        width: '100%',
        maxWidth: 1100,
        marginRight: 4,
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ minWidth: 400, width: '50%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='h6'>Send Money to anyone</Typography>
          <Typography variant='caption'>Live</Typography>
        </Box>

        <Box style={{ paddingBottom: 14, marginTop: 12 }}>
          <Box>
            <OutlinedInput
              startAdornment={<Magnify></Magnify>}
              fullWidth
              placeholder='Name, username, ENS, email, or mobile'
              sx={{ borderRadius: 24 }}
            ></OutlinedInput>
          </Box>

          <Button variant='outlined' sx={{ marginTop: 6, borderRadius: 24, paddingX: 3 }}>
            Next
          </Button>
        </Box>
        <hr style={{ borderTop: '1px solid #EBEAEF' }} />
        <Box>
          <Box sx={{ display: 'flex', marginBottom: 8 }}>
            {recentContacts
              ? recentContacts.map((contact: any, index: number) => {
                  return (
                    <Box key={`contact ${index}`} style={{ marginRight: 24 }}>
                      <Avatar src={contact.imgSrc} sx={{ boxShadow: 4, marginY: 3 }}></Avatar>
                      <Typography>{contact.name}</Typography>
                    </Box>
                  )
                })
              : null}
          </Box>
          <Typography variant='body2' sx={{ color: '#6ECEED' }}>
            Manage Contacts
          </Typography>
        </Box>
      </Box>

      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <Typography>Wallet Balance: $0.00</Typography>
        <Typography onClick={handleOpen}>Add Funds</Typography>
      </Box>
      <Modal
        open={modalStatus}
        onClose={handleClose}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box>ADD WIDGET HERE</Box>
        {/*ADD */}
      </Modal>
    </Card>
  )
}

export default CardSendFunds
