import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarCheck,
  faCartPlus,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface GoalBasketProps {
  basketItems: string[];
  setBasketItems: (items: string[]) => void;
  setTodoItems: (items: { task: string; date: string }[]) => void;
  todoItems: { task: string; date: string }[];
}

export default function GoalBasket({
  basketItems,
  setBasketItems,
  setTodoItems,
  todoItems,
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

      const newTodoItem = { task: item, date: formattedDate };
      setTodoItems([...todoItems, newTodoItem]);
      setBasketItems(basketItems.filter((basketItem) => basketItem !== item));

      const newSelectedDates = { ...selectedDates };
      delete newSelectedDates[item];
      setSelectedDates(newSelectedDates);
    }
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
                  <button className="flex items-center justify-center p-1">
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
