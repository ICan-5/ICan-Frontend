'use client';

import React from 'react';
import 'react-quill-new/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons/faFontAwesome';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../common/button/Button';
import Icon from '../common/icon/Icon';
import '@/styles/textEditor.css';
import { NoteSchema } from '@/lib/note-validation';
import NoteContentEditor from './NoteContentEditor';
import NoteTitle from './NoteTitle';

export default function NoteEditor() {
  const {
    control,
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

  return (
    <form className="mx-auto flex h-dvh w-full flex-col overflow-auto break-keep rounded-2xl bg-gs00 p-4 text-gs900 md:px-6 md:py-4">
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
        <section className="mb-3 flex items-center gap-2">
          <Icon
            icon={faFontAwesome}
            className="rounded-lg bg-gs800 text-xs text-gs00"
          />
          <h3 className="text-16M text-gs800">
            자바스크립트로 웹 서비스 만들기
          </h3>
        </section>
        {/* todo 상태, todo 제목 */}
        <article className="mb-2 flex items-center gap-2 text-gs700">
          <span className="rounded-md bg-gs100 p-1 text-12M">To do</span>
          <h4 className="text-14R">자바스크립트 기초 챕터1 듣기</h4>
        </article>
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
