import { z } from 'zod';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from './regexp';

const ERROR_MESSAGE = {
  name: {
    empty: '이름을 입력해주세요',
    max: '이름은 최대 10자 입력 가능합니다',
  },
  email: {
    invalid: '올바른 이메일 형식을 입력해주세요',
  },
  password: {
    invalid:
      '비밀번호는 공백을 제외, 영문 대소문자, 숫자, 특수문자를 포함한 최소 8자 이상이어야 합니다',
    min: '비밀번호는 최소 8자 이상 입력 가능합니다',
    max: '비밀번호는 최대 12자 입력 가능합니다',
    match: '비밀번호가 일치하지 않습니다',
  },
};
// 객체 스키마 생성
// 회원가입 스키마
export const SignUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: ERROR_MESSAGE.name.empty })
      .max(10, { message: ERROR_MESSAGE.name.max }),
    email: z.string().regex(EMAIL_VALIDATION, {
      message: ERROR_MESSAGE.email.invalid,
    }),
    password: z
      .string()
      .trim()
      .regex(PASSWORD_VALIDATION, {
        message: ERROR_MESSAGE.password.invalid,
      })
      .min(8, { message: ERROR_MESSAGE.password.min })
      .max(12, { message: ERROR_MESSAGE.password.max }),
    confirmPassword: z
      .string()
      .trim()
      .regex(PASSWORD_VALIDATION, {
        message: ERROR_MESSAGE.password.invalid,
      })
      .min(8, { message: ERROR_MESSAGE.password.min })
      .max(12, { message: ERROR_MESSAGE.password.max }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: ERROR_MESSAGE.password.match,
        path: ['confirmPassword'],
      });
    }
  });

// 로그인 스키마
export const LoginSchema = z.object({
  id: z.string().regex(EMAIL_VALIDATION, {
    message: ERROR_MESSAGE.email.invalid,
  }),
  password: z
    .string()
    .trim()
    .regex(PASSWORD_VALIDATION, {
      message: ERROR_MESSAGE.password.invalid,
    })
    .min(8, { message: ERROR_MESSAGE.password.min })
    .max(12, { message: ERROR_MESSAGE.password.max }),
});

// 타입스크립트를 사용하고 있으므로 스키마의 z.infer를 사용하여 스키마 유형도 내보내야 함
export type ValidationSchemaType = z.infer<typeof SignUpSchema>;
