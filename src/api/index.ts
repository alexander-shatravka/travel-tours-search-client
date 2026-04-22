import type { GeoItem, TourWithHotel } from '@/types';

export interface SearchParams {
  geoId: number;
  adultsCount: number;
  kidsCount: number;
  nightsFrom: number;
  nightsTo: number;
  dateFrom: string;
  dateTo: string;
}

export interface PollResult {
  done: boolean;
  results: TourWithHotel[];
}

interface ApiModule {
  searchGeo(query: string): Promise<GeoItem[]>;
  startSearch(params: SearchParams): Promise<string>;
  pollSearch(searchId: string): Promise<PollResult>;
}

// api.js is a plain JS file — suppressing implicit-any via declaration above
// @ts-ignore
import * as _api from './api.js';
const api = _api as ApiModule;

export const searchGeo = (query: string): Promise<GeoItem[]> =>
  api.searchGeo(query);

export const startSearch = (params: SearchParams): Promise<string> =>
  api.startSearch(params);

export const pollSearch = (searchId: string): Promise<PollResult> =>
  api.pollSearch(searchId);
