import { TodoType } from '@/types/todos';
import cn from '@/utils/cn';

type Props = {
  todoList: TodoType[];
  type: '미완료' | '완료';
  onToggleTodo: (id: number) => void;
  isCompleted: boolean;
};
export default function TodoListItem({
  todoList,
  type,
  onToggleTodo,
  isCompleted = false,
}: Props) {
  return (
    <div>
      <h3 className="text-md mb-2 font-semibold text-gray-600">
        {type} ({todoList.length})
      </h3>
      <ul className="space-y-3">
        {todoList.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center space-x-3 border-b border-gray-200 pb-3 last:border-0"
          >
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => onToggleTodo(todo.id)}
              className="h-4 w-4 appearance-none rounded border border-gray-300 checked:border-transparent checked:bg-blue-500"
            />
            <div
              onClick={() => onToggleTodo(todo.id)}
              className="cursor-pointer"
            >
              <p className="text-sm text-gray-400">{todo.goal.title}</p>
              <p className={cn(isCompleted && 'text-gray-400 line-through')}>
                {todo.title}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
