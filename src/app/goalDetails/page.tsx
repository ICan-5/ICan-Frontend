'use client';

import useGoalStore from '@/store/goal/goalStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFlag,
  faEllipsisV,
  faStickyNote,
  faAnglesRight,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import useMenuStore from '@/store/goal/goalMenuStore';
import useLoadingStore from '@/store/loadingStore';
import { useEffect } from 'react';
import Loading from '../loading';
import useListMenuStore from '@/store/goal/listMenuStore';

export default function GoalDetail() {
  const { todoItems, doneItems, moveToDone, moveToTodo } = useGoalStore();
  const { isMenuOpen, toggleMenu } = useMenuStore();
  const { isLoading, setLoading } = useLoadingStore();
  const {
    todoItemIndex,
    doneItemIndex,
    toggleMenu: toggleListMenu,
  } = useListMenuStore();

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [setLoading]);

  if (isLoading) {
    return <Loading />;
  }

  const renderList = (
    items: string[],
    isDone: boolean,
    onCheckboxClick: (index: number) => void,
    listType: 'todo' | 'done',
  ) => {
    return items.map((item, index) => (
      <div key={index} className="mb-2 flex items-center justify-between">
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
          <FontAwesomeIcon icon={faStickyNote} className="mr-2 text-blue-400" />
          <FontAwesomeIcon
            icon={faEllipsisV}
            className="cursor-pointer text-gray-500"
            onClick={() => toggleListMenu(index, listType)}
          />
          {(listType === 'todo' && todoItemIndex === index) ||
          (listType === 'done' && doneItemIndex === index) ? (
            <div className="absolute mt-10 rounded bg-white shadow-md">
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
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 sm:px-8 lg:px-16 xl:px-24">
      {/* 목표 제목과 진행률 */}
      <div className="mb-6 rounded-2xl bg-white p-6 shadow">
        <div className="flex items-center justify-between">
          <h1 className="flex items-center text-xl font-bold">
            <FontAwesomeIcon icon={faFlag} className="mr-2 text-blue-500" />
            자바스크립트로 웹 서비스 만들기
          </h1>
          <div>
            <FontAwesomeIcon
              icon={faEllipsisV}
              className="cursor-pointer text-gray-500"
              onClick={toggleMenu}
            />
            {isMenuOpen && (
              <div className="absolute right-12 mt-2 rounded bg-white shadow-md">
                <button className="block px-4 py-2 text-sm text-gray-700">
                  목표 색상 변경
                </button>
                <button className="block px-4 py-2 text-sm text-gray-700">
                  수정하기
                </button>
                <button className="block px-4 py-2 text-sm text-gray-700">
                  삭제하기
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-6">
          <h3>Progress</h3>
          <div className="mt-2 h-2.5 w-full rounded-full bg-gray-200">
            <div
              className="h-2.5 rounded-full bg-blue-300"
              style={{
                width: `${(doneItems.length / (todoItems.length + doneItems.length)) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* 노트 모아보기 */}
      <div className="mb-6 rounded-2xl bg-blue-100 p-3 shadow">
        <h2 className="mb-4 flex items-center justify-between text-lg font-bold">
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faStickyNote}
              className="mr-2 text-blue-400"
            />
            노트 모아보기
          </div>
          <FontAwesomeIcon icon={faAnglesRight} className="text-blue-400" />
        </h2>
      </div>

      {/* To do / Done 리스트 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* To do 리스트 */}
        <div className="rounded-2xl bg-white p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="mb-4 text-lg font-bold">To do</h3>
            <div className="flex cursor-pointer items-center">
              <FontAwesomeIcon icon={faPlus} className="mr-1 text-blue-400" />
              <span className="text-blue-400">할 일 추가</span>
            </div>
          </div>
          {renderList(todoItems, false, moveToDone, 'todo')}
        </div>

        {/* Done 리스트 */}
        <div className="rounded-2xl bg-gray-200 p-6 shadow">
          <h3 className="mb-4 text-lg font-bold">Done</h3>
          {renderList(doneItems, true, moveToTodo, 'done')}
        </div>
      </div>
    </div>
  );
}
