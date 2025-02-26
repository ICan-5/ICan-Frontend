import FullCalendar from '@fullcalendar/react';
import { Todo } from '@/types/todos';
import CalendarBody from './CalendarBody';
import CalendarHeader from './CalendarHeader';

interface Props {
  todos: Todo[];
  selectedDate: Date;
  calendarRef: React.RefObject<FullCalendar>;
  onDateChange: (date: Date) => void;
  onDropTodo: (date: string, todoId: number) => void;
}

/**
 * 캘린더 전체 컴포넌트
 * 캘린더 헤더 + 바디
 * @param todos 할 일 전체
 * @param selectedDate 선택된 날짜
 * @param calendarRef 캘린더의 ref
 * @param onDateChange 선택 날짜 변경 함수
 * @param onDropTodo 장바구니에서 드래그&드롭 한 요소 드롭 적용 함수
 */
export default function Calendar({
  todos,
  selectedDate,
  calendarRef,
  onDateChange,
  onDropTodo,
}: Props) {
  return (
    <div>
      <CalendarHeader calendarRef={calendarRef} onDateChange={onDateChange} />
      <CalendarBody
        todos={todos}
        selectedDate={selectedDate}
        onDateChange={onDateChange}
        calendarRef={calendarRef}
        onDropTodo={onDropTodo}
      />
    </div>
  );
}
