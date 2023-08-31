// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'

// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>(({ theme }) => ({
  margin: 0,
  padding: 0,
  marginLeft: theme.spacing(0.75),
  '& .MuiTimelineItem-root': {
    '&:before': {
      display: 'none'
    },
    '&:last-child': {
      minHeight: 60
    }
  }
}))

const UserViewOverview = () => {
  return (
    <Fragment>
      <Card sx={{ mb: 6 }}>
        <CardHeader title='User Activity Timeline' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <Timeline>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color='error' />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Box
                  sx={{
                    mb: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography sx={{ mr: 2, mb: 1, fontWeight: 600 }}>12 Invoices have been paid</Typography>
                  <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                    12 min ago
                  </Typography>
                </Box>
                <Typography variant='body2'>Invoices have been paid to the company</Typography>
                <Box sx={{ mt: 2, display: 'flex' }}>
                  <Box sx={{ width: 28, height: 'auto' }}>
                    <img alt='invoice.pdf' src='/images/icons/file-icons/pdf-2.png' />
                  </Box>
                  <Typography variant='body2' sx={{ ml: 2, fontWeight: 600, color: 'text.primary' }}>
                    invoice.pdf
                  </Typography>
                </Box>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color='primary' />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Box
                  sx={{
                    mb: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography sx={{ mr: 2, mb: 1, fontWeight: 600 }}>Meeting with John</Typography>
                  <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                    45 min ago
                  </Typography>
                </Box>
                <Typography variant='body2' sx={{ mb: 2 }}>
                  React Project meeting with John @10:15am
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar alt='Avatar' src='/images/avatars/1.png' sx={{ width: 34, height: 34, mr: 4 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                      John Doe (Client)
                    </Typography>
                    <Typography variant='body2'>Project meeting with John @10:15am</Typography>
                  </Box>
                </Box>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color='warning' />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Box
                  sx={{
                    mb: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography sx={{ mr: 2, mb: 1, fontWeight: 600 }}>Create a new react project for client</Typography>
                  <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                    2 days ago
                  </Typography>
                </Box>
                <Typography variant='body2' sx={{ mb: 2 }}>
                  Add 5 team members in the project
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AvatarGroup max={4}>
                    <Avatar src='/images/avatars/1.png' alt='John Doe' />
                    <Avatar src='/images/avatars/4.png' alt='Olivia Sparks' />
                    <Avatar src='/images/avatars/5.png' alt='Howard Lloyd' />
                    <Avatar src='/images/avatars/6.png' alt='Hallie Richards' />
                    <Avatar src='/images/avatars/8.png' alt='Alice Cobb' />
                    <Avatar src='/images/avatars/7.png' alt='Jeffery Warner' />
                  </AvatarGroup>
                  <Box sx={{ ml: 4, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                      Create a new project for client
                    </Typography>
                    <Typography variant='body2'> 5 team members in the project</Typography>
                  </Box>
                </Box>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color='info' />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Box
                  sx={{
                    mb: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography sx={{ mr: 2, mb: 1, fontWeight: 600 }}>Create invoices for client</Typography>
                  <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                    5 days ago
                  </Typography>
                </Box>
                <Typography variant='body2'>Weekly review of freshly prepared design for our new app.</Typography>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </CardContent>
      </Card>
    </Fragment>
  )
}

export default UserViewOverview
