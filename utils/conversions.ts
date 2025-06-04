/**
 * Conversion utilities for wheat futures data
 */

// Conversion constant
export const BUSHELS_PER_METRIC_TON = 36.744;

/**
 * Converts metric tons to bushels
 * @param metricTons - The amount in metric tons
 * @returns The equivalent amount in bushels
 */
export function convertMetricTonsToBushels(metricTons: number): number {
  return metricTons * BUSHELS_PER_METRIC_TON;
}

/**
 * Converts bushels to metric tons
 * @param bushels - The amount in bushels
 * @returns The equivalent amount in metric tons
 */
export function convertBushelsToMetricTons(bushels: number): number {
  return bushels / BUSHELS_PER_METRIC_TON;
}

/**
 * Converts price per metric ton to price per bushel
 * @param pricePerMetricTon - The price per metric ton
 * @returns The equivalent price per bushel
 */
export function convertPricePerMetricTonToPricePerBushel(
  pricePerMetricTon: number
): number {
  return pricePerMetricTon / BUSHELS_PER_METRIC_TON;
}

/**
 * Formats the conversion result with appropriate decimal places
 * @param value - The numeric value to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted string with specified decimal places
 */
export function formatConversionResult(
  value: number,
  decimals: number = 2
): string {
  return value.toFixed(decimals);
}
