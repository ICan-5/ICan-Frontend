'use client';

import React, { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Controller, useForm } from 'react-hook-form';
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons/faFontAwesome';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../common/button/Button';
import Icon from '../common/icon/Icon';
import '@/styles/textEditor.css';
import { NoteSchema } from '@/lib/note-validation';
import ErrorMessage from '../auth/ErrorMessage';

export default function NoteEditor() {
  // const handleChange = (value) => setContent(value);

  const modules = useMemo(() => {
    // 툴바 옵션들
    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: '' }, { align: 'center' }, { align: 'right' }],

      [
        { list: 'bullet' },
        { list: 'ordered' },
        { color: [] },
        { background: [] },
      ],
      ['link'],
    ];

    return {
      toolbar: {
        container: toolbarOptions,
      },
    };
  }, []);

  const {
    control,
    // register,
    // getValues,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(NoteSchema),
    mode: 'onChange',
  });

  // HTML 태그를 제거하고 텍스트만 추출하는 함수
  const TextFromHtml = (htmlText => {
    const doc = new DOMParser().parseFromString(htmlText 'text/html');
    return doc.body.textContent || '';
  };

  return (
    <form className="mx-auto flex h-dvh w-full flex-col overflow-auto break-keep rounded-2xl bg-gs00 p-4 text-gs900 md:px-6 md:py-4">
      <div>
        <div className="mb-4 w-full items-center justify-between xs:flex">
          <h2 className="text-16SB xs:text-18SB">노트 작성</h2>
          <div className="flex justify-end gap-2 xs:justify-normal">
            <Button
              size="medium"
              variant="outline"
              // onClick={onClose}
              className="border-none px-1 py-3 xs:px-6"
            >
              임시저장
            </Button>
            <Button
              size="medium"
              // onClick={onConfirm}
              className="px-1 py-3 xs:px-6"
              type="submit"
              disabled={!isValid}
            >
              작성 완료 {/* 수정인 경우 수정 완료 */}
            </Button>
          </div>
        </div>
        {/* 목표 있을 경우 */}
        <section className="mb-3 flex items-center gap-2">
          <Icon
            icon={faFontAwesome}
            className="rounded-lg bg-gs800 text-xs text-gs00"
          />
          <h3 className="text-16M text-gs800">
            자바스크립트로 웹 서비스 만들기
          </h3>
        </section>
        {/* 할일 상태, 할일 제목 */}
        <article className="mb-2 flex items-center gap-2 text-gs700">
          <span className="rounded-md bg-gs100 p-1 text-12M">To do</span>
          <h4 className="text-14R">자바스크립트 기초 챕터1 듣기</h4>
        </article>
      </div>
      <div className="flex h-full min-h-0 flex-col text-gs800">
        <div className="flex items-center justify-between border-y border-gs200 py-3">
          <Controller
            control={control}
            name="title"
            render={({ field: { value, onChange } }) => (
              <>
                <input
                  placeholder="노트의 제목을 입력해주세요"
                  className="border-top border-bottom w-full rounded-none bg-gs00 pl-0 outline-none focus:border-gs200"
                  onChange={(e) => onChange(e.target.value)}
                  value={value}
                />
                <div className="flex px-1 py-[2px] text-xs font-medium">
                  <span className="text-error">{value?.length}</span>
                  <span className="text-blue-500">/30</span>
                </div>
              </>
            )}
          />
        </div>
        {errors.title && <ErrorMessage message={errors.title?.message || ''} />}
        <div className="relative size-full min-h-60 flex-1 basis-auto overflow-auto">
          <Controller
            control={control}
            name="content"
            render={({ field: { onChange, value } }) => {
              const strippedValue = value ? TextFromHtml(value) : '';
              return (
                <>
                  <span className="mb-2 mt-3 text-12M">
                    공백포함 : 총 {strippedValue.length}자 | 공백제외 : 총{' '}
                    {strippedValue.replace(/\s/g, '').length}자
                  </span>
                  <ReactQuill
                    modules={modules}
                    value={value}
                    onChange={onChange}
                    placeholder="이 곳을 클릭해 노트 작성을 시작해주세요"
                  />
                </>
              );
            }}
          />
          {errors.content && (
            <ErrorMessage message={errors.content?.message || ''} />
          )}
        </div>
      </div>
    </form>
  );
}
