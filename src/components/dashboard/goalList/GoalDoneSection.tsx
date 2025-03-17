import SimpleTodo from '@/components/common/todo/SimpleTodo';
import SimpleTodoSkeleton from '@/components/common/todo/SimpleTodoSkeleton';
import { Todo } from '@/types/todos';

interface Props {
  isFetching: boolean;
  doneItems: Todo[];
}

export default function GoalDoneSection({ isFetching, doneItems }: Props) {
  return (
    <section className="flex flex-col gap-3 md:flex-[2]">
      <p className="text-14SB">완료</p>
      <div className="w-full md:h-40 md:overflow-y-scroll 2xl:h-44">
        {isFetching && <SimpleTodoSkeleton />}
        {!isFetching &&
          doneItems?.map((todo) => (
            <SimpleTodo
              key={todo.todoId}
              title={todo.title}
              todoId={todo.todoId}
              noteId={todo.noteId}
              done
            />
          ))}
        {!isFetching && doneItems?.length === 0 && (
          <span className="relative block w-full text-center text-14M text-gs400 md:top-[70px] 2xl:top-[78px]">
            완료된 할일이 없습니다.
          </span>
        )}
      </div>
    </section>
  );
}
