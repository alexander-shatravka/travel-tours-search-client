import { useEffect, useRef, useState } from 'react';
import { getCountries, searchGeo } from '@/services';
import { useDebounce } from './useDebounce';
import type { GeoEntity } from '@/types';

interface UseGeoSearchResult {
  items: GeoEntity[];
  isLoading: boolean;
  error: string | null;
}

export function useGeoSearch(
  inputValue: string,
  selectedItem: GeoEntity | null,
): UseGeoSearchResult {
  const [items, setItems] = useState<GeoEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedInput = useDebounce(inputValue, 300);

  const selectedItemRef = useRef(selectedItem);
  useEffect(() => {
    selectedItemRef.current = selectedItem;
  });

  useEffect(() => {
    let cancelled = false;

    if (debouncedInput === '') {
      const current = selectedItemRef.current;
      if (current !== null && current.type !== 'country') {
        setItems([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      getCountries()
        .then((countries) => {
          if (!cancelled) {
            setItems(countries);
            setIsLoading(false);
          }
        })
        .catch(() => {
          if (!cancelled) {
            setError('Помилка завантаження');
            setIsLoading(false);
          }
        });

      return () => {
        cancelled = true;
      };
    }

    setIsLoading(true);
    setError(null);
    searchGeo(debouncedInput)
      .then((entities) => {
        if (!cancelled) {
          const query = debouncedInput.toLowerCase();
          setItems(entities.filter((e) => e.name.toLowerCase().includes(query)));
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('Помилка пошуку');
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedInput]);

  return { items, isLoading, error };
}
