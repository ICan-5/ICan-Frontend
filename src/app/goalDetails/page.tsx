'use client';

import { useRef, useEffect } from 'react';
import GoalHeader from '@/components/GoalDetail/GoalHeader';
import GoalProgress from '@/components/GoalDetail/GoalProgress';
import GoalList from '@/components/GoalDetail/GoalList';
import useGoalStore from '@/store/goal/GoalStore';
import useMenuStore from '@/store/goal/GoalMenuStore';
import useLoadingStore from '@/store/LoadingStore';
import useListMenuStore from '@/store/goal/ListMenuStore';
import Loading from '../loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

export default function GoalDetail() {
  const { todoItems, doneItems, moveToDone, moveToTodo } = useGoalStore(); //목표별 할일 상태 관리
  const { isMenuOpen, toggleMenu, closeMenu } = useMenuStore(); //목표 헤더 메뉴바 상태 관리
  const { isLoading, setLoading } = useLoadingStore(); //로딩 상태 관리
  const { todoItemIndex, doneItemIndex, toggleListMenu, closeListMenu } =
    useListMenuStore(); //각 리스트별 메뉴바 상태관리

  // 각 메뉴를 참조하는 useRef 훅
  const menuRef = useRef<HTMLDivElement>(null);
  const listMenuRefTodo = useRef<HTMLDivElement>(null);
  const listMenuRefDone = useRef<HTMLDivElement>(null);

  // 클릭한 영역이 메뉴 밖이라면 메뉴를 닫는 useEffect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
      if (
        listMenuRefTodo.current &&
        !listMenuRefTodo.current.contains(event.target as Node)
      ) {
        closeListMenu();
      }
      if (
        listMenuRefDone.current &&
        !listMenuRefDone.current.contains(event.target as Node)
      ) {
        closeListMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeMenu, closeListMenu]);

  //로딩
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [setLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 sm:px-8 lg:px-16 xl:px-24">
      <div className="mb-6 rounded-2xl bg-white p-6 shadow">
        <GoalHeader
          toggleMenu={toggleMenu}
          isMenuOpen={isMenuOpen}
          menuRef={menuRef}
        />
        <GoalProgress doneItems={doneItems} todoItems={todoItems} />
      </div>

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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="mb-4 text-lg font-bold">To do</h3>
            <div className="flex cursor-pointer items-center">
              <span className="text-blue-400">+ 할 일 추가</span>
            </div>
          </div>
          <GoalList
            items={todoItems}
            isDone={false}
            onCheckboxClick={moveToDone}
            listType="todo"
            toggleListMenu={toggleListMenu}
            listMenuRef={listMenuRefTodo}
            todoItemIndex={todoItemIndex ?? -1} // 선택된 할 일 인덱스
            doneItemIndex={doneItemIndex ?? -1} // 선택된 완료된 할 일 인덱스
          />
        </div>

        <div className="rounded-2xl bg-gray-200 p-6 shadow">
          <h3 className="mb-4 text-lg font-bold">Done</h3>
          <GoalList
            items={doneItems}
            isDone={true}
            onCheckboxClick={moveToTodo}
            listType="done"
            toggleListMenu={toggleListMenu}
            listMenuRef={listMenuRefDone}
            todoItemIndex={todoItemIndex ?? -1} // 선택된 할 일 인덱스
            doneItemIndex={doneItemIndex ?? -1} // 선택된 완료된 할 일 인덱스
          />
        </div>
      </div>
    </div>
  );
}
