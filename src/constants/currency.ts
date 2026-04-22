export const Currency = {
  Usd: 'usd',
} as const;

export type Currency = typeof Currency[keyof typeof Currency];
