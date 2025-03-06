'use client';

import { config } from '@fortawesome/fontawesome-svg-core';
import { useState } from 'react';
import {
  faAnglesRight,
  faFaceSadCry,
  faFilePen,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import GoalBasket from '@/components/goalDetail/GoalBasket';
import GoalDoneList from '@/components/goalDetail/GoalDoneList';
import GoalHeader from '@/components/goalDetail/GoalHeader';
import GoalTodoList from '@/components/goalDetail/GoalTodoList';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useGoalTodo, useToggleTodo } from '@/hooks/useGoalsTodo';

config.autoAddCss = false;

export default function Page({ params }: { params: { id: string } }) {
  const { todoItems, doneItems, basketTodos, isLoading } = useGoalTodo(
    Number(params.id),
  );
  const toggleTodoMutation = useToggleTodo(Number(params.id));
  const [isGoalAvailable, setIsGoalAvailable] = useState<boolean>(true);

  const handleToggleTodo = async (todoId: number) => {
    const todo =
      todoItems.find((t) => t.todoId === todoId) ||
      doneItems.find((t) => t.todoId === todoId);
    if (!todo) return;
    await toggleTodoMutation.mutateAsync({ todoId, todo });
  };

  // 로딩 화면 렌더링 함수
  const renderLoading = () => (
    <div className="flex h-full items-center justify-center">
      <FontAwesomeIcon
        icon={faSpinner}
        spin
        className="text-4xl text-slate500"
      />
      <span className="ml-2 text-lg text-slate400">로딩 중...</span>
    </div>
  );

  // 목표가 없을 때 화면 렌더링 함수
  const renderNoGoal = () => (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="mb-5 text-40L text-gs600">
        <FontAwesomeIcon icon={faFaceSadCry} />
      </div>
      <h3 className="text-18SB text-gs600">
        목표가 존재하지 않거나 삭제되었습니다!
      </h3>
      <p className="mt-2 text-16R text-gs600">목표를 추가 또는 선택해주세요.</p>
    </div>
  );

  // 목표가 있을 때 화면 렌더링 함수
  const renderGoal = () => (
    <>
      <div className="mb-6 h-[136px] rounded-2xl bg-gs00 p-6 shadow">
        <GoalHeader
          doneItems={doneItems.length}
          todoItems={todoItems.length}
          id={params.id}
          setGoalAvailable={setIsGoalAvailable}
        />
      </div>

      <Link href={`${params.id}/note`} className="block">
        <div className="mb-6 h-[60px] cursor-pointer rounded-2xl bg-slate100 px-6 py-4 shadow">
          <h2 className="flex items-center text-18SB">
            <FontAwesomeIcon icon={faFilePen} className="mr-2 text-slate500" />
            노트 모아보기
            <FontAwesomeIcon
              icon={faAnglesRight}
              className="ml-auto text-slate500"
            />
          </h2>
        </div>
      </Link>

      {isLoading ? (
        renderLoading()
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <GoalTodoList
            list={todoItems}
            onToggle={handleToggleTodo}
            goalId={params.id}
          />
          <div className="flex flex-col gap-8">
            <GoalDoneList
              list={doneItems.map((item) => ({
                ...item,
                noteId: item.noteId ?? null,
              }))}
              onToggle={handleToggleTodo}
              goalId={params.id}
            />
            <GoalBasket basketItems={basketTodos} goalId={params.id} />
          </div>
        </div>
      )}
    </>
  );

  // 메인 렌더링 로직
  let content;
  if (isLoading) {
    content = renderLoading();
  } else if (!isGoalAvailable) {
    content = renderNoGoal();
  } else {
    content = renderGoal();
  }

  return (
    <div className="relative left-1/2 size-full max-w-screen-xl -translate-x-1/2 bg-gs100">
      {content}
    </div>
  );
}
