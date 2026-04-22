import { cn } from '@/lib/cn';
import { Spinner } from '@/components/ui/Spinner/Spinner';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}

export function Button({
  children,
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  className,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5',
        'bg-blue-600 text-white text-sm font-medium',
        'hover:bg-blue-700 transition-colors',
        'disabled:opacity-50 disabled:pointer-events-none',
        className,
      )}
    >
      {loading && <Spinner size="sm" className="border-white/30 border-t-white" />}
      {children}
    </button>
  );
}