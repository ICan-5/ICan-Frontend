import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef } from 'react';
import cn from '@/utils/cn';

type Props = {
  value?: string;
  onClick?: () => void;
  isFocus: boolean;
  setIsFocus: (focused: boolean) => void;
};

// date picker의 ref를 받아와야 해서 함수 표현식으로 컴포넌트 생성
// eslint-disable-next-line react/display-name
const CustomDateInput = forwardRef<HTMLButtonElement, Props>(
  ({ value, onClick, isFocus, setIsFocus }, ref) => {
    return (
      <button
        type="button"
        ref={ref}
        onClick={() => {
          setIsFocus(true);
          if (onClick) onClick();
        }}
        className={cn(
          'flex w-full items-center gap-2 rounded-xl bg-slate50 px-4 py-3 text-16R text-gsBk',
          { 'border border-slate500': isFocus },
        )}
      >
        <FontAwesomeIcon icon={faCalendar} className="h-4 w-4 text-gs600" />
        <span className={cn(value ? 'text-bk' : 'text-gs400')}>
          {value || '날짜를 선택해주세요'}
        </span>
      </button>
    );
  },
);

export default CustomDateInput;
