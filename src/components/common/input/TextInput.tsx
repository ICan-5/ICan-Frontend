import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form';
import cn from '@/utils/cn';

// 제네릭 사용하여 컴포넌트를 호출 할 때 타입 전달 받음
type Props<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder: string;
  control: Control<T>;
  errors?: FieldErrors<T>;
  disabled?: boolean;
};

export default function TextInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  errors,
  disabled = false,
}: Props<T>) {
  const hasError = !!errors?.[name];
  return (
    <div className="flex w-full flex-col gap-1 bg-white p-5">
      {label && (
        <label htmlFor={String(name)} className="text-16SB">
          {label}
        </label>
      )}
      <Controller
        name={name as Path<T>}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="text"
            placeholder={placeholder}
            className={cn(
              'w-full rounded-xl border bg-slate-50 px-4 py-3 focus:outline-none',
              'text-gsBk placeholder:text-gs400',
              {
                'border-warn500 bg-warn50 focus:border-warn500': hasError,
                'border-transparent focus:border-slate500': !hasError,
              },
              { 'bg-gs200': disabled },
            )}
            disabled={disabled}
          />
        )}
      />
      {errors?.[name] && (
        <span className="px-2 text-14M text-warn500">
          {errors[name]?.message?.toString()}
        </span>
      )}
    </div>
  );
}
