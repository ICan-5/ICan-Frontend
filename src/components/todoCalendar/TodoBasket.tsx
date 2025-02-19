import { Draggable } from '@fullcalendar/interaction';
import { useEffect, useRef } from 'react';
import { Goal } from '@/types/todos';

type Props = {
  basketList: { id: number; title: string; goal: Goal | null }[];
  onDeleteBasketTodo: (id: number) => void;
  onDeleteAllBasket: () => void;
};

export default function TodoBasket({
  basketList,
  onDeleteBasketTodo,
  onDeleteAllBasket,
}: Props) {
  const basketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (basketRef.current) {
      const draggable = new Draggable(basketRef.current, {
        itemSelector: '.draggable-todo',
        eventData: (eventEl) => ({
          id: eventEl.getAttribute('data-id'),
        }),
      });

      return () => draggable.destroy();
    }
    return undefined;
  }, []);
  return (
    <div className="w-full bg-white p-3">
      <div className="mb-3 flex items-center gap-4">
        <span className="text-lg font-semibold">할 일 장바구니</span>
        <button
          type="button"
          className="rounded-lg border border-blue-500 px-3 py-1 text-blue-500 hover:bg-blue-100"
        >
          생성
        </button>
        <button
          type="button"
          className="rounded-lg border border-blue-500 px-3 py-1 text-blue-500 hover:bg-blue-100"
          onClick={() => onDeleteAllBasket()}
        >
          모두 삭제
        </button>
      </div>
      <div
        ref={basketRef}
        className="flex max-h-40 flex-wrap gap-3 overflow-y-auto"
      >
        {basketList.map((todo) => (
          <div
            key={todo.id}
            className="draggable-todo flex w-[150px] cursor-grab items-center justify-between gap-3 rounded-lg border p-3 shadow-sm active:cursor-grabbing"
            draggable
            data-id={todo.id}
          >
            <span className="truncate">{todo.title}</span>
            <button
              type="button"
              className="text-gray-500"
              onClick={() => onDeleteBasketTodo(todo.id)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
