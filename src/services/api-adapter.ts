import { GeoType, Currency } from '@/constants';
import type { Country, GeoEntity } from '@/types';

export interface PriceOffer {
  id: string;
  amount: number;
  currency: Currency;
  startDate: string;
  endDate: string;
  hotelID?: string;
}

export interface StartSearchResponse {
  token: string;
  waitUntil: string;
}

export interface GetSearchPricesResponse {
  prices: Record<string, PriceOffer>;
}

export interface StopSearchResponse {
  status: 'cancelled';
  message: string;
}

export interface ErrorResponse {
  code: number;
  error: true;
  message: string;
  waitUntil?: string;
}

interface ApiModule {
  getCountries(): Promise<Response>;
  searchGeo(query?: string): Promise<Response>;
  startSearchPrices(countryID: string): Promise<Response>;
  getSearchPrices(token: string): Promise<Response>;
  stopSearchPrices(token: string): Promise<Response>;
}

// _api/api.js is a plain JS mock — DO NOT modify
// @ts-expect-error — api.js has no type declarations
import * as _api from '../../_api/api.js';
const api = _api as ApiModule;

async function callApi<T>(promise: Promise<Response>): Promise<T> {
  let res: Response;
  try {
    res = await promise;
  } catch (err) {
    if (err instanceof Response) {
      const body = (await err.json()) as ErrorResponse;
      throw body;
    }
    throw err;
  }
  return res.json() as Promise<T>;
}

type RawCountry = Omit<Country, 'type'>;

export const getCountries = (): Promise<Country[]> =>
  callApi<Record<string, RawCountry>>(api.getCountries()).then((map) =>
    Object.values(map).map((c) => ({ ...c, type: GeoType.Country })),
  );

export const searchGeo = (query?: string): Promise<GeoEntity[]> =>
  callApi<Record<string, GeoEntity>>(api.searchGeo(query)).then((map) =>
    Object.values(map),
  );

export const startSearchPrices = (countryID: string): Promise<StartSearchResponse> =>
  callApi<StartSearchResponse>(api.startSearchPrices(countryID));

export const getSearchPrices = (token: string): Promise<GetSearchPricesResponse> =>
  callApi<GetSearchPricesResponse>(api.getSearchPrices(token));

export const stopSearchPrices = (token: string): Promise<StopSearchResponse> =>
  callApi<StopSearchResponse>(api.stopSearchPrices(token));
