import { z } from 'zod';

const ERROR_MESSAGE = {
  title: {
    empty: '제목을 입력해주세요',
    max: '제목은 최대 30자 입력 가능합니다',
  },
} as const;
// 노트 스키마
export const NoteSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: ERROR_MESSAGE.title.empty })
    .max(30, { message: ERROR_MESSAGE.title.max }),
});

// 스키마의 z.infer를 사용하여 스키마 유형도 내보내기
export type NoteSchemaType = z.infer<typeof NoteSchema>;
