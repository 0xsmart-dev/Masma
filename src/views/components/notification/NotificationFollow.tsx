// ** MUI Imports
import { Box, Typography } from '@mui/material'
import InformationOutline from 'mdi-material-ui/InformationOutline'
import Close from 'mdi-material-ui/Close'

// ** Third Party Components
import toast, { Toast } from 'react-hot-toast'
import { NotificationObj } from 'src/types/apps/notificationTypes'
import { useMemo } from 'react'
import { useAuth } from 'src/hooks/useAuth'

const NotificationFollow = ({ content, t }: { content: NotificationObj; t: Toast }) => {
  const { user } = useAuth()
  const message = useMemo(() => {
    console.log('asdf')
    console.log(content)
    if (content.fromUserId == user?.id) {
      return `You followed ${content.toUser.username}`
    }

    if (content.toUserId == user?.id) {
      return `${content.toUser.username} followed you`
    }

    return ''
  }, [content, user?.id])

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

export default NotificationFollow
