import { useState } from 'react';
import { GeoCombobox } from '@/components/GeoCombobox';
import { Button } from '@/components/ui';
import type { GeoEntity } from '@/types';

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
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 w-full max-w-2xl rounded-2xl bg-white border border-gray-200 shadow-sm p-2"
    >
      <GeoCombobox
        value={selectedItem}
        onChange={setSelectedItem}
        placeholder="Країна, місто або готель"
        disabled={isDisabled}
      />
      <Button type="submit" disabled={isDisabled} className="shrink-0">
        Знайти
      </Button>
    </form>
  );
}