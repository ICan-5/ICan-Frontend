import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { PasswordFieldProps } from '@/types/inputTypes';

export default function PasswordField({
  label,
  name,
  type = 'password',
  placeholder = '비밀번호를 입력해주세요',
}: PasswordFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  function clickPasswordVisibilityHandler() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <div className="mb-6 w-full">
      <label className="flex flex-col" htmlFor={name}>
        <span className="mb-3">{label}</span>
        <div className="relative w-full">
          <input
            className="w-full rounded-full border border-grayLighter px-6 py-3 placeholder-gray"
            id="confirmPassword"
            name="confirmPassword"
            type={type}
            placeholder={placeholder}
            autoComplete="off"
          />
          <button
            type="button"
            onClick={() => clickPasswordVisibilityHandler()}
          >
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
      </label>
    </div>
  );
}
