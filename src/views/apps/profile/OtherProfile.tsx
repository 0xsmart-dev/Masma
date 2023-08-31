import React, { SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react'

// ** MUI Imports
import { Box, Card, Button, Typography, CardContent, Grid, Tab, styled, GridProps, Skeleton, Menu } from '@mui/material'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import toast from 'react-hot-toast'

import { useAuth } from 'src/hooks/useAuth'
import { avatarOrPlaceholder } from 'src/lib/utils'
import { UserDataType } from 'src/context/types'
import { followUser, getUserProfile, unfollowUser } from 'src/lib/api'
import OtherFollowingTable from './OtherFollowingTable'
import OtherFollowerTable from './OtherFollowerTable'
import InvitesTable from './InvitesTable'
import { useRouter } from 'next/router'
import ProfileMenu from 'src/views/apps/menu/ProfileMenu'
import { useSettings } from 'src/@core/hooks/useSettings'

// Styled Grid component
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
    flex: 1
  },
  [theme.breakpoints.down('sm')]: {
    alignItems: 'center',
    textAlign: 'center'
  }
}))

interface IOtherProfileProps {
  profileId: string
}

const OtherProfile: React.FC<IOtherProfileProps> = ({ profileId }) => {
  const { settings, saveSettings } = useSettings()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [followLoading, setFollowLoading] = useState<boolean>(false)
  const [value, setValue] = useState<string>('1')
  const [profile, setProfile] = useState<UserDataType | null>(null)
  const { user, setUser } = useAuth()
  const handleChangeTab = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const fetchProfile = useCallback(async () => {
    setLoading(true)
    setTimeout(() => {}, 5000)
    const userProfile = await getUserProfile(profileId)
    setProfile(userProfile)
    setLoading(false)
  }, [profileId])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  const handleFollow = async () => {
    setFollowLoading(true)
    try {
      const response = await followUser(profileId)
      if (user)
        setUser({
          ...user,
          followings: response.followings
        })

      toast.success('Followed successfully')
      fetchProfile()
    } catch (e) {
      toast.error('Failed to follow')
    }
    setFollowLoading(false)
  }

  const handleUnfollow = async () => {
    setFollowLoading(true)
    try {
      const response = await unfollowUser(profileId)

      if (user)
        setUser({
          ...user,
          followings: response.followings
        })

      toast.success('UnFollowed successfully')
      fetchProfile()
    } catch (e) {
      toast.error('Failed to unfollow')
    }
    setFollowLoading(false)
  }

  const isFollowing = useMemo(() => {
    if (user?.followings.find(e => e.user?.profileId == profileId)) return true

    return false
  }, [profileId, user])

  const followsUser = useMemo(() => {
    if (profile?.followings.find(e => e.userId == user?.id)) return true

    return false
  }, [profile?.followings, user?.id])

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Box sx={{ m: 3.75, mb: 5.25 }}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm='auto' display='flex' justifyContent={'center'}>
              {loading ? (
                <Skeleton variant='rectangular' width={120} height={120} />
              ) : (
                <img alt='avatar' src={avatarOrPlaceholder(profile?.avatar)} width={120} height={120} />
              )}
            </Grid>
            <StyledGrid item container flex={1}>
              <Typography variant='caption' fontSize={24} color='#212121' fontWeight={500}>
                {loading ? <Skeleton sx={{ width: '200px' }} /> : `${profile?.username}`}
              </Typography>
              <Box gap={4} display='flex'>
                {loading ? (
                  <Skeleton variant='rectangular' width={130} height={38} />
                ) : (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {isFollowing && followsUser ? (
                      <Button variant='contained' onClick={() => router.push('/message')} disabled={followLoading}>
                        Message
                      </Button>
                    ) : null}

                    {!isFollowing && !followsUser ? (
                      <Button variant='contained' onClick={handleFollow} disabled={followLoading}>
                        Follow
                      </Button>
                    ) : null}

                    {!isFollowing && followsUser ? (
                      <Button variant='contained' onClick={handleFollow} disabled={followLoading}>
                        Accept
                      </Button>
                    ) : null}

                    {isFollowing && !followsUser ? (
                      <Button variant='contained' onClick={handleUnfollow} disabled={followLoading}>
                        Unfollow
                      </Button>
                    ) : null}

                    {!(!isFollowing && !followsUser) && !(!isFollowing && followsUser) ? (
                      <ProfileMenu settings={settings} handleUnfollow={handleUnfollow} profileId={profileId} />
                    ) : null}
                  </Box>
                )}
              </Box>
            </StyledGrid>
          </Grid>
          <StyledGrid>
            <Box sx={{ mt: 3 }}>
              {loading && <Skeleton variant='text' width={250} />}
              {!loading && (
                <>
                  <Typography variant='caption' sx={{ mr: 2 }}>
                    <b>{profile?._count?.followings}</b> Following
                  </Typography>
                  <Typography variant='caption' sx={{ mr: 2 }}>
                    <b>{profile?._count?.followers}</b> Followers
                  </Typography>
                  <Typography variant='caption' sx={{ mr: 2 }}>
                    <b>{profile?.inviteCount}</b> Refered Friends
                  </Typography>
                  <Typography variant='caption'>
                    Level <b>1</b>
                  </Typography>
                </>
              )}
            </Box>
            <Typography component={'span'} sx={{ fontSize: 14 }}>
              {loading ? <Skeleton width={300} /> : profile?.bio || ''}
            </Typography>
          </StyledGrid>
        </Box>
        <TabContext value={value}>
          {loading && <Skeleton variant='rectangular' height={100} />}
          {!loading && (
            <>
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <TabList
                  textColor='secondary'
                  onChange={handleChangeTab}
                  indicatorColor='secondary'
                  aria-label='secondary tabs example'
                >
                  <Tab value='1' label='Activities' />
                  <Tab value='2' label='Followings' />
                  <Tab value='3' label='Followers' />
                  <Tab value='4' label='Collection' />
                  <Tab value='5' label='Refered Friends' />
                </TabList>
              </Box>
              <TabPanel value='1'>
                <Box textAlign={'center'}>
                  <Typography component={'span'} sx={{ fontSize: 14 }}>
                    There is no activity
                  </Typography>
                </Box>
              </TabPanel>
              <TabPanel value='2'>
                <OtherFollowingTable profileId={profileId} />
              </TabPanel>
              <TabPanel value='3'>
                <OtherFollowerTable profileId={profileId} />
              </TabPanel>
              <TabPanel value='4'>
                <Box textAlign={'center'}>
                  <Typography component={'span'} sx={{ fontSize: 14 }}>
                    There is no collection
                  </Typography>
                </Box>
              </TabPanel>
              <TabPanel value='5'>
                <InvitesTable profileId={profileId} />
              </TabPanel>
            </>
          )}
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default OtherProfile
