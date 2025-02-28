'use client';

import { MouseEvent } from 'react';
import cn from '@/utils/cn';

interface Props {
  title: string;
  isSelected: boolean;
  onSelect: () => void;
}

export default function GoalTab({ title, isSelected, onSelect }: Props) {
  const clickTab = (event: MouseEvent<HTMLButtonElement>) => {
    onSelect();
    event.currentTarget?.scrollIntoView({
      behavior: 'smooth', // 부드러운 스크롤
      inline: 'center', // 가로 중앙 정렬
      block: 'nearest', // 세로 위치 유지
    });
  };

  return (
    <button
      type="button"
      className={cn(
        'relative h-9 flex-none overflow-hidden text-ellipsis whitespace-nowrap break-words rounded-t-lg bg-gs50 px-3 py-2 text-left text-14M text-gs400 transition-all duration-150',
        { 'w-40 bg-gs00 text-gsBk md:w-56': isSelected },
        { 'w-20 border-x border-t border-gs200 md:w-32': !isSelected },
      )}
      onClick={clickTab}
    >
      <span
        className={cn(
          'invisible absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 bg-slate500',
          { visible: isSelected },
        )}
      />
      {title}
    </button>
  );
}
