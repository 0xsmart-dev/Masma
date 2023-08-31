import React, { useEffect, useState, useCallback } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import { Box, Avatar, Typography, Stack } from '@mui/material'
import debounce from 'lodash.debounce'
import { CTextField } from './CTextField'
import { UserDataType } from 'src/context/types'
import { avatarOrPlaceholder } from 'src/lib/utils'
import { searchUsers } from 'src/lib/api'

export const getOptionsAsync = async (keyword: string): Promise<UserDataType[]> => {
  const userOptions = await searchUsers(keyword)

  return userOptions
}

export default function UserSelection({
  selected,
  onChange
}: {
  selected: UserDataType | null
  onChange: (e: any, value: UserDataType | null) => void
}) {
  const [options, setOptions] = useState<UserDataType[]>(selected ? [selected] : [])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getOptionsDelayed = useCallback(
    debounce((query: string, callback: (options: UserDataType[]) => void) => {
      setOptions([])
      getOptionsAsync(query).then(callback)
    }, 200),
    []
  )

  useEffect(() => {
    setIsLoading(true)

    getOptionsDelayed(searchQuery, (options: UserDataType[]) => {
      setOptions(options)
      setIsLoading(false)
    })
  }, [searchQuery, getOptionsDelayed])

  // const onChange = (event: unknown, value: UserDataType | null) => {
  //   setValue(value)
  // }

  const onInputChange = (event: unknown, value: string) => {
    setSearchQuery(value)
  }

  const getOptionLabel = (option: UserDataType): string => `${option.username}`

  const renderInput = (params): React.ReactNode => {
    return (
      <Box sx={{ width: '500px' }}>
        <CTextField params={params} label='Search users' selectedOption={selected} />
      </Box>
    )
  }

  const renderOption = (props, option: UserDataType): React.ReactNode => {
    return (
      <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
        <Avatar
          alt={option?.username}
          src={avatarOrPlaceholder(option?.avatar)}
          sx={{ width: '2.5rem', height: '2.5rem' }}
        />
        <Stack flexDirection='column' alignItems='flex-start' sx={{ ml: 3 }}>
          <Typography>{option.username}</Typography>
        </Stack>
      </Box>
    )
  }

  const filterOptions = (options: UserDataType[]): UserDataType[] => options

  return (
    <Autocomplete
      options={options}
      value={selected}
      onChange={onChange}
      autoHighlight
      onInputChange={onInputChange}
      getOptionLabel={getOptionLabel}
      renderInput={renderInput}
      renderOption={renderOption}
      loading={isLoading}
      filterOptions={filterOptions}
      blurOnSelect={true}
    />
  )
}
