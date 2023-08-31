// ** MUI Import
import React, { Fragment, SyntheticEvent, useCallback, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import {
  Avatar,
  Button,
  CardHeader,
  IconButton,
  colors,
  Menu,
  MenuItem,
  Skeleton,
  styled,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { PlusCircle } from 'mdi-material-ui'
import { DotsVertical } from 'mdi-material-ui'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'
import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab'
import { useRouter } from 'next/router'
import { NotificationObj } from 'src/types/apps/notificationTypes'
import { useAuth } from 'src/hooks/useAuth'
import { getActivities } from 'src/lib/api'
import { getDisplayDate } from 'src/lib/utils/format'
import { ModalSearch } from 'src/views/apps/modals'
import { ActivityObj } from 'src/types/apps/activityTypes'
import ProfileLink from 'src/views/components/lInk/ProfileLink'
import moment from 'moment'

// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})
const activityTypeColor = {
  FOLLOW: 'error',
  UNFOLLOW: 'primary',
  ACCEPT_INVITE: 'secondary',
  TRANSFER: 'success'
}
const StyledTypography = styled(Typography)(() => ({
  color: colors.grey[900]
}))

const CardActivityTimeline = ({ setModalStatus }) => {
  const router = useRouter()
  const { user } = useAuth()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const [openSearchModal, setOpenSearchModal] = useState(false)
  const [activities, setActivities] = useState<ActivityObj[] | undefined>(undefined)
  const [isShow, setIsShow] = useState(false)

  const fetchRecentActivities = useCallback(async param => {
    const response = await getActivities(param)

    setActivities(response.data)
  }, [])

  useEffect(() => {
    fetchRecentActivities({ size: 3 })
  }, [fetchRecentActivities])

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }
  const handleShowAll = () => {
    if (isShow === false) {
      fetchRecentActivities({ size: 5 })
      setIsShow(true)
    } else {
      fetchRecentActivities({ size: 3 })
      setIsShow(false)
    }
  }
  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }
  const handleGoSendFunds = () => {
    router.replace('/send-funds')
  }

  const handleOpenSearchModal = () => setOpenSearchModal(true)
  const handleCloseSearchModal = () => setOpenSearchModal(false)

  return matches ? (
    <div>
      <Card
        sx={{
          border: 'none',
          flex: 1,
          boxShadow:
            '0px 2px 1px -1px rgb(76 78 100 / 20%), 0px 1px 1px 2px rgb(76 78 100 / 14%), 0px 1px 3px 0px rgb(76 78 100 / 12%)',
          marginLeft: '-1rem',
          marginRight: '-1rem',
          borderRadius: 'unset'
        }}
      >
        <CardHeader title='Recent Interactions' />
        <CardContent>
          <Button variant='text' onClick={handleOpenSearchModal}>
            <Box display='flex' gap={2} flexDirection='column' alignItems={'center'}>
              <Box
                sx={{
                  borderRadius: '50%',
                  width: 65,
                  height: 65,
                  boxShadow: '0px 2px 10px rgba(76, 78, 100, 0.22)',
                  background: '#fff',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <img src='/images/icons/user-add.svg' alt='user add' />
              </Box>
              <Typography textTransform={'capitalize'}>Search</Typography>
            </Box>
          </Button>
          <ModalSearch hidden={false} onClose={handleCloseSearchModal} open={openSearchModal} />
        </CardContent>
      </Card>
      {/* <Card
        sx={{
          border: 'none',
          flex: 1,
          marginTop: '1rem',
          boxShadow:
            '0px 2px 1px -1px rgb(76 78 100 / 20%), 0px 1px 1px 2px rgb(76 78 100 / 14%), 0px 1px 3px 0px rgb(76 78 100 / 12%)',
          marginLeft: '-1rem',
          marginRight: '-1rem'
        }}
      >
        <CardHeader
          sx={{ paddingTop: '1.5rem' }}
          title='Recent Activity'
          action={
            <IconButton size='small' aria-label='settings' className='card-more-options'>
              <DotsVertical onClick={e => handleDropdownOpen(e)} />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleDropdownClose()}
                sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
              >
                <MenuItem onClick={() => handleDropdownClose('/profile?tab=activities')}>View details</MenuItem>
              </Menu>
            </IconButton>
          }
        />
        <div
          style={{
            borderBottom: '1px solid rgba(76, 78, 100, 0.12)'
          }}
        />
        <CardContent>
          {activities === undefined &&
            [...Array(3)].map((e, _id) => {
              return (
                <Typography fontSize={14} padding={6} key={_id}>
                  <Skeleton />
                </Typography>
              )
            })}
          {activities !== undefined && activities.length == 0 && (
            <Typography component={'span'} sx={{ fontSize: 14 }}>
              There is no activity
            </Typography>
          )}
          {activities !== undefined && activities.length > 0 && (
            <Timeline sx={{ my: 0, py: 0 }}>
              {activities.map((activity, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color={activityTypeColor[activity.activityType]} />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ mt: 0, overflow: 'hidden', mb: theme => `${theme.spacing(2)} !important` }}>
                    <Box
                      sx={{
                        mb: 3,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                      }}
                    >
                      <Avatar alt='avatar' src={activity.content.toUser['avatar']} />
                      <Box sx={{ ml: 2, mr: 2, fontWeight: 400, display: 'flex', alignItems: 'center' }}>
                        {activity.activityType === 'TRANSFER' && (
                          <Fragment>
                            Transferred{' '}
                            <Typography sx={{ fontWeight: 800, ml: 1, mr: 1 }}>${activity.content.amount}</Typography>
                            to{' '}
                            <Typography sx={{ fontWeight: 800, ml: 1, mr: 1 }}>
                              {activity.content.toUser['name']}
                            </Typography>
                          </Fragment>
                        )}
                        {activity.activityType === 'FOLLOW' && (
                          <Fragment>
                            Followed{' '}
                            <Typography sx={{ fontWeight: 800, ml: 1, mr: 1 }}>
                              {activity.content.toUser['name']}
                            </Typography>
                          </Fragment>
                        )}
                        {activity.activityType === 'UNFOLLOW' && (
                          <Fragment>
                            Unfollowed{' '}
                            <Typography sx={{ fontWeight: 800, ml: 1, mr: 1 }}>
                              {activity.content.toUser['name']}
                            </Typography>
                          </Fragment>
                        )}
                        {activity.activityType === 'UNFOLLOW' && (
                          <Fragment>
                            Joined with{' '}
                            <Typography sx={{ fontWeight: 800, ml: 1, mr: 1 }}>
                              {activity.content.toUser['name']}
                            </Typography>
                            's invite link'
                          </Fragment>
                        )}
                      </Box>
                      <Typography variant='caption' sx={{ color: 'text.disabled', ml: 'auto' }}>
                        {getDisplayDate(moment.utc(activity.createdAt).toDate())}
                      </Typography>
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              ))}
              <Typography
                fontSize='16px'
                fontWeight={'bold'}
                color='#142C8E'
                sx={{ cursor: 'pointer' }}
                textAlign={'center'}
                onClick={handleShowAll}
              >
                {isShow === false ? 'Show ALL' : 'Hide'}
              </Typography>
            </Timeline>
          )}
        </CardContent>
      </Card> */}
      <Card
        sx={{
          border: 'none',
          flex: 1,
          marginTop: '1rem'
        }}
      >
        <CardHeader sx={{ paddingTop: '1.5rem' }} title='Shortcuts' />
        <Box sx={{ display: 'flex' }}>
          <Button size='small' variant='text' onClick={handleGoSendFunds}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <Avatar
                sx={{ width: 60, height: 60, boxShadow: 16, padding: 3, alignItems: 'center' }}
                src='/images/icons/send-to-mobile.svg'
              />
              <StyledTypography textTransform={'capitalize'} fontSize={12}>
                Send Money
              </StyledTypography>
            </Box>
          </Button>
          <Button size='small' variant='text' onClick={() => setModalStatus(true)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <Box sx={{ width: 60, height: 60, borderRadius: '50%', boxShadow: 16, padding: 3, alignItems: 'center' }}>
                <PlusCircle fontSize='large' color='secondary' />
              </Box>
              <StyledTypography textTransform={'capitalize'} fontSize={12}>
                Deposit Funds
              </StyledTypography>
            </Box>
          </Button>
        </Box>
      </Card>
    </div>
  ) : (
    <Card sx={{ p: theme => `${theme.spacing(7, 7.5)} !important` }}>
      <CardContent sx={{ display: 'flex', padding: 0, paddingBottom: '0px !important', flexDirection: 'row' }}>
        <Card
          sx={{
            border: 'none',
            flex: 1
          }}
        >
          <CardHeader sx={{ paddingTop: 0 }} title='Recent Interactions' />
          <CardContent>
            <Button variant='text' onClick={handleOpenSearchModal}>
              <Box display='flex' gap={2} flexDirection='column' alignItems={'center'}>
                <Box
                  sx={{
                    borderRadius: '50%',
                    width: 65,
                    height: 65,
                    boxShadow: '0px 2px 10px rgba(76, 78, 100, 0.22)',
                    background: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <img src='/images/icons/user-add.svg' alt='user add' />
                </Box>
                <Typography textTransform={'capitalize'}>Search</Typography>
              </Box>
            </Button>
            <ModalSearch hidden={false} onClose={handleCloseSearchModal} open={openSearchModal} />
          </CardContent>
        </Card>
        <div
          style={{
            borderRight: '1px solid rgba(76, 78, 100, 0.12)'
          }}
        />
        {/* <Card sx={{ border: 'none', flex: 1 }}>
          <CardHeader
            sx={{ paddingTop: '1.5rem' }}
            title='Activity Timeline'
            action={
              <IconButton size='small' aria-label='settings' className='card-more-options'>
                <DotsVertical onClick={e => handleDropdownOpen(e)} />
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => handleDropdownClose()}
                  sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                >
                  <MenuItem onClick={() => handleDropdownClose('/profile?tab=activities')}>View details</MenuItem>
                </Menu>
              </IconButton>
            }
          />
          <CardContent>
            {activities === undefined &&
              [...Array(3)].map((e, _id) => {
                return (
                  <Typography fontSize={14} padding={6} key={_id}>
                    <Skeleton />
                  </Typography>
                )
              })}
            {activities !== undefined && activities.length == 0 && (
              <Typography component={'span'} sx={{ fontSize: 14 }}>
                There is no activity
              </Typography>
            )}
            {activities !== undefined && activities.length > 0 && (
              <Timeline sx={{ my: 0, py: 0 }}>
                {activities.map((activity, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot color={activityTypeColor[activity.activityType]} />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ mt: 0, overflow: 'hidden', mb: theme => `${theme.spacing(2)} !important` }}>
                      <Box
                        sx={{
                          mb: 3,
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'flex-start'
                        }}
                      >
                        <Avatar alt='avatar' src={activity.content.toUser['avatar']} />
                        <Box sx={{ ml: 2, mr: 2, fontWeight: 400, display: 'flex', alignItems: 'center' }}>
                          {activity.activityType === 'TRANSFER' && (
                            <Fragment>
                              Transferred{' '}
                              <Typography sx={{ fontWeight: 800, ml: 1, mr: 1 }}>${activity.content.amount}</Typography>
                              to{' '}
                              <ProfileLink
                                profileId={activity.content.toUser['profileId']}
                                userName={activity.content.toUser['name']}
                              />
                            </Fragment>
                          )}
                          {activity.activityType === 'FOLLOW' && (
                            <Fragment>
                              Followed{' '}
                              <ProfileLink
                                profileId={activity.content.toUser['profileId']}
                                userName={activity.content.toUser['name']}
                              />
                            </Fragment>
                          )}
                          {activity.activityType === 'UNFOLLOW' && (
                            <Fragment>
                              Unfollowed{' '}
                              <ProfileLink
                                profileId={activity.content.toUser['profileId']}
                                userName={activity.content.toUser['name']}
                              />
                            </Fragment>
                          )}
                          {activity.activityType === 'ACCEPT_INVITE' && (
                            <Fragment>
                              Joined with{' '}
                              <ProfileLink
                                profileId={activity.content.toUser['profileId']}
                                userName={activity.content.toUser['name']}
                              />
                              's invite link'
                            </Fragment>
                          )}
                        </Box>
                        <Typography variant='caption' sx={{ color: 'text.disabled', ml: 'auto' }}>
                          {getDisplayDate(moment.utc(activity.createdAt).toDate())}
                        </Typography>
                      </Box>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            )}
          </CardContent>
        </Card> */}
        <Card
          sx={{
            border: 'none',
            flex: 1
          }}
        >
          <CardHeader sx={{ paddingTop: 0 }} title='Shortcuts' />
          <Box sx={{ display: 'flex' }} gap={8} flexDirection='row' justifyContent={'center'}>
            <Button size='small' variant='text' onClick={handleGoSendFunds}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <Avatar
                  sx={{ width: 60, height: 60, boxShadow: 16, padding: 3, alignItems: 'center' }}
                  src='/images/icons/send-to-mobile.svg'
                />
                <StyledTypography textTransform={'capitalize'} fontSize={12}>
                  Send Money
                </StyledTypography>
              </Box>
            </Button>
            <Button size='small' variant='text' onClick={() => setModalStatus(true)}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <Box
                  sx={{ width: 60, height: 60, borderRadius: '50%', boxShadow: 16, padding: 3, alignItems: 'center' }}
                >
                  <PlusCircle fontSize='large' color='secondary' />
                </Box>
                <StyledTypography textTransform={'capitalize'} fontSize={12}>
                  Deposit Funds
                </StyledTypography>
              </Box>
            </Button>
          </Box>
        </Card>
      </CardContent>
    </Card>
  )
}

export default CardActivityTimeline
