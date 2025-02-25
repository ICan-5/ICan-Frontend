'use client';

import React, { useEffect, useRef } from 'react';
import { useAddGoal } from '@/hooks/useGoals';

type Props = {
  onCloseInput: () => void;
};

export default function NewGoalItem({ onCloseInput }: Props) {
  const { mutate } = useAddGoal();
  const inputRef = useRef<HTMLInputElement | null>(null);

  /**
   * @param event 키보드 이벤트
   * @returns null
   * ESC 누를 경우 저장없이 새 목표 입력 종료
   * 엔터 누를 경우 목표 리스트에 새 목표 저장 & 목표 입력 종료
   * isComposing이 false면 한글 입력을 완료한 상태
   */
  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Escape') onCloseInput();
    else if (event.key === 'Enter') {
      if (event.nativeEvent.isComposing) return;
      if (inputRef.current?.value.trim()) {
        const title = inputRef.current.value.trim();
        mutate(title.trim());
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
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
