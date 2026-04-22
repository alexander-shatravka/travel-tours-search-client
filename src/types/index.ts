export type GeoType = 'country' | 'region' | 'city' | 'hotel';

export type SearchStatus =
  | 'idle'
  | 'searching'
  | 'error'

export interface SearchState {
  status: SearchStatus;
  error: string | null;
}
