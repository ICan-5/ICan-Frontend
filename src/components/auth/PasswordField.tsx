import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { ValidationSchemaType } from '@/schemas/auth';
import ErrorMessage from './ErrorMessage';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type Props = {
  label: string;
  name: keyof ValidationSchemaType;
  placeholder?: string;
  register: UseFormRegister<ValidationSchemaType>;
  errors: FieldErrors<ValidationSchemaType>;
};

export default function PasswordField({
  label, // 레이블
  name,
  placeholder = '비밀번호를 입력해주세요',
  register,
  errors,
}: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleTogglePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="mb-6 w-full">
      <label className="flex flex-col" htmlFor={name}>
        <span className="mb-3">{label}</span>
        <div className="relative w-full">
          <input
            className="focus-visible:ring-ring placeholder:text-muted-foreground w-full rounded-full border border-grayLighter px-6 py-3 placeholder-grayLight shadow-sm transition-colors focus:outline-none focus:ring-grayLight focus-visible:ring-1"
            type={isPasswordVisible ? 'text' : 'password'}
            id={name}
            placeholder={placeholder}
            autoComplete="off"
            {...register(name)}
          />
          {/* <span>{errors}</span> */}
          <button type="button" onClick={() => handleTogglePasswordVisible()}>
            {isPasswordVisible ? (
              <FontAwesomeIcon
                className="absolute right-6 top-1/2 h-6 w-6 -translate-y-1/2 text-grayDarker"
                icon={faEye}
              />
            ) : (
              <FontAwesomeIcon
                className="absolute right-6 top-1/2 h-6 w-6 -translate-y-1/2 text-grayDarker"
                icon={faEyeSlash}
              />
            )}
          </button>
        </div>
        {errors[name] && <ErrorMessage message={errors[name]?.message || ''} />}
      </label>
    </div>
  );
}
