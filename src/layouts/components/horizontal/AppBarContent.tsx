// ** MUI Imports
import Box from '@mui/material/Box'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import UserDropdown from 'src/layouts/components/UserDropdown'

interface Props {
  settings: Settings
  saveSettings: (values: Settings) => void
}
const AppBarContent = (props: Props) => {
  // ** Props
  const { settings } = props

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <UserDropdown settings={settings} />
    </Box>
  )
}

export default AppBarContent
