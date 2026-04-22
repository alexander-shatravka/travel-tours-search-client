import { useEffect, useReducer, useRef } from 'react';
import { getCountries, searchGeo } from '@/services';
import { useDebounce } from './useDebounce';
import { GeoType } from '@/constants';
import type { GeoEntity } from '@/types';

interface UseGeoSearchResult {
  items: GeoEntity[];
  isLoading: boolean;
  error: string | null;
}

type State = UseGeoSearchResult;

type Action =
  | { type: 'loading' }
  | { type: 'success'; items: GeoEntity[] }
  | { type: 'error'; error: string }
  | { type: 'empty' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'loading': return { ...state, isLoading: true, error: null };
    case 'success': return { items: action.items, isLoading: false, error: null };
    case 'error':   return { items: [], isLoading: false, error: action.error };
    case 'empty':   return { items: [], isLoading: false, error: null };
  }
}

const initialState: State = { items: [], isLoading: false, error: null };

export function useGeoSearch(
  inputValue: string,
  selectedItem: GeoEntity | null,
): UseGeoSearchResult {
  const [state, dispatch] = useReducer(reducer, initialState);

  const debouncedInput = useDebounce(inputValue, 300);

  const selectedItemRef = useRef(selectedItem);
  useEffect(() => {
    selectedItemRef.current = selectedItem;
  });

  useEffect(() => {
    let cancelled = false;

    if (debouncedInput === '') {
      const current = selectedItemRef.current;
      if (current !== null && current.type !== GeoType.Country) {
        dispatch({ type: 'empty' });
        return;
      }

      dispatch({ type: 'loading' });
      getCountries()
        .then((items) => {
          if (!cancelled) dispatch({ type: 'success', items });
        })
        .catch(() => {
          if (!cancelled) dispatch({ type: 'error', error: 'Помилка завантаження' });
        });

      return () => { cancelled = true; };
    }

    dispatch({ type: 'loading' });
    searchGeo(debouncedInput)
      .then((entities) => {
        if (!cancelled) {
          const query = debouncedInput.toLowerCase();
          dispatch({
            type: 'success',
            items: entities.filter((e) => e.name.toLowerCase().includes(query)),
          });
        }
      })
      .catch(() => {
        if (!cancelled) dispatch({ type: 'error', error: 'Помилка пошуку' });
      });

    return () => { cancelled = true; };
  }, [debouncedInput]);

  return state;
}
