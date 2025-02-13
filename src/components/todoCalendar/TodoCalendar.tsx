'use client';

import { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import Calendar from './Calendar';
import CalendarHeader from './CalendarHeader';
import TodoList from './TodoList';
import { TodoType } from '@/types/todos';

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
    title: '할일이 길어지면 어쩌구 저쩌구',
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
];

export default function TodoCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [todos, setTodos] = useState<TodoType[]>(initialTodos);
  const [calendarHeight, setCalendarHeight] = useState<number>(0);
  const calendarRef = useRef<FullCalendar>(null);

  /**
   * 캘린더 높이 가져와서 TodoList에 적용
   */
  const updateCalendarHeight = () => {
    const calendarEl = document.querySelector('.fc-view-harness');
    if (calendarEl) {
      setCalendarHeight(calendarEl.clientHeight);
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

  useEffect(() => {
    const calendarEl = document.querySelector('.fc-view-harness');
    if (calendarEl) {
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
    return undefined;
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      <CalendarHeader
        calendarRef={calendarRef}
        onDateChange={setSelectedDate}
      />
      <div className="flex h-full w-full flex-col items-center md:flex-row">
        <div className="h-full w-full flex-grow transition-all duration-300 ease-in-out md:w-[70%]">
          <Calendar
            todos={todos}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            calendarRef={calendarRef}
          />
        </div>
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
          />
          <button
            type="button"
            className="w-full rounded-lg border border-gray-300 p-3 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            새 할일 생성
          </button>
        </div>
      </div>
    </div>
  );
}
