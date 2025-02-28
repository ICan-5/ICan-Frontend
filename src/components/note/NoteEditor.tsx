'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Controller, useForm } from 'react-hook-form';
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons/faFontAwesome';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../common/button/Button';
import Icon from '../common/icon/Icon';
import '@/styles/textEditor.css';
import { NoteSchema } from '@/lib/note-validation';
import ErrorMessage from '../auth/ErrorMessage';

export default function NoteEditor() {
  const [textLength, setTextLength] = useState(0);
  const quillRef = useRef<ReactQuill>(null);

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
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(NoteSchema),
    defaultValues: { title: '', content: '' },
    mode: 'onChange',
  });

  useEffect(() => {
    const quillEditor = quillRef.current?.getEditor(); // Quill 에디터 인스턴스

    if (quillEditor) {
      // 초기 텍스트 길이 설정
      setTextLength(quillEditor.getLength() - 1);

      // 텍스트가 변경될 때마다 getLength() 호출
      quillEditor.on('text-change', () => {
        setTextLength(quillEditor.getLength() - 1); // 업데이트
      });
    }
  }, []);

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
                  <span className="text-error">
                    {value ? value?.length : 0}
                  </span>
                  <span className="text-blue-500">/30</span>
                </div>
              </>
            )}
          />
        </div>
        {errors.title && (
          <ErrorMessage
            className="ml-0"
            message={errors.title?.message || ''}
          />
        )}
        <span className="mb-2 mt-3 text-12M">
          공백포함 : 총 {textLength > 0 ? textLength : 0}자 | 공백제외 : 총{' '}
          {textLength > 0 ? textLength : 0}자
        </span>
        <div className="relative size-full min-h-60 flex-1 basis-auto overflow-auto">
          <Controller
            control={control}
            name="content"
            render={({ field: { onChange, value } }) => {
              return (
                <ReactQuill
                  ref={quillRef}
                  modules={modules}
                  value={value}
                  onChange={(content) => {
                    const trimmedContent = content.trim();
                    setValue('content', trimmedContent, {
                      shouldValidate: true,
                    });
                    onChange(trimmedContent);
                  }}
                  placeholder="이 곳을 클릭해 노트 작성을 시작해주세요"
                />
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
