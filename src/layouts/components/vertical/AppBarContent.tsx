/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// ** MUI Imports
import { TextField } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icons Imports
import MenuIcon from 'mdi-material-ui/Menu'
import { Magnify } from 'mdi-material-ui'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components

import UserDropdown from 'src/layouts/components/UserDropdown'
import { useState } from 'react'

//Paths
import UserDropDownPill from '../UserDropDownPill'

import NotificationDropdown from '../NotificationDropdown'
import { ModalSearch } from 'src/views/apps/modals/ModalSearch'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
  const { hidden, settings, toggleNavVisibility } = props
  const [isModal, setModal] = useState(false)

  return (
    <Box style={{ width: '100vw' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: !hidden ? 'space-evenly' : 'space-between' }}>
        {hidden ? (
          <Box className='actions-left' sx={{ width: 40, mx: 2, display: 'flex', alignItems: 'center' }}>
            <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
              <MenuIcon />
            </IconButton>
          </Box>
        ) : null}
        {hidden ? (
          <Box>
            <UserDropdown settings={settings} />
          </Box>
        ) : null}
        {!hidden ? (
          <Box
            onClick={() => setModal(true)}
            style={{
              display: 'flex',
              backgroundColor: '#EBEBEB',
              borderWidth: 1,
              padding: 2,
              borderRadius: 10,
              width: '60%',
              justifyContent: 'center'
            }}
          >
            <TextField
              placeholder={'Search Masma'}
              sx={{ ml: 4, width: '100%', justifyContent: 'center' }}
              variant='standard'
              InputProps={{ startAdornment: <Magnify sx={{ marginRight: 2 }} />, disableUnderline: true }}
            />
          </Box>
        ) : (
          <Box>
            <Box
              className='actions-left'
              sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}
            >
              <NotificationDropdown settings={settings} />
              <IconButton color='inherit' onClick={() => setModal(true)}>
                <Magnify />
              </IconButton>
            </Box>
          </Box>
        )}
        {!hidden ? <UserDropDownPill settings={settings} /> : null}
        {hidden ? null : (
          <Box sx={{ borderWidth: 1, borderRadius: '10%', display: 'flex', justifyContent: 'center' }}>
            <NotificationDropdown settings={settings} />
          </Box>
        )}
      </Box>
      <ModalSearch open={isModal} onClose={() => setModal(false)} hidden={hidden} />
    </Box>
  )
}

export default AppBarContent
