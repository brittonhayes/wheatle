import { WheatFuturesResponse } from '../types'

export const createErrorResponse = (message: string, status = 500) => {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' }
  })
}

export const createSuccessResponse = (data: WheatFuturesResponse) => {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}
