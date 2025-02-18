import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { TodoType } from '@/types/todos';
import cn from '@/utils/cn';

type Props = {
  todoList: TodoType[];
  type: '미완료' | '완료';
  onToggleTodo: (id: number) => void;
  isCompleted: boolean;
  onDeleteTodo: (id: number) => void;
};

/**
 * 할 일에 대한 컴포넌트
 * @param todoList 할 일 리스트
 * @param type 완료/미완료
 * @param onToggleTodo 할 일 완료 여부 핸들링
 * @param isCompleted 완료 여부

 */
export default function TodoListItem({
  todoList,
  type,
  onToggleTodo,
  isCompleted = false,
  onDeleteTodo,
}: Props) {
  const [menuOpen, setMenuOpen] = useState<number | null>(null);

  /**
   * 메뉴 클릭 핸들러
   * @param id 클릭한 할 일의 id
   */
  const handelToggleMenu = (id: number) => {
    setMenuOpen((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuOpen !== null) {
        const dropdown = document.getElementById(`menu-${menuOpen}`);
        if (dropdown && !dropdown.contains(event.target as Node)) {
          setMenuOpen(null);
        }
      }
    };

    if (menuOpen !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div>
      <h3 className="text-md mb-2 font-semibold text-gray-600">
        {type} ({todoList.length})
      </h3>
      <ul className="space-y-3">
        {todoList.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center space-x-3 border-b border-gray-200 pb-3 pr-2 last:border-0"
          >
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => onToggleTodo(todo.id)}
            />
            <div
              onClick={() => onToggleTodo(todo.id)}
              className="flex-grow cursor-pointer overflow-hidden"
            >
              {todo.goal && (
                <p className="truncate text-sm text-gray-400">
                  {todo.goal.title}
                </p>
              )}
              <p
                className={cn(
                  'truncate',
                  isCompleted && 'text-gray-400 line-through',
                )}
              >
                {todo.title}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button type="button" className="text-gray-500">
                <FontAwesomeIcon icon={faStickyNote} />
              </button>
              <div className="relative">
                <button
                  type="button"
                  className="text-gray-500"
                  onClick={() => handelToggleMenu(todo.id)}
                >
                  <FontAwesomeIcon icon={faEllipsisV} />
                </button>
                {menuOpen === todo.id && (
                  <div
                    className="absolute right-0 top-8 z-10 w-24 rounded-lg bg-white shadow-md"
                    id={`menu-${todo.id}`}
                  >
                    <button
                      type="button"
                      className="w-full px-3 py-2 text-sm hover:bg-gray-100"
                    >
                      수정하기
                    </button>
                    <button
                      type="button"
                      className="w-full px-3 py-2 text-sm hover:bg-gray-100"
                      onClick={() => onDeleteTodo(todo.id)}
                    >
                      삭제하기
                    </button>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
