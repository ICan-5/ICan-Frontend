'use client';

import { Draggable } from '@fullcalendar/interaction';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import IconButton from '../common/button/IconButton';
import Button from '../common/button/Button';
import Icon from '../common/icon/Icon';
import cn from '@/utils/cn';
import { useNavbar } from '../common/NavbarContext';
import {
  useAddTodoBasket,
  useDeleteAllTodoBasket,
  useDeleteTodoBasket,
  useTodoBasketLists,
} from '@/hooks/useTodoBasket';
import ConfirmModal from '../common/ConfirmModal';
import { useClickOutside } from '@/hooks/useClickOutside';

export default function TodoBasket() {
  const { isFolded } = useNavbar();
  const { data: basketList = [], isLoading, error } = useTodoBasketLists();
  const { mutate: addTodoBasket } = useAddTodoBasket();
  const { mutate: deleteTodoBasket } = useDeleteTodoBasket();
  const { mutate: deleteAllTodoBasket } = useDeleteAllTodoBasket();

  const basketRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [tooltipRef, showTooltip, setShowTooltip] =
    useClickOutside<HTMLDivElement>(() => {
      setShowTooltip(false);
    });

  useEffect(() => {
    setIsClient(true);
  }, []);
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
          title: eventEl.getAttribute('data-title'),
          goalId: eventEl.getAttribute('data-goalid'),
        }),
      });

      return () => draggable.destroy();
    }
    return undefined;
  }, [isClient]);

  const handleAddTodo = () => {
    const title = inputRef.current?.value.trim();
    if (!title) return;

    addTodoBasket(
      { title },
      {
        onSuccess: () => setIsAdding(false),
      },
    );
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Escape') setIsAdding(false);
    else if (event.key === 'Enter') {
      if (event.nativeEvent.isComposing) return;
      handleAddTodo();
    }
  };

  const handleDeleteAll = () => {
    setShowConfirm(true);
  };

  const confirmDeleteAll = () => {
    deleteAllTodoBasket();
    setShowConfirm(false);
  };

  return isClient
    ? createPortal(
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
              <div className="flex items-center gap-1">
                <h1 className="text-18SB text-gsBk">할일 장바구니</h1>
                <IconButton
                  icon={faCircleQuestion}
                  className="relative size-5 text-gs500"
                  onClick={() => setShowTooltip(true)}
                />
                {showTooltip && (
                  <div
                    ref={tooltipRef}
                    className="absolute left-0 top-10 w-52 translate-x-[60%] rounded-xl rounded-tl-none bg-gs00 p-3 text-14R text-gsBk shadow-lg md:w-64"
                  >
                    빠르게 할일을 추가해 모아놓으세요. 이후 필요한 날짜에 지정할
                    수 있습니다.
                  </div>
                )}
              </div>
              {basketList.length > 0 && (
                <button
                  type="button"
                  className="text-14M text-gs600"
                  onClick={() => handleDeleteAll()}
                >
                  모두 지우기
                </button>
              )}
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
                      data-title={todo.title}
                      data-goalid={todo.goalId}
                    >
                      <span className="truncate text-16R text-gsBk">
                        {todo.title}
                      </span>
                      <IconButton
                        icon={faXmark}
                        className="text-gs400"
                        onClick={() => deleteTodoBasket(todo.id)}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          {showConfirm && (
            <ConfirmModal
              title="정말 모두 지우시겠어요?"
              description="작성된 내용이 모두 사라지고 복구할 수 없습니다."
              confirmText="지우기"
              onCancel={() => setShowConfirm(false)}
              onConfirm={confirmDeleteAll}
            />
          )}
        </div>,
        document.body,
      )
    : null;
}
