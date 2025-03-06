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
import cn from '@/utils/cn';
import ErrorMessage from '../auth/ErrorMessage';

interface Props<T extends FieldValues> {
  label: string;
  name: Path<T>;
  isPassword?: boolean;
  placeholder: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

export default function FormField<T extends FieldValues>({
  label,
  name,
  placeholder,
  isPassword = false,
  register,
  errors,
  ...props
}: Props<T>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleTogglePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="mb-6 w-full">
      <label className="flex flex-col" htmlFor={name}>
        <span className="mb-2 text-14M text-gs400 2xl:mb-3 2xl:text-16M">
          {label}
        </span>
        <div className="relative w-full">
          <input
            className={cn(
              'focus-visible:ring-ring max-h-12 w-full rounded-xl bg-slate50 py-3 pl-4 pr-12 text-14R text-gsBk transition-colors placeholder:text-gs400 focus:outline-none focus:ring-slate500 focus-visible:ring-1 2xl:text-16R',
              errors[name] && 'bg-warn50 focus-visible:ring-red-500',
            )}
            type={!isPassword || isPasswordVisible ? 'text' : 'password'}
            id={String(name)}
            placeholder={placeholder}
            autoComplete="off"
            {...props}
            {...register(name)}
          />
          <button
            className={cn({ hidden: !isPassword })}
            type="button"
            onClick={() => handleTogglePasswordVisible()}
            aria-label="password-visible-button"
          >
            <FontAwesomeIcon
              className="absolute right-4 top-1/2 size-6 -translate-y-1/2"
              icon={isPasswordVisible ? faEye : faEyeSlash}
            />
          </button>
        </div>
        {errors[name] && (
          <ErrorMessage
            className="text-12M 2xl:text-14M"
            message={String(errors[name]?.message || '')}
          />
        )}
      </label>
    </div>
  );
}
