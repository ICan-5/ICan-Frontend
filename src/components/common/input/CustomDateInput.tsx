import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef, useState } from 'react';
import cn from '@/utils/cn';

type Props = {
  value?: string;
  onClick?: () => void;
};

// date picker의 ref를 받아와야 해서 함수 표현식으로 컴포넌트 생성
// eslint-disable-next-line react/display-name
const CustomDateInput = forwardRef<HTMLButtonElement, Props>(
  ({ value, onClick }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <button
        type="button"
        ref={ref}
        onClick={onClick}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          'flex w-full items-center gap-2 rounded-xl bg-slate50 px-4 py-3 text-16R text-gsBk',
          value ? 'text-bk' : 'text-gs400',
          { 'border border-slate500': isFocused },
        )}
      >
        <FontAwesomeIcon icon={faCalendar} className="h-4 w-4" />
        <span>{value || '날짜를 선택해주세요'}</span>
      </button>
    );
  },
);

export default CustomDateInput;
