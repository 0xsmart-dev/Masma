import { Fragment } from 'react'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import ProfileLink from 'src/views/components/lInk/ProfileLink'

// ** MUI Imports
import { Box, Avatar, Typography, Pagination, Stack, styled } from '@mui/material'

import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab'
import { getActivities } from 'src/lib/api'
import { NotificationObj } from 'src/types/apps/notificationTypes'
import { getDisplayDate } from 'src/lib/utils/format'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'
import { useAuth } from 'src/hooks/useAuth'
import { ActivityObj } from 'src/types/apps/activityTypes'
import moment from 'moment'
import { useRouter } from 'next/router'

// Styled Grid component
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
const ActivityList = () => {
  const router = useRouter()
  const [activities, setActivities] = useState<ActivityObj[]>([])
  const [activitiesPage, setActivitiesPage] = useState<number>(1)
  const [activitiesTotalPage, setActivitiesTotalPage] = useState<number>(10)
  const [activitiesSize] = useState<number>(5)

  const fetchRecentActivities = useCallback(async () => {
    const result = await getActivities({ page: activitiesPage, size: activitiesSize })

    setActivities(result.data)
    setActivitiesTotalPage(Math.ceil(result.total / activitiesSize))
  }, [activitiesPage, activitiesSize])

  useEffect(() => {
    fetchRecentActivities()
  }, [fetchRecentActivities, activitiesPage])

  const handleActivitiesPageChange = (event: ChangeEvent<unknown>, value: number) => {
    setActivitiesPage(value)
  }

  return (
    <Fragment>
      {activities.length == 0 && (
        <Box textAlign={'center'}>
          <Typography component={'span'} sx={{ fontSize: 14 }}>
            There is no activity
          </Typography>
        </Box>
      )}
      {activities.length > 0 && (
        <Box>
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
                          <Typography sx={{ fontWeight: 800, ml: 1, mr: 1 }}>
                            {activity.content.symbol ? '' : '$'}
                            {activity.content.amount} {activity.content.symbol || ''}
                          </Typography>
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
                          <Typography sx={{ fontWeight: 800, ml: 1, mr: 1 }}>
                            {activity.content.toUser['name']}
                          </Typography>
                          's invite link
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
          <Stack spacing={2} alignItems='center'>
            <Pagination
              count={activitiesTotalPage}
              page={activitiesPage}
              shape='rounded'
              onChange={handleActivitiesPageChange}
            />
          </Stack>
        </Box>
      )}
    </Fragment>
  )
}

export default ActivityList
