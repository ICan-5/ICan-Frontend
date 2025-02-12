import { ValidationSchemaType } from '@/schemas/auth';
import ErrorMessage from './ErrorMessage';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

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
        <span className="mb-3">{label}</span>
        <input
          className="focus-visible:ring-ring placeholder:text-muted-foreground w-full rounded-full border border-grayLighter px-6 py-3 placeholder-grayLight shadow-sm transition-colors focus:outline-none focus:ring-grayLight focus-visible:ring-1"
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
