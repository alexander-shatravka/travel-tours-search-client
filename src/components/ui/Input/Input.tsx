import { forwardRef } from 'react';
import { cn } from '@/lib/cn';
import styles from './Input.module.css';

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
        className={cn(styles.input, className)}
        {...rest}
      />
    );
  },
);

Input.displayName = 'Input';
