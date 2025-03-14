import React, { useEffect, useMemo, useRef, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { Controller } from 'react-hook-form';
import { faClose, faLink } from '@fortawesome/free-solid-svg-icons';
import type ReactQuillType from 'react-quill-new';
import ErrorMessage from '../../auth/ErrorMessage';
import NoteSkeleton from './NoteSkeleton';
import LinkModal from './LinkModal';
import Icon from '../../common/icon/Icon';
import type { NoteFormControlProps } from '@/types/note';
import useTextLength from './useTextLength';

interface ForwardedQuillProps
  extends React.ComponentProps<typeof ReactQuillType> {
  forwardedRef: React.Ref<ReactQuillType>;
}

const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: QuillComponent } = await import('react-quill-new');
    function Quill({ forwardedRef, ...props }: ForwardedQuillProps) {
      /* eslint-disable react/jsx-props-no-spreading */
      return <QuillComponent ref={forwardedRef} {...props} />;
    }
    return Quill;
  },
  { loading: () => <NoteSkeleton />, ssr: false },
);

export default function NoteContentEditor({
  control,
  errors,
  getValues,
  setValue,
  trigger,
  setEmbedVisible,
  checkEmbedUrl,
}: NoteFormControlProps) {
  const quillInstance = useRef<ReactQuillType | null>(null);

  const { textLength, trimmedTextLength, updateTextLength } =
    useTextLength(quillInstance);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const linkUrl = getValues('linkUrl');
  const contentValue = getValues('content');

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ align: '' }, { align: 'center' }, { align: 'right' }],
          [
            { list: 'bullet' },
            { list: 'ordered' },
            { color: [] },
            { background: [] },
          ],
          ['link'],
        ],
        handlers: {
          link: (isOpen: boolean) => {
            if (quillInstance.current && isOpen)
              setIsModalOpen((prev) => !prev);
          },
        },
      },
    };
  }, []);

  // 임시 데이터 불러오기 - 글자 수 감지
  useEffect(() => {
    updateTextLength();
  }, [updateTextLength, contentValue]);

  return (
    <>
      <span className="mb-2 mt-3 text-12M">
        공백포함: {textLength}자 | 공백제외: {trimmedTextLength}자
      </span>

      {linkUrl && (
        <section className="mb-4 flex h-auto w-full items-center rounded-full bg-gs100 px-2 py-1 text-16R text-gs800">
          <Icon
            icon={faLink}
            className="mr-2 size-6 rounded-full bg-slate500 text-gs00"
          />
          <button
            type="button"
            className="w-[calc(100%-56px)] text-left"
            onClick={() => {
              setEmbedVisible?.(true);
              checkEmbedUrl?.();
            }}
          >
            <p className="text-overflow text-gs600 transition-colors hover:text-slate500 focus:text-slate500 active:text-slate500">
              {linkUrl}
            </p>
          </button>
          <button
            type="button"
            className="ml-auto"
            onClick={() => {
              setValue('linkUrl', '');
              trigger();
            }}
          >
            <Icon
              icon={faClose}
              className="rounded-full text-gs500 hover:bg-gs200"
            />
          </button>
        </section>
      )}

      {errors.content && (
        <ErrorMessage className="ml-0" message={errors.content.message} />
      )}

      <div className="overflow-y-hidden-hidden relative flex h-dvh max-h-[calc(100dvh-296px)] min-h-60 w-full flex-1 basis-auto md:max-h-[calc(1000px-404px)]">
        <Controller
          control={control}
          name="content"
          render={({ field: { onChange, value } }) => (
            <QuillNoSSRWrapper
              forwardedRef={quillInstance}
              modules={modules}
              value={value}
              onChange={(content) => {
                onChange(content === '<p><br></p>' ? '' : content);
                updateTextLength();
              }}
              placeholder="이 곳을 클릭해 노트 작성을 시작해주세요"
              className="text-black"
            />
          )}
        />
      </div>

      {isModalOpen && (
        <LinkModal
          onClose={() => setIsModalOpen(false)}
          getValues={getValues}
          setValue={setValue}
        />
      )}
    </>
  );
}
