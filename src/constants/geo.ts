export const GeoType = {
  Country: 'country',
  City: 'city',
  Hotel: 'hotel',
} as const;

export type GeoType = typeof GeoType[keyof typeof GeoType];
