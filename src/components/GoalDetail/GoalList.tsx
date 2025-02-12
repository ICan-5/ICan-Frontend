import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

interface GoalListProps {
  items: { task: string; date: string; originalIndex: number }[];
  onCheckboxClick: (index: number, listType: 'todo' | 'done') => void;
  listType: 'todo' | 'done';
  toggleListMenu: (index: number, listType: 'todo' | 'done') => void;
  todoItemIndex: number;
  doneItemIndex: number;
  listMenuRef: React.RefObject<HTMLDivElement>;
}

export default function GoalList({
  items,
  onCheckboxClick,
  listType,
  toggleListMenu,
  todoItemIndex,
  doneItemIndex,
  listMenuRef,
}: GoalListProps) {
  return (
    <div>
      {items.map((item, originalIndex) => (
        <div key={originalIndex} className="relative mb-4">
          {listType === 'todo' && (
            <div className="text-sm text-gray-500">{item.date}</div>
          )}
          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={listType === 'done'}
                onChange={() => onCheckboxClick(originalIndex, listType)}
                className="mr-2"
              />
              <span
                className={
                  listType === 'done' ? 'text-gray-500 line-through' : ''
                }
              >
                {item.task}
              </span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faStickyNote}
                className="mr-2 text-blue-400"
              />
              <FontAwesomeIcon
                icon={faEllipsisV}
                className="cursor-pointer text-gray-500"
                onClick={() => {
                  if (
                    (listType === 'todo' && todoItemIndex === originalIndex) ||
                    (listType === 'done' && doneItemIndex === originalIndex)
                  ) {
                    toggleListMenu(-1, listType);
                  } else {
                    toggleListMenu(originalIndex, listType);
                  }
                }}
              />
              {(listType === 'todo' && todoItemIndex === originalIndex) ||
              (listType === 'done' && doneItemIndex === originalIndex) ? (
                <div
                  ref={listMenuRef}
                  className="absolute right-0 z-10 mt-2 rounded bg-white shadow-md"
                >
                  <button className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                    수정하기
                  </button>
                  <button className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                    삭제하기
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
