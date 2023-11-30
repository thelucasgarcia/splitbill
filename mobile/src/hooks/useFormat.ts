export const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions | undefined) => {
    return Intl.DateTimeFormat('pt-br', { dateStyle: 'medium', timeStyle: 'short', ...options }).format(new Date(date))
  }

export const formatCurrency = (value = 0, options?: Intl.NumberFormatOptions | undefined) => {
    return Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL', ...options }).format(value)
}