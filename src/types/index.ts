import { GeoType } from '@/constants/geo';

export interface Country {
  id: string;
  name: string;
  flag: string;
  type: typeof GeoType.Country;
}

export interface City {
  id: number;
  name: string;
  countryId: string;
  type: typeof GeoType.City;
}

export interface GeoHotel {
  id: number;
  name: string;
  countryId: string;
  type: typeof GeoType.Hotel;
}

export type GeoEntity = Country | City | GeoHotel;
