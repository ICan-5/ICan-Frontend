'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
type Props = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
};

export default function PasswordField({
  label, // 레이블
  name,
  type = 'password',
  placeholder = '비밀번호를 입력해주세요',
}: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  function handleTogglePasswordVisible() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <div className="mb-6 w-full">
      <label className="flex flex-col" htmlFor={name}>
        <span className="mb-3">{label}</span>
        <div className="relative w-full">
          <input
            className="focus-visible:ring-ring placeholder:text-muted-foreground w-full rounded-full border border-grayLighter px-6 py-3 placeholder-gray shadow-sm transition-colors focus:outline-none focus:ring-gray focus-visible:ring-1"
            type={type}
            placeholder={placeholder}
            autoComplete="off"
          />
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
      </label>
    </div>
  );
}
