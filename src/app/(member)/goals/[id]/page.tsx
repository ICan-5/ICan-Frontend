'use client';

import { config } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GoalBasket from '@/components/goalDetail/GoalBasket';
import GoalDoneList from '@/components/goalDetail/GoalDoneList';
import GoalHeader from '@/components/goalDetail/GoalHeader';
import GoalProgress from '@/components/goalDetail/GoalProgress';
import GoalTodoList from '@/components/goalDetail/GoalTodoList';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useGoalTodo, useToggleTodo } from '@/hooks/useGoalsTodo';

config.autoAddCss = false;

export default function Page({ params }: { params: { id: string } }) {
  const { todoItems, doneItems, basketTodos, isLoading } = useGoalTodo(
    Number(params.id),
  );
  const toggleTodoMutation = useToggleTodo(Number(params.id));

  const handleToggleTodo = async (todoId: number) => {
    const todo =
      todoItems.find((t) => t.todoId === todoId) ||
      doneItems.find((t) => t.todoId === todoId);
    if (!todo) return;
    await toggleTodoMutation.mutateAsync({ todoId, todo });
  };

  return (
    <div className="relative left-1/2 size-full max-w-screen-xl -translate-x-1/2 bg-gs100">
      <div className="mb-[10px] grid grid-cols-1 gap-[10px] md:grid-cols-[minmax(300px,750px),minmax(200px,440px)]">
        {/* Goal Header */}
        <div className="min-h-[162px] overflow-hidden rounded-2xl">
          <GoalHeader id={params.id} />
        </div>

        {/* Goal Progress */}
        <div className="min-h-[162px] overflow-hidden rounded-2xl border-2 border-gs200 bg-transparent">
          <GoalProgress
            doneItems={doneItems.length}
            todoItems={todoItems.length}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            className="text-4xl text-slate500"
          />
          <span className="ml-2 text-lg text-slate400" />
        </div>
      ) : (
        <div className="grid gap-[10px] md:grid-cols-[minmax(300px,750px),minmax(200px,440px)]">
          <GoalTodoList
            list={todoItems}
            onToggle={handleToggleTodo}
            goalId={params.id}
          />

          <div className="flex flex-col gap-[10px]">
            <div className="h-[310px]">
              <GoalDoneList
                list={doneItems.map((item) => ({
                  ...item,
                  noteId: item.noteId ?? null,
                }))}
                onToggle={handleToggleTodo}
              />
            </div>

            <div className="h-[290px]">
              <GoalBasket basketItems={basketTodos} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
