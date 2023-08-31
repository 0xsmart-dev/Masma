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

const PickersMonthYear = () => {
  // ** States
  const [year, setYear] = useState<DateType>(new Date())
  const [month, setMonth] = useState<DateType>(new Date())
  const [quarter, setQuarter] = useState<DateType>(new Date())

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
      <Box>
        <DatePicker
          selected={month}
          id='month-picker'
          showMonthYearPicker
          dateFormat='MM/yyyy'
          onChange={(date: Date) => setMonth(date)}
          customInput={<CustomInput label='Month Picker' />}
        />
      </Box>
      <Box>
        <DatePicker
          showYearPicker
          selected={year}
          id='year-picker'
          dateFormat='MM/yyyy'
          onChange={(date: Date) => setYear(date)}
          customInput={<CustomInput label='Year Picker' />}
        />
      </Box>
      <Box>
        <DatePicker
          selected={quarter}
          id='quarter-picker'
          showQuarterYearPicker
          dateFormat='yyyy, QQQ'
          onChange={(date: Date) => setQuarter(date)}
          customInput={<CustomInput label='Quarter Picker' />}
        />
      </Box>
    </Box>
  )
}

export default PickersMonthYear
