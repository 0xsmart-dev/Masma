import moment from 'moment'

export const formatBalance = (balance: number | string | undefined, digits = 2) => {
  if (typeof balance === 'undefined') return 0
  if (typeof balance === 'string') return parseFloat(balance).toFixed(digits)

  return balance.toFixed(digits)
}

export const shortenAddress = (address: string) => {
  return address ? (address?.length > 8 ? address.slice(0, 6) + '...' + address.slice(-4) : address) : address
}

export const getDisplayDate = (compDate: Date) => {
  const today = new Date()
  today.setHours(0)
  today.setMinutes(0)
  today.setSeconds(0)
  today.setMilliseconds(0)
  const diff = today.getTime() - compDate.getTime()
  if (compDate.getTime() == today.getTime()) {
    return 'Today'
  } else if (diff <= 24 * 60 * 60 * 1000) {
    return 'Yesterday'
  } else {
    return moment(compDate).format('D MMM')
  }
}
