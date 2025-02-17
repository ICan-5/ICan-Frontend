import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import GoalProgress from './GoalProgress';
import { useEffect, useRef, useState } from 'react';

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
        <h1 className="text-18R flex items-center font-bold">
          <FontAwesomeIcon icon={faFlag} className="text-slate500 mr-2" />
          임시 목표
        </h1>
        <div ref={menuRef}>
          <FontAwesomeIcon
            icon={faEllipsisV}
            className="text-gs500 cursor-pointer"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          />
          {isMenuOpen && (
            <div
              className="bg-gs00 absolute right-12 mt-2 rounded shadow-md"
              ref={menuRef}
            >
              <button className="hover:bg-gs200 text-14R block w-full px-4 py-2 text-left text-gray-700">
                목표 색상 변경
              </button>
              <button className="hover:bg-gs200 text-14R block w-full px-4 py-2 text-left text-gray-700">
                수정하기
              </button>
              <button className="hover:bg-gs200 text-14R block w-full px-4 py-2 text-left text-gray-700">
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
