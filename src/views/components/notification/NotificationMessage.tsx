// ** MUI Imports
import { Box, Typography } from '@mui/material'
import InformationOutline from 'mdi-material-ui/InformationOutline'
import Close from 'mdi-material-ui/Close'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useMemo } from 'react'

const NotificationMessage = ({ content, t }) => {
  const message = useMemo(() => {
    return `${content.fromUser.username} messaged you`
  }, [content])

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <InformationOutline />
        <Typography sx={{ ml: 4, fontWeight: 500 }}>{message}</Typography>
      </Box>
      <Close sx={{ cursor: 'pointer' }} onClick={() => toast.dismiss(t.id)} />
    </Box>
  )
}

export default NotificationMessage
