import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import FullCalendar from '@fullcalendar/react';
import { useState } from 'react';
import IconButton from '../common/button/IconButton';
import Button from '../common/button/Button';

interface Props {
  calendarRef: React.RefObject<FullCalendar>;
  onDateChange: (date: Date) => void;
}

/**
 * 캘린더 헤더 부분
 * (달력의 연도와 달, 오늘로 이동하는 버튼, 달 이동 버튼)
 *
 * @param calendarRef 달력
 * @param onDateChange 선택 날짜 변경
 */
export default function CalendarHeader({ calendarRef, onDateChange }: Props) {
  // 헤더에 있는 현재 달력의 달을 보여주기 위함
  const [viewMonth, setViewMonth] = useState<Date>(new Date());

  /**
   * 현재 달력 위치의 날짜로 업데이트
   */
  const updateCurrentView = () => {
    const calendarApi = calendarRef.current?.getApi();
    const currentDate = calendarApi?.getDate() ?? new Date();
    setViewMonth(currentDate);
  };

  /**
   * today 버튼을 클릭했을 때
   * 선택한 날짜도 오늘로 변경,
   * 달력 위치도 오늘로 변경
   */
  const handleTodayClick = () => {
    const today = new Date();
    onDateChange(today);
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.today();
    updateCurrentView();
  };

  /**
   * 이전 달로 이동
   */
  const handlePrevMonthClick = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.prev();
    updateCurrentView();
  };

  /**
   * 다음 달로 이동
   */ const handleNextMonthClick = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.next();
    updateCurrentView();
  };

  return (
    <div className="flex w-full items-center justify-between rounded-t-[20px] border border-gs200 bg-gs50 p-3 xl:px-6">
      <div className="w-1/4" />
      <div className="flex flex-1 items-center justify-center gap-3">
        <IconButton icon={faAngleLeft} onClick={handlePrevMonthClick} />
        <span className="inline-block shrink-0 text-center text-20M text-gsBk">
          <span className="hidden sm:inline">
            {viewMonth.toLocaleDateString('ko-KR', { year: 'numeric' })}{' '}
          </span>
          {viewMonth.toLocaleDateString('ko-KR', { month: 'long' })}
        </span>
        <IconButton icon={faAngleRight} onClick={handleNextMonthClick} />
      </div>
      <div className="flex w-1/4 justify-end">
        <Button
          onClick={() => handleTodayClick()}
          variant="outline"
          className="rounded-3xl px-4 py-1 xl:w-[84px] 2xl:rounded-3xl 2xl:py-2"
        >
          오늘
        </Button>
      </div>
    </div>
  );
}
