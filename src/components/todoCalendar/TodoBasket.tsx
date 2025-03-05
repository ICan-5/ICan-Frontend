import { Draggable } from '@fullcalendar/interaction';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../common/button/IconButton';
import Button from '../common/button/Button';
import Icon from '../common/icon/Icon';
import cn from '@/utils/cn';
import { useNavbar } from '../common/NavbarContext';
import { useTodoBasketLists } from '@/hooks/useTodoBasket';

export default function TodoBasket() {
  const { isFolded } = useNavbar();
  const { data: basketList = [], isLoading, error } = useTodoBasketLists();

  const basketRef = useRef<HTMLDivElement>(null);
  const [isAdding, setIsAdding] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

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

  const handleAddTodo = () => {
    const title = inputRef.current?.value.trim();
    if (!title) return;

    // setNowBasketList((prev) => [
    //   ...prev,
    //   { id: Date.now(), title, goal: null },
    // ]);
    setIsAdding(false);
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Escape') setIsAdding(false);
    else if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  // const handleDeleteTodo = (id: number) => {
  //   setNowBasketList((prev) => prev.filter((todo) => todo.id !== id));
  // };

  // const handleDeleteAllTodos = () => {
  //   setNowBasketList([]);
  // };

  return createPortal(
    <div
      className={cn(
        'fixed bottom-0 z-10 bg-white px-6 pb-2 pt-4 transition-all duration-300 ease-in-out',
        {
          'left-16 w-[calc(100vw-4rem)]': isFolded,
          'left-16 w-[calc(100vw-4rem)] md:left-64 md:w-[calc(100vw-16rem)] 2xl:left-80 2xl:w-[calc(100vw-20rem)]':
            !isFolded,
        },
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between px-4">
          <h1 className="text-18SB text-gsBk">할일 장바구니</h1>
          <button
            type="button"
            className="text-14M text-gs600"
            // onClick={() => handleDeleteAllTodos()}
          >
            모두 지우기
          </button>
        </div>

        <div
          ref={basketRef}
          className="mb-4 flex h-20 flex-wrap gap-3 overflow-y-auto pl-4 md:h-36"
        >
          {isLoading && (
            <p className="text-center text-sm text-gray-500">로딩 중...</p>
          )}
          {error && (
            <p className="text-center text-sm text-red-500">
              데이터를 불러오는데 실패했습니다.
            </p>
          )}
          {!isLoading && !error && (
            <>
              {isAdding ? (
                <div className="flex h-14 max-w-80 items-center justify-center gap-2 rounded-lg bg-slate50 p-3 focus-within:border focus-within:border-slate500 hover:bg-slate100">
                  <input
                    ref={inputRef}
                    type="text"
                    onKeyDown={handleKeyDown}
                    onBlur={() => setIsAdding(false)}
                    className="bg-transparent text-16R text-gsBk focus:outline-none"
                  />
                  <IconButton icon={faXmark} className="text-gs400" />
                </div>
              ) : (
                <Button
                  className="active:none acitve:border-inherit acitve:border-2 active:border-slage300 h-14 border-2 border-slate300 bg-gs20 p-3 text-14R text-slate700 transition-all hover:border-transparent hover:bg-slate100 focus:border focus:border-slate500 focus:bg-slate50 focus:text-gsBk active:bg-gs20 2xl:text-16R"
                  onClick={() => setIsAdding(true)}
                >
                  <Icon icon={faPlus} />
                  장바구니에 새 할일 추가
                </Button>
              )}
              {basketList.map((todo) => (
                <div
                  key={todo.id}
                  className="draggable-todo flex h-14 max-w-80 cursor-grab items-center justify-between gap-2 rounded-lg bg-slate50 p-3 active:cursor-grabbing active:bg-slate200"
                  draggable
                  data-id={todo.id}
                >
                  <span className="truncate text-16R text-gsBk">
                    {todo.title}
                  </span>
                  <IconButton
                    icon={faXmark}
                    className="text-gs400"
                    // onClick={() => handleDeleteTodo(todo.id)}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
