export interface WheatFuturesResponse {
  name: string;
  interval: string;
  unit: string;
  data: WheatFuture[];
}

export interface WheatFuture {
  date: string;
  value: string;
}
