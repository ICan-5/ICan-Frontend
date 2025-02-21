import { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import { TodoType } from '@/types/todos';
import CalendarBody from './CalendarBody';
import CalendarHeader from './CalendarHeader';

type Props = {
  todos: TodoType[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onDropTodo: (date: string, todoId: number) => void;
};

function Calendar({ todos, selectedDate, onDateChange, onDropTodo }: Props) {
  const calendarRef = useRef<FullCalendar>(null);
  return (
    <div className="w-[840px]">
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

export default Calendar;
