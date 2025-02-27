'use client';

import React, { useEffect, useRef, useState } from 'react';
import Calendar from './Calendar';

import TodoList from './TodoList';
import { Basket } from '@/types/todos';
import TodoModal from './TodoModal';
import Loading from '../common/Loading';
import { useDailyTodos, useMonthlyTodos } from '@/hooks/useTodos';

// import Loading from '../common/Loading';
// import TodoBasket from './TodoBasket';

const initialBasketList = [
  { id: 101, title: '코딩강의 듣기', goal: null },
  { id: 102, title: '할 일이 길어지면 어쩌구 저쩌구', goal: null },
  { id: 103, title: '할 일 52', goal: null },
  { id: 104, title: '할 일 62', goal: null },
  { id: 105, title: '할 일 72', goal: null },
  { id: 106, title: '할 일 82', goal: null },
  { id: 107, title: '할 일 92', goal: null },
  { id: 108, title: '할 일 102', goal: null },
  { id: 109, title: '할 일 112', goal: null },
  { id: 110, title: '할 일 122', goal: null },
  { id: 111, title: '할 일 132', goal: null },
  { id: 112, title: '할 일 142', goal: null },
  { id: 113, title: '할 일 152', goal: null },
  { id: 114, title: '할 일 162', goal: null },
  { id: 115, title: '할 일 172', goal: null },
  {
    id: 116,
    title: '할 일 182',
    goal: {
      goalId: 1,
      title: '강의 듣기',
      color: 'goal01',
      createdAt: '2025-02-26T02:49:55.691312Z',
    },
  },
];

export default function TodoCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth() + 1,
  );
  const [basketList, setBasketList] = useState<Basket[]>(initialBasketList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calendarHeight, setCalendarHeight] = useState<number>(0);
  const [isCalendarLoaded, setIsCalendarLoaded] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  // 한 달 단위 할 일
  const {
    data: monthlyTodos,
    isLoading,
    error,
  } = useMonthlyTodos(currentYear, currentMonth);

  // 하루 단위 할 일
  const { data: dailyTodos } = useDailyTodos(
    selectedDate.toLocaleDateString('sv-SE'),
  );

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  /**
   * 캘린더 높이 가져와서 TodoList에 적용
   */
  const updateCalendarHeight = () => {
    if (calendarRef.current) {
      setCalendarHeight(calendarRef.current.clientHeight);
    }
  };

  /**
   * 할 일의 체크박스 상태 변경
   */
  const handleToggleTodo = (id: number) => {
    console.log('toggle', id);
    // setTodos((prev) =>
    //   prev.map((todo) =>
    //     todo.id === id ? { ...todo, done: !todo.done } : todo,
    //   ),
    // );
  };

  /**
   * 할 일 삭제
   */
  const handleDeleteTodo = (id: number) => {
    console.log('delete', id);
    // setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  /**
   * 장바구니에서 할 일 삭제
   * @param id 삭제할 할 일의 id
   */
  // const handleDeleteBasketTodo = (id: number) => {
  //   setBasketList((prev) => prev.filter((todo) => todo.id !== id));
  // };

  /**
   * 모든 장바구니 삭제
   */
  // const handleDeleteAllBasket = () => {
  //   setBasketList([]);
  // };

  /**
   * 드랍 시 todo에 추가 & 장바구니에서 제거
   */
  const handleDropTodo = (date: string, todoId: number) => {
    const draggedTodo = basketList.find((todo) => todo.id === todoId);
    if (!draggedTodo) return;
    // const newTodo: Todo = {
    //   id: todoId,
    //   title: draggedTodo.title,
    //   date,
    //   goal: draggedTodo.goal || null,
    //   done: false,
    // };
    // setTodos((prev) => [...prev, newTodo]);
    setBasketList((prev) => prev.filter((todo) => todo.id !== todoId));
  };

  useEffect(() => {
    if (calendarRef.current) {
      const observer = new MutationObserver(() => {
        updateCalendarHeight();
        setIsCalendarLoaded(true);
      });
      observer.observe(calendarRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
      });
      return () => observer.disconnect();
    }

    return undefined;
  }, []);

  return error ? (
    <div>
      <p className="text-red-500">데이터를 불러오는 중 오류 발생</p>
    </div>
  ) : (
    <div className="flex flex-col justify-center gap-4 md:flex-row">
      <div className="flex-1">
        {isLoading ? (
          <Loading />
        ) : (
          <Calendar
            todos={monthlyTodos}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            onDropTodo={handleDropTodo}
            calendarDivRef={calendarRef}
            isCalendarLoaded={isCalendarLoaded}
            onMonthChange={(year, month) => {
              setCurrentYear(year);
              setCurrentMonth(month);
            }}
          />
        )}
        {!isCalendarLoaded && <Loading />}
      </div>
      {isCalendarLoaded && (
        <div
          className="size-full md:w-[280px] xl:w-[350px]"
          style={{ height: calendarHeight }}
        >
          <TodoList
            selectedDate={selectedDate}
            onToggleTodo={handleToggleTodo}
            todos={dailyTodos}
            onDeleteTodo={handleDeleteTodo}
            onOpenModal={handleOpenModal}
          />
        </div>
      )}
      {/* {isCalendarReady && (
          <TodoBasket
            basketList={basketList}
            onDeleteBasketTodo={handleDeleteBasketTodo}
            onDeleteAllBasket={handleDeleteAllBasket}
          />
        )}

        )} */}
      {isModalOpen && (
        <TodoModal
          selectedDate={selectedDate}
          onCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
}
