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

const PickersMonthYearDropdowns = () => {
  // ** States
  const [year, setYear] = useState<DateType>(new Date())
  const [month, setMonth] = useState<DateType>(new Date())
  const [monthYear, setMonthYear] = useState<DateType>(new Date())

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
      <Box>
        <DatePicker
          selected={month}
          showMonthDropdown
          id='month-dropdown'
          placeholderText='MM-DD-YYYY'
          onChange={(date: Date) => setMonth(date)}
          customInput={<CustomInput label='Month Dropdown' />}
        />
      </Box>
      <Box>
        <DatePicker
          selected={year}
          showYearDropdown
          id='year-dropdown'
          placeholderText='MM-DD-YYYY'
          onChange={(date: Date) => setYear(date)}
          customInput={<CustomInput label='Year Dropdown' />}
        />
      </Box>
      <Box>
        <DatePicker
          showYearDropdown
          showMonthDropdown
          selected={monthYear}
          id='month-year-dropdown'
          placeholderText='MM-DD-YYYY'
          onChange={(date: Date) => setMonthYear(date)}
          customInput={<CustomInput label='Month & Year Dropdown' />}
        />
      </Box>
    </Box>
  )
}

export default PickersMonthYearDropdowns
