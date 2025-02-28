'use client';

import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import SimpleTodo from '@/components/common/todo/SimpleTodo';
import TodayListEmpty from './TodayListEmpty';
import { useDailyTodos } from '@/hooks/useTodos';

export default function TodayList() {
  const { data } = useSession();
  const { data: totalList, isFetching } = useDailyTodos(
    new Date().toLocaleDateString('sv-SE'),
  );
  const todayList = totalList.filter((todo) => !todo.done);
  const formatter = new Intl.DateTimeFormat('ko-KR', { dateStyle: 'long' });
  const formattedDate = formatter.format(new Date());

  return (
    <div className="relative flex w-full flex-[4] flex-col overflow-hidden rounded-2xl bg-white px-6 py-4 2xl:rounded-3xl">
      <section className="flex w-full flex-none items-start 2xl:mb-1">
        <p className="mr-auto flex text-16M 2xl:text-18SB">
          <span className="mr-1 hidden sm:inline-flex md:hidden xl:inline-flex">
            안녕하세요,
            <strong className="ml-1 text-slate500">{data?.user?.name}</strong>
            님의
          </span>
          <span>오늘의 일정입니다!👋</span>
        </p>
        <Link href="/todoCalendar">
          <button
            className="flex items-center gap-1 text-14M text-gray-400"
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
      <div className="flex h-40 w-full flex-col overflow-y-auto 2xl:h-44">
        {isFetching &&
          Array.from({ length: 4 }, (_, i) => i + 1).map((e) => (
            <div
              key={e}
              className="my-2 block h-6 w-full flex-none animate-pulse rounded-md bg-gs100 2xl:h-7"
            />
          ))}
        {todayList.map((todo) => (
          <SimpleTodo
            key={todo.todoId}
            title={todo.title}
            done={false}
            noteId={todo.noteId}
          />
        ))}
        {!isFetching && !todayList.length && <TodayListEmpty />}
      </div>
    </div>
  );
}
