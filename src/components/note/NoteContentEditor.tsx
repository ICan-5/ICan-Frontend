import React, { useMemo, useRef, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import type ReactQuillType from 'react-quill-new';
import { Controller } from 'react-hook-form';
import ErrorMessage from '../auth/ErrorMessage';
import { NoteFormControlProps } from '@/types/note';
import NoteSkeleton from './NoteSkeleton';

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

// 툴바 옵션들
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ align: '' }, { align: 'center' }, { align: 'right' }],

  [{ list: 'bullet' }, { list: 'ordered' }, { color: [] }, { background: [] }],
  ['link'],
];
export default function NoteContentEditor({
  control,
  errors,
}: NoteFormControlProps) {
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: toolbarOptions,
      },
    };
  }, []);

  const [textLength, setTextLength] = useState(0);
  const [trimmedTextLength, setTrimmedTextLength] = useState(0);
  const quillInstance = useRef<ReactQuillType | null>(null);

  // 텍스트 길이 업데이트 함수
  const updateTextLength = () => {
    if (quillInstance.current) {
      const quillEditor = quillInstance.current.getEditor();
      const text = quillEditor.getText();
      // 전체 문자열에서 모든 공백을 찾아서 제거하는 정규식 활용
      const nonSpaceLength = text.replace(/\s/g, '').length;
      const length = quillEditor.getLength();

      setTextLength(length > 1 ? length - 1 : 0);
      setTrimmedTextLength(nonSpaceLength);
    }
  };

  return (
    <>
      <span className="mb-2 mt-3 text-12M">
        공백포함 : 총 {textLength > 0 ? textLength : 0}자 | 공백제외 : 총
        {trimmedTextLength > 0 ? trimmedTextLength : 0}자
      </span>
      {errors.content && (
        <ErrorMessage className="ml-0" message={errors.content.message} />
      )}
      <div className="relative size-full min-h-60 flex-1 basis-auto overflow-auto">
        <Controller
          control={control}
          name="content"
          render={({ field: { onChange, value } }) => {
            return (
              <QuillNoSSRWrapper
                forwardedRef={quillInstance}
                modules={modules}
                value={value}
                onChange={(content: string) => {
                  if (!content) {
                    onChange('');
                  } else if (content === '<p><br></p>') {
                    onChange('');
                  } else {
                    onChange(content);
                  }

                  // 텍스트 길이 계산
                  updateTextLength();
                }}
                placeholder="이 곳을 클릭해 노트 작성을 시작해주세요"
              />
            );
          }}
        />
      </div>
    </>
  );
}
