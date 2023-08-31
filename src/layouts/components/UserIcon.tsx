// ** React Imports
import { Fragment, ReactNode } from 'react'

// ** MUI Imports
import { SvgIconProps } from '@mui/material'
import { Badge } from '@mui/material'
import Chip from '@mui/material/Chip'

interface UserIconProps {
  iconProps?: SvgIconProps
  icon: string | ReactNode
  componentType: 'search' | 'vertical-menu' | 'horizontal-menu'
  iconBadgeContent: string
  iconBadgeColor?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
}

const UserIcon = (props: UserIconProps) => {
  // ** Props
  const { icon, iconProps, componentType, iconBadgeContent, iconBadgeColor } = props

  const IconTag = icon

  let styles

  if (componentType === 'search') {
    // Conditional Props based on component type, like have different font size or icon color
    /* styles = {
      color: 'blue',
      fontSize: '2rem'
    } */
  } else if (componentType === 'vertical-menu') {
    // Conditional Props based on component type, like have different font size or icon color
    /* styles = {
      color: 'red',
      fontSize: '1.5rem'
    } */
  } else if (componentType === 'horizontal-menu') {
    // Conditional Props based on component type, like have different font size or icon color
    /* styles = {
      color: 'green',
      fontSize: '1rem'
    } */
  } else {
    return null
  }

  return (
    <Fragment>
      {iconBadgeContent ? (
        <Badge
          badgeContent={
            <Chip
              size='small'
              label={iconBadgeContent}
              color={iconBadgeColor || 'error'}
              sx={{
                width: 20,
                height: 20,
                '& .MuiChip-label': { px: 0.5, lineHeight: 1, textTransform: 'capitalize', fontSize: '0.65rem' }
              }}
            />
          }
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          {
            // @ts-ignore
            <IconTag {...iconProps} style={{ ...styles }} />
          }
        </Badge>
      ) : (
        // @ts-ignore
        <IconTag {...iconProps} style={{ ...styles }} />
      )}
    </Fragment>
  )
}

export default UserIcon
