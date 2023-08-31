// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

// ** Third Party Imports
import subDays from 'date-fns/subDays'
import addDays from 'date-fns/addDays'
import DatePicker from 'react-datepicker'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Custom Component Imports
import CustomInput from './PickersCustomInput'

const PickersCustomization = () => {
  // ** States
  const [dateFormat, setDateFormat] = useState<DateType>(new Date())
  const [dateHighlight, setDateHighlight] = useState<DateType>(new Date())

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
      <Box>
        <DatePicker
          id='custom-format'
          selected={dateFormat}
          dateFormat='MMMM d, yyyy h:mm aa'
          onChange={(date: Date) => setDateFormat(date)}
          customInput={<CustomInput label='Custom Date Format' />}
        />
      </Box>
      <Box>
        <DatePicker
          id='highlight-dates'
          selected={dateHighlight}
          onChange={(date: Date) => setDateHighlight(date)}
          customInput={<CustomInput label='Highlight Dates' />}
          highlightDates={[subDays(new Date(), 7), addDays(new Date(), 7)]}
        />
      </Box>
    </Box>
  )
}

export default PickersCustomization
