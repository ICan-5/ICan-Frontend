/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import ErrorMessage from './ErrorMessage';
import cn from '@/utils/cn';

interface Props<T extends FieldValues> {
  label: string;
  name: Path<T>;
  placeholder?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

export default function PasswordField<T extends FieldValues>({
  label, // 레이블
  name,
  placeholder = '비밀번호를 입력해주세요',
  register,
  errors,
}: Props<T>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleTogglePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const [password, setPassword] = useState('');

  // 비밀번호에 한글 입력 막기
  const handleInputChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputElement = e.currentTarget;

    // 숫자와 영문자, 허용 특수문자 외는 공백 처리
    const filteredValue = inputElement.value.replace(
      /[^A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g,
      '',
    );

    setPassword(filteredValue);
  };

  return (
    <div className="mb-6 w-full">
      <label className="flex flex-col" htmlFor={name}>
        <span className="mb-3 text-16SB">{label}</span>
        <div className="relative w-full">
          <input
            className={cn(
              'focus-visible:ring-ring h-12 w-full rounded-xl bg-slate50 px-4 py-3 text-16R transition-colors placeholder:text-gs400 focus:outline-none focus:ring-slate500 focus-visible:ring-1',
              errors[name] && 'bg-warn50 focus-visible:ring-red-500',
            )}
            type={isPasswordVisible ? 'text' : 'password'}
            id={String(name)}
            placeholder={placeholder}
            autoComplete="off"
            {...register(name)}
            value={password}
            onInput={handleInputChange}
          />
          <button
            type="button"
            onClick={() => handleTogglePasswordVisible()}
            aria-label="password-visible-button"
          >
            <FontAwesomeIcon
              className={cn(
                'absolute right-4 top-1/2 size-6 -translate-y-1/2',
                isPasswordVisible && 'mr-[1px] size-[22px]',
              )}
              icon={isPasswordVisible ? faEye : faEyeSlash}
            />
          </button>
        </div>
        {errors[name] && (
          <ErrorMessage message={String(errors[name]?.message || '')} />
        )}
      </label>
    </div>
  );
}
