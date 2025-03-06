'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useTransition } from 'react';
import PasswordField from './PasswordField';
import TextField from './TextField';
import Button from './Button';
import { LoginSchema, LoginSchemaType } from '@/lib/validation';

export interface Props {
  email: string;
  password: string;
}
export default function LoginForm() {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
  });

  const router = useRouter();

  const onSubmit = async (data: Props) => {
    const { email, password } = data;
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (!res?.error) {
      toast.success('로그인 성공!');
      startTransition(() => {
        router.push('/');
      });
      return;
    }

    const errorMessage =
      res.error === 'Configuration'
        ? '아이디 혹은 비밀번호를 다시 확인해주세요.'
        : '로그인에 실패했습니다. 잠시 후 다시 시도해주세요.';

    toast.error(errorMessage);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full max-w-screen-sm px-4">
          <TextField
            label="아이디"
            name="email"
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
          <Button
            label={isPending ? '로그인 중...' : '로그인하기'}
            type="submit"
            disabled={!isValid}
          />
          <p className="text-center text-14M">
            I:can이 처음이신가요?{' '}
            <Link className="ml-1 text-slate500" href="/signup">
              회원가입
            </Link>
          </p>
        </div>
      </form>{' '}
    </>
  );
}
