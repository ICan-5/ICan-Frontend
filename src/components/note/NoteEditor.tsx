'use client';

import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function NoteEditor() {
  const [value, setValue] = useState('');
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ align: ['right', 'center', 'justify'] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
    ],
  };

  const style = {
    '& .ql-snow .ql-stroke': { stroke: 'white' },
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
      <ReactQuill
        modules={modules}
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="이 곳을 클릭해 노트 작성을 시작해주세요"
        style={style}
      />
    </div>
  );
}
