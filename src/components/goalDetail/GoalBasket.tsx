import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faCartPlus,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Basket } from '@/types/todos';
import BasketTodoModal from './BasketTodoModal';
import { useGoalAddTodo } from '@/hooks/useGoalsTodo';
import { useDeleteBasketTodo } from '@/hooks/useGoalBasketTodo';
import ConfirmModal from '@/components/common/ConfirmModal';

interface Props {
  basketItems: Basket[];
  goalId: string;
}

export default function GoalBasket({ basketItems, goalId }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [selectedDeleteTodo, setSelectedDeleteTodo] = useState<number | null>(
    null,
  );
  const addTodoMutation = useGoalAddTodo();
  const deleteTodoMutation = useDeleteBasketTodo();

  const handleDateSelect = (date: Date | null, item: Basket) => {
    if (!date) return;

    addTodoMutation.mutate(
      {
        goal: { goalId: Number(goalId) },
        title: item.title,
        date,
      },
      {
        onSuccess: () => {
          deleteTodoMutation.mutate(item.id);
        },
      },
    );
  };

  const handleAddTodo = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedDeleteTodo !== null) {
      deleteTodoMutation.mutate(selectedDeleteTodo);
      setSelectedDeleteTodo(null);
    }
  };

  return (
    <div className="rounded-2xl bg-gs00 p-6 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-18R font-bold">
          <FontAwesomeIcon icon={faCartPlus} className="mr-2 text-slate400" />
          할일 장바구니
        </h3>
        <div className="cursor-pointer text-slate400" onClick={handleAddTodo}>
          + 할 일 추가
        </div>
      </div>
      <ul className="list-none space-y-2">
        {basketItems &&
          basketItems.map((item) => (
            <li
              key={item.id}
              className={`flex items-center justify-between p-1 text-gs700 transition-colors ${
                hoveredItem === item.id ? 'text-slate500' : 'text-gs700'
              }`}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span>{item.title}</span>
              <div className="flex items-center space-x-3">
                <div className="relative flex items-center">
                  <DatePicker
                    dateFormat="yyyy-MM-dd"
                    selected={null}
                    onChange={(date: Date | null) =>
                      handleDateSelect(date, item)
                    }
                    customInput={
                      <button
                        type="button"
                        className={`flex size-8 items-center justify-center rounded-full bg-white p-1 shadow-md transition-opacity duration-200 ${
                          hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={faCalendar}
                          className="text-slate400"
                        />
                      </button>
                    }
                  />
                </div>
                <button
                  type="button"
                  className={`flex size-8 items-center justify-center rounded-full bg-white p-1 shadow-md transition-opacity duration-200 ${
                    hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
                  }`}
                  onClick={() => setSelectedDeleteTodo(item.id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} className="text-warn500" />
                </button>
              </div>
            </li>
          ))}
      </ul>
      {(!basketItems || basketItems.length === 0) && (
        <p className="flex items-center justify-center py-6 text-gs500">
          장바구니에 할 일이 없어요
        </p>
      )}

      {isModalOpen && (
        <BasketTodoModal
          onClose={() => setIsModalOpen(false)}
          goalId={Number(goalId)}
        />
      )}

      {selectedDeleteTodo !== null && (
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
