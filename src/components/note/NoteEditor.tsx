'use client';

import React, { useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomToolbar from './CustomToolbar';
import Button from '../common/button/Button';

export default function NoteEditor() {
  const [value, setValue] = useState('');
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: '#toolbar',
      },
    };
  }, []);

  // const style = {
  //   '& .ql-snow .ql-stroke': { stroke: 'white' },
  // };
  return (
    <div className="mx-auto h-screen max-w-screen-xl bg-gs00 p-4 md:gap-8 md:p-10">
      <div className="flex w-full">
        <h2 className="text-18SB">노트 작성</h2>{' '}
        <Button
          size="medium"
          // onClick={onClose}
          className="ml-auto bg-gs100 py-4 text-gs600 hover:bg-gs100 focus:bg-gs100 active:bg-gs100"
        >
          임시저장
        </Button>
        <Button
          size="medium"
          // onClick={onConfirm}
          className="bg-warn500 py-4 text-gs00 hover:bg-warn500 focus:bg-warn500 active:bg-warn500"
        >
          수정하기
        </Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ReactQuill
          modules={modules}
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder="이 곳을 클릭해 노트 작성을 시작해주세요"
          // style={style}
        />
        <CustomToolbar />
      </div>
    </div>
  );
}
