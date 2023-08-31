// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Custom Component Imports
import CustomInput from './PickersCustomInput'

const PickersTime = () => {
  // ** States
  const [time, setTime] = useState<DateType>(new Date())
  const [dateTime, setDateTime] = useState<DateType>(new Date())

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
      <Box>
        <DatePicker
          showTimeSelect
          selected={time}
          timeIntervals={15}
          showTimeSelectOnly
          dateFormat='h:mm aa'
          id='time-only-picker'
          timeCaption='Time Picker'
          onChange={(date: Date) => setTime(date)}
          customInput={<CustomInput label='Time Only' />}
        />
      </Box>
      <Box>
        <DatePicker
          showTimeSelect
          timeFormat='HH:mm'
          timeIntervals={15}
          selected={dateTime}
          id='date-time-picker'
          timeCaption='Time Picker'
          dateFormat='MM/dd/yyyy h:mm aa'
          onChange={(date: Date) => setDateTime(date)}
          customInput={<CustomInput label='Date & Time' />}
        />
      </Box>
    </Box>
  )
}

export default PickersTime
