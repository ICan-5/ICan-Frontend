/* eslint-disable react/jsx-props-no-spreading */
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import ErrorMessage from './ErrorMessage';
import cn from '@/utils/cn';

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;

  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

export default function TextField<T extends FieldValues>({
  label,
  name,
  type = 'text', // 기본값 'text'
  placeholder = '입력창에 입력해주세요',
  register,
  errors,
}: Props<T>) {
  return (
    <div className="mb-6 w-full">
      <label className="flex flex-col" htmlFor={name}>
        <span className="mb-4 font-semibold">{label}</span>
        <input
          className={cn(
            'focus-visible:ring-ring w-full rounded-xl bg-slate50 px-6 py-3 font-normal placeholder-grayLight transition-colors placeholder:text-gs400 focus:outline-none focus:ring-slate500 focus-visible:ring-1',
            errors[name] && 'bg-warn50 focus-visible:ring-red-500',
          )}
          id={name} // label을 연결
          type={type}
          placeholder={placeholder}
          {...register(name)}
        />
      </label>
      {errors[name] && (
        <ErrorMessage message={String(errors[name]?.message || '')} />
      )}
    </div>
  );
}
