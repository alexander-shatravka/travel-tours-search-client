export type GeoType = 'country' | 'city' | 'hotel';

export interface Country {
  id: string;
  name: string;
  flag: string;
  type: 'country';
}

export interface City {
  id: number;
  name: string;
  type: 'city';
}

export interface GeoHotel {
  id: number;
  name: string;
  type: 'hotel';
}

export type GeoEntity = Country | City | GeoHotel;
export type GeoMap = Record<string, GeoEntity>;
export type CountriesMap = Record<string, Country>;

export type SearchStatus = 'idle' | 'searching' | 'error';

export interface SearchState {
  status: SearchStatus;
  error: string | null;
}