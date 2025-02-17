import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import GoalProgress from './GoalProgress';

type Props = {
  doneItems: number;
  todoItems: number;
};

export default function GoalHeader({ doneItems, todoItems }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="flex items-center text-18R font-bold">
          <FontAwesomeIcon icon={faFlag} className="mr-2 text-slate500" />
          임시 목표
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
                className="block w-full px-4 py-2 text-left text-14R text-gray-700 hover:bg-gs200"
              >
                목표 색상 변경
              </button>
              <button
                type="button"
                className="block w-full px-4 py-2 text-left text-14R text-gray-700 hover:bg-gs200"
              >
                수정하기
              </button>
              <button
                type="button"
                className="block w-full px-4 py-2 text-left text-14R text-gray-700 hover:bg-gs200"
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
