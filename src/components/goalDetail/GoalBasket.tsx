import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faTrashCan,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Basket } from '@/types/todos';
import BasketTodoModal from './BasketTodoModal';
import { useGoalAddTodo } from '@/hooks/useGoalsTodo';
import { useDeleteBasketTodo } from '@/hooks/useGoalBasketTodo';
import ConfirmModal from '@/components/common/ConfirmModal';
import IconButton from '../common/button/IconButton';
import CustomDateHeader from '../common/input/datePicker/CustomDateHeader';

interface Props {
  basketItems: Basket[];
  goalId: string;
  color: {
    100: string;
    DEFAULT: string;
  };
}

export default function GoalBasket({ basketItems, goalId, color }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [selectedDeleteTodo, setSelectedDeleteTodo] = useState<number | null>(
    null,
  );
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [openDatePickerItemId, setOpenDatePickerItemId] = useState<
    number | null
  >(null);

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

  const handleCalendarOpen = (itemId: number) => {
    setOpenDatePickerItemId(itemId);
  };

  const handleCalendarClose = () => {
    setOpenDatePickerItemId(null);
  };

  return (
    <div className="relative flex h-[285px] flex-col rounded-xl border-2 border-gs200 shadow">
      <div className="relative mb-4 flex items-center rounded-t-xl border-b-2 border-gs200 bg-gs50 p-4">
        <div className="relative flex items-center gap-2">
          <h3 className="text-18SB">할일 장바구니</h3>
          <div
            className="relative flex items-center"
            onMouseEnter={() => setIsTooltipOpen(true)}
            onMouseLeave={() => setIsTooltipOpen(false)}
          >
            <IconButton
              icon={faCircleQuestion}
              className="relative size-5 text-gs500"
            />
            <div
              className={`absolute top-full z-[9999] -ml-16 mt-2 min-w-[205px] rounded-md bg-gs00 p-2 text-14M text-gsBk shadow transition-opacity duration-200 ${
                isTooltipOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              빠르게 할일을 추가해 모아놓으세요. 이후 필요한 날짜에 지정할 수
              있습니다.
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-6 pb-16">
        <ul className="list-none space-y-2">
          {basketItems &&
            basketItems.map((item) => (
              <li
                key={item.id}
                className={`flex items-center justify-between border-b border-dashed border-gs300 pb-2 text-gsBk transition-colors ${
                  hoveredItem === item.id || openDatePickerItemId === item.id
                    ? 'text-slate500'
                    : 'text-gs700'
                }`}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span className="truncate break-words">{item.title}</span>

                <div className="flex items-center space-x-3">
                  <div className="relative flex items-center">
                    <DatePicker
                      dateFormat="yyyy-MM-dd"
                      selected={new Date()}
                      portalId="root-portal"
                      popperPlacement="top-start"
                      onChange={(date: Date | null) =>
                        handleDateSelect(date, item)
                      }
                      onCalendarOpen={() => handleCalendarOpen(item.id)}
                      onCalendarClose={handleCalendarClose}
                      calendarClassName="bg-gs00"
                      popperClassName="z-[9999]"
                      renderCustomHeader={({
                        date,
                        decreaseMonth,
                        increaseMonth,
                      }) => (
                        <CustomDateHeader
                          date={date}
                          decreaseMonth={decreaseMonth}
                          increaseMonth={increaseMonth}
                        />
                      )}
                      dayClassName={(d) => {
                        const today = new Date();
                        const isToday =
                          d.toDateString() === today.toDateString();

                        let className = 'text-gsBk ';

                        if (isToday)
                          className +=
                            'selected-day react-datepicker__day--today ';

                        return className.trim();
                      }}
                      customInput={
                        <button
                          type="button"
                          className={`flex size-7 items-center justify-center rounded-full bg-gs50 p-1 shadow-md transition-opacity duration-200 ${
                            hoveredItem === item.id ||
                            openDatePickerItemId === item.id
                              ? 'opacity-100'
                              : 'opacity-100 md:opacity-0'
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
                    className={`flex size-7 items-center justify-center rounded-full bg-gs50 p-1 shadow-md transition-opacity duration-200 ${
                      hoveredItem === item.id ||
                      openDatePickerItemId === item.id
                        ? 'opacity-100'
                        : 'opacity-100 md:opacity-0'
                    }`}
                    onClick={() => setSelectedDeleteTodo(item.id)}
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="text-warn500"
                    />
                  </button>
                </div>
              </li>
            ))}
        </ul>
        {(!basketItems || basketItems.length === 0) && (
          <p className="flex h-full items-center justify-center py-6 text-gs500">
            장바구니에 할일이 없습니다.
          </p>
        )}
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-gs100 p-5">
        <div
          className="flex cursor-pointer items-center justify-center rounded-xl border-2 p-1 text-14M"
          style={{ color: color.DEFAULT, borderColor: color.DEFAULT }}
          onClick={handleAddTodo}
        >
          + 장바구니에 새 할일 추가
        </div>
      </div>

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
