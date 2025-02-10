'use client';

import Link from 'next/link';
import TextField from './TextField';
import PasswordField from './PasswordField';
import Button from './Button';

export default function SignupForm() {
  return (
    <form className="mt-12 flex w-full flex-col items-center">
      <h2 className="mb-4 text-3xl font-bold">I:Can</h2>
      <p className="mb-10 text-grayDarker">할 일을 계획하고 관리해요!</p>
      <div className="w-full max-w-screen-sm px-4">
        <TextField label="이름" name="name" placeholder="이름을 입력해주세요" />
        <TextField
          label="이메일"
          name="email"
          placeholder="이메일을 입력해주세요"
        />
        <PasswordField
          label="비밀번호"
          name="password"
          placeholder="비밀번호를 입력해주세요"
        />
        <PasswordField
          label="비밀번호 확인"
          name="confirmPassword"
          placeholder="비밀번호 확인을 입력해주세요"
        />
        <Button label="회원가입하기" type="submit" />
        <p className="text-center">
          이미 회원이신가요?{' '}
          <Link
            className="text-blue-600 underline underline-offset-2"
            href="/login"
          >
            로그인
          </Link>
        </p>
      </div>
    </form>
  );
}
