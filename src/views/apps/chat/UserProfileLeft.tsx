// ** Types
import { UserProfileLeftType } from 'src/types/apps/chatTypes'

// ** Custom Component Imports
import Sidebar from 'src/@core/components/sidebar'

const UserProfileLeft = (props: UserProfileLeftType) => {
  const { sidebarWidth, userProfileLeftOpen, handleUserProfileLeftSidebarToggle } = props

  return (
    <Sidebar
      show={userProfileLeftOpen}
      backDropClick={handleUserProfileLeftSidebarToggle}
      sx={{
        zIndex: 9,
        height: '100%',
        width: sidebarWidth,
        borderTopLeftRadius: theme => theme.shape.borderRadius,
        borderBottomLeftRadius: theme => theme.shape.borderRadius,
        '& + .MuiBackdrop-root': {
          zIndex: 8,
          borderRadius: 1
        }
      }}
    >
      {/* {store && store.userProfile ? (
        <Fragment>
          <IconButton
            size='small'
            onClick={handleUserProfileLeftSidebarToggle}
            sx={{ top: '.7rem', right: '.7rem', position: 'absolute' }}
          >
            <Close />
          </IconButton>

          <Box sx={{ px: 5, pb: 7, pt: 9.5, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 4.25, display: 'flex', justifyContent: 'center' }}>
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
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      color: `${statusObj[userStatus]}.main`,
                      backgroundColor: `${statusObj[userStatus]}.main`,
                      boxShadow: theme => `0 0 0 2px ${theme.palette.background.paper}`
                    }}
                  />
                }
              >
                <Avatar
                  sx={{ width: 84, height: 84 }}
                  src={store.userProfile.avatar}
                  alt={store.userProfile.name}
                />
              </Badge>
            </Box>
            <Typography sx={{ mb: 0.75, fontWeight: 600, textAlign: 'center' }}>
              {store.userProfile.name}
            </Typography>
            <Typography variant='body2' sx={{ textAlign: 'center', textTransform: 'capitalize' }}>
              {store.userProfile.role}
            </Typography>
          </Box>

          <Box sx={{ height: 'calc(100% - 13.375rem)' }}>
            <ScrollWrapper>
              <Box sx={{ p: 5 }}>
                <Typography variant='body2' sx={{ mb: 1.5, textTransform: 'uppercase' }}>
                  About
                </Typography>
                <TextField minRows={3} multiline fullWidth sx={{ mb: 6 }} defaultValue={store.userProfile.about} />
                <Typography variant='body2' sx={{ mb: 1.5, textTransform: 'uppercase' }}>
                  Status
                </Typography>
                <RadioGroup value={userStatus} sx={{ mb: 6.5, ml: 0.8 }} onChange={handleUserStatus}>
                  <div>
                    <FormControlLabel
                      value='online'
                      label='Online'
                      control={<Radio size='small' color='success' sx={{ p: 1.5 }} />}
                      sx={{ '& .MuiFormControlLabel-label': { ml: 1, color: 'text.secondary' } }}
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value='away'
                      label='Away'
                      control={<Radio size='small' color='warning' sx={{ p: 1.5 }} />}
                      sx={{ '& .MuiFormControlLabel-label': { ml: 1, color: 'text.secondary' } }}
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value='busy'
                      label='Do not Disturb'
                      control={<Radio size='small' color='error' sx={{ p: 1.5 }} />}
                      sx={{ '& .MuiFormControlLabel-label': { ml: 1, color: 'text.secondary' } }}
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value='offline'
                      label='Offline'
                      control={<Radio size='small' color='secondary' sx={{ p: 1.5 }} />}
                      sx={{ '& .MuiFormControlLabel-label': { ml: 1, color: 'text.secondary' } }}
                    />
                  </div>
                </RadioGroup>
                <Typography variant='body2' sx={{ mb: 1.5, textTransform: 'uppercase' }}>
                  Settings
                </Typography>
                <List dense sx={{ p: 0, mb: 6 }}>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ px: 2 }}>
                      <ListItemIcon sx={{ mr: 2 }}>
                        <CheckCircleOutline sx={{ fontSize: '1.25rem' }} />
                      </ListItemIcon>
                      <ListItemText secondary='Two-step Verification' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ px: 2 }}>
                      <ListItemIcon sx={{ mr: 2 }}>
                        <BellOutline sx={{ fontSize: '1.25rem' }} />
                      </ListItemIcon>
                      <ListItemText secondary='Notification' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ px: 2 }}>
                      <ListItemIcon sx={{ mr: 2 }}>
                        <AccountOutline sx={{ fontSize: '1.25rem' }} />
                      </ListItemIcon>
                      <ListItemText secondary='Invite Friends' />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ px: 2 }}>
                      <ListItemIcon sx={{ mr: 2 }}>
                        <DeleteOutline sx={{ fontSize: '1.25rem' }} />
                      </ListItemIcon>
                      <ListItemText secondary='Delete Account' />
                    </ListItemButton>
                  </ListItem>
                </List>
                <Button variant='contained'>Logout</Button>
              </Box>
            </ScrollWrapper>
          </Box>
        </Fragment>
      ) : null} */}
    </Sidebar>
  )
}

export default UserProfileLeft
