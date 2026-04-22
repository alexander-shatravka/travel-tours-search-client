import type { Country, GeoEntity } from '@/types';

export interface PriceOffer {
  id: string;
  amount: number;
  currency: 'usd';
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

function parse<T>(res: Response): Promise<T> {
  return res.json() as Promise<T>;
}

type RawCountry = Omit<Country, 'type'>;

export const getCountries = (): Promise<Country[]> =>
  api.getCountries().then((res) =>
    parse<Record<string, RawCountry>>(res).then((map) =>
      Object.values(map).map((c) => ({ ...c, type: 'country' as const }))
    )
  );

export const searchGeo = (query?: string): Promise<GeoEntity[]> =>
  api.searchGeo(query).then((res) =>
    parse<Record<string, GeoEntity>>(res).then((map) => Object.values(map))
  );

export const startSearchPrices = (countryID: string): Promise<StartSearchResponse> =>
  api.startSearchPrices(countryID).then((res) => parse<StartSearchResponse>(res));

export const getSearchPrices = (token: string): Promise<GetSearchPricesResponse> =>
  api.getSearchPrices(token).then((res) => parse<GetSearchPricesResponse>(res));

export const stopSearchPrices = (token: string): Promise<StopSearchResponse> =>
  api.stopSearchPrices(token).then((res) => parse<StopSearchResponse>(res));
