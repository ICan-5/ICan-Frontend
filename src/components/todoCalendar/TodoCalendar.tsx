'use client';

import { useRef, useState } from 'react';
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
  const calendarRef = useRef<FullCalendar>(null);

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

  return (
    <div className="flex h-[80%] flex-col items-center p-4">
      <CalendarHeader
        calendarRef={calendarRef}
        onDateChange={setSelectedDate}
      />
      <div className="flex h-full w-full flex-col items-center md:flex-row">
        <div className="h-full w-full flex-grow md:w-[70%]">
          <Calendar
            todos={todos}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            calendarRef={calendarRef}
          />
        </div>
        <div className="mb-auto h-full w-full flex-grow bg-white p-4 md:w-[30%]">
          <TodoList
            selectedDate={selectedDate}
            onToggleTodo={handleToggleTodo}
            todos={todos.filter(
              (todo) =>
                new Date(todo.date).toDateString() ===
                selectedDate.toDateString(),
            )}
          />
        </div>
      </div>
    </div>
  );
}
