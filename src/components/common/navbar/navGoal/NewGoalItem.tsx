'use client';

import React, { useEffect, useRef, useState } from 'react';

// TODO:: API 연결 완료시 onAddNewItem 삭제
type Props = {
  onCloseInput: () => void;
  onAddNewItem: (newItem: { id: number; title: string }) => void;
};

export default function NewGoalItem({ onCloseInput, onAddNewItem }: Props) {
  const [title, setTitle] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  /**
   * @param event 키보드 이벤트
   * @returns null
   * ESC 누를 경우 저장없이 새 목표 입력 종료
   * 엔터 누를 경우 목표 리스트에 새 목표 저장 & 목표 입력 종료
   * isComposing이 false면 한글 입력을 완료한 상태
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') onCloseInput();
    else if (event.key === 'Enter') {
      if (event.nativeEvent.isComposing) return;
      if (title.trim()) {
        // TODO:: 나중에 fetch코드 작성
        // goals에 POST body는 title만
        // 성공하면, 만들어진 목표 페이지로 자동 이동
        const newItem = {
          id: Math.floor(Math.random() * 1000000),
          title,
        };
        onAddNewItem(newItem);
      }
      onCloseInput();
    }
  };

  /**
   * input에서 focus가 빠지면 input 종료 함수
   */
  const handleBlur = () => {
    onCloseInput();
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  });

  return (
    <div className="flex flex-none cursor-pointer items-center gap-4 rounded-md bg-gs50 px-2 py-1 text-14R text-gray-400 2xl:rounded-lg">
      <span className="ml-2 h-2 w-2 rounded-md bg-goal01" />
      <input
        ref={inputRef}
        className="text-overflow p-1 text-12R 2xl:text-14R"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
