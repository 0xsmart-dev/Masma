import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Typography
} from '@mui/material'
import { DotsVertical } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { getActivities } from 'src/lib/api'
import { getDisplayDate } from 'src/lib/utils/format'
import { NotificationObj } from 'src/types/apps/notificationTypes'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'
import { styled } from '@mui/material/styles'

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

export const CardActivities = () => {
  const router = useRouter()
  const { user } = useAuth()

  const [activities, setActivities] = useState<NotificationObj[] | undefined>(undefined)
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  const fetchRecentActivities = useCallback(async () => {
    const response = await getActivities()

    setActivities(response.data)
  }, [])

  useEffect(() => {
    fetchRecentActivities()
  }, [fetchRecentActivities])

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  return (
    <Card>
      <CardHeader
        title='Recent Activities'
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
      <CardContent sx={{ pt: theme => `${theme.spacing(2.5)} !important` }}>
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
                  {activity.type === 'UNFOLLOW' && <TimelineDot color='error' />}
                  {activity.type === 'FOLLOW' && <TimelineDot color='primary' />}
                  {activity.type === 'ACCEPT_INVITE' && <TimelineDot color='secondary' />}
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
                    {(activity.type === 'FOLLOW' ||
                      activity.type === 'UNFOLLOW' ||
                      activity.type === 'ACCEPT_INVITE') && (
                      <Avatar
                        alt='avatar'
                        src={activity.fromUserId === user?.id ? activity.toUser['avatar'] : activity.fromUser['avatar']}
                      />
                    )}
                    <Typography sx={{ ml: 2, mr: 2, fontWeight: 600 }}>
                      {activity.fromUserId === user?.id ? 'You ' : `${activity.fromUser['name']} `}
                      {activity.type === 'FOLLOW' && 'followed '}
                      {activity.type === 'UNFOLLOW' && 'unfollowed '}
                      {activity.type === 'ACCEPT_INVITE' && 'joined with '}
                      {activity.toUserId === user?.id
                        ? activity.type === 'ACCEPT_INVITE'
                          ? 'Your invite link '
                          : 'You '
                        : activity.type === 'ACCEPT_INVITE'
                        ? `${activity.toUser['name']}'s invite link `
                        : `${activity.toUser['name']} `}
                    </Typography>
                    <Typography variant='caption' sx={{ color: 'text.disabled', ml: 'auto' }}>
                      {getDisplayDate(new Date(activity.createdAt))}
                    </Typography>
                  </Box>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        )}
      </CardContent>
    </Card>
  )
}
