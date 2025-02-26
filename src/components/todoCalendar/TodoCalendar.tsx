'use client';

import React, { useEffect, useRef, useState } from 'react';
import Calendar from './Calendar';

import TodoList from './TodoList';
import { Basket, Todo } from '@/types/todos';
import TodoModal from './TodoModal';
import Loading from '../common/Loading';

// import Loading from '../common/Loading';
// import TodoBasket from './TodoBasket';

const initialTodos = [
  {
    id: 1,
    title: '할일 1',
    date: '2025-02-03',
    goal: null,
    done: true,
  },
  {
    id: 2,
    title: '할일 2',
    date: '2025-02-10',
    goal: {
      id: 1,
      title: '강의 듣기',
      color: 'goal01',
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
      color: 'goal02',
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
      color: 'goal02',
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
      color: 'goal02',
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
      color: 'goal01',
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
      color: 'goal02',
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
      color: 'goal02',
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
      color: 'goal02',
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
      color: 'goal02',
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
      color: 'goal02',
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
      color: 'goal02',
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
      color: 'goal02',
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
      color: 'goal02',
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
      color: 'goal02',
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
      color: 'goal02',
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
      color: 'goal02',
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
      color: 'goal02',
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
      color: 'goal02',
    },
    done: false,
  },
  {
    id: 20,
    title: '할일이 여러개면 어쩌구 저쩌구',
    date: '2025-02-03',
    goal: {
      id: 3,
      title: '목표 3',
      color: 'goal02',
    },
    done: false,
  },
  {
    id: 21,
    title: '할일이 여러개면 어쩌구 저쩌구',
    date: '2025-02-03',
    goal: {
      id: 3,
      title: '목표 3',
      color: 'goal02',
    },
    done: false,
  },
  {
    id: 22,
    title: '할일이 여러개면 어쩌구 저쩌구',
    date: '2025-02-03',
    goal: {
      id: 3,
      title: '목표 3',
      color: 'goal02',
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
      color: 'goal01',
    },
  },
];

export default function TodoCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [basketList, setBasketList] = useState<Basket[]>(initialBasketList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calendarHeight, setCalendarHeight] = useState<number>(0);
  const [isCalendarLoaded, setIsCalendarLoaded] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

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

    const newTodo: Todo = {
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

  return (
    <div className="flex flex-col justify-center gap-4 md:flex-row">
      <div className="flex-1">
        <Calendar
          todos={todos}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          onDropTodo={handleDropTodo}
          calendarDivRef={calendarRef}
          isCalendarLoaded={isCalendarLoaded}
        />
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
            todos={todos.filter(
              (todo) =>
                new Date(todo.date).toDateString() ===
                selectedDate.toDateString(),
            )}
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
