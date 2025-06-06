export function isValidGuess(guess: string): {
  isValid: boolean
  value?: number
  error?: string
} {
  if (guess.trim() === '') {
    return { isValid: false, error: 'Please enter a number' }
  }

  const value = parseFloat(guess)
  if (isNaN(value)) {
    return { isValid: false, error: 'Please enter a valid number' }
  }

  if (value <= 0) {
    return { isValid: false, error: 'Please enter a positive number' }
  }

  return { isValid: true, value }
}

export const isValidNumericValue = (value: string): boolean => {
  const numericValue = parseFloat(value)
  return !isNaN(numericValue) && value !== '.' && value.trim() !== ''
}
