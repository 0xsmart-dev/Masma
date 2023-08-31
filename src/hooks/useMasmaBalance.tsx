import { useEffect, useState } from 'react'
import { getUSDCBalance } from 'src/lib/contracts/functions'

export const useMasmaBalance = (address: string | undefined) => {
  const [balance, setBalance] = useState(0)

  const fetchMasmaBalance = async () => {
    if (address) {
      const balance = await getUSDCBalance(address)
      setBalance(balance)
    }
  }
  useEffect(() => {
    fetchMasmaBalance()
  })

  return { balance }
}
