import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SearchPage } from '@/pages/SearchPage/SearchPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}
