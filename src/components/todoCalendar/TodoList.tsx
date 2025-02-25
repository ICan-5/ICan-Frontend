import { TodoType } from '@/types/todos';
import TodoListItem from './TodoListItem';

type Props = {
  selectedDate: Date;
  todos: TodoType[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  onOpenModal: () => void;
};

/**
 * 각 날짜의 할 일 목록을 보여주는 컴포넌트
 * @param selectedDate 선택한 날짜
 * @param todos 해당 날짜에 해당하는 할 일
 * @param onToggleTodo 할 일 토글 버튼(완료/미완료)
 */
export default function TodoList({
  selectedDate,
  todos,
  onToggleTodo,
  onDeleteTodo,
  onOpenModal,
}: Props) {
  const incompleteTodos = todos.filter((todo) => !todo.done);
  const compoleteTodos = todos.filter((todo) => todo.done);
  return (
    <div className="flex h-full flex-col">
      <h2 className="mb-3 flex justify-between text-lg font-bold">
        {selectedDate.toLocaleDateString('ko-KR', {
          month: 'long',
          day: 'numeric',
        })}
      </h2>
      <div className="mb-4 flex flex-1 flex-col gap-4 overflow-y-auto">
        <TodoListItem
          todoList={incompleteTodos}
          type="미완료"
          onToggleTodo={onToggleTodo}
          isCompleted={false}
          onDeleteTodo={onDeleteTodo}
        />
        <TodoListItem
          todoList={compoleteTodos}
          type="완료"
          onToggleTodo={onToggleTodo}
          isCompleted
          onDeleteTodo={onDeleteTodo}
        />
      </div>
      <button
        type="button"
        onClick={() => onOpenModal()}
        className="w-full rounded-lg border border-gray-300 p-3 text-sm font-medium text-gray-600 hover:bg-gray-100"
      >
        새 할일 생성
      </button>
    </div>
  );
}
