import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import GoalProgress from './GoalProgress';
import { useClickOutside } from '@/hooks/useClickOutside';

type Props = {
  doneItems: number;
  todoItems: number;
  id: string;
};

export default function GoalHeader({ doneItems, todoItems, id }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useClickOutside<HTMLDivElement>(() => {
    setIsMenuOpen(false);
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="flex items-center text-18SB">
          <FontAwesomeIcon icon={faFlag} className="mr-2 text-slate500" />
          임시 목표 {id}
        </h1>
        <div ref={menuRef}>
          <FontAwesomeIcon
            icon={faEllipsisV}
            className="cursor-pointer text-gs500"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          />
          {isMenuOpen && (
            <div
              className="absolute right-12 mt-2 rounded bg-gs00 shadow-md"
              ref={menuRef}
            >
              <button
                type="button"
                className="block w-full border-b px-4 py-2 text-left text-14R text-gs700 hover:bg-gs200"
              >
                목표 색상 변경
              </button>
              <button
                type="button"
                className="block w-full border-b px-4 py-2 text-left text-14R text-gs700 hover:bg-gs200"
              >
                수정하기
              </button>
              <button
                type="button"
                className="block w-full px-4 py-2 text-left text-14R text-gs700 hover:bg-gs200"
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>
      <GoalProgress doneItems={doneItems} todoItems={todoItems} />
    </div>
  );
}
