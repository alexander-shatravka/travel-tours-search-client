import { SearchForm } from '@/components/SearchForm';
import { useSearchStore } from '@/store';
import { SearchStatus } from '@/constants';

export function SearchPage() {
  const startSearch = useSearchStore((s) => s.startSearch);
  const status = useSearchStore((s) => s.status) as SearchStatus;
  const isSearching = ([SearchStatus.Searching, SearchStatus.Polling, SearchStatus.Cancelling] as SearchStatus[]).includes(status);

  return (
    <main className="flex flex-col items-center pt-24 px-4">
      <SearchForm onSubmit={startSearch} isDisabled={isSearching} />
    </main>
  );
}
