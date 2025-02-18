import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { DayCellContentArg, EventClickArg } from '@fullcalendar/core';
import '@/styles/calendar.css';
import { useCallback, useEffect } from 'react';
import cn from '@/utils/cn';
import { TodoType } from '@/types/todos';

/**
 * 각 날짜 숫자를 커스텀한 UI
 *
 * @param info 각 날짜 정보
 * @param selectedDate 선택된 날짜
 */
const renderDayCellContent = (info: DayCellContentArg, selectedDate: Date) => {
  const isSelectedDate =
    selectedDate.toDateString() === info.date.toDateString();
  const dateText = info.date.getDate().toString();

  return (
    <div className="flex h-full items-center justify-center">
      <span
        className={cn(
          'flex items-center justify-center',
          'h-6 w-6',
          'rounded-full',
          isSelectedDate && 'bg-purple-500 text-white',
        )}
      >
        {dateText}
      </span>
    </div>
  );
};

type Props = {
  todos: TodoType[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  calendarRef: React.RefObject<FullCalendar>;
  onDropTodo: (date: string, todoId: number) => void;
};

/**
 * 달력 컴포넌트
 */
export default function Calendar({
  todos,
  selectedDate,
  onDateChange,
  calendarRef,
  onDropTodo,
}: Props) {
  /**
   * 각 날짜 칸을 클릭을 처리하는 핸들러
   */
  const handleDateClick = useCallback(
    (info: { date: Date }) => {
      onDateChange(new Date(info.date));
    },
    [onDateChange],
  );

  /**
   * 이벤트를 클릭해도 선택 날짜 변경
   */
  const handleEventClick = (info: EventClickArg) => {
    if (info.event.start) {
      onDateChange(new Date(info.event.start)); // 선택된 날짜 변경
    }
  };
  /**
   * 날짜 셀 크기 업데이트
   */
  const updateCellSize = () => {
    const cell = document.querySelector('.fc-daygrid-day');
    if (cell) {
      const width = cell.clientWidth;
      document.querySelectorAll('.fc-daygrid-day').forEach((el) => {
        const cellElement = el as HTMLElement;
        if (width < 88) {
          cellElement.style.height = `${width}px`;
        }
        cellElement.style.minHeight = `${width}px`;
        cellElement.style.height = '88px';
      });
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateCellSize);
    updateCellSize(); // 초기 설정

    return () => window.removeEventListener('resize', updateCellSize);
  }, []);

  /**
   * 사이드 바가 접히거나 펼쳐지면 캘린더 크기 재조정
   */
  useEffect(() => {
    const sidebar = document.querySelector('header'); // 사이드바 선택
    if (!sidebar) return undefined;

    const observer = new MutationObserver(() => {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 200);
    });

    observer.observe(sidebar, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
      initialView="dayGridMonth"
      events={todos.map((event) => ({
        ...event,
        id: event.id.toString(),
        className: event.goal?.color || 'bg-slate950',
      }))}
      eventBorderColor="transparent"
      eventDisplay="block"
      dateClick={handleDateClick}
      eventClick={handleEventClick}
      locale="kr"
      headerToolbar={false}
      height="auto"
      contentHeight="100%"
      dayCellContent={(info) => renderDayCellContent(info, selectedDate)}
      dayCellDidMount={updateCellSize}
      droppable
      eventReceive={(info) => {
        const todoId = Number(info.event.id);
        const date = info.event.startStr;

        onDropTodo(date, todoId);
        info.event.remove();
      }}
    />
  );
}
