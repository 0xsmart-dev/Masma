/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import Wyre from 'src/utils/Wyre.js'
import getTransactionStatus from 'src/hooks/wyre/getTransactionStatus'
import { useAuth } from 'src/hooks/useAuth'
import { UserDataType } from 'src/context/types'
// eslint-disable-next-line @typescript-eslint/ban-types

const UserOnRampComponent = ({ reservationOrderData }) => {
  const { user }: { user: UserDataType | null } = useAuth()
  const widget: any = new Wyre({
    env: 'test',
    reservation: reservationOrderData.reservation,
    operation: {
      type: 'debitcard-hosted-dialog'
    }
  })

  if (reservationOrderData.reservation != '') {
    window.open(
      `https://global-stg.transak.com?apiKey=${process.env.NEXT_PUBLIC_TRANSAK_API_KEY}&environment=STAGING&defaultCryptoCurrency=USDC&network=polygon&isDisableCrypto=true&disableWalletAddressForm=true&walletAddress=${user?.smartWalletAddress}&cryptoCurrencyCode=USDC&defaultFiatAmount=30&fiatCurrency=USD`,
      '_blank',
      'toolbar=1, scrollbars=1, resizable=1, width=' + 400 + ', height=' + 800
    )
  }

  widget.on('paymentSuccess', async function ({ data }) {
    await getTransactionStatus(data.data.orderId)
  })

  return <></>
}

export default UserOnRampComponent
