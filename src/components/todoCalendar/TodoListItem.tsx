import { useState } from 'react';
import { Todo } from '@/types/todos';
import CheckTodo from '../common/todo/CheckTodo';
import { useUpdateTodo } from '@/hooks/useTodos';
import TodoModal from './TodoModal';

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

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleEditTodo = (todo: Todo) => {
    setSelectedTodo(todo); // 수정할 할 일을 선택
  };

  const handleCloseModal = () => {
    setSelectedTodo(null); // 모달 닫을 때 선택된 할 일 초기화
  };
  return (
    <div>
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
              onEdit={() => handleEditTodo(todo)}
            />
          </li>
        ))}
      </ul>
      {selectedTodo && (
        <TodoModal
          selectedDate={new Date(selectedTodo.date)}
          onCloseModal={handleCloseModal}
          todoToEdit={selectedTodo} // 수정할 할 일 전달
        />
      )}
    </div>
  );
}
