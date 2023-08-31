import React from 'react'
import { Button, ButtonProps, CircularProgress } from '@mui/material'

interface ILoadingButtonProps extends ButtonProps {
  loading?: boolean
}

export const LoadingButton: React.FC<ILoadingButtonProps> = ({ loading, children, ...props }) => {
  if (loading)
    return (
      <Button {...props}>
        <CircularProgress />
      </Button>
    )

  return <Button {...props}>{children}</Button>
}
