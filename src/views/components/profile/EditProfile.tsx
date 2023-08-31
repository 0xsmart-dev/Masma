// ** React Imports
import { Ref, useState, forwardRef, ReactElement, ChangeEvent, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import { CircularProgress } from '@mui/material'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import DialogTitle from '@mui/material/DialogTitle'
import { avatarOrPlaceholder } from 'src/lib/utils'
import { Controller, useForm } from 'react-hook-form'
import FormHelperText from '@mui/material/FormHelperText'
import { useAuth } from 'src/hooks/useAuth'
import toast from 'react-hot-toast'
import { updateUser } from 'src/lib/api'
import { UserDataType } from 'src/context/types'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(5),
  borderRadius: theme.shape.borderRadius
}))

type IDialogEditUserInfoProps = {
  show: boolean
  onClose: () => void
  onBackdropClick: () => void
  user: UserDataType | null
}

interface FormInputs {
  username: string
  bio: string
}

const defaultValues = {
  username: '',
  bio: ''
}

const DialogEditUserInfo = ({ show, onClose, onBackdropClick, user }: IDialogEditUserInfoProps) => {
  // ** States
  const [imgSrc, setImgSrc] = useState<string>(avatarOrPlaceholder(user?.avatar))
  const [loading, setLoading] = useState(false)

  // ** Hooks
  const { setUser } = useAuth()

  const schema = yup.object().shape({
    name: yup.string().min(5, 'Name length must be over 5').required('Name is a required field'),
    bio: yup.string().min(20, 'Bio length must be over 10').required('Bio is a required field')
  })

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormInputs>({ defaultValues, resolver: yupResolver(schema) })

  const onSubmit = async (data: FormInputs) => {
    setLoading(true)
    try {
      const response = await updateUser({
        email: user?.email,
        ...data
      })

      setUser({
        ...user,
        ...response
      })
      setLoading(false)
      onClose()
    } catch (e) {
      toast.error('Failed to update profile.')
      setLoading(false)
    }
  }

  useEffect(() => {
    setValue('username', user?.username || '')
    setValue('bio', user?.bio || '')
  }, [user])

  const onClickDiscard = () => {
    onClose()
  }

  return (
    <Dialog
      fullWidth
      open={show}
      maxWidth='sm'
      scroll='body'
      onClose={onClose}
      TransitionComponent={Transition}
      onBackdropClick={onBackdropClick}
    >
      <DialogTitle sx={{ p: 4 }}>
        <Typography variant='h6' component='span'>
          Edit Profile
        </Typography>
        <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers sx={{ pb: 6, px: { xs: 4, sm: 8 }, pt: { xs: 4, sm: 6.5 }, position: 'relative' }}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm='auto' display='flex' justifyContent={'center'}>
              <ImgStyled src={imgSrc} alt='avatar' width={120} height={120} />
            </Grid>
            <Grid item xs={12} spacing={'10px'}>
              <FormControl fullWidth>
                <Controller
                  name='username'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      label='Username'
                      value={value}
                      error={Boolean(errors.username)}
                      onChange={onChange}
                    />
                  )}
                />
                {errors.username && (
                  <FormHelperText sx={{ color: 'error.main' }} id='username'>
                    {errors.username.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ marginTop: '10px' }}>
                <Controller
                  name='bio'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      label='Bio'
                      multiline
                      minRows={5}
                      maxRows={10}
                      value={value}
                      error={Boolean(errors.bio)}
                      onChange={onChange}
                    />
                  )}
                />
                {errors.bio && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                    {errors.bio.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ mt: { xs: 2, sm: 2 }, pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <Button variant='contained' sx={{ mr: 2 }} type='submit'>
            {loading ? <CircularProgress /> : 'Update'}
          </Button>
          <Button variant='outlined' color='secondary' onClick={onClickDiscard}>
            Discard
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DialogEditUserInfo
