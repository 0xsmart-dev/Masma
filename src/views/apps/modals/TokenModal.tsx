// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import { TokenPurchaseInit } from './TokenPurchaseInit'
import { TokenPurchaseConfirm } from './TokenPurchaseConfirm'
import { TokenPurchaseSuccess } from './TokenPurchaseSuccess'

const TokenModal = ({ type = 'buy', open = true, handleClose }) => {
  const [step, setStep] = useState<number>(1)
  const clearModal = () => {
    handleClose()
    setStep(1)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='token-modal'
      aria-describedby='token-purchase-modal'
      maxWidth='md'
    >
      <DialogContent>
        <DialogContentText id='token-purchase-modal'>
          {step === 1 && <TokenPurchaseInit type={type} onNext={() => setStep(2)} style={{ minWidth: 360 }} />}
          {step === 2 && <TokenPurchaseConfirm type={type} onNext={() => setStep(3)} onCancel={clearModal} />}
          {step === 3 && <TokenPurchaseSuccess type={type} onNext={clearModal} />}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default TokenModal
