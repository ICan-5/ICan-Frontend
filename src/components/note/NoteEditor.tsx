'use client';

import React, { useCallback, useEffect, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons/faFontAwesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { faArrowLeft, faExclamation } from '@fortawesome/free-solid-svg-icons';
import Button from '../common/button/Button';
import Icon from '../common/icon/Icon';
import '@/styles/textEditor.css';
import { NoteSchema, NoteSchemaType } from '@/lib/note-validation';
import NoteContentEditor from './NoteContentEditor';
import NoteTitle from './NoteTitle';
import { createNote } from '@/services/note';
import { useTodoWithGoalTitle } from '@/hooks/useTodoWithGoalTitle';
import NoteTitlesSkeleton from './NoteTitlesSkeleton';
import cn from '@/utils/cn';

export default function NoteEditor() {
  const { todoId } = useParams<{ todoId: string }>();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    setValue,
    clearErrors,
    watch,
    trigger,
  } = useForm({
    resolver: zodResolver(NoteSchema),
    shouldFocusError: true,
    defaultValues: { title: '', content: '', linkUrl: '' },
    mode: 'all',
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

  // 임시 저장
  const handleTempSave = useCallback(() => {
    if (isValid) {
      const noteData = getValues();
      localStorage.setItem(`todo-${todoId}`, JSON.stringify(noteData));
      alert('임시 저장이 완료되었습니다');
    }
  }, [isValid, getValues, todoId]);

  // 자동 임시 저장 기능
  useEffect(() => {
    const interval = setInterval(() => {
      handleTempSave();
    }, 300000); // 5분

    return () => clearInterval(interval);
  }, [handleTempSave]);

  const savedData = localStorage.getItem(`todo-${todoId}`);
  const [showSaveData, setShowSavedData] = useState(!!savedData);

  const setTempData = () => {
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.keys(parsedData).forEach((key) => {
        setValue(key as 'title' | 'content' | 'linkUrl', parsedData[key]);
      });
      trigger();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex h-dvh w-full flex-col overflow-auto break-keep rounded-2xl border-2 border-gs200 bg-gs00 text-gs900"
    >
      <div>
        <div className="w-full items-center border-b-2 border-gs200 bg-gs50 px-4 py-2 xs:flex">
          <button type="button" onClick={() => router.back()}>
            <Icon icon={faArrowLeft} className="size-5" />
          </button>
          <div className="ml-2 flex w-full items-center justify-between">
            <h2 className="text-14SB xs:text-16SB md:text-18SB">노트 작성</h2>
            <div className="flex justify-end gap-2 xs:justify-normal">
              <Button
                disabled={!isValid}
                size="medium"
                variant="outline"
                className="border-none bg-transparent px-1 py-3 xs:px-6 2xl:rounded-lg 2xl:px-6 2xl:!text-14SB"
                onClick={() => {
                  handleTempSave();
                }}
              >
                임시저장
              </Button>
              <Button
                size="medium"
                className="px-1 py-3 transition-colors xs:px-6 2xl:rounded-lg 2xl:px-6 2xl:!text-14SB"
                type="submit"
                disabled={!isValid}
              >
                작성 완료
              </Button>
            </div>
          </div>
        </div>
        {showSaveData && (
          <section className="flex h-fit w-full flex-wrap items-center rounded-b-[28px] bg-slate100 px-4 py-2">
            <div className="mb-1 flex flex-1 flex-nowrap items-center sm:mb-0">
              <Icon icon={faExclamation} className="text-slate500" />
              <p className="text-14M text-slate500">
                임시 저장된 노트가 있어요. 저장된 노트를 불러오시겠어요?
              </p>
            </div>
            <div className="ml-auto flex min-w-40 items-center justify-end">
              <Button
                className="bg-transparent !py-2 px-5 !text-14R text-gs600 transition-colors hover:bg-transparent focus:bg-transparent active:bg-transparent 2xl:!text-14R"
                onClick={() => setShowSavedData(false)}
              >
                닫기
              </Button>
              <Button
                variant="outline"
                className="h-9 rounded-full px-4 py-2 text-14M transition-colors 2xl:rounded-full 2xl:py-2 2xl:!text-14M"
                onClick={() => {
                  setTempData();
                  setShowSavedData(false);
                }}
              >
                불러오기
              </Button>
            </div>
          </section>
        )}
        {/* goal 목표 있을 경우 */}
        {todoQuery.isLoading || goalQuery.isLoading ? (
          <NoteTitlesSkeleton />
        ) : (
          <>
            {goalQuery.data?.todo.title && (
              <section className="mx-6 mb-2 mt-4 flex items-center gap-3">
                <Icon
                  icon={faFontAwesome}
                  className="size-4 rounded-lg text-lg text-[#FB923C]"
                />
                <h3 className="w-[calc(100%-40px)] break-words text-16M text-gs800">
                  {goalQuery.data?.todo.title}
                </h3>
              </section>
            )}

            <article
              className={cn(
                'mx-6 mb-4 flex items-center gap-2 text-gs700',
                !goalQuery.data?.todo.title && 'mt-4',
              )}
            >
              <span className="h-5 min-w-10 rounded-s bg-gs100 p-1 text-center text-12M">
                To do
              </span>
              <h4 className="w-[calc(100%-44px)] break-words text-14R text-gs600">
                {todoQuery.data?.title}
              </h4>
            </article>
          </>
        )}
      </div>
      <div className="mx-6 mb-6 flex h-full min-h-0 flex-col text-gs800">
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
          setValue={setValue}
          isValid={isValid}
        />
      </div>
    </form>
  );
}
