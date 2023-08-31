// ** React Imports
import { useState, SyntheticEvent, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import { GridMoreVertIcon } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import SellIcon from '@mui/icons-material/Sell'

const CryptoAssetsMenu = ({ cryptoId }) => {
  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const router = useRouter()

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
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <GridMoreVertIcon />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { marginLeft: 10 } }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <MenuItem>
          <SellIcon fontSize='small' />
          Sell
        </MenuItem>
        <MenuItem>
          <ShoppingCartCheckoutIcon fontSize='small' />
          Send
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default CryptoAssetsMenu
