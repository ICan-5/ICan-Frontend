import { z } from 'zod';

// 객체 스키마 생성
export const SignUpSchema = z.object({
  name: z
    .string()
    .regex(/^[\s\S]+$/, {
      message: '이름은 문자, 숫자, 특수문자, 한글만 입력할 수 있습니다',
    })
    .min(1, { message: '이름을 입력해주세요' })
    .max(10, { message: '이름은 최대 10자 입력 가능합니다' }),
  email: z.string().email({ message: '올바른 이메일 형식을 입력해주세요' }),
  password: z
    .string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message: '비밀번호는 영문 + 숫자 포함 8자 이상이어야 합니다.',
    })
    .min(8, { message: '비밀번호는 최소 8자 이상 입력 가능합니다' })
    .max(12, { message: '비밀번호는 최대 12자 입력 가능합니다' }),
});
