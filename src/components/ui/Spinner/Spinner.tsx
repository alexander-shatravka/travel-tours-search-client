import { cn } from '@/lib/cn';
import styles from './Spinner.module.css';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClass: Record<NonNullable<SpinnerProps['size']>, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div className={cn(styles.spinner, sizeClass[size], className)} />
  );
}
