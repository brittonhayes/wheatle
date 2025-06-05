export const isValidNumericValue = (value: string): boolean => {
  const numericValue = parseFloat(value)
  return !isNaN(numericValue) && value !== '.' && value.trim() !== ''
}
