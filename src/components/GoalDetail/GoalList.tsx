import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

interface GoalListProps {
  items: string[];
  isDone: boolean;
  onCheckboxClick: (index: number) => void;
  listType: 'todo' | 'done';
  toggleListMenu: (index: number, listType: 'todo' | 'done') => void;
  todoItemIndex: number;
  doneItemIndex: number;
  listMenuRef: React.RefObject<HTMLDivElement>;
}
//todo, done 리스트
export default function GoalList({
  items,
  isDone, //완료 여부
  onCheckboxClick,
  listType, //todo or done
  toggleListMenu, //수정 or 삭제 메뉴바
  todoItemIndex,
  doneItemIndex,
  listMenuRef, //외부 영역 클릭 시 메뉴바 닫힘
}: GoalListProps) {
  return (
    <div>
      {items.map((item, index) => (
        <div
          key={index}
          className="relative mb-2 flex items-center justify-between"
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isDone}
              onChange={() => onCheckboxClick(index)}
              className="mr-2"
            />
            <span className={isDone ? 'text-gray-500 line-through' : ''}>
              {item}
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
              onClick={() => toggleListMenu(index, listType)}
            />
            {(listType === 'todo' && todoItemIndex === index) ||
            (listType === 'done' && doneItemIndex === index) ? (
              <div
                ref={listMenuRef}
                className="absolute right-0 z-10 mt-[100px] rounded bg-white shadow-md"
              >
                <button className="block px-4 py-2 text-sm text-gray-700">
                  수정하기
                </button>
                <button className="block px-4 py-2 text-sm text-gray-700">
                  삭제하기
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
