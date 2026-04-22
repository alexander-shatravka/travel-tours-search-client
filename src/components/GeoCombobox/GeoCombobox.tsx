import { useRef, useState } from 'react';
import { useGeoSearch } from '@/hooks';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import { GeoEntityIcon } from './GeoEntityIcon';
import { cn } from '@/lib/cn';
import type { GeoEntity } from '@/types';
import styles from './GeoCombobox.module.css';

interface GeoComboboxProps {
  value: GeoEntity | null;
  onChange: (item: GeoEntity) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function GeoCombobox({ value, onChange, placeholder, disabled }: GeoComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value?.name ?? '');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const { items, isLoading } = useGeoSearch(inputValue, value);

  const handleFocus = () => {
    setIsOpen(true);
    if (value?.type === 'country') {
      setInputValue('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setFocusedIndex(-1);
    if (!isOpen) setIsOpen(true);
  };

  const handleSelect = (item: GeoEntity) => {
    setInputValue(item.name);
    onChange(item);
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const handleClear = () => {
    setInputValue('');
    setFocusedIndex(-1);
    setIsOpen(true);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) { setIsOpen(true); return; }
      setFocusedIndex((prev) => Math.min(prev + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      if (isOpen && focusedIndex >= 0) {
        e.preventDefault();
        const item = items[focusedIndex];
        if (item) handleSelect(item);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      setInputValue(value?.name ?? '');
      setFocusedIndex(-1);
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
      setInputValue(value?.name ?? '');
      setFocusedIndex(-1);
    }
  };

  return (
    <div className={styles.wrapper} onBlur={handleBlur}>
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="geo-listbox"
          aria-activedescendant={focusedIndex >= 0 ? `geo-option-${focusedIndex}` : undefined}
          aria-autocomplete="list"
          autoComplete="off"
          className={cn(styles.input, inputValue && styles.inputWithClear)}
        />
        {inputValue && (
          <button
            type="button"
            tabIndex={-1}
            onMouseDown={(e) => { e.preventDefault(); handleClear(); }}
            className={styles.clearButton}
            aria-label="Очистити"
          >
            ×
          </button>
        )}
      </div>

      {isOpen && (
        <ul
          id="geo-listbox"
          role="listbox"
          className={styles.dropdown}
        >
          {isLoading && (
            <li className={styles.loadingItem}>
              <Spinner size="md" />
            </li>
          )}

          {!isLoading && items.length === 0 && (
            <li className={styles.emptyItem}>
              Нічого не знайдено
            </li>
          )}

          {!isLoading &&
            items.map((item, index) => (
              <li
                key={`${item.type}-${item.id}`}
                id={`geo-option-${index}`}
                role="option"
                aria-selected={index === focusedIndex}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(item);
                }}
                onMouseEnter={() => setFocusedIndex(index)}
                className={cn(
                  styles.item,
                  index === focusedIndex ? styles.itemFocused : styles.itemDefault,
                )}
              >
                {item.type === 'country' ? (
                  <img src={item.flag} alt="" className={styles.flag} />
                ) : (
                  <GeoEntityIcon type={item.type} className={styles.icon} />
                )}
                <span className={styles.itemText}>{item.name}</span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
