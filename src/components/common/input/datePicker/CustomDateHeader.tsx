import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { getMonth, getYear } from 'date-fns';
import IconButton from '../../button/IconButton';

interface Props {
  date: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
}

export default function CustomDateHeader({
  date,
  decreaseMonth,
  increaseMonth,
}: Props) {
  return (
    <div className="flex justify-between">
      <IconButton
        icon={faAngleLeft}
        onClick={decreaseMonth}
        className="text-18SB text-gsBk"
      />
      <span className="text-18M text-gsBk">
        {getYear(date)}년 {getMonth(date) + 1}월
      </span>
      <IconButton
        icon={faAngleRight}
        onClick={increaseMonth}
        className="text-18SB text-gsBk"
      />
    </div>
  );
}
