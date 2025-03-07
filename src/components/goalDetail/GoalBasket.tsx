import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faTrashCan,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Basket } from '@/types/todos';

interface Props {
  basketItems: Basket[];
}

export default function GoalBasket({ basketItems }: Props) {
  return (
    <div className="relative h-[290px] overflow-auto rounded-2xl border-2">
      <div className="sticky top-0 z-10 flex items-center gap-2 border-b-2 bg-gs50 p-4">
        <h3 className="text-18SB">할일 장바구니</h3>
        <div className="group relative inline-block cursor-pointer">
          <FontAwesomeIcon
            icon={faCircleQuestion}
            className="text-18SB text-gs400"
          />
          <div className="absolute left-1/2 right-0 top-full mt-1 w-60 rounded-md bg-gs00 p-2 text-center text-14M text-gsBk opacity-0 transition-opacity group-hover:opacity-100">
            빠르게 할일을 추가해 모아놓으세요.
            <br />
            이후 필요한 날짜에 지정할 수 있습니다.
          </div>
        </div>
      </div>

      <ul className="min-h-[290px] list-none space-y-2 rounded-b-xl pl-6">
        {basketItems && basketItems.length > 0 ? (
          basketItems.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between text-gs700"
            >
              <span>{item.title}</span>
              <div className="flex items-center space-x-3">
                <div className="relative flex items-center">
                  <DatePicker
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
                >
                  <FontAwesomeIcon icon={faTrashCan} className="text-goal02" />
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="flex items-center justify-center py-6 text-gs500">
            장바구니에 할 일이 없어요
          </p>
        )}
      </ul>
    </div>
  );
}
