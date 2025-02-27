import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default async function TodayListSkeleton() {
  return (
    <div className="relative flex min-h-48 w-full flex-[4] flex-col overflow-hidden rounded-2xl bg-white px-6 py-4 md:h-full 2xl:rounded-3xl">
      <section className="flex w-full flex-none items-start 2xl:mb-1">
        <p className="mr-auto flex text-16M 2xl:text-18SB">
          <span className="mr-1 hidden sm:inline-flex md:hidden xl:inline-flex">
            안녕하세요, 님의
          </span>
          <span>오늘의 일정입니다!👋</span>
        </p>
        <div className="flex flex-none items-center gap-1 text-sm text-gray-400">
          모두 보기
          <div className="flex size-6 items-center justify-center">
            <FontAwesomeIcon icon={faAngleRight} className="size-4" />
          </div>
        </div>
      </section>
      <div className="mb-1 h-4 2xl:mb-2 2xl:h-5" />
      <div className="flex size-full flex-1 flex-col overflow-y-auto">
        {Array.from({ length: 5 }, (_, i) => i).map((todo) => (
          <div className="h-10 py-[10px] 2xl:py-[6px]" key={todo}>
            <div className="h-5 w-full flex-1 animate-pulse rounded-md bg-gs100 2xl:h-7" />
          </div>
        ))}
      </div>
    </div>
  );
}
