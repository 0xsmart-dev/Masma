// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'

// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'

const Navigation = (): HorizontalNavItemsType => {
  const chatStore = useSelector((state: RootState) => state.chat)

  return [
    {
      title: 'Home',
      icon: HomeOutline,
      path: '/home'
    },
    {
      title: 'My Profile',
      icon: AccountOutline,
      path: '/profile'
    },
    {
      title: 'Messages',
      icon: MessageOutline,
      path: '/message',
      iconBadgeContent: chatStore.totalUnreadMsgs > 0 ? chatStore.totalUnreadMsgs + '' : ''
    },
    {
      title: 'My Apps',
      icon: HomeOutline,
      path: '/my-apps',
      badgeColor: 'default',
      badgeContent: 'Soon'
    },
    {
      title: 'Discover',
      icon: HomeOutline,
      path: '/discover',
      badgeColor: 'default',
      badgeContent: 'Soon'
    },
    {
      title: 'Marketplace',
      icon: AccountOutline,
      path: '/marketplace',
      badgeColor: 'default',
      badgeContent: 'Soon'
    },
    {
      title: 'Communities',
      icon: AccountOutline,
      path: '/communities',
      badgeColor: 'default',
      badgeContent: 'Soon'
    },
    {
      title: 'Groups',
      icon: MessageOutline,
      path: '/groups',
      badgeColor: 'default',
      badgeContent: 'Soon'
    },
    {
      title: 'DeFi',
      icon: HomeOutline,
      path: '/defi',
      badgeColor: 'default',
      badgeContent: 'Soon'
    },
    {
      title: 'Bridge',
      icon: AccountOutline,
      path: '/bridge',
      badgeColor: 'default',
      badgeContent: 'Soon'
    },
    {
      title: 'Swap',
      icon: MessageOutline,
      path: '/swap',
      badgeColor: 'default',
      badgeContent: 'Soon'
    }
  ]
}
export default Navigation
