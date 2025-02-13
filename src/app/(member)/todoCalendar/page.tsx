import { Suspense } from 'react';
import TodoCalendar from '@/components/todoCalendar/TodoCalendar';
import Loading from './loading';

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <TodoCalendar />
    </Suspense>
  );
}
