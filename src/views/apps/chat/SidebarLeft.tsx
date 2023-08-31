// ** React Imports
import { useState, useEffect, ChangeEvent, ReactNode, useCallback } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Chip from '@mui/material/Chip'
import Badge from '@mui/material/Badge'
import Drawer from '@mui/material/Drawer'
import { Theme } from '@mui/material/styles'
import MuiAvatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import Magnify from 'mdi-material-ui/Magnify'

// ** Types
import { ChatSidebarLeftType, ChatsArrType } from 'src/types/apps/chatTypes'

// ** Chat App Components Imports
import UserProfileLeft from 'src/views/apps/chat/UserProfileLeft'
import { UserDataType } from 'src/context/types'

const ScrollWrapper = ({ children, hidden }: { children: ReactNode; hidden: boolean }) => {
  if (hidden) {
    return <Box sx={{ height: '100%', overflow: 'auto' }}>{children}</Box>
  } else {
    return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>
  }
}

const SidebarLeft = (props: ChatSidebarLeftType) => {
  // ** Props
  const {
    store,
    hidden,
    mdAbove,
    dispatch,
    statusObj,
    userStatus,
    selectChat,
    sidebarWidth,
    setUserStatus,
    leftSidebarOpen,
    removeSelectedChat,
    formatDateToMonthShort,
    userProfileLeftOpen,
    handleLeftSidebarToggle,
    handleUserProfileLeftSidebarToggle
  } = props

  // ** States
  const [query, setQuery] = useState<string>('')
  const [filteredChat, setFilteredChat] = useState<ChatsArrType[]>([])
  const [filteredContacts, setFilteredContacts] = useState<UserDataType[]>([])
  const [active, setActive] = useState<null | { type: string; id: string | number }>(null)

  // ** Hooks
  const router = useRouter()

  const handleChatClick = (type: 'chat' | 'contact', id: number) => {
    dispatch(selectChat(id))
    setActive({ type, id })
    if (!mdAbove) {
      handleLeftSidebarToggle()
    }
  }

  useEffect(() => {
    if (store.chats && store.chats.find(e => e.userId === store.selectedChat?.contact.id)) {
      setActive({ type: 'chat', id: store.selectedChat?.contact.id as number })
    } else if (store.contacts && store.contacts?.find(e => e.id === store.selectedChat?.contact.id)) {
      setActive({ type: 'contact', id: store.selectedChat?.contact.id as number })
    }
  }, [store.selectedChat, store.chats, store.contacts])

  // useEffect(() => {
  //   router.events.on('routeChangeComplete', () => {
  //     setActive(null)
  //     dispatch(removeSelectedChat())
  //   })

  //   return () => {
  //     setActive(null)
  //     dispatch(removeSelectedChat())
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const hasActiveId = (id: number | string) => {
    if (store.chats !== null) {
      const arr = store.chats.filter(i => i.id === id)

      return !!arr.length
    }
  }

  const renderChats = () => {
    if (store && store.chats && store.chats.length) {
      if (query.length && !filteredChat.length) {
        return (
          <ListItem>
            <Typography sx={{ color: 'text.secondary' }}>No Chats Found</Typography>
          </ListItem>
        )
      } else {
        const arrToMap = query.length && filteredChat.length ? filteredChat : store.chats

        return arrToMap.map((chat: ChatsArrType, index: number) => {
          const activeCondition = active !== null && active.id === chat.userId && active.type === 'chat'

          return (
            <ListItem key={index} disablePadding sx={{ '&:not(:last-child)': { mb: 1.5 } }}>
              <ListItemButton
                disableRipple
                onClick={() => handleChatClick('chat', chat.userId)}
                sx={{
                  px: 2.5,
                  py: 2.5,
                  width: '100%',
                  borderRadius: 1,
                  alignItems: 'flex-start',
                  backgroundColor: (theme: Theme) => (activeCondition ? `${theme.palette.primary.main} !important` : '')
                }}
              >
                <ListItemAvatar sx={{ m: 0 }}>
                  <Badge
                    overlap='circular'
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    badgeContent={
                      <Box
                        component='span'
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          color: `${statusObj[chat.status]}.main`,
                          backgroundColor: `${statusObj[chat.status]}.main`,
                          boxShadow: (theme: Theme) =>
                            `0 0 0 2px ${
                              !activeCondition ? theme.palette.background.paper : theme.palette.common.white
                            }`
                        }}
                      />
                    }
                  >
                    <MuiAvatar
                      src={chat.avatar}
                      alt={chat.name}
                      sx={{
                        width: 40,
                        height: 40,
                        border: (theme: Theme) => (activeCondition ? `2px solid ${theme.palette.common.white}` : '')
                      }}
                    />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    my: 0,
                    ml: 4,
                    mr: 1.5,
                    '& .MuiTypography-root': { ...(activeCondition ? { color: 'common.white' } : {}) }
                  }}
                  primary={
                    <Typography noWrap sx={{ ...(!activeCondition ? { color: 'text.secondary' } : {}) }}>
                      {chat.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      noWrap
                      variant='body2'
                      sx={{ color: !activeCondition ? (theme: Theme) => theme.palette.text.disabled : {} }}
                    >
                      {chat.content}
                    </Typography>
                  }
                />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    flexDirection: 'column',
                    justifyContent: 'flex-start'
                  }}
                >
                  <Typography sx={{ whiteSpace: 'nowrap', color: activeCondition ? 'common.white' : 'text.disabled' }}>
                    <>{formatDateToMonthShort(chat.createdAt, true)}</>
                  </Typography>
                  {chat.unseenMsgs && chat.unseenMsgs > 0 ? (
                    <Chip
                      color='error'
                      label={chat.unseenMsgs}
                      sx={{
                        mt: 0.5,
                        height: 18,
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        '& .MuiChip-label': { pt: 0.25, px: 1.655 }
                      }}
                    />
                  ) : null}
                </Box>
              </ListItemButton>
            </ListItem>
          )
        })
      }
    }
  }

  const renderContacts = () => {
    if (query.length && !filteredContacts.length) {
      return (
        <ListItem>
          <Typography sx={{ color: 'text.secondary' }}>No Contacts Found</Typography>
        </ListItem>
      )
    } else {
      const arrToMap = query.length && filteredContacts.length ? filteredContacts : store.contacts

      return arrToMap !== null
        ? arrToMap.map((contact: UserDataType, index: number) => {
            const activeCondition =
              active !== null && active.id === contact.id && active.type === 'contact' && !hasActiveId(contact.id)

            return (
              <ListItem key={index} disablePadding sx={{ '&:not(:last-child)': { mb: 1.5 } }}>
                <ListItemButton
                  disableRipple
                  onClick={() => handleChatClick('contact', contact.id)}
                  sx={{
                    px: 2.5,
                    py: 2.5,
                    width: '100%',
                    borderRadius: 1,
                    backgroundColor: (theme: Theme) =>
                      activeCondition ? `${theme.palette.primary.main} !important` : ''
                  }}
                >
                  <ListItemAvatar sx={{ m: 0 }}>
                    <MuiAvatar
                      alt={contact.username}
                      src={contact.avatar}
                      sx={{
                        width: 40,
                        height: 40,
                        border: (theme: Theme) => (activeCondition ? `2px solid ${theme.palette.common.white}` : '')
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ my: 0, ml: 4, '& .MuiTypography-root': { color: activeCondition ? 'common.white' : '' } }}
                    primary={
                      <Typography sx={{ ...(!activeCondition ? { color: 'text.secondary' } : {}) }}>
                        {contact.username}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            )
          })
        : null
    }
  }

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    if (store.chats !== null && store.contacts !== null) {
      const searchChatFilterFunction = (contact: ChatsArrType) =>
        contact.name.toLowerCase().includes(e.target.value.toLowerCase())
      const searchContactsFilterFunction = (contact: UserDataType) =>
        contact.username.toLowerCase().includes(e.target.value.toLowerCase())

      const filteredChatsArr = store.chats.filter(searchChatFilterFunction)
      const filteredContactsArr = store.contacts.filter(searchContactsFilterFunction)
      setFilteredChat(filteredChatsArr)
      setFilteredContacts(filteredContactsArr)
    }
  }

  return (
    <Box>
      <Drawer
        open={leftSidebarOpen}
        onClose={handleLeftSidebarToggle}
        variant={mdAbove ? 'permanent' : 'temporary'}
        ModalProps={{
          disablePortal: true,
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          zIndex: 7,
          height: '100%',
          display: 'block',
          position: mdAbove ? 'static' : 'absolute',
          '& .MuiDrawer-paper': {
            boxShadow: 'none',
            overflow: 'hidden',
            width: sidebarWidth,
            position: mdAbove ? 'static' : 'absolute',
            borderTopLeftRadius: (theme: Theme) => theme.shape.borderRadius,
            borderBottomLeftRadius: (theme: Theme) => theme.shape.borderRadius
          },
          '& > .MuiBackdrop-root': {
            borderRadius: 1,
            position: 'absolute',
            zIndex: (theme: Theme) => theme.zIndex.drawer - 1
          }
        }}
      >
        <Box
          sx={{
            px: 5.5,
            py: 3.5,
            display: 'flex',
            alignItems: 'center',
            borderBottom: (theme: Theme) => `1px solid ${theme.palette.divider}`
          }}
        >
          {/* {store && store.userProfile ? (
            <Badge
              overlap='circular'
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              sx={{ mr: 4.5 }}
              onClick={handleUserProfileLeftSidebarToggle}
              badgeContent={
                <Box
                  component='span'
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    color: `${statusObj[userStatus]}.main`,
                    backgroundColor: `${statusObj[userStatus]}.main`,
                    boxShadow: (theme: Theme) => `0 0 0 2px ${theme.palette.background.paper}`
                  }}
                />
              }
            >
              <MuiAvatar
                src={store.userProfile.avatar}
                alt={store.userProfile.name}
                sx={{ width: 40, height: 40, cursor: 'pointer' }}
              />
            </Badge>
          ) : null} */}
          <TextField
            fullWidth
            size='small'
            value={query}
            onChange={handleFilter}
            placeholder='Search for contact...'
            sx={{ '& .MuiInputBase-root': { borderRadius: 5 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Magnify fontSize='small' />
                </InputAdornment>
              )
            }}
          />
          {!mdAbove ? (
            <IconButton sx={{ p: 1, ml: 1 }} onClick={handleLeftSidebarToggle}>
              <Close sx={{ fontSize: '1.375rem' }} />
            </IconButton>
          ) : null}
        </Box>

        <Box sx={{ height: `calc(100% - 4.0625rem)` }}>
          <ScrollWrapper hidden={hidden}>
            <Box sx={{ p: (theme: Theme) => theme.spacing(5, 3, 3) }}>
              <Typography variant='h6' sx={{ ml: 2, mb: 4, color: 'primary.main' }}>
                Chats
              </Typography>
              <List sx={{ mb: 7.5, p: 0 }}>{renderChats()}</List>
              <Typography variant='h6' sx={{ ml: 2, mb: 4, color: 'primary.main' }}>
                Contacts
              </Typography>
              <List sx={{ p: 0 }}>{renderContacts()}</List>
            </Box>
          </ScrollWrapper>
        </Box>
      </Drawer>

      <UserProfileLeft
        store={store}
        hidden={hidden}
        statusObj={statusObj}
        userStatus={userStatus}
        sidebarWidth={sidebarWidth}
        setUserStatus={setUserStatus}
        userProfileLeftOpen={userProfileLeftOpen}
        handleUserProfileLeftSidebarToggle={handleUserProfileLeftSidebarToggle}
      />
    </Box>
  )
}

export default SidebarLeft
