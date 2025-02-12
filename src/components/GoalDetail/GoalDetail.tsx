'use client';

import { useState, useRef, useEffect } from 'react';
import GoalHeader from '@/components/GoalDetail/GoalHeader';
import GoalProgress from '@/components/GoalDetail/GoalProgress';
import GoalList from '@/components/GoalDetail/GoalList';
import GoalBasket from './GoalBasket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStickyNote,
  faAnglesRight,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
//fontawesome 버그 제거
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

export default function GoalDetailPage() {
  const [todoItems, setTodoItems] = useState([
    { task: '운동하기', date: '2025-02-11' },
    { task: '책 읽기', date: '2025-02-12' },
    { task: '자바스크립트 1챕터', date: '2025-02-13' },
    { task: '오늘 할 일', date: '2025-02-12' },
  ]);

  const [doneItems, setDoneItems] = useState<{ task: string; date: string }[]>(
    [],
  );
  const [basketItems, setBasketItems] = useState(['스터디 준비', '집안일']);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 메뉴바 사용으로 인덱스 각각 나눔
  const [todoItemIndexToday, setTodoItemIndexToday] = useState<number | null>(
    null,
  );
  const [todoItemIndexFuture, setTodoItemIndexFuture] = useState<number | null>(
    null,
  );
  const [todoItemIndexPast, setTodoItemIndexPast] = useState<number | null>(
    null,
  );
  const [doneItemIndexToday, setDoneItemIndexToday] = useState<number | null>(
    null,
  );
  const [doneItemIndexFuture, setDoneItemIndexFuture] = useState<number | null>(
    null,
  );
  const [doneItemIndexPast, setDoneItemIndexPast] = useState<number | null>(
    null,
  );

  // 리스트 접기/펼치기 상태
  const [pastTodoCollapsed, setPastTodoCollapsed] = useState(false);
  const [futureTodoCollapsed, setFutureTodoCollapsed] = useState(false);
  const [pastDoneCollapsed, setPastDoneCollapsed] = useState(false);
  const [futureDoneCollapsed, setFutureDoneCollapsed] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const listMenuRefTodo = useRef<HTMLDivElement>(null);
  const listMenuRefDone = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (
        listMenuRefTodo.current &&
        !listMenuRefTodo.current.contains(event.target as Node)
      ) {
        setTodoItemIndexToday(null);
        setTodoItemIndexFuture(null);
        setTodoItemIndexPast(null);
      }
      if (
        listMenuRefDone.current &&
        !listMenuRefDone.current.contains(event.target as Node)
      ) {
        setDoneItemIndexToday(null);
        setDoneItemIndexFuture(null);
        setDoneItemIndexPast(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const moveToDone = (index: number) => {
    const item = todoItems[index];
    setTodoItems((prev) => prev.filter((_, i) => i !== index));
    setDoneItems((prev) => [...prev, item]);
  };

  const moveToTodo = (index: number) => {
    const item = doneItems[index];
    setDoneItems((prev) => prev.filter((_, i) => i !== index));
    setTodoItems((prev) => [...prev, item]);
  };

  const onCheckboxClick = (
    originalIndex: number,
    listType: 'todo' | 'done',
  ) => {
    if (listType === 'todo') {
      moveToDone(originalIndex);
    } else {
      moveToTodo(originalIndex);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // 각 리스트마다 토글 메뉴바
  const toggleListMenu = (
    index: number,
    listType: 'todo' | 'done',
    listCategory: 'today' | 'future' | 'past',
  ) => {
    if (listType === 'todo') {
      if (listCategory === 'today') {
        setTodoItemIndexToday((prevIndex) =>
          prevIndex === index ? null : index,
        );
      } else if (listCategory === 'future') {
        setTodoItemIndexFuture((prevIndex) =>
          prevIndex === index ? null : index,
        );
      } else {
        setTodoItemIndexPast((prevIndex) =>
          prevIndex === index ? null : index,
        );
      }
    } else {
      if (listCategory === 'today') {
        setDoneItemIndexToday((prevIndex) =>
          prevIndex === index ? null : index,
        );
      } else if (listCategory === 'future') {
        setDoneItemIndexFuture((prevIndex) =>
          prevIndex === index ? null : index,
        );
      } else {
        setDoneItemIndexPast((prevIndex) =>
          prevIndex === index ? null : index,
        );
      }
    }
  };

  // 리스트 접기/펼치기 토글 함수
  const toggleCollapse = (
    listCategory: 'pastTodo' | 'futureTodo' | 'pastDone' | 'futureDone',
  ) => {
    switch (listCategory) {
      case 'pastTodo':
        setPastTodoCollapsed((prev) => !prev);
        break;
      case 'futureTodo':
        setFutureTodoCollapsed((prev) => !prev);
        break;
      case 'pastDone':
        setPastDoneCollapsed((prev) => !prev);
        break;
      case 'futureDone':
        setFutureDoneCollapsed((prev) => !prev);
        break;
      default:
        break;
    }
  };

  const today = new Date();

  // 날짜 기준으로 할 일 나누기
  const filterItems = (items: { task: string; date: string }[]) => {
    const todayWithoutTime = new Date(today);
    todayWithoutTime.setHours(0, 0, 0, 0);

    return items.reduce(
      (acc, item, index) => {
        const itemDate = new Date(item.date);
        const itemDateWithoutTime = new Date(itemDate.setHours(0, 0, 0, 0));

        if (itemDateWithoutTime < todayWithoutTime) {
          acc.past.push({ ...item, originalIndex: index });
        } else if (
          itemDateWithoutTime.toDateString() === todayWithoutTime.toDateString()
        ) {
          acc.today.push({ ...item, originalIndex: index });
        } else {
          acc.future.push({ ...item, originalIndex: index });
        }
        return acc;
      },
      {
        past: [] as { task: string; date: string; originalIndex: number }[],
        today: [] as { task: string; date: string; originalIndex: number }[],
        future: [] as { task: string; date: string; originalIndex: number }[],
      },
    );
  };

  const {
    past: pastTodoItems,
    today: todayTodoItems,
    future: futureTodoItems,
  } = filterItems(todoItems);
  const {
    past: pastDoneItems,
    today: todayDoneItems,
    future: futureDoneItems,
  } = filterItems(doneItems);

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

      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <div className="basis-1/2 rounded-2xl bg-white p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="mb-4 text-lg font-bold">To do</h3>
            <div className="flex cursor-pointer items-center">
              <span className="text-blue-400">+ 할 일 추가</span>
            </div>
          </div>
          <h3 className="mt-6 text-lg font-bold">오늘 할 일</h3>
          <GoalList
            items={todayTodoItems}
            onCheckboxClick={(index) =>
              onCheckboxClick(todayTodoItems[index].originalIndex, 'todo')
            }
            listType="todo"
            toggleListMenu={(index) => toggleListMenu(index, 'todo', 'today')}
            listMenuRef={listMenuRefTodo}
            todoItemIndex={todoItemIndexToday ?? -1}
            doneItemIndex={doneItemIndexToday ?? -1}
          />

          {/* 예정된 할 일 */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">예정된 할 일</h3>
              <FontAwesomeIcon
                icon={futureTodoCollapsed ? faChevronDown : faChevronUp}
                className="cursor-pointer text-gray-500"
                onClick={() => toggleCollapse('futureTodo')}
              />
            </div>
            {!futureTodoCollapsed && (
              <GoalList
                items={futureTodoItems}
                onCheckboxClick={(index) =>
                  onCheckboxClick(futureTodoItems[index].originalIndex, 'todo')
                }
                listType="todo"
                toggleListMenu={(index) =>
                  toggleListMenu(index, 'todo', 'future')
                }
                listMenuRef={listMenuRefTodo}
                todoItemIndex={todoItemIndexFuture ?? -1}
                doneItemIndex={doneItemIndexFuture ?? -1}
              />
            )}
            {/* 지난 할 일 */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">지난 할 일</h3>
                <FontAwesomeIcon
                  icon={pastTodoCollapsed ? faChevronDown : faChevronUp}
                  className="cursor-pointer text-gray-500"
                  onClick={() => toggleCollapse('pastTodo')}
                />
              </div>
              {!pastTodoCollapsed && (
                <GoalList
                  items={pastTodoItems}
                  onCheckboxClick={(index) =>
                    onCheckboxClick(pastTodoItems[index].originalIndex, 'todo')
                  }
                  listType="todo"
                  toggleListMenu={(index) =>
                    toggleListMenu(index, 'todo', 'past')
                  }
                  listMenuRef={listMenuRefTodo}
                  todoItemIndex={todoItemIndexPast ?? -1}
                  doneItemIndex={doneItemIndexPast ?? -1}
                />
              )}
            </div>
          </div>
        </div>
        <div className="basis-1/2 space-y-6">
          <div className="rounded-2xl bg-gray-200 p-6 shadow">
            <h3 className="mb-4 text-lg font-bold">Done</h3>
            <GoalList
              items={todayDoneItems}
              onCheckboxClick={(index) =>
                onCheckboxClick(todayDoneItems[index].originalIndex, 'done')
              }
              listType="done"
              toggleListMenu={(index) => toggleListMenu(index, 'done', 'today')}
              listMenuRef={listMenuRefDone}
              todoItemIndex={todoItemIndexToday ?? -1}
              doneItemIndex={doneItemIndexToday ?? -1}
            />
            <GoalList
              items={futureDoneItems}
              onCheckboxClick={(index) =>
                onCheckboxClick(futureDoneItems[index].originalIndex, 'done')
              }
              listType="done"
              toggleListMenu={(index) =>
                toggleListMenu(index, 'done', 'future')
              }
              listMenuRef={listMenuRefDone}
              todoItemIndex={todoItemIndexFuture ?? -1}
              doneItemIndex={doneItemIndexFuture ?? -1}
            />
            <GoalList
              items={pastDoneItems}
              onCheckboxClick={(index) =>
                onCheckboxClick(pastDoneItems[index].originalIndex, 'done')
              }
              listType="done"
              toggleListMenu={(index) => toggleListMenu(index, 'done', 'past')}
              listMenuRef={listMenuRefDone}
              todoItemIndex={todoItemIndexPast ?? -1}
              doneItemIndex={doneItemIndexPast ?? -1}
            />
          </div>
          <div className="mt-6">
            <GoalBasket
              basketItems={basketItems}
              setBasketItems={setBasketItems}
              todoItems={todoItems}
              setTodoItems={setTodoItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
