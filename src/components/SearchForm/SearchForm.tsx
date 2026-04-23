import { useState } from 'react';
import { GeoCombobox } from '@/components/GeoCombobox/GeoCombobox';
import { Button } from '@/components/ui/Button/Button';
import type { GeoEntity } from '@/types';
import styles from './SearchForm.module.css';

interface SearchFormProps {
  onSubmit: (item: GeoEntity) => void;
  isDisabled?: boolean;
}

export function SearchForm({ onSubmit, isDisabled = false }: SearchFormProps) {
  const [selectedItem, setSelectedItem] = useState<GeoEntity | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem !== null) {
      onSubmit(selectedItem);
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Форма пошуку турів</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <GeoCombobox
          value={selectedItem}
          onChange={setSelectedItem}
          placeholder="Країна, місто або готель"
          disabled={isDisabled}
        />
        <Button type="submit" disabled={isDisabled} className={styles.submitButton}>
          Знайти
        </Button>
      </form>
    </div>
  );
}
