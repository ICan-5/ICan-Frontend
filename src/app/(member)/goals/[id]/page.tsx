'use client';

import GoalDetail from '@/components/goalDetail/GoalDetail';
import GoalHeader from '@/components/goalDetail/GoalHeader';
import { faAnglesRight, faStickyNote } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

type Props = {
  id: number;
  task: string;
  date: string;
  done: boolean;
};

export default function Page() {
  const [todos, setTodos] = useState<Props[]>([
    { id: 1, task: '운동하기', date: '2025-02-11', done: false },
    { id: 2, task: '책 읽기', date: '2025-02-14', done: false },
    { id: 3, task: '자바스크립트 1챕터', date: '2025-02-14', done: false },
    { id: 4, task: '친구들 만나기', date: '2025-02-20', done: false },
  ]);

  //id 추가
  const [baskets, setBaskets] = useState(['스터디 준비하기', '집안일 하기']);

  const todoItems = todos.filter((item) => !item.done);
  const doneItems = todos.filter((item) => item.done);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 sm:px-8 lg:px-16 xl:px-24">
      <div className="mb-6 rounded-2xl bg-white p-6 shadow">
        <GoalHeader doneItems={doneItems} todoItems={todoItems} />
      </div>
      <div className="mb-6 rounded-2xl bg-blue-100 p-3 shadow">
        <h2 className="mb-4 flex items-center text-lg font-bold">
          <FontAwesomeIcon icon={faStickyNote} className="mr-2 text-blue-400" />
          노트 모아보기
          <FontAwesomeIcon
            icon={faAnglesRight}
            className="ml-auto text-blue-400"
          />
        </h2>
      </div>
      <GoalDetail
        todos={todos}
        setTodos={setTodos}
        baskets={baskets}
        setBaskets={setBaskets}
      />
    </div>
  );
}
