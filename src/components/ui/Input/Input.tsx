import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5',
          'text-sm text-gray-900 placeholder:text-gray-400',
          'outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
          'disabled:bg-gray-50 disabled:text-gray-400',
          'transition-colors',
          className,
        )}
        {...rest}
      />
    );
  },
);

Input.displayName = 'Input';