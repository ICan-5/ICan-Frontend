'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PasswordField from './PasswordField';
import TextField from './TextField';
import Button from './Button';
import { LoginSchema, LoginSchemaType } from '@/lib/validation';

export type LoginFormType = {
  id: string;
  password: string;
};
export default function LoginForm() {
  const {
    register,
    // handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
  });

  return (
    <form
      // onSubmit={handleSubmit(onSubmit)}
      className="my-40 flex w-full flex-col items-center"
    >
      <div className="px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold">I:Can</h2>
        <p className="mb-10 break-keep text-grayDarker">
          할 일을 계획하고 관리해요!
        </p>
      </div>
      <div className="w-full max-w-screen-sm px-4">
        <TextField
          label="아이디"
          name="id"
          placeholder="이메일을 입력해주세요"
          register={register}
          errors={errors}
        />
        <PasswordField
          label="비밀번호"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          register={register}
          errors={errors}
        />
        <div className="mb-8" />
        <Button label="회원가입하기" type="submit" disabled={!isValid} />
        <p className="text-center text-14M">
          I:can이 처음이신가요?{' '}
          <Link className="ml-1 text-slate500" href="/signup">
            회원가입
          </Link>
        </p>
      </div>
    </form>
  );
}
