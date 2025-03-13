'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import PasswordField from './PasswordField';
import TextField from './TextField';
import { LoginSchema, LoginSchemaType } from '@/lib/validation';
import Button from '../common/button/Button';

export interface Props {
  email: string;
  password: string;
}
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema), // Zod 스키마로 유효성 검사
    mode: 'onChange',
  });

  const router = useRouter();

  // 폼 제출 호출 함수
  const onSubmit = async (data: Props) => {
    const { email, password } = data;
    // Next-Auth 로그인
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false, // 자동 리디렉션을 방지
    });

    if (!res?.error) {
      // 로그인 성공
      // toast.success('로그인 성공!');
      router.replace('/');
      return;
    }

    // 로그인 실패
    const errorMessage =
      res.error === 'Configuration'
        ? '아이디 혹은 비밀번호를 다시 확인해주세요.'
        : '로그인에 실패했습니다. 잠시 후 다시 시도해주세요.';

    toast.error(errorMessage);
  };
  return (
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
          disabled={!isValid}
          size="full"
          type="submit"
          variant="default"
          className="mb-12 h-12 transition-colors disabled:pointer-events-none disabled:bg-gs200 disabled:text-gs400 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        >
          로그인하기
        </Button>
        <p className="text-center text-14M">
          I:can이 처음이신가요?
          <Link className="ml-1 text-slate500" href="/signup">
            회원가입
          </Link>
        </p>
      </div>
    </form>
  );
}
