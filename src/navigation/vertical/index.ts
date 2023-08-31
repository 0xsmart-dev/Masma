// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import Storefront from 'mdi-material-ui/Storefront'
import Apps from 'mdi-material-ui/Apps'
import Earth from 'mdi-material-ui/Earth'
import AccountGroupOutline from 'mdi-material-ui/AccountGroupOutline'
import Bridge from 'mdi-material-ui/Bridge'
import SwapHorizontalCircleOutline from 'mdi-material-ui/SwapHorizontalCircleOutline'
import HomeGroup from 'mdi-material-ui/HomeGroup'
import Pound from 'mdi-material-ui/Pound'
import { AutoGraphOutlined } from '@mui/icons-material'
import PlayForWorkIcon from '@mui/icons-material/PlayForWork'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { WalletOutline } from 'mdi-material-ui'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'

const Navigation = (): VerticalNavItemsType => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const chatStore = useSelector((state: RootState) => state.chat)

  return [
    {
      title: 'Home',
      icon: HomeOutline,
      path: '/home'
    },
    {
      title: 'Wallet',
      icon: WalletOutline,
      path: '/wallet'
    },
    {
      title: 'Investing',
      icon: AutoGraphOutlined,
      path: '/investing'
    },
    {
      title: 'Deposit',
      icon: PlayForWorkIcon,
      path: '/deposit'
    },
    {
      title: 'My Profile',
      icon: AccountOutline,
      path: '/profile'
    },
    {
      title: 'Messages',
      icon: MessageOutline,
      iconBadgeContent: chatStore.totalUnreadMsgs > 0 ? chatStore.totalUnreadMsgs + '' : '',
      path: '/message'
    },

    {
      sectionTitle: 'Coming Soon'
    },
    {
      title: 'Discover',
      icon: Pound,
      disabled: true,
      badgeColor: 'default',
      badgeContent: 'Soon'
    },
    {
      title: 'Marketplace',
      icon: Storefront,
      disabled: true,
      badgeColor: 'default',
      badgeContent: 'Soon'
    },
    {
      sectionTitle: ' '
    },
    {
      title: 'Bridge',
      icon: Bridge,
      disabled: true,
      badgeColor: 'default',
      badgeContent: 'Soon'
    }
  ]
}

export default Navigation
