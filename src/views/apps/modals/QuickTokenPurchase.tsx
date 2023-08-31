// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { TokenPurchaseInit } from 'src/views/apps/modals/TokenPurchaseInit'
import TokenModal from './TokenModal'

export const QuickTokenPurchase = () => {
  // ** State
  const [value, setValue] = useState<string>('buy')
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <>
      <Card>
        <CardContent>
          <TabContext value={value}>
            <TabList variant='fullWidth' onChange={handleChange} aria-label='quick-purchase'>
              <Tab value='buy' label='Buy' />
              <Tab value='sell' label='Sell' />
              <Tab value='convert' label='Convert' />
            </TabList>
            <TabPanel value='buy'>
              <TokenPurchaseInit type='buy' onNext={handleOpen} />
            </TabPanel>
            <TabPanel value='sell'>
              <TokenPurchaseInit type='sell' onNext={handleOpen} />
            </TabPanel>
            <TabPanel value='convert'>
              <TokenPurchaseInit type='convert' onNext={handleOpen} />
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
      <TokenModal open={open} handleClose={handleClose} type={value} />
    </>
  )
}
