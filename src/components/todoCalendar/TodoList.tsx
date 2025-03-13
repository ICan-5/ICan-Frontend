import { faAngleUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import TodoListItem from './TodoListItem';
import Button from '../common/button/Button';
import Icon from '../common/icon/Icon';
import cn from '@/utils/cn';
import { useDailyTodos } from '@/hooks/useTodos';
import SimpleTodoSkeleton from '../common/todo/SimpleTodoSkeleton';

interface Props {
  selectedDate: Date;
  onOpenModal: () => void;
}

/**
 * 각 날짜의 할 일 목록을 보여주는 컴포넌트
 * @param selectedDate 선택한 날짜
 * @param onToggleTodo 할 일 토글 버튼(완료/미완료)
 */
export default function TodoList({ selectedDate, onOpenModal }: Props) {
  // 하루 단위 할 일
  const { data: todos, isFetching } = useDailyTodos(
    selectedDate.toLocaleDateString('sv-SE'),
  );

  const [isCompletedOpen, setIsCompletedOpen] = useState(true);

  const incompleteTodos = todos ? todos.filter((todo) => !todo.done) : [];
  const completeTodos = todos ? todos.filter((todo) => todo.done) : [];

  return (
    <div className="flex size-full flex-col rounded-[20px] border-2 border-gs200 bg-gs00">
      {/* header */}
      <div className="flex items-center justify-between border-b-2 border-gs200 p-4">
        <h2 className="text-18SB text-gsBk">할일</h2>
        <p className="text-14M text-gs500">
          {`${selectedDate.getFullYear()}년 ${String(selectedDate.getMonth() + 1).padStart(2, '0')}월 ${String(selectedDate.getDate()).padStart(2, '0')}일`}
        </p>
      </div>
      {/* 할 일 목록 */}
      <div className="flex flex-1 flex-col gap-8 overflow-hidden p-4">
        {/* 미완료 */}
        <div
          className={cn(
            'flex min-h-0 flex-1 flex-col overflow-y-auto transition-all duration-500 ease-in-out',
            isCompletedOpen ? 'max-h-[50%]' : 'max-h-[85%]',
          )}
        >
          <h3 className="mb-2 text-14M text-gs500">
            미완료({incompleteTodos.length})
          </h3>
          <div className="h-full">
            {isFetching && <SimpleTodoSkeleton repeat={3} />}
            {!isFetching && incompleteTodos.length > 0 && (
              <TodoListItem todoList={incompleteTodos} />
            )}
            {!isFetching && incompleteTodos.length === 0 && (
              <div className="flex h-full items-center justify-center text-center text-14M text-gs500">
                등록된 할일이 없습니다.
              </div>
            )}
          </div>
        </div>

        {/* 완료 */}
        <div
          className={cn(
            'flex flex-col overflow-hidden transition-all duration-500 ease-in-out',
            isCompletedOpen ? 'h-[40%]' : 'h-5',
          )}
        >
          <div className="flex justify-between">
            <h3 className="mb-2 text-14M text-gs500">
              완료 ({completeTodos?.length || 0})
            </h3>
            <button
              type="button"
              className={cn('size-5 transition-transform duration-300', {
                'rotate-0': !isCompletedOpen,
                'rotate-180': isCompletedOpen,
              })}
              onClick={() => setIsCompletedOpen((prev) => !prev)}
            >
              <FontAwesomeIcon icon={faAngleUp} className="size-3" />
            </button>
          </div>
          {isCompletedOpen && (
            <div className="h-full overflow-y-auto">
              {isFetching && <SimpleTodoSkeleton repeat={3} />}
              {!isFetching && completeTodos.length > 0 && (
                <TodoListItem todoList={completeTodos} />
              )}
              {!isFetching && completeTodos.length === 0 && (
                <div className="flex h-full items-center justify-center text-center text-14M text-gs500">
                  등록된 할일이 없습니다.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="px-4 py-5">
        <Button variant="outline" size="full" onClick={() => onOpenModal()}>
          <Icon icon={faPlus} />새 할일 생성
        </Button>
      </div>
    </div>
  );
}
