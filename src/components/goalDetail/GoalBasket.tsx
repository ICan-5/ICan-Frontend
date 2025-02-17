import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faCartPlus,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  basketItems: { id: number; task: string }[];
  onPickDate: (index: number, date: Date | null) => void;
  onDelete: (index: number) => void;
};

export default function GoalBasket({
  basketItems,
  onPickDate,
  onDelete,
}: Props) {
  return (
    <div className="rounded-2xl bg-gs00 p-6 shadow">
      <h3 className="mb-4 flex items-center text-18R font-bold">
        <FontAwesomeIcon icon={faCartPlus} className="mr-2 text-slate400" />
        Todo Bag
      </h3>
      <ul className="list-none space-y-2 pl-6">
        {basketItems &&
          basketItems.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between text-gs700"
            >
              <span>{item.task}</span>
              <div className="flex items-center space-x-3">
                <div className="relative flex items-center">
                  <DatePicker
                    onChange={(date: Date | null) => onPickDate(item.id, date)}
                    dateFormat="yyyy-MM-dd"
                    customInput={
                      <button
                        type="button"
                        className="flex items-center justify-center p-1"
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
                  className="flex items-center justify-center p-1"
                  onClick={() => onDelete(item.id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} className="text-goal02" />
                </button>
              </div>
            </li>
          ))}
      </ul>
      {(!basketItems || basketItems.length === 0) && (
        <p className="text-gs500">장바구니에 할 일이 없습니다.</p>
      )}
    </div>
  );
}
