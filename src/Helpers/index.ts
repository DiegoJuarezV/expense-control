const formatCurrency = (amount: number) => {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

export default formatCurrency;

export const formatDate = (dateStr: string) : string => {
  const dateObj = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return new Intl.DateTimeFormat('es-Es', options).format(dateObj);
}