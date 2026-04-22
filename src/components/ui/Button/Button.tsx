import { cn } from '@/lib/cn';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import styles from './Button.module.css';

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
      className={cn(styles.button, className)}
    >
      {loading && <Spinner size="sm" className={styles.spinnerColor} />}
      {children}
    </button>
  );
}
