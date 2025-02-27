import { Todo } from '@/types/todos';
import CheckTodo from '../common/todo/CheckTodo';
import { useUpdateTodo } from '@/hooks/useTodos';

interface Props {
  todoList: Todo[];
  onDeleteTodo: (id: number) => void;
}

/**
 * 할 일에 대한 컴포넌트
 * @param todoList 할 일 리스트
 * @param onToggleTodo 할 일 완료 여부 핸들링
 * @param isCompleted 완료 여부

 */
export default function TodoListItem({ todoList, onDeleteTodo }: Props) {
  const { mutate: updateTodo } = useUpdateTodo();

  const handleToggleTodo = (todo: Todo) => {
    updateTodo({ todoId: todo.todoId, updatedFields: { done: !todo.done } });
  };
  return (
    <ul>
      {todoList.map((todo) => (
        <li key={todo.todoId} className="last:border-0">
          <CheckTodo
            id={todo.todoId}
            title={todo.title}
            goal={todo.goal}
            done={todo.done}
            noteId={null}
            onCheck={() => handleToggleTodo(todo)}
            onDelete={() => onDeleteTodo(todo.todoId)}
          />
        </li>
      ))}
    </ul>
  );
}
