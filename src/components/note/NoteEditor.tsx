'use client';

import React from 'react';
import 'react-quill-new/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons/faFontAwesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
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
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    clearErrors,
    watch,
    trigger,
  } = useForm({
    resolver: zodResolver(NoteSchema),
    defaultValues: { title: '', content: '' },
    mode: 'onChange',
  });

  // 할 일 제목, 목표 제목 가져오기
  const { todoQuery, goalQuery } = useTodoWithGoalTitle(todoId);

  const onSubmit = async (formData: NoteSchemaType) => {
    if (todoId) {
      try {
        const res = await createNote({
          todoId: Number(todoId),
          formData,
        });

        // console.log('res________', res);

        if (res) {
          alert('노트 생성이 완료됐습니다.');
          router.back();
        }
      } catch (error) {
        console.error('노트 생성 중 오류 발생1:', error);
      }
    } else {
      console.error('todoId가 없습니다.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex h-dvh w-full flex-col overflow-auto break-keep rounded-2xl bg-gs00 p-4 text-gs900 md:px-6 md:py-4"
    >
      <div>
        <div className="mb-4 w-full items-center justify-between xs:flex">
          <h2 className="text-16SB xs:text-18SB">노트 작성</h2>
          <div className="flex justify-end gap-2 xs:justify-normal">
            <Button
              size="medium"
              variant="outline"
              className="border-none px-1 py-3 xs:px-6"
            >
              임시저장
            </Button>
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
        {/* goal 목표 있을 경우 */}
        {todoQuery.isLoading || goalQuery.isLoading ? (
          <NoteTitlesSkeleton />
        ) : (
          <>
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
        <NoteContentEditor
          control={control}
          errors={errors}
          watch={watch}
          getValues={getValues}
          setError={setError}
          clearErrors={clearErrors}
          trigger={trigger}
        />
      </div>
    </form>
  );
}
