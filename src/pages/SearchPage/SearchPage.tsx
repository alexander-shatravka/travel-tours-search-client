import { SearchForm } from '@/components/SearchForm';
import type { GeoEntity } from '@/types';

export function SearchPage() {
  const handleSubmit = (item: GeoEntity) => {
    // will be connected to search store in Task 2
    console.log('Search for:', item);
  };

  return (
    <main className="flex flex-col items-center pt-24 px-4">
      <SearchForm onSubmit={handleSubmit} />
      {/* Results area — Task 2 & 3 */}
    </main>
  );
}