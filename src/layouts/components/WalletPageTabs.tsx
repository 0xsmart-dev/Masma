import React from 'react'
import { Tab, Tabs, Box, Typography } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import WalletDepositsScreen from 'src/layouts/components/WalletDepositsScreen'
import WalletTransfersScreen from './WalletTransferScreen'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function WalletPageTabs() {
  const [value, setValue] = React.useState(0)
  const { user } = useAuth()
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='transactions_viewer'
          scrollButtons
          allowScrollButtonsMobile
          variant='fullWidth'
          centered
          sx={{ width: '100%' }}
        >
          <Tab label='Transfers' {...a11yProps(0)} />
          <Tab label='Deposits' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <WalletTransfersScreen walletAddress={user?.smartWalletAddress} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WalletDepositsScreen walletAddress={user?.smartWalletAddress} />
      </TabPanel>
    </Box>
  )
}
