import { WheatFuturesResponse } from '../types'
import { STORAGE_KEYS, ONE_DAY_IN_MILLISECONDS } from '../config'
import { getFromStorage, saveToStorage } from './storage'

// Function to fetch wheat price from API with caching
export async function fetchWheatPrice(
  fallbackPrices: number[] = [5.89, 5.75, 6.12, 5.95, 6.03]
): Promise<number> {
  try {
    // Check cache first
    const cached = getFromStorage(STORAGE_KEYS.WHEAT_PRICE_CACHE)
    if (cached !== null) {
      const { price, timestamp } = JSON.parse(cached)
      const now = Date.now()
      if (now - timestamp < ONE_DAY_IN_MILLISECONDS) {
        return price
      }
    }

    const response = await fetch('/.netlify/functions/pullWheatFutures')
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data: WheatFuturesResponse = await response.json()

    // Extract the most recent wheat price from the API response
    if (Array.isArray(data.data) && data.data.length > 0) {
      const mostRecentPrice = data.data[0]?.value
      if (
        mostRecentPrice !== undefined &&
        !isNaN(parseFloat(mostRecentPrice))
      ) {
        const price = parseFloat(mostRecentPrice)
        setWheatPriceCache(price, Date.now())

        return price
      }
    }

    throw new Error('Invalid API response format')
  } catch (error) {
    console.error('Failed to fetch wheat price from API:', error)
    // Use fallback price based on current day
    const dayIndex = new Date().getDate() % fallbackPrices.length
    return fallbackPrices[dayIndex] ?? 5.89
  }
}

export function setWheatPriceCache(price: number, timestamp: number): void {
  saveToStorage(
    STORAGE_KEYS.WHEAT_PRICE_CACHE,
    JSON.stringify({ price, timestamp })
  )
}

export function getWheatPriceCache(): {
  price: number
  timestamp: number
} | null {
  const cached = getFromStorage(STORAGE_KEYS.WHEAT_PRICE_CACHE)
  if (cached === null) {
    return null
  }
  try {
    const { price, timestamp } = JSON.parse(cached)
    return { price, timestamp }
  } catch {
    return null
  }
}
