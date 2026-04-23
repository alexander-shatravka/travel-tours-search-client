export const queryKeys = {
  hotels: (countryId: string) => ['hotels', countryId] as const,
  hotel:  (hotelId: string)   => ['hotel',  hotelId]   as const,
  price:  (priceId: string)   => ['price',  priceId]   as const,
};
