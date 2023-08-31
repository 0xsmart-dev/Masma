import React, { useEffect, useState, useRef } from 'react'
import { TextField, TextFieldProps, Stack, Typography, Avatar } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import omit from 'lodash-es/omit'

import { UserDataType } from 'src/context/types'
import { avatarOrPlaceholder } from 'src/lib/utils'
import { shortenAddress } from 'src/lib/utils/format'

export const CTextField: React.VFC<
  TextFieldProps & {
    params: any
    selectedOption: UserDataType | null
  }
> = ({ params, selectedOption, ...other }) => {
  const [value, setValue] = useState((params.inputProps as { value: string }).value)
  const [isFocus, setIsFocus] = useState<boolean>(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    ;(
      params.inputProps as {
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
      }
    ).onChange(event)

    setValue(event.target.value)
  }

  const hasMountedRef = useRef<boolean>(false)

  useEffect(() => {
    if (hasMountedRef.current) {
      setValue('')
    } else {
      hasMountedRef.current = true
    }
  }, [selectedOption])

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    ;(
      params.inputProps as {
        onFocus: (event: React.FocusEvent<HTMLInputElement>) => void
      }
    ).onFocus(event)

    setIsFocus(true)
  }

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    ;(
      params.inputProps as {
        onBlur: (event: React.FocusEvent<HTMLInputElement>) => void
      }
    ).onBlur(event)

    setIsFocus(false)
  }

  return (
    <div style={{ position: 'relative' }}>
      <TextField
        {...omit(params, 'inputProps')}
        {...other}
        inputProps={{
          ...omit(params.inputProps, ['value', 'onChange']),
          value,
          onChange: handleInputChange,
          onBlur: handleInputBlur,
          onFocus: handleInputFocus
        }}
        InputLabelProps={{
          shrink: !!isFocus || !!selectedOption
        }}
      />

      {!isFocus && selectedOption && (
        <div style={{ position: 'absolute', left: 10, bottom: 10, textAlign: 'left' }}>
          <Stack flexDirection='row' alignItems='left'>
            <Avatar
              alt={selectedOption?.username}
              src={avatarOrPlaceholder(selectedOption?.avatar)}
              sx={{ width: '2.5rem', height: '2.5rem' }}
            />
            <Stack flexDirection='column' alignItems='center' justifyContent='center' sx={{ ml: 3 }}>
              <Typography>{selectedOption.username} </Typography>
            </Stack>
          </Stack>
        </div>
      )}
    </div>
  )
}
