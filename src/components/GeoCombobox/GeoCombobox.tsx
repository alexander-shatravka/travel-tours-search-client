import { useState } from 'react';
import {
  autoUpdate,
  flip,
  offset,
  size as floatingSize,
  useDismiss,
  useFloating,
  useClick,
  useInteractions,
  FloatingPortal,
} from '@floating-ui/react';
import { useGeoSearch } from '@/hooks/useGeoSearch';
import { Input } from '@/components/ui/Input/Input';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import { GeoEntityIcon } from './GeoEntityIcon';
import { cn } from '@/lib/cn';
import type { GeoEntity, GeoType } from '@/types';

interface GeoComboboxProps {
  value: GeoEntity | null;
  onChange: (item: GeoEntity) => void;
  placeholder?: string;
  disabled?: boolean;
}

const TYPE_LABELS: Record<GeoType, string> = {
  country: 'Країна',
  city: 'Місто',
  hotel: 'Готель',
};

export function GeoCombobox({ value, onChange, placeholder, disabled }: GeoComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value?.name ?? '');
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const { items, isLoading } = useGeoSearch(inputValue, value);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-start',
    middleware: [
      offset(4),
      flip(),
      floatingSize({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, { toggle: false });
  const dismiss = useDismiss(context, { escapeKey: false });
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  const handleFocus = () => {
    setIsOpen(true);
    if (value?.type === 'country') {
      setInputValue('');
    }
  };

  const handleInputChange = (val: string) => {
    setInputValue(val);
    setFocusedIndex(-1);
    if (!isOpen) setIsOpen(true);
  };

  const handleSelect = (item: GeoEntity) => {
    setInputValue(item.name);
    onChange(item);
    setIsOpen(false);
    setFocusedIndex(-1);
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

  return (
    <div className="relative w-full">
      <Input
        ref={refs.setReference}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls="geo-listbox"
        aria-activedescendant={focusedIndex >= 0 ? `geo-option-${focusedIndex}` : undefined}
        aria-autocomplete="list"
        autoComplete="off"
        {...getReferenceProps({
          onFocus: handleFocus,
          onKeyDown: handleKeyDown,
        })}
      />

      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="z-50"
          >
            <ul
              id="geo-listbox"
              role="listbox"
              className="rounded-lg border border-gray-200 bg-white py-1 shadow-lg max-h-80 overflow-y-auto"
            >
              {isLoading && (
                <li className="flex justify-center py-6">
                  <Spinner size="md" />
                </li>
              )}

              {!isLoading && items.length === 0 && (
                <li className="px-4 py-3 text-sm text-gray-400 text-center">
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
                      e.preventDefault(); // prevent input blur before select
                      handleSelect(item);
                    }}
                    onMouseEnter={() => setFocusedIndex(index)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-2.5 cursor-pointer select-none',
                      'text-sm transition-colors',
                      index === focusedIndex
                        ? 'bg-blue-50 text-blue-900'
                        : 'text-gray-800 hover:bg-gray-50',
                    )}
                  >
                    {item.type === 'country' ? (
                      <img
                        src={item.flag}
                        alt=""
                        className="w-6 h-4 object-cover rounded-sm shrink-0"
                      />
                    ) : (
                      <GeoEntityIcon
                        type={item.type}
                        className="w-5 h-5 shrink-0 text-gray-400"
                      />
                    )}

                    <span className="flex-1 truncate font-medium">{item.name}</span>

                    <span className="text-xs text-gray-400 shrink-0">
                      {TYPE_LABELS[item.type]}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </FloatingPortal>
      )}
    </div>
  );
}