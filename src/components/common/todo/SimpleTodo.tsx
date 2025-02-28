'use client';

import { faFileLines, faFilePen } from '@fortawesome/free-solid-svg-icons';
import cn from '@/utils/cn';
import IconButton from '../button/IconButton';

interface Props {
  title: string;
  done: boolean;
  noteId: number | null;
}

export default function SimpleTodo({ title, done, noteId }: Props) {
  const noteIcon = noteId ? faFileLines : faFilePen;
  /** 노트 클릭 함수 */
  const clickNote = () => {};
  return (
    <div
      className={cn(
        'group flex h-10 w-full cursor-pointer items-center gap-2 border-b border-dashed border-gs200 p-2 text-gsBk 2xl:h-11 2xl:gap-3',
        { 'hover:bg-slate50 hover:text-slate700': !done },
      )}
    >
      <span
        className={cn(
          done && 'text-gs400 line-through',
          'w-full flex-1 overflow-hidden text-ellipsis whitespace-nowrap break-words text-14R 2xl:text-16R',
        )}
      >
        {title}
      </span>
      <IconButton
        className={cn('rounded-2xl bg-gs50 text-slate500', {
          'group-hover:bg-gs00': !done,
          'pl-1 md:invisible md:group-hover:visible': noteId === null && !done,
          invisible: noteId === null && done,
        })}
        icon={noteIcon}
        onClick={clickNote}
      />
    </div>
  );
}
