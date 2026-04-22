import type { GeoType } from '@/types';

interface GeoEntityIconProps {
  type: GeoType;
  className?: string;
}

export function GeoEntityIcon({ type, className }: GeoEntityIconProps) {
  if (type === 'country') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    );
  }

  if (type === 'city') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <rect x="3" y="4" width="8" height="17" />
        <rect x="13" y="9" width="8" height="12" />
        <line x1="3" y1="21" x2="21" y2="21" />
        <line x1="6" y1="8" x2="8" y2="8" />
        <line x1="6" y1="12" x2="8" y2="12" />
        <line x1="6" y1="16" x2="8" y2="16" />
        <line x1="16" y1="13" x2="18" y2="13" />
        <line x1="16" y1="17" x2="18" y2="17" />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 4v16" />
      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8v9" />
    </svg>
  );
}