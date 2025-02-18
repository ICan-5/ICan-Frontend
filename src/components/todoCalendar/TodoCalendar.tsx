'use client';

import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import Calendar from './Calendar';
import CalendarHeader from './CalendarHeader';
import TodoList from './TodoList';
import { BasketType, TodoType } from '@/types/todos';
import Loading from '../common/Loading';
import TodoBasket from './TodoBasket';

const initialTodos = [
  {
    id: 1,
    title: '할일 1',
    date: '2025-02-03',
    goal: {
      id: 1,
      title: '강의 듣기',
      color: 'bg-red-500',
    },
    done: true,
  },
  {
    id: 2,
    title: '할일 2',
    date: '2025-02-10',
    goal: {
      id: 1,
      title: '강의 듣기',
      color: 'bg-red-500',
    },
    done: true,
  },
  {
    id: 3,
    title: '할일 3',
    date: '2025-02-07',
    goal: {
      id: 2,
      title: '목표 2',
      color: 'bg-indigo-500',
    },
    done: true,
  },
  {
    id: 4,
    title: '할일 4',
    date: '2025-02-20',
    goal: {
      id: 3,
      title: '목표 3',
      color: 'bg-yellow-500',
    },
    done: true,
  },
  {
    id: 5,
    title: '할일 5',
    date: '2025-02-17',
    goal: {
      id: 4,
      title: '목표 4',
      color: 'bg-green-500',
    },
    done: true,
  },
  {
    id: 6,
    title: '할일 6',
    date: '2025-02-25',
    goal: {
      id: 1,
      title: '강의 듣기',
      color: 'bg-red-500',
    },
    done: true,
  },
  {
    id: 7,
    title:
      '할일이 길어지면 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구',
    date: '2025-02-10',
    goal: {
      id: 3,
      title: '목표 3',
      color: 'bg-yellow-500',
    },
    done: false,
  },
  {
    id: 8,
    title: '할일이 여러개면 어쩌구 저쩌구',
    date: '2025-02-10',
    goal: {
      id: 3,
      title: '목표 3',
      color: 'bg-yellow-500',
    },
    done: false,
  },
  {
    id: 9,
    title: '할일이 여러개면 어쩌구 저쩌구',
    date: '2025-02-10',
    goal: {
      id: 3,
      title: '목표 3',
      color: 'bg-yellow-500',
    },
    done: false,
  },
  {
    id: 10,
    title: '할일이 여러개면 어쩌구 저쩌구',
    date: '2025-02-10',
    goal: {
      id: 3,
      title: '목표 3',
      color: 'bg-yellow-500',
    },
    done: false,
  },
  {
    id: 11,
    title: '할일이 여러개면 어쩌구 저쩌구',
    date: '2025-02-10',
    goal: {
      id: 3,
      title: '목표 3',
      color: 'bg-yellow-500',
    },
    done: false,
  },
  {
    id: 12,
    title: '할일이 여러개면 어쩌구 저쩌구',
    date: '2025-02-10',
    goal: {
      id: 3,
      title: '목표 3',
      color: 'bg-yellow-500',
    },
    done: false,
  },
  {
    id: 13,
    title: '할일이 여러개면 어쩌구 저쩌구',
    date: '2025-02-10',
    goal: {
      id: 3,
      title: '목표 3',
      color: 'bg-yellow-500',
    },
    done: false,
  },
  {
    id: 14,
    title: '할일이 여러개면 어쩌구 저쩌구',
    date: '2025-02-10',
    goal: {
      id: 3,
      title: '목표 3',
      color: 'bg-yellow-500',
    },
    done: false,
  },
  {
    id: 15,
    title: '할일이 여러개면 어쩌구 저쩌구',
    date: '2025-02-10',
    goal: {
      id: 3,
      title: '목표 3',
      color: 'bg-yellow-500',
    },
    done: false,
  },
  {
    id: 16,
    title: '할일이 여러개면 어쩌구 저쩌구',
    date: '2025-02-10',
    goal: {
      id: 3,
      title: '목표 3',
      color: 'bg-yellow-500',
    },
    done: false,
  },
  {
    id: 17,
    title: '할일이 여러개면 어쩌구 저쩌구',
    date: '2025-02-10',
    goal: {
      id: 3,
      title: '목표 3',
      color: 'bg-yellow-500',
    },
    done: false,
  },
  {
    id: 18,
    title: '할일이 여러개면 어쩌구 저쩌구',
    date: '2025-02-10',
    goal: {
      id: 3,
      title: '목표 3',
      color: 'bg-yellow-500',
    },
    done: false,
  },
  {
    id: 19,
    title: '할일이 여러개면 어쩌구 저쩌구',
    date: '2025-02-10',
    goal: {
      id: 3,
      title: '목표 3',
      color: 'bg-yellow-500',
    },
    done: false,
  },
];

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
      id: 1,
      title: '강의 듣기',
      color: 'bg-red-500',
    },
  },
];

