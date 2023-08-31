// ** React Imports
import { useState, SyntheticEvent, Fragment, ReactNode, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu, { MenuProps } from '@mui/material/Menu'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Icons Imports
import BellOutline from 'mdi-material-ui/BellOutline'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'
import { CustomAvatarProps } from 'src/@core/components/mui/avatar/types'
import { fetchNotifications, readAllNotification, readNotification } from 'src/store/apps/notification'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { useAuth } from 'src/hooks/useAuth'
import { getDisplayDate } from 'src/lib/utils/format'
import { Badge } from '@mui/material'
import { NotificationObj } from 'src/types/apps/notificationTypes'
import { selectChat } from 'src/store/apps/chat'
import { useRouter } from 'next/router'
import moment from 'moment'

interface Props {
  settings: Settings
}

// ** Styled Menu component
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 16,
  height: 16,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 5,
  marginRight: 5,
  fontSize: '0.575rem'
}))

const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`
}))

const styles = {
  maxHeight: 344,
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  }
}

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles
})

// ** Styled Avatar component
const Avatar = styled(CustomAvatar)<CustomAvatarProps>({
  width: '2.375rem',
  height: '2.375rem',
  fontSize: '1.125rem'
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}))

const NotificationDropdown = (props: Props) => {
  const router = useRouter()

  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)

  // ** Hook
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))
  const dispatch = useDispatch<AppDispatch>()
  const { notifications } = useSelector((state: RootState) => state.notification)

  const { user } = useAuth()

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    if (notifications.length === 0) return
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  const handleRead = (notification: NotificationObj) => {
    if (notification.id) {
      // dispatch(readNotification(notification.id))
      if (notification.type === 'MESSAGE') {
        dispatch(selectChat(notification.fromUserId))
        router.replace('/message')
      }
      if (notification.type === 'FOLLOW') {
        const follower = notification.fromUser
        router.replace(`/profile/${follower.profileId}`)
      }
    }
  }

  const handleReadAll = () => {
    dispatch(readAllNotification())
    handleDropdownClose()
  }

  useEffect(() => {
    dispatch(fetchNotifications())
  }, [dispatch])

  useEffect(() => {
    if (notifications.length == 0) setAnchorEl(null)
  }, [notifications.length])

  const ScrollWrapper = ({ children }: { children: ReactNode }) => {
    if (hidden) {
      return <Box sx={{ ...styles, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    } else {
      return (
        <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
      )
    }
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={notifications.length > 0 ? <BadgeContentSpan>{notifications.length}</BadgeContentSpan> : ''}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
          <BellOutline />
        </IconButton>
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <MenuItem disableRipple>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ fontWeight: 600 }}>Notifications</Typography>
            <CustomChip
              skin='light'
              size='small'
              label={notifications.length + ' New'}
              color='primary'
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
            />
          </Box>
        </MenuItem>
        <ScrollWrapper>
          {notifications.map((notification, index) => (
            <MenuItem key={index} onClick={() => handleRead(notification)}>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                {(notification.type === 'FOLLOW' ||
                  notification.type === 'UNFOLLOW' ||
                  notification.type === 'MESSAGE' ||
                  notification.type === 'RECEIVE_MONEY' ||
                  notification.type === 'ACCEPT_INVITE') && (
                  <Avatar alt='avatar' src={notification.fromUser['avatar']} />
                )}

                <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                  <MenuItemTitle sx={{ fontWeight: 400, display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ fontWeight: 800, mr: 1 }}>{notification.fromUser['username']} </Typography>
                    {notification.type === 'RECEIVE_MONEY' && (
                      <Fragment>
                        sent{' '}
                        <Typography sx={{ fontWeight: 800, ml: 1, mr: 1 }}>
                          {notification.body.symbol ? '' : '$'}
                          {notification.body.amount} {notification.body.symbol || ''}
                        </Typography>
                      </Fragment>
                    )}
                    {notification.type === 'FOLLOW' && 'followed you'}
                    {notification.type === 'UNFOLLOW' && 'unfollowed you'}
                    {notification.type === 'ACCEPT_INVITE' && 'joined with your invite link'}
                    {notification.type === 'MESSAGE' && 'messaged you'}
                  </MenuItemTitle>
                  {/* <MenuItemSubtitle variant='body2'>Won the monthly best seller badge</MenuItemSubtitle> */}
                </Box>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  {getDisplayDate(moment.utc(notification.createdAt).toDate())}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </ScrollWrapper>
        <MenuItem
          disableRipple
          sx={{ py: 3.5, borderBottom: 0, borderTop: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Button fullWidth variant='contained' onClick={handleReadAll}>
            Mark as read
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default NotificationDropdown
