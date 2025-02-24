'use client';

import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faFileLines,
  faFilePen,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import cn from '@/utils/cn';
import IconButton from '../Button/IconButton';
import { useClickOutside } from '@/hooks/useClickOutside';

type Props = {
  id: number;
  title: string;
  goalTitle?: string;
  done: boolean;
  noteId: number | null;
  onCheck?: () => void;
  onClickNote?: () => void;
  onDelete?: () => void;
};

/**
 *
 * id: 노트 id
 * title: 노트 title
 * goalTitle: 목표 이름, 없을 수 있음
 * done: 할 일 완료 여부
 * noteId: 할 일과 관련된 노트 id, 없을 수 있음
 * onCheck: label,check를 클릭 함수
 * onClickNote: 노트 클릭했을 때 함수, 현재까지는 새 노트, 작성된 노트 구분없이 사용
 * onDelete: ... 클리하고 삭제하기 눌렀을 때 함수
 */
export default function CheckTodo({
  id,
  title,
  goalTitle,
  done,
  noteId,
  onCheck,
  onClickNote,
  onDelete,
}: Props) {
  const noteIcon = noteId ? faFileLines : faFilePen;
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useClickOutside(() => {
    setIsMenuOpen(false);
  });

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <label
        htmlFor={`${id}`}
        className={cn(
          'group flex w-full cursor-pointer items-center justify-center gap-2 border-b border-dashed border-gs200 p-2 text-gsBk 2xl:gap-3 2xl:px-3 2xl:py-4',
          { 'hover:bg-slate50 hover:text-slate700': !done },
        )}
        onClick={() => {
          if (onCheck) onCheck();
        }}
      >
        <input id={`${id}`} type="checkbox" checked={done} className="hidden" />
        <span
          className={cn(
            'flex h-4 w-4 flex-none items-center justify-center rounded-[4px] border border-slate500 bg-gs00 2xl:h-5 2xl:w-5',
            { 'border-0 bg-gs400 text-gs00': done },
          )}
        >
          {done && <FontAwesomeIcon className="h-3 w-3" icon={faCheck} />}
        </span>
        <p className="flex w-full flex-col 2xl:gap-1">
          <span className="verflow-hidden text-ellipsis whitespace-nowrap break-words text-12M text-gs500 2xl:text-14M">
            {goalTitle}
          </span>
          <span
            className={cn(
              done && 'text-gs400 line-through',
              'w-full flex-1 overflow-hidden text-ellipsis whitespace-nowrap break-words text-14R 2xl:text-16R',
            )}
          >
            {title}
          </span>
        </p>
        <IconButton
          className={cn(
            'flex-none rounded-2xl bg-gs50 text-slate500 group-hover:bg-gs00',
            {
              'invisible pl-1 group-hover:visible': noteId === null,
            },
          )}
          icon={noteIcon}
          onClick={(e) => {
            e.stopPropagation();
            if (onClickNote) onClickNote();
          }}
        />
        <div className="relative">
          <IconButton
            className="flex-none rounded-2xl bg-gs50 text-gs400 group-hover:bg-gs00 md:hidden md:group-hover:flex"
            icon={faEllipsisVertical}
            onClick={() => setIsMenuOpen(true)}
          />
          {isMenuOpen && (
            <nav
              className="absolute right-0 z-10 mt-2 rounded bg-gs00 shadow-md"
              ref={menuRef}
            >
              <button
                type="button"
                className="flex whitespace-nowrap px-4 py-2 text-14R text-gs700 hover:bg-gs200"
              >
                수정하기
              </button>
              <button
                type="button"
                className="flex whitespace-nowrap px-4 py-2 text-14R text-gs700 hover:bg-gs200"
                onClick={() => {
                  if (onDelete) onDelete();
                }}
              >
                삭제하기
              </button>
            </nav>
          )}
        </div>
      </label>
    </>
  );
}
