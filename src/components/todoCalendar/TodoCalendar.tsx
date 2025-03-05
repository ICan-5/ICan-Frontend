'use client';

import React, { useEffect, useRef, useState } from 'react';
import Calendar from './Calendar';

import TodoList from './TodoList';
import TodoModal from './TodoModal';
import Loading from '../common/Loading';
import { useDailyTodos, useMonthlyTodos } from '@/hooks/useTodos';
import TodoBasket from './TodoBasket';

// import Loading from '../common/Loading';

export default function TodoCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth() + 1,
  );
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
   * 드랍 시 todo에 추가 & 장바구니에서 제거
   */
  const handleDropTodo = (date: string, todoId: number) => {
    console.log(date, todoId);
    // const draggedTodo = basketList.find((todo) => todo.id === todoId);
    // if (!draggedTodo) return;
    // const newTodo: Todo = {
    //   id: todoId,
    //   title: draggedTodo.title,
    //   date,
    //   goal: draggedTodo.goal || null,
    //   done: false,
    // };
    // setTodos((prev) => [...prev, newTodo]);
    // setBasketList((prev) => prev.filter((todo) => todo.id !== todoId));
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
    <div className="relative h-screen max-h-[calc(100vh-160px)] w-full overflow-auto md:max-h-[calc(100vh-270px)]">
      <div className="flex flex-col justify-center gap-4 px-1 md:flex-row">
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
            className="w-full md:w-[280px] xl:w-[350px]"
            style={{ height: calendarHeight }}
          >
            <TodoList
              selectedDate={selectedDate}
              todos={dailyTodos}
              onOpenModal={handleOpenModal}
            />
          </div>
        )}
      </div>
      {isCalendarLoaded && <TodoBasket />}

      {isModalOpen && (
        <TodoModal
          selectedDate={selectedDate}
          onCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
}
