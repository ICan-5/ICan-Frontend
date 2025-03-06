'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';
import TextField from './TextField';
import PasswordField from './PasswordField';
import { SignUpSchema, SignUpSchemaType } from '@/lib/validation';
import signup from '@/services/auth';
import Button from '../common/button/Button';

export interface Props {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition(); // 비동기 작업 중 상태 처리

  // 회원가입 폼 제출 호출 함수
  const onSubmit = async (formData: Props) => {
    const { success, message } = await signup(formData);

    // 회원가입 성공
    if (success) {
      toast.success(message);
      startTransition(() => {
        router.push('/login');
      });
      return;
    }
    // 회원가입 실패
    toast.error(`회원가입에 실패했습니다. 
  사용하신 이메일이 이미 존재할 수 있습니다. 이메일을 다시 확인해주세요.`);
  };

  // RHF 사용한 폼 상태 관리
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema), // Zod 스키마로 유효성 검사
    mode: 'onChange',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full max-w-screen-sm px-4">
        <TextField
          label="이름"
          name="name"
          placeholder="이름을 입력해주세요"
          register={register}
          errors={errors}
        />
        <TextField
          label="이메일"
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
        <PasswordField
          label="비밀번호 확인"
          name="confirmPassword"
          placeholder="비밀번호 확인을 입력해주세요"
          register={register}
          errors={errors}
        />
        <div className="mb-8" />
        {/* 회원가입 버튼 */}
        <Button
          disabled={!isValid}
          type="submit"
          size="full"
          variant="default"
          className="mb-12 h-12 transition-colors disabled:pointer-events-none disabled:bg-gs200 disabled:text-gs400 dark:disabled:bg-gs700 dark:disabled:text-gs400 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        >
          {isPending ? '회원가입 중...' : '회원가입하기'}
        </Button>
        <p className="text-center text-14M">
          이미 회원이신가요?
          <Link className="ml-1 text-slate500" href="/login">
            로그인
          </Link>
        </p>
      </div>
    </form>
  );
}
