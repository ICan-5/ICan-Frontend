import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Goal } from '@/types/todos';
import cn from '@/utils/cn';

const colorClasses: Record<string, string> = {
  goal01: 'bg-goal01',
  goal02: 'bg-goal02',
  warn: 'bg-warn500',
  success: 'bg-success500',
};

type Props<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder: string;
  options: Goal[];
  control: Control<T>;
  disabled?: boolean;
};
export default function DropDownInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  options,
  control,
  disabled = false,
}: Props<T>) {
  return (
    <div className="relative w-full">
      {label && (
        <label htmlFor={String(name)} className="text-16SB">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Listbox
            value={field.value}
            onChange={(selected) => field.onChange(selected)}
            disabled={disabled}
          >
            {({ open }) => (
              <div className={cn('relative w-full rounded-xl transition-all')}>
                <ListboxButton
                  className={cn(
                    'flex w-full items-center justify-between px-4 py-3 text-16R',
                    {
                      'rounded-xl bg-slate50 text-gs400': !open,
                      'rounded-t-xl bg-gs00 text-gsBk': open,
                    },
                    { 'text-gsBk': field.value?.id },
                    {
                      'border-x-2 border-t-2 border-slate400': open,
                      'border border-transparent': !open,
                    },
                  )}
                >
                  {field.value
                    ? options.find((opt) => opt.id === field.value.id)?.title
                    : placeholder}
                  <FontAwesomeIcon
                    size="sm"
                    icon={faAngleDown}
                    className={cn({ 'rotate-180': open })}
                  />
                </ListboxButton>
                {open && (
                  <ListboxOptions
                    anchor="bottom"
                    className={cn(
                      'z-20 w-[var(--button-width)] rounded-b-xl bg-gs00 pt-3 [--anchor-gap:-10px]',
                      'border-x-2 border-b-2 border-slate400',
                    )}
                  >
                    {/* 구분선 */}
                    <div className="h-[1px] w-full bg-gs200" />
                    {options.map((option) => (
                      <ListboxOption
                        key={option.id}
                        value={option}
                        className={cn(
                          'flex cursor-pointer items-center gap-4 px-4 py-3 text-16R',
                          'border-b border-dashed border-gs200 last:border-none',
                          'data-[focus]:bg-gs100',
                        )}
                      >
                        <span
                          className={cn(
                            'h-2 w-2 rounded-full',
                            colorClasses[option.color] ?? '',
                          )}
                        />
                        {option.title}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                )}
              </div>
            )}
          </Listbox>
        )}
      />
    </div>
  );
}
