import { z } from 'zod';

// 객체 스키마 생성
export const SignUpSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: '이름을 입력해주세요' })
      .max(10, { message: '이름은 최대 10자 입력 가능합니다' }),
    email: z
      .string()
      .regex(/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: '올바른 이메일 형식을 입력해주세요',
      }),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
        {
          message:
            '비밀번호는 영문 대소문자, 숫자, 특수문자를 포함한 최소 8자 이상이어야 합니다.',
        },
      )
      .min(8, { message: '비밀번호는 최소 8자 이상 입력 가능합니다' })
      .max(12, { message: '비밀번호는 최대 12자 입력 가능합니다' }),
    confirmPassword: z
      .string()
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
        {
          message:
            '비밀번호는 영문 대소문자, 숫자, 특수문자를 포함한 최소 8자 이상이어야 합니다.',
        },
      )
      .min(8, { message: '비밀번호는 최소 8자 이상 입력 가능합니다' })
      .max(12, { message: '비밀번호는 최대 12자 입력 가능합니다' }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'password not matched',
        path: ['confirmPassword'],
      });
    }
  });

// 타입스크립트를 사용하고 있으므로 스키마의 z.infer를 사용하여 스키마 유형도 내보내야 함
export type ValidationSchemaType = z.infer<typeof SignUpSchema>;
