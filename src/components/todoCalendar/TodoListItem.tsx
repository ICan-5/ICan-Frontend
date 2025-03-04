import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Todo } from '@/types/todos';
import CheckTodo from '../common/todo/CheckTodo';
import { useDeleteTodo, useUpdateTodo } from '@/hooks/useTodos';
import TodoModal from './TodoModal';
import ConfirmModal from '../common/ConfirmModal';

interface Props {
  todoList: Todo[];
}

/**
 * 할 일에 대한 컴포넌트
 * @param todoList 할 일 리스트
 * @param onToggleTodo 할 일 완료 여부 핸들링
 * @param isCompleted 완료 여부

 */
export default function TodoListItem({ todoList }: Props) {
  const router = useRouter();
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  const handleToggleTodo = (todo: Todo) => {
    updateTodo({
      todoId: todo.todoId,
      updatedFields: { done: !todo.done, goal: todo.goal },
    });
  };
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedDeleteTodo, setSelectedDeleteTodo] = useState<Todo | null>(
    null,
  );

  const handleEditTodo = (todo: Todo) => {
    setSelectedTodo(todo); // 수정할 할 일을 선택
  };

  const handleCloseModal = () => {
    setSelectedTodo(null); // 모달 닫을 때 선택된 할 일 초기화
  };

  const handleDeleteTodo = (todo: Todo) => {
    setSelectedDeleteTodo(todo); // 삭제할 할 일 선택
  };

  const handleConfirmDelete = () => {
    if (selectedDeleteTodo) {
      deleteTodo(selectedDeleteTodo.todoId);
      setSelectedDeleteTodo(null);
    }
  };

  const handleClickNote = (todo: Todo) => {
    if (todo.noteId) {
      router.push(`/note/${todo.noteId}`);
    } else {
      router.push(`/${todo.todoId}/note/create`);
    }
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
              noteId={todo.noteId}
              onCheck={() => handleToggleTodo(todo)}
              onClickNote={() => handleClickNote(todo)}
              onDelete={() => handleDeleteTodo(todo)}
              onEdit={() => handleEditTodo(todo)}
            />
          </li>
        ))}
      </ul>
      {selectedTodo && (
        <TodoModal
          selectedDate={new Date(selectedTodo.date)}
          onCloseModal={handleCloseModal}
          todoToEdit={selectedTodo}
        />
      )}

      {selectedDeleteTodo && (
        <ConfirmModal
          title="할일을 삭제 하시겠어요?"
          description="작성된 내용이 모두 사라지고 복구할 수 없습니다."
          confirmText="지우기"
          onCancel={() => setSelectedDeleteTodo(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