export default function TodoCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [todos, setTodos] = useState<TodoType[]>(initialTodos);
  const [basketList, setBasketList] = useState<BasketType[]>(initialBasketList);
  const [isCalendarReady, setIsCalendarReady] = useState<boolean>(false);
  const [calendarHeight, setCalendarHeight] = useState<number>(0);
  const calendarRef = useRef<FullCalendar>(null);

  /**
   * 캘린더 높이 가져와서 TodoList에 적용
   */
  const updateCalendarHeight = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      const calendarEl = (calendarApi as unknown as { el: HTMLElement })?.el;
      if (calendarEl) {
        setCalendarHeight(calendarEl.clientHeight);
        setIsCalendarReady(true);
      }
    }
  };

  /**
   * 할 일의 체크박스 상태 변경
   */
  const handleToggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  /**
   * 할 일 삭제
   */
  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  /**
   * 장바구니에서 할 일 삭제
   * @param id 삭제할 할 일의 id
   */
  const handleDeleteBasketTodo = (id: number) => {
    setBasketList((prev) => prev.filter((todo) => todo.id !== id));
  };

  /**
   * 모든 장바구니 삭제
   */
  const handleDeleteAllBasket = () => {
    setBasketList([]);
  };

  /**
   * 드랍 시 todo에 추가 & 장바구니에서 제거
   */
  const handleDropTodo = (date: string, todoId: number) => {
    const draggedTodo = basketList.find((todo) => todo.id === todoId);
    if (!draggedTodo) return;

    const newTodo: TodoType = {
      id: todoId,
      title: draggedTodo.title,
      date,
      goal: draggedTodo.goal || null,
      done: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setBasketList((prev) => prev.filter((todo) => todo.id !== todoId));
  };

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      const calendarEl = (calendarApi as unknown as { el: HTMLElement })?.el;

      if (calendarEl) {
        updateCalendarHeight();
        const observer = new MutationObserver(() => {
          updateCalendarHeight();
        });

        observer.observe(calendarEl, {
          attributes: true,
          childList: true,
          subtree: true,
        });
        return () => observer.disconnect();
      }
    }

    return undefined;
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      {isCalendarReady && (
        <CalendarHeader
          calendarRef={calendarRef}
          onDateChange={setSelectedDate}
        />
      )}
      <div className="flex h-full w-full flex-col items-center md:flex-row">
        <div className="h-full w-full flex-grow transition-all duration-300 ease-in-out md:w-[70%]">
          <Calendar
            todos={todos}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            calendarRef={calendarRef}
            onDropTodo={handleDropTodo}
          />
        </div>
        {isCalendarReady ? (
          <div
            className="flex h-full w-full flex-grow flex-col justify-between border border-l-0 border-calBorder bg-white p-4 transition-all duration-200 ease-in-out md:w-[30%]"
            style={{ height: calendarHeight }}
          >
            <TodoList
              selectedDate={selectedDate}
              onToggleTodo={handleToggleTodo}
              todos={todos.filter(
                (todo) =>
                  new Date(todo.date).toDateString() ===
                  selectedDate.toDateString(),
              )}
              onDeleteTodo={handleDeleteTodo}
            />
          </div>
        ) : (
          <Loading />
        )}
      </div>
      {isCalendarReady && (
        <TodoBasket
          basketList={basketList}
          onDeleteBasketTodo={handleDeleteBasketTodo}
          onDeleteAllBasket={handleDeleteAllBasket}
        />
      )}
    </div>
  );
}
