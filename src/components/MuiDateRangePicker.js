import { Box, TextField } from '@mui/material'
import { DateRangePicker } from '@mui/lab'
import { useState } from 'react'

const MuiDateRangePicker = () => {
  const [value, setValue] = useState();

  return (
    <Box width="500px">
      <DateRangePicker
        startText="In"
        endText="Out"
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
        }}
        renderInput={(startProps, endProps) => (
            <>
            <TextField {...startProps} />
            <Box sx={{mx: 2}}>to</Box>
            <TextField {...endProps}/>
            </>
        )}
      ></DateRangePicker>
    </Box>
  )
}

export default MuiDateRangePicker
