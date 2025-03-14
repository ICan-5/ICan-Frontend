'use client';

import { config } from '@fortawesome/fontawesome-svg-core';
import { useState } from 'react';
import { faFaceSadCry, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GoalBasket from '@/components/goalDetail/GoalBasket';
import GoalDoneList from '@/components/goalDetail/GoalDoneList';
import GoalHeader from '@/components/goalDetail/GoalHeader';
import GoalProgress from '@/components/goalDetail/GoalProgress';
import GoalTodoList from '@/components/goalDetail/GoalTodoList';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useGoalTodo, useToggleTodo } from '@/hooks/useGoalsTodo';
import goalColors from '@/presets/goalColors';
import colors from '@/presets/colors';

config.autoAddCss = false;

const getGoalColor = (color: string) => {
  return (
    goalColors[color as keyof typeof goalColors] ?? {
      100: colors.slate100,
      DEFAULT: colors.slate500,
    }
  );
};

export default function Page({ params }: { params: { id: string } }) {
  const { todoItems, doneItems, basketTodos, color, isLoading } = useGoalTodo(
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
    <div className="flex min-h-dvh items-center justify-center">
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
    <div className="flex h-dvh flex-col items-center justify-center">
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
      <div className="mb-[10px] grid gap-[10px] md:grid-cols-[minmax(300px,750px),minmax(200px,440px)]">
        <div className="h-[162px] rounded-xl bg-gs00 shadow">
          <GoalHeader id={params.id} setGoalAvailable={setIsGoalAvailable} />
        </div>
        <div className="h-[162px] rounded-xl bg-gs00 shadow">
          <GoalProgress
            doneItems={doneItems.length}
            todoItems={todoItems.length}
            color={getGoalColor(color)}
          />
        </div>
      </div>

      {isLoading ? (
        renderLoading()
      ) : (
        <div className="grid gap-[10px] md:grid-cols-[minmax(300px,750px),minmax(200px,440px)]">
          <GoalTodoList
            list={todoItems}
            onToggle={handleToggleTodo}
            goalId={params.id}
            color={getGoalColor(color)}
          />
          <div className="flex flex-col gap-[10px]">
            <GoalDoneList
              list={doneItems.map((item) => ({
                ...item,
                noteId: item.noteId ?? null,
              }))}
              onToggle={handleToggleTodo}
              goalId={params.id}
            />
            <GoalBasket
              basketItems={basketTodos}
              goalId={params.id}
              color={getGoalColor(color)}
            />
          </div>
        </div>
      )}
    </>
  );

  // 메인
  let content;
  if (isLoading) {
    content = renderLoading();
  } else if (!isGoalAvailable) {
    content = renderNoGoal();
  } else {
    content = renderGoal();
  }

  return (
    <div className="relative left-1/2 w-full max-w-screen-xl -translate-x-1/2 bg-gs100">
      {content}
    </div>
  );
}
