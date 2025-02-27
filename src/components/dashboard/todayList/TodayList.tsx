import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { auth } from '@/auth';
import SimpleTodo from '@/components/common/todo/SimpleTodo';
import { getTodayList } from '@/services/dashboard';
import TodayListEmpty from './TodayListEmpty';

export default async function TodayList() {
  const session = await auth(); // 세션 가져오기
  const todayList = await getTodayList(); // 오늘 할일 리스트 가져오기
  const formatter = new Intl.DateTimeFormat('ko-KR', { dateStyle: 'long' });
  const formattedDate = formatter.format(new Date());

  return (
    <div className="relative flex min-h-48 w-full flex-[4] flex-col overflow-hidden rounded-2xl bg-white px-6 py-4 md:h-full 2xl:rounded-3xl">
      <section className="flex w-full flex-none items-start 2xl:mb-1">
        <p className="mr-auto flex text-16M 2xl:text-18SB">
          <span className="mr-1 hidden sm:inline-flex md:hidden xl:inline-flex">
            안녕하세요,
            <strong className="ml-1 text-slate500">
              {session?.user?.name}
            </strong>
            님의
          </span>
          <span>오늘의 일정입니다!👋</span>
        </p>
        <Link href="/todoCalendar">
          <button
            className="flex items-center gap-1 text-sm text-gray-400"
            type="button"
          >
            모두 보기
            <div className="flex size-6 items-center justify-center">
              <FontAwesomeIcon icon={faAngleRight} className="size-4" />
            </div>
          </button>
        </Link>
      </section>
      <span className="mb-1 text-12M text-gray-400 2xl:mb-2 2xl:text-14M">
        {formattedDate}
      </span>
      <div className="flex size-full flex-1 flex-col overflow-y-auto">
        {todayList.map((todo) => (
          <SimpleTodo
            key={todo.todoId}
            title={todo.title}
            done={false}
            noteId={todo.noteId}
          />
        ))}
        {!todayList.length && <TodayListEmpty />}
      </div>
    </div>
  );
}
