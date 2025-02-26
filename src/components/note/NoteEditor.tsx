'use client';

import React, { useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons/faFontAwesome';
import CustomToolbar from './CustomToolbar';
import Button from '../common/button/Button';
import TextInput from '../common/input/TextInput';
import Icon from '../common/icon/Icon';
import '@/styles/textEditor.css';

export default function NoteEditor() {
  const [value, setValue] = useState('');
  const modules = useMemo(() => {
    return {
      toolbar: {s
        container: '#toolbar',
      },
    };
  }, []);

  const {
    control,
    formState: { errors },
  } = useForm({
  });
  return (
    <form className="mx-auto flex h-[84%] min-h-[640px] w-full flex-col rounded-2xl bg-gs00 p-4 text-gs900 md:px-6 md:py-4">
      <div className="h-32">
        <div className="mb-4 flex w-full items-center justify-between">
          <h2 className="text-18SB">노트 작성</h2>
          <div className="flex gap-2">
            <Button
              size="medium"
              variant="outline"
              // onClick={onClose}
              className="border-none py-3"
            >
              임시저장
            </Button>
            <Button
              size="medium"
              // onClick={onConfirm}
              className="py-3"
              type="submit"
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
        <article className="mb-3 flex items-center gap-2 text-gs700">
          <span className="rounded-md bg-gs100 p-1 text-12M">To do</span>
          <h4 className="text-14R">자바스크립트 기초 챕터1 듣기</h4>
        </article>
      </div>
      <div className="flex h-full flex-col text-gs800">
        <div className="h-14">
          <TextInput
            name="title"
            placeholder="노트의 제목을 입력해주세요"
            control={control}
            errors={errors}
            className="border-top border-bottom rounded-none border-x-0 border-gs200 bg-gs00 pl-0 focus:border-gs200"
          />
        </div>
        <span className="mb-2 mt-3 h-4 text-12M">
          공백포함 : 총 0자 | 공백제외 : 총 0자
        </span>
        <div className="relative size-full flex-1">
          <ReactQuill
            modules={modules}
            theme="snow"
            value={value}
            onChange={setValue}
            placeholder="이 곳을 클릭해 노트 작성을 시작해주세요"
            // style={{ height: 'calc(100% - 200px)', color: '#334155' }}
          />
          <div className="absolute bottom-0 w-full">
            <CustomToolbar />
          </div>
        </div>
      </div>
    </form>
  );
}
