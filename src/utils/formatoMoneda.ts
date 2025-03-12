export const formatoMoneda = (
  value: number,
  locale: string = 'es-CO',
  currency: string = 'COP'
) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  }).format(value)
}
