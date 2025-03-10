'use client';

import React from 'react';
import 'react-quill-new/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons/faFontAwesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Button from '../common/button/Button';
import Icon from '../common/icon/Icon';
import '@/styles/textEditor.css';
import { NoteSchema, NoteSchemaType } from '@/lib/note-validation';
import NoteContentEditor from './NoteContentEditor';
import NoteTitle from './NoteTitle';
import { createNote } from '@/services/note';
import { useTodoWithGoalTitle } from '@/hooks/useTodoWithGoalTitle';
import NoteTitlesSkeleton from './NoteTitlesSkeleton';

export default function NoteEditor() {
  const { todoId } = useParams<{ todoId: string }>();
  const router = useRouter();

  // rhf을 통한 폼 상태 관리
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(NoteSchema), // Zod 스키마를 사용한 유효성 검사
    defaultValues: { title: '', content: '' },
    mode: 'onChange',
  });

  // 할 일과 목표 제목을 가져오는 훅
  const { todoQuery, goalQuery } = useTodoWithGoalTitle(todoId);

  // 노트 작성 폼 제출 함수
  const onSubmit = async (formData: NoteSchemaType) => {
    try {
      // 노트 생성 요청
      const res = await createNote({
        todoId: Number(todoId),
        formData,
      });

      if (!res.data) {
        const errorMessage = res?.message;
        toast.error(errorMessage);
        return;
      }

      toast.success(res?.data.message);
      router.back(); // 이전 페이지로 이동
    } catch {
      toast.error('노트 생성 중 알 수 없는 오류가 발생했습니다.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex h-dvh w-full flex-col overflow-auto break-keep rounded-2xl bg-gs00 p-4 text-gs900 md:px-6 md:py-4"
    >
      <div>
        {/* 노트 작성 헤더 섹션 */}
        <div className="mb-4 w-full items-center justify-between xs:flex">
          <h2 className="text-16SB xs:text-18SB">노트 작성</h2>
          <div className="flex justify-end gap-2 xs:justify-normal">
            {/* 임시저장 버튼 */}
            <Button
              size="medium"
              variant="outline"
              className="border-none px-1 py-3 xs:px-6"
            >
              임시저장
            </Button>
            {/* 작성 완료 버튼 */}
            <Button
              size="medium"
              className="px-1 py-3 transition-colors xs:px-6"
              type="submit"
              disabled={!isValid}
            >
              작성 완료
            </Button>
          </div>
        </div>

        {/* 목표와 할 일 제목이 로딩 중일 경우 스켈레톤 표시 */}
        {todoQuery.isLoading || goalQuery.isLoading ? (
          <NoteTitlesSkeleton />
        ) : (
          <>
            {/* 목표 제목이 있을 경우 표시 */}
            {goalQuery.data?.todo.title && (
              <section className="mb-3 flex items-center gap-2">
                <Icon
                  icon={faFontAwesome}
                  className="rounded-lg bg-gs800 text-xs text-gs00"
                />
                <h3 className="text-16M text-gs800">
                  {goalQuery.data?.todo.title}
                </h3>
              </section>
            )}

            {/* 할 일 제목 */}
            <article className="mb-2 flex items-center gap-2 text-gs700">
              <span className="rounded-md bg-gs100 p-1 text-12M">To do</span>
              <h4 className="text-14R">{todoQuery.data?.title}</h4>
            </article>
          </>
        )}
      </div>
      <div className="flex h-full min-h-0 flex-col text-gs800">
        {/* 노트 제목 */}
        <NoteTitle control={control} errors={errors} />
        {/* 노트 컨텐츠 영역 */}
        <NoteContentEditor control={control} errors={errors} />
      </div>
    </form>
  );
}
