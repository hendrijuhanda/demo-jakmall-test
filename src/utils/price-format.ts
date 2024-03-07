export default (value: number) => {
  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'code',
    minimumFractionDigits: 0
  })

  return numberFormat.format(value).replace('USD', '').trim()
}
