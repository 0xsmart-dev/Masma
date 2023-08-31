// ** React Imports
import { useState, SyntheticEvent, Fragment } from 'react'

// ** MUI Imports
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import MuiAvatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'

// ** Icons Imports
import MenuIcon from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'
import PhoneOutline from 'mdi-material-ui/PhoneOutline'
import VideoOutline from 'mdi-material-ui/VideoOutline'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import MessageOutline from 'mdi-material-ui/MessageOutline'

// ** Custom Components Import
import ChatLog from './ChatLog'
import SendMsgForm from 'src/views/apps/chat/SendMsgForm'

// ** Types
import { ChatContentType } from 'src/types/apps/chatTypes'
import { useRouter } from 'next/router'

// ** Styled Components
const ChatWrapperStartChat = styled(Box)<BoxProps>(({ theme }) => ({
  flexGrow: 1,
  height: '100%',
  display: 'flex',
  borderRadius: 1,
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.palette.action.hover
}))

const ChatContent = (props: ChatContentType) => {
  const router = useRouter()

  // ** Props
  const {
    store,
    hidden,

    // sendMsg,
    mdAbove,
    dispatch,
    handleLeftSidebarToggle,
    handleUserProfileRightSidebarToggle
  } = props

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget as HTMLElement)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleStartConversation = () => {
    if (!mdAbove) {
      handleLeftSidebarToggle()
    }
  }

  const handleViewProfile = () => {
    const selectedChat = store.selectedChat
    if (selectedChat) {
      router.push(`/profile/${selectedChat.contact.profileId}`)
    }
    handleClose()
  }

  const handleSendMoney = () => {
    const selectedChat = store.selectedChat
    if (selectedChat) {
      router.push(`/send-funds/${selectedChat.contact.profileId}`)
    }
    handleClose()
  }

  const renderContent = () => {
    if (store) {
      const selectedChat = store.selectedChat
      if (!selectedChat) {
        return (
          <ChatWrapperStartChat
            sx={{
              ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
            }}
          >
            <MuiAvatar
              sx={{
                mb: 5,
                pt: 8,
                pb: 7,
                px: 7.5,
                width: 110,
                height: 110,
                backgroundColor: 'background.paper',
                boxShadow: theme => theme.shadows[3]
              }}
            >
              <MessageOutline sx={{ width: 50, height: 50, color: 'action.active' }} />
            </MuiAvatar>
            <Box
              onClick={handleStartConversation}
              sx={{
                px: 6,
                py: 2.25,
                borderRadius: 5,
                backgroundColor: 'background.paper',
                boxShadow: theme => theme.shadows[3],
                cursor: mdAbove ? 'default' : 'pointer'
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>Start Conversation</Typography>
            </Box>
          </ChatWrapperStartChat>
        )
      } else {
        return (
          <Box
            sx={{
              flexGrow: 1,
              width: '100%',
              height: '100%',
              backgroundColor: theme => theme.palette.action.hover
            }}
          >
            <Box
              sx={{
                py: 3,
                px: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: theme => `1px solid ${theme.palette.divider}`
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {mdAbove ? null : (
                  <IconButton onClick={handleLeftSidebarToggle} sx={{ mr: 2 }}>
                    <MenuIcon />
                  </IconButton>
                )}
                <Box
                  onClick={handleUserProfileRightSidebarToggle}
                  sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                >
                  <Badge
                    overlap='circular'
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    sx={{ mr: 4.5 }}
                    badgeContent={
                      <Box
                        component='span'
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',

                          // color: `${statusObj[selectedChat.contact.status]}.main`,
                          boxShadow: theme => `0 0 0 2px ${theme.palette.background.paper}`

                          // backgroundColor: `${statusObj[selectedChat.contact.status]}.main`
                        }}
                      />
                    }
                  >
                    <MuiAvatar
                      src={selectedChat.contact.avatar}
                      alt={selectedChat.contact.username}
                      sx={{ width: 40, height: 40 }}
                    />
                  </Badge>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ color: 'text.secondary' }}>{selectedChat.contact.username}</Typography>
                    {/* <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                      {selectedChat.contact.role}
                    </Typography> */}
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {/* {mdAbove ? (
                  <Fragment>
                    <IconButton size='small' sx={{ color: 'text.secondary' }}>
                      <PhoneOutline />
                    </IconButton>
                    <IconButton size='small' sx={{ color: 'text.secondary' }}>
                      <VideoOutline sx={{ fontSize: '1.5rem' }} />
                    </IconButton>
                    <IconButton size='small' sx={{ color: 'text.secondary' }}>
                      <Magnify />
                    </IconButton>
                  </Fragment>
                ) : null} */}
                <IconButton size='small' onClick={handleClick} sx={{ color: 'text.secondary' }}>
                  <DotsVertical />
                </IconButton>
                <Menu
                  open={open}
                  sx={{ mt: 2 }}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                >
                  <MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
                  <MenuItem onClick={handleSendMoney}>Send Money</MenuItem>
                </Menu>
              </Box>
            </Box>

            {selectedChat ? <ChatLog hidden={hidden} data={{ ...selectedChat }} /> : null}

            <SendMsgForm store={store} dispatch={dispatch} />

            {/* <UserProfileRight
              store={store}
              hidden={hidden}
              statusObj={statusObj}
              getInitials={getInitials}
              sidebarWidth={sidebarWidth}
              userProfileRightOpen={userProfileRightOpen}
              handleUserProfileRightSidebarToggle={handleUserProfileRightSidebarToggle}
            /> */}
          </Box>
        )
      }
    } else {
      return null
    }
  }

  return renderContent()
}

export default ChatContent
