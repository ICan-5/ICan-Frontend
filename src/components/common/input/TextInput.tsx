import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form';
import { InputHTMLAttributes } from 'react';
import cn from '@/utils/cn';

// 제네릭 사용하여 컴포넌트를 호출 할 때 타입 전달 받음
interface Props<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  errors?: FieldErrors<T>;
}
/* eslint-disable react/jsx-props-no-spreading */
export default function TextInput<T extends FieldValues>({
  name,
  label,
  control,
  errors,
  className,
  ...props
}: Props<T>) {
  const hasError = !!errors?.[name];
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={String(name)} className="text-16SB">
        {label}
      </label>
      <Controller
        name={name as Path<T>}
        control={control}
        render={({ field }) => (
          <input
            id={String(name)}
            {...field}
            {...props}
            type="text"
            className={cn(
              'w-full rounded-xl border bg-slate50 px-4 py-3 focus:outline-none',
              'text-16R text-gsBk placeholder:text-gs400',
              {
                'border-warn500 bg-warn50 focus:border-warn500': hasError,
                'border-transparent focus:border-slate500': !hasError,
                'bg-gs200': props.disabled,
              },
              className,
            )}
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
