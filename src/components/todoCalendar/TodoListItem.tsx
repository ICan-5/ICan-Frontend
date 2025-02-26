import { Todo } from '@/types/todos';
import CheckTodo from '../common/todo/CheckTodo';

interface Props {
  todoList: Todo[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
}

/**
 * 할 일에 대한 컴포넌트
 * @param todoList 할 일 리스트
 * @param onToggleTodo 할 일 완료 여부 핸들링
 * @param isCompleted 완료 여부

 */
export default function TodoListItem({
  todoList,
  onToggleTodo,
  onDeleteTodo,
}: Props) {
  return (
    <ul>
      {todoList.map((todo) => (
        <li key={todo.id} className="last:border-0">
          <CheckTodo
            id={todo.id}
            title={todo.title}
            goal={todo.goal}
            done={todo.done}
            noteId={null}
            onCheck={() => onToggleTodo(todo.id)}
            onDelete={() => onDeleteTodo(todo.id)}
          />
        </li>
      ))}
    </ul>
  );
}
