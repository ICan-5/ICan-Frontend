import FullCalendar from '@fullcalendar/react';
import { useState } from 'react';

type Props = {
  calendarRef: React.RefObject<FullCalendar>;
  onDateChange: (date: Date) => void;
};

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
    <div className="mb-4 flex w-full items-center justify-between">
      <div className="w-1/4">
        <button
          type="button"
          onClick={handleTodayClick}
          className="bg-gray-200 rounded-lg p-4"
        >
          Today
        </button>
      </div>
      <div className="flex w-1/2 flex-grow-0 items-center justify-center">
        <button
          type="button"
          onClick={handlePrevMonthClick}
          className="bg-gray-200 hover:bg-gray-300 mr-2 rounded-lg px-3 py-2 text-sm font-medium"
        >
          ←
        </button>
        <span className="inline-block min-w-32 flex-shrink-0 text-center text-lg font-semibold">
          {viewMonth.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
          })}
        </span>
        <button
          type="button"
          onClick={handleNextMonthClick}
          className="bg-gray-200 hover:bg-gray-300 ml-2 rounded-lg px-3 py-2 text-sm font-medium"
        >
          →
        </button>
      </div>
      <div className="w-1/4" />
    </div>
  );
}
