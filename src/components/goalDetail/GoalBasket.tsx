import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarCheck,
  faCartPlus,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type TodoItemProps = {
  id: number;
  task: string;
  date: string;
  done: boolean;
};

type GoalBasketProps = {
  basketItems: string[];
  setBasketItems: (items: string[]) => void;
  setTotalItems: React.Dispatch<React.SetStateAction<TodoItemProps[]>>;
  totalItems: TodoItemProps[];
};

export default function GoalBasket({
  basketItems,
  setBasketItems,
  setTotalItems,
  totalItems,
}: GoalBasketProps) {
  const [selectedDates, setSelectedDates] = useState<{
    [key: string]: Date | null;
  }>({});

  const handleDateChange = (date: Date | null, item: string) => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      //장바구니에서 새로 추가된 할 일은 뒷번호로 부여
      const newId = Math.max(...totalItems.map((item) => item.id), 0) + 1;

      const newTodoItem: TodoItemProps = {
        id: newId,
        task: item,
        date: formattedDate,
        done: false,
      };

      setTotalItems((prevItems) => [...prevItems, newTodoItem]);

      setBasketItems(basketItems.filter((basketItem) => basketItem !== item));

      const newSelectedDates = { ...selectedDates };
      delete newSelectedDates[item];
      setSelectedDates(newSelectedDates);
    }
  };

  const handleDeleteBasketItem = (itemToDelete: string) => {
    setBasketItems(basketItems.filter((item) => item !== itemToDelete));
    const newSelectedDates = { ...selectedDates };
    delete newSelectedDates[itemToDelete];
    setSelectedDates(newSelectedDates);
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h3 className="mb-4 flex items-center text-lg font-bold">
        <FontAwesomeIcon icon={faCartPlus} className="mr-2 text-blue-400" />
        Todo Bag
      </h3>
      {basketItems.length > 0 ? (
        <ul className="list-none pl-6">
          <div className="space-y-2">
            {basketItems.map((item) => (
              <li
                key={item}
                className="flex items-center justify-between text-gray-700"
              >
                <span>{item}</span>
                <div className="flex items-center space-x-3">
                  <div className="relative flex items-center">
                    <DatePicker
                      selected={selectedDates[item] || null}
                      onChange={(date: Date | null) =>
                        handleDateChange(date, item)
                      }
                      dateFormat="yyyy-MM-dd"
                      customInput={
                        <button className="flex items-center justify-center p-1">
                          <FontAwesomeIcon
                            icon={faCalendarCheck}
                            className="text-blue-400"
                          />
                        </button>
                      }
                    />
                  </div>
                  <button
                    className="flex items-center justify-center p-1"
                    onClick={() => handleDeleteBasketItem(item)}
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="text-red-400"
                    />
                  </button>
                </div>
              </li>
            ))}
          </div>
        </ul>
      ) : (
        <p className="text-gray-500">장바구니에 할 일이 없습니다.</p>
      )}
    </div>
  );
}
