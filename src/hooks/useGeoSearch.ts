import { useEffect, useRef, useState } from 'react';
import { getCountries, searchGeo } from '@/service/api';
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

  // Keep selectedItem accessible inside effect without triggering re-runs
  const selectedItemRef = useRef(selectedItem);
  useEffect(() => {
    selectedItemRef.current = selectedItem;
  });

  useEffect(() => {
    let cancelled = false;

    if (inputValue === '') {
      // City/hotel selected and input cleared — stay empty, don't show countries
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

    setError(null);
    const timer = setTimeout(() => {
      setIsLoading(true);
      searchGeo(inputValue)
        .then((entities) => {
          if (!cancelled) {
            setItems(entities);
            setIsLoading(false);
          }
        })
        .catch(() => {
          if (!cancelled) {
            setError('Помилка пошуку');
            setIsLoading(false);
          }
        });
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [inputValue]);

  return { items, isLoading, error };
}