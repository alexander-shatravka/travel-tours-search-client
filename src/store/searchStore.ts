import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { GeoEntity, SearchStatus } from '@/types';
import type { PriceOffer } from '@/services/api-adapter';

interface SearchStore {
  status: SearchStatus;
  selectedItem: GeoEntity | null;
  token: string | null;
  prices: Record<string, PriceOffer>;
  error: string | null;

  startSearch: (item: GeoEntity) => void;
  setPolling: (token: string) => void;
  setSuccess: (prices: Record<string, PriceOffer>) => void;
  setError: (message: string) => void;
  setCancelling: () => void;
  reset: () => void;
}

const initialState = {
  status: 'idle' as SearchStatus,
  selectedItem: null as GeoEntity | null,
  token: null as string | null,
  prices: {} as Record<string, PriceOffer>,
  error: null as string | null,
};

export const useSearchStore = create<SearchStore>()(
  devtools(
    (set) => ({
      ...initialState,

      startSearch: (item) =>
        set(
          { status: 'searching' as SearchStatus, selectedItem: item, token: null, prices: {}, error: null },
          false,
          'startSearch',
        ),

      setPolling: (token) =>
        set({ status: 'polling' as SearchStatus, token }, false, 'setPolling'),

      setSuccess: (prices) =>
        set(
          {
            status: (Object.keys(prices).length > 0 ? 'success' : 'empty') as SearchStatus,
            prices,
          },
          false,
          'setSuccess',
        ),

      setError: (message) =>
        set({ status: 'error' as SearchStatus, error: message }, false, 'setError'),

      setCancelling: () =>
        set({ status: 'cancelling' as SearchStatus }, false, 'setCancelling'),

      reset: () =>
        set(initialState, false, 'reset'),
    }),
    { name: 'search-store' },
  ),
);
