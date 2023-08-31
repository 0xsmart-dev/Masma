import { SyntheticEvent, useEffect, useState, MouseEvent } from 'react'

// ** MUI Imports
import {
  Box,
  Card,
  Button,
  Typography,
  CardContent,
  Grid,
  Tab,
  styled,
  GridProps,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery
} from '@mui/material'

import { useTheme } from '@mui/material/styles'

import {
  FacebookShareButton,
  PinterestShareButton,
  RedditShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton
} from 'next-share'

import { ContentCopy } from 'mdi-material-ui'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Share, Facebook, Pinterest, Reddit, WhatsApp, LinkedIn, Twitter } from '@mui/icons-material'
import toast from 'react-hot-toast'

import { useAuth } from 'src/hooks/useAuth'
import { avatarOrPlaceholder } from 'src/lib/utils'
import DialogEditUserInfo from 'src/views/components/profile/EditProfile'
import { useRouter } from 'next/router'
import ActivityList from './ActivityList'
import FollowingTable from './FollowingTable'
import FollowerTable from './FollowerTable'
import InvitesTable from './InvitesTable'

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

const UserProfile = () => {
  const router = useRouter()

  const [editProfileModal, showEditProfileModal] = useState(false)
  const [value, setValue] = useState<string>('1')
  const { user } = useAuth()
  const inviteLink = user?.inviteCode ? `${process.env.HOST_URL}/register/${user?.inviteCode}` : ''
  const theme = useTheme()
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'))

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    if (router.query.tab === 'activities') setValue('1')
    else if (router.query.tab === 'followings') setValue('2')
    else if (router.query.tab === 'followers') setValue('3')
    else if (router.query.tab === 'referred friends') setValue('5')
  }, [router.query.tab])

  const handleChangeTab = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const shortAddress = (address: string | undefined) => {
    return address ? (address?.length > 8 ? address.slice(0, 6) + '...' + address.slice(-4) : address) : address
  }

  const shortInviteLink = (invLink: string | undefined) => {
    return invLink ? (isMobileView ? invLink.slice(0, 15) + '...' + invLink.slice(-7) : invLink) : invLink
  }

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Box sx={{ m: 3.75, mb: 5.25 }}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm='auto' display='flex' justifyContent={'center'}>
              <img alt='avatar' src={avatarOrPlaceholder(user?.avatar)} width={120} height={120} />
            </Grid>
            <StyledGrid item container flex={1}>
              <Typography variant='caption' fontSize={24} color='#212121' fontWeight={500}>
                {`${user?.username || ''}`}
              </Typography>
              <Typography
                variant='caption'
                fontSize={15}
                color='#212121'
                fontWeight={500}
                alignItems={'center'}
                display={'flex'}
              >
                {shortAddress(user?.smartWalletAddress)}
                <ContentCopy
                  fontSize='inherit'
                  sx={{ marginLeft: '10px', cursor: 'pointer' }}
                  onClick={() => {
                    navigator.clipboard.writeText(user?.smartWalletAddress || '')
                    toast.success('Wallet address copied')
                  }}
                />
              </Typography>
              <Box gap={4} display='flex'>
                <Button variant='contained' onClick={() => showEditProfileModal(true)}>
                  Edit Profile
                </Button>
                <DialogEditUserInfo
                  show={editProfileModal}
                  user={user}
                  onClose={() => showEditProfileModal(false)}
                  onBackdropClick={() => showEditProfileModal(false)}
                />
              </Box>
            </StyledGrid>
            <StyledGrid item container flex={1}>
              <Box display='flex'>
                <Typography
                  variant='caption'
                  fontSize={15}
                  color='#212121'
                  fontWeight={500}
                  alignItems={'center'}
                  display={'flex'}
                  onClick={() => {
                    navigator.clipboard.writeText(inviteLink)
                    toast.success('Invite Link copied')
                  }}
                >
                  {shortInviteLink(inviteLink)}
                </Typography>
                <IconButton
                  aria-label='more'
                  id='long-button'
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup='true'
                  onClick={handleClick}
                >
                  <Share />
                </IconButton>
              </Box>
              <Menu
                id='long-menu'
                MenuListProps={{
                  'aria-labelledby': 'long-button'
                }}
                anchorEl={anchorEl}
                open={open}
                sx={{ width: 270 }}
                onClose={handleClose}
              >
                <MenuList>
                  <FacebookShareButton url={inviteLink} style={{ width: '100%', textAlign: 'left' }}>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Facebook />
                      </ListItemIcon>
                      <ListItemText>Facebook</ListItemText>
                    </MenuItem>
                  </FacebookShareButton>
                  <PinterestShareButton url={inviteLink} media={''} style={{ width: '100%', textAlign: 'left' }}>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Pinterest />
                      </ListItemIcon>
                      <ListItemText>Pinterest</ListItemText>
                    </MenuItem>
                  </PinterestShareButton>
                  <RedditShareButton url={inviteLink} style={{ width: '100%', textAlign: 'left' }}>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Reddit />
                      </ListItemIcon>
                      <ListItemText>Reddit</ListItemText>
                    </MenuItem>
                  </RedditShareButton>
                  <WhatsappShareButton url={inviteLink} style={{ width: '100%', textAlign: 'left' }}>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <WhatsApp />
                      </ListItemIcon>
                      <ListItemText>Whatsapp</ListItemText>
                    </MenuItem>
                  </WhatsappShareButton>
                  <LinkedinShareButton url={inviteLink} style={{ width: '100%', textAlign: 'left' }}>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <LinkedIn />
                      </ListItemIcon>
                      <ListItemText>Linkedin</ListItemText>
                    </MenuItem>
                  </LinkedinShareButton>
                  <TwitterShareButton url={inviteLink} style={{ width: '100%', textAlign: 'left' }}>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Twitter />
                      </ListItemIcon>
                      <ListItemText>Twitter</ListItemText>
                    </MenuItem>
                  </TwitterShareButton>
                  <MenuItem
                    onClick={() => {
                      navigator.clipboard.writeText(inviteLink)
                      toast.success('Invite Link copied')
                      handleClose()
                    }}
                  >
                    <ListItemIcon>
                      <ContentCopy />
                    </ListItemIcon>
                    <ListItemText>Copy</ListItemText>
                  </MenuItem>
                </MenuList>
              </Menu>
            </StyledGrid>
          </Grid>
          <StyledGrid>
            <Box sx={{ mt: 3 }}>
              <Typography variant='caption' sx={{ mr: 2 }}>
                <b>{user?.followings.length}</b> Following
              </Typography>
              <Typography variant='caption' sx={{ mr: 2 }}>
                <b>{user?.followers.length}</b> Followers
              </Typography>
              <Typography variant='caption' sx={{ mr: 2 }}>
                <b>{user?.inviteCount}</b> Refered Friends
              </Typography>
              <Typography variant='caption'>
                Level <b>1</b>
              </Typography>
            </Box>
            <Typography component={'span'} sx={{ fontSize: 14 }}>
              {user?.bio || ''}
            </Typography>
          </StyledGrid>
        </Box>
        <TabContext value={value}>
          <Box
            sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}
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
            <ActivityList />
          </TabPanel>
          <TabPanel value='2'>
            <FollowingTable />
          </TabPanel>
          <TabPanel value='3'>
            <FollowerTable />
          </TabPanel>
          <TabPanel value='4'>
            <Box textAlign={'center'}>
              <Typography component={'span'} sx={{ fontSize: 14 }}>
                There is no collection
              </Typography>
            </Box>
          </TabPanel>
          <TabPanel value='5'>
            <InvitesTable profileId={undefined} />
          </TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default UserProfile
