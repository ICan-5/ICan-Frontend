'use client';

import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faFileLines,
  faFilePen,
} from '@fortawesome/free-solid-svg-icons';
import cn from '@/utils/cn';
import IconButton from '../button/IconButton';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Goal } from '@/types/goals';

const goalColor: Record<string, string> = {
  goal01: 'text-goal01',
  goal02: 'text-goal02',
  default: 'text-slate500',
};

interface Props {
  id: number;
  title: string;
  goal: Goal | null;
  done: boolean;
  noteId: number | null;
  onCheck?: () => void;
  onClickNote?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

/**
 *
 * @prop id: 할 일 id
 * @prop title: 할 일 title
 * @prop goal: 목표, 없을 수 있음
 * @prop done: 할 일 완료 여부
 * @prop noteId: 할 일과 관련된 노트 id, 없을 수 있음
 * @prop onCheck: label,check를 클릭 함수
 * @prop onClickNote: 노트 클릭했을 때 함수, 현재까지는 새 노트, 작성된 노트 구분없이 사용
 * @prop onDelete: ... 클리하고 삭제하기 눌렀을 때 함수
 */
export default function CheckTodo({
  id,
  title,
  goal,
  done,
  noteId,
  onCheck,
  onClickNote,
  onDelete,
  onEdit,
}: Props) {
  const noteIcon = noteId ? faFileLines : faFilePen;
  const [menuRef, isMenuOpen, setIsMenuOpen] =
    useClickOutside<HTMLDivElement>();

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <label
        htmlFor={`${id}`}
        className={cn(
          'group flex w-full cursor-pointer items-center justify-center gap-2 border-b border-dashed border-gs200 p-2 text-gsBk 2xl:gap-3 2xl:px-3 2xl:py-4',
          { 'hover:bg-slate50 hover:text-slate700': !done },
          { 'bg-slate50 text-slate700': isMenuOpen },
        )}
        onClick={() => {
          if (onCheck) onCheck();
        }}
      >
        <input
          id={`${id}`}
          type="checkbox"
          checked={done}
          className="hidden"
          onChange={onCheck}
        />
        <span
          className={cn(
            'flex size-4 flex-none items-center justify-center rounded-[4px] border border-slate500 bg-gs00 2xl:h-5 2xl:w-5',
            { 'border-0 bg-gs400 text-gs00': done },
          )}
        >
          {done && <FontAwesomeIcon className="size-3" icon={faCheck} />}
        </span>
        <p className="flex min-w-0 flex-1 flex-col 2xl:gap-1">
          {goal !== null && !done && (
            <span
              className={cn(
                'overflow-hidden text-ellipsis whitespace-nowrap break-words text-12M text-gs500 2xl:text-14M',
                goalColor[goal?.color || 'default'],
              )}
            >
              {goal?.title}
            </span>
          )}
          <span
            className={cn(
              done && 'text-gs400 line-through',
              'overflow-hidden text-ellipsis whitespace-nowrap break-words text-14R 2xl:text-16R',
            )}
          >
            {title}
          </span>
        </p>
        <IconButton
          className={cn(
            'flex-none rounded-2xl bg-gs00 text-slate500 group-hover:bg-gs00',
            {
              'opacity-100': isMenuOpen,
              'opacity-0 group-hover:opacity-100': !isMenuOpen,
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
            className={cn(
              'flex-none rounded-2xl bg-gs00 text-gs400 transition-opacity',
              {
                'opacity-100': isMenuOpen,
                'opacity-0 group-hover:opacity-100': !isMenuOpen,
              },
            )}
            icon={faEllipsisVertical}
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(true);
            }}
          />
          {isMenuOpen && (
            <div
              className="absolute right-0 z-10 mt-2 rounded bg-gs00 shadow-md"
              ref={menuRef}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="flex whitespace-nowrap px-4 py-2 text-14R text-gs700 hover:bg-gs200"
                onClick={() => {
                  if (onEdit) onEdit();
                }}
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
            </div>
          )}
        </div>
      </label>
    </>
  );
}
