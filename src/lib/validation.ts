import { z } from 'zod';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from './regexp';

const ERROR_MESSAGE = {
  name: {
    empty: '이름을 입력해주세요',
    max: '이름은 최대 10자 입력 가능합니다',
  },
  email: {
    invalid: '올바른 이메일 형식을 입력해주세요',
    invalidId: '이메일 형식으로 입력해주세요',
  },
  password: {
    invalid: '비밀번호는 공백을 제외한 영문, 숫자, 특수문자를 포함해야 합니다',
    min: '비밀번호는 최소 8자 이상 입력 가능합니다',
    max: '비밀번호는 최대 12자 입력 가능합니다',
    match: '비밀번호가 일치하지 않습니다',
  },
} as const;
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
      .min(8, { message: ERROR_MESSAGE.password.min })
      .max(12, { message: ERROR_MESSAGE.password.max })
      .regex(PASSWORD_VALIDATION, {
        message: ERROR_MESSAGE.password.invalid,
      }),
    confirmPassword: z
      .string()
      .trim()
      .min(8, { message: ERROR_MESSAGE.password.min })
      .max(12, { message: ERROR_MESSAGE.password.max })
      .regex(PASSWORD_VALIDATION, {
        message: ERROR_MESSAGE.password.invalid,
      }),
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
  email: z.string().regex(EMAIL_VALIDATION, {
    message: ERROR_MESSAGE.email.invalidId,
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

export const SettingSchema = z.object({
  name: z
    .string()
    .min(1, { message: '닉네임은 최소 1자 이상이어야 합니다.' })
    .max(10, '닉네임은 10자 이하여야 합니다')
    .optional(),
  profile: z.instanceof(File).optional(),
  currentPassword: z.string().optional(),
  newPassword: z.preprocess(
    (value) => (value === '' ? undefined : value),
    z
      .string()
      .min(8, { message: ERROR_MESSAGE.password.min })
      .max(12, { message: ERROR_MESSAGE.password.max })
      .optional(),
  ),
  confirmPassword: z.string().optional(),
});

// 스키마의 z.infer를 사용하여 스키마 유형도 내보내기
export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
export type SettingSchemaType = z.infer<typeof SettingSchema>;
