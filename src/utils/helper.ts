import numeral from 'numeral'

export const timestampToDateTime = (timestamp: string | number) => {
  const dateObj = new Date(+timestamp * 1000)

  return dateObj
}

export const formatTokenPrice = (num: number) =>
  num < 0.0001 ? `$${num.toFixed(10)}` : num < 1 ? numeral(num).format('$0,0.00[00]') : numeral(num).format('$0,0.00')
