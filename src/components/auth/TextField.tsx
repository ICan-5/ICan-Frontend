/* eslint-disable react/jsx-props-no-spreading */
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';
import { ValidationSchemaType } from '@/lib/validation';
import cn from '@/utils/cn';

type Props = {
  label: string;
  name: keyof ValidationSchemaType;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<ValidationSchemaType>;
  errors: FieldErrors<ValidationSchemaType>;
};

export default function TextField({
  label,
  name,
  type = 'text', // 기본값 'text'
  placeholder = '입력창에 입력해주세요',
  register,
  errors,
}: Props) {
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
      {errors[name] && <ErrorMessage message={errors[name]?.message || ''} />}
    </div>
  );
}
