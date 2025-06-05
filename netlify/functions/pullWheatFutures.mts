import type { Config, Context } from "@netlify/functions";
import {
  convertPricePerMetricTonToPricePerBushel,
  formatConversionResult,
  createErrorResponse,
  createSuccessResponse,
  isValidNumericValue,
} from "../../utils";
import { WheatFuture, WheatFuturesResponse } from "../../src/types";

function convertWheatPriceData(
  data: WheatFuturesResponse
): WheatFuturesResponse {
  // Convert prices from dollar per metric ton to dollar per bushel
  if (data.data && Array.isArray(data.data)) {
    data.data = data.data.map((item: WheatFuture) => {
      if (isValidNumericValue(item.value)) {
        const numericValue = parseFloat(item.value);
        return {
          ...item,
          value: formatConversionResult(
            convertPricePerMetricTonToPricePerBushel(numericValue),
            4
          ),
        };
      }
      return item;
    });
  }

  // Update the unit description
  if (data.unit === "dollar per metric ton") {
    data.unit = "dollar per bushel";
  }

  return data;
}

async function fetchWheatFuturesData(apiKey: string) {
  const url = `https://www.alphavantage.co/query?function=WHEAT&apikey=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Alpha Vantage API error: ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
}

export default async (req: Request, context: Context) => {
  try {
    // Get API key from environment variables
    const apiKey = Netlify.env.get("ALPHA_VANTAGE_API_KEY");
    if (!apiKey) {
      return createErrorResponse(
        "Alpha Vantage API key not found in environment variables"
      );
    }

    // Fetch and convert wheat futures data
    const rawData = await fetchWheatFuturesData(apiKey);
    const convertedData = convertWheatPriceData(rawData);

    return createSuccessResponse(convertedData);
  } catch (error) {
    console.error("Error fetching wheat futures:", error);
    if (error instanceof Error) {
      return createErrorResponse(`API Error: ${error.message}`, 400);
    }

    return createErrorResponse("Failed to fetch wheat futures data");
  }
};
