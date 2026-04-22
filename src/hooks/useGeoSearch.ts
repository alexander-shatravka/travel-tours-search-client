import { useEffect, useRef, useState } from 'react';
import { getCountries, searchGeo } from '@/services/api-adapter';
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

  const selectedItemRef = useRef(selectedItem);
  useEffect(() => {
    selectedItemRef.current = selectedItem;
  });

  useEffect(() => {
    let cancelled = false;

    if (inputValue === '') {
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

    const timer = setTimeout(() => {
      setIsLoading(true);
      setError(null);
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