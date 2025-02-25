import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { DayCellContentArg, EventClickArg } from '@fullcalendar/core';
import '@/styles/calendar.css';
import { useCallback, useEffect } from 'react';
import cn from '@/utils/cn';
import { Todo } from '@/types/todos';

const goalColor: Record<string, string> = {
  goal01: 'bg-goal01-100 text-goal01',
  goal02: 'bg-goal02-100 text-goal02',
  default: 'bg-slate100 text-slate500',
};

/**
 * 각 날짜 숫자를 커스텀한 UI
 *
 * @param info 각 날짜 정보
 */
const renderDayCellContent = (info: DayCellContentArg) => {
  const dateText = info.date.getDate().toString();
  const isToday = new Date().toDateString() === info.date.toDateString();
  const isSunday =
    info.view.calendar.formatDate(info.date, { weekday: 'long' }) === '일요일';

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-sm p-2',
        'size-5',
        isToday && 'bg-slate500 text-white',
        isSunday && 'text-warn500',
      )}
    >
      <span className="text-14M">{dateText}</span>
    </div>
  );
};

interface Props {
  todos: Todo[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  calendarRef: React.RefObject<FullCalendar>;
  onDropTodo: (date: string, todoId: number) => void;
}

export default function CalendarBody({
  todos,
  selectedDate,
  onDateChange,
  calendarRef,
  onDropTodo,
}: Props) {
  /**
   * 셀에 클래스 부여
   */
  const getDayCellClassNames = (info: { date: Date }) => {
    const isSelectedDate =
      selectedDate.toDateString() === info.date.toDateString();

    return cn(isSelectedDate && 'selected');
  };

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

  const handleDayCellMount = (info: { el: HTMLElement }) => {
    // 반응형에 맞춰 셀 크기 업데이트
    const updateCellSize = () => {
      const cell = document.querySelector('.fc-daygrid-day');
      if (cell) {
        const width = cell.clientWidth;
        document.querySelectorAll('.fc-daygrid-day').forEach((el) => {
          const cellElement = el as HTMLElement;
          if (width < 96) {
            cellElement.style.height = `${width}px`;
            cellElement.style.minHeight = `${width}px`;
          } else {
            cellElement.style.height = '100px';
            cellElement.style.minHeight = '100px';
          }
        });
      }
    };
    // 숨겨진 이벤트 개수 표시
    const updateMoreCount = () => {
      requestAnimationFrame(() => {
        const events = info.el.querySelectorAll('.fc-event');

        // 숨겨진 이벤트 개수 계산
        const hiddenEvents = Array.from(events).filter(
          (e) => (e as HTMLElement).offsetHeight === 0,
        ).length;

        let moreCountEl = info.el.querySelector(
          '.event-more-count',
        ) as HTMLElement;
        if (!moreCountEl) {
          moreCountEl = document.createElement('div');
          moreCountEl.className =
            'event-more-count absolute top-2 right-2 text-12SB text-gs500';
          info.el.appendChild(moreCountEl);
        }

        // 숨겨진 이벤트가 있으면 텍스트 추가, 없으면 숨김
        const cellWidth = info.el.clientWidth;
        if (hiddenEvents > 0) {
          if (cellWidth > 88) {
            moreCountEl.textContent = `+${hiddenEvents} more`;
          } else if (cellWidth >= 50) {
            moreCountEl.textContent = `+${hiddenEvents}`;
          } else {
            moreCountEl.textContent = '';
          }

          moreCountEl.style.opacity = '1';
        } else {
          moreCountEl.style.opacity = '0';
        }
      });
    };

    updateCellSize();
    updateMoreCount();

    const observer = new ResizeObserver(updateMoreCount);
    observer.observe(info.el);

    window.addEventListener('resize', updateCellSize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateCellSize);
    };
  };

  /**
   * 사이드 바가 접히거나 펼쳐지면 캘린더 크기 재조정
   */
  useEffect(() => {
    const sidebar = document.querySelector('nav'); // 사이드바 선택
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
        className: goalColor[event.goal?.color || 'default'],
      }))}
      eventBorderColor="transparent"
      eventDisplay="block"
      dateClick={handleDateClick}
      eventClick={handleEventClick}
      locale="kr"
      headerToolbar={false}
      dayHeaderFormat={{ weekday: 'long' }}
      height="auto"
      contentHeight="100%"
      dayCellContent={(info) => renderDayCellContent(info)}
      dayCellClassNames={(info) => getDayCellClassNames(info)}
      dayCellDidMount={handleDayCellMount}
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
