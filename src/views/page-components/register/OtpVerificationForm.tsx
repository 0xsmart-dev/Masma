// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

import FormControl from '@mui/material/FormControl'
import { TextField, FormHelperText, Button } from '@mui/material'

// ** Demo Imports
import { CircularProgress } from '@mui/material'

const OtpVerificationForm = ({ onSubmitOtp, loading, onBack }) => {
  const schema = yup.object().shape({
    otp: yup
      .string()
      .min(6, 'code should be 6 digits')
      .max(6, 'code should be 6 digits')
      .required('Code is a required value')
  })

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    onSubmitOtp(data.otp, error => {
      if (error.otp) {
        setError('otp', {
          type: 'manual',
          message: 'Otp verification failed'
        })
      }
    })
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth sx={{ mb: 4 }}>
        <Controller
          name='otp'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              value={value}
              label='Verification Code'
              onBlur={onBlur}
              onChange={onChange}
              error={Boolean(errors.otp)}
              sx={{
                letterSpacing: '20px',
                fontSize: '25px'
              }}
            />
          )}
        />
        {errors.otp && <FormHelperText sx={{ color: 'error.main' }}>{errors.otp.message}</FormHelperText>}
      </FormControl>
      <Button
        fullWidth
        size='large'
        type='submit'
        variant='contained'
        sx={{ mb: 2, borderRadius: 100 }}
        disabled={loading}
      >
        {loading ? <CircularProgress /> : 'Verify'}
      </Button>
      {!loading && (
        <Button fullWidth size='large' variant='outlined' sx={{ mb: 2, borderRadius: 100 }} onClick={onBack}>
          Back
        </Button>
      )}
    </form>
  )
}

export default OtpVerificationForm
