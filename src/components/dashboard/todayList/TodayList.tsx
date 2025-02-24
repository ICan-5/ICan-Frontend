import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import TodayListItem from './TodayListItem';
import { auth } from '@/auth';

// TOOD:: 나중에 할일 Type정해지면 todolist: Todo[]
type Props = {
  todayList: {
    id: number;
    title: string;
    date: string;
    done: boolean;
    noteId: number | null;
  }[];
};

export default async function TodayList({ todayList }: Props) {
  const formatter = new Intl.DateTimeFormat('ko-KR', { dateStyle: 'long' });
  const formattedDate = formatter.format(new Date());

  const todoList = todayList.filter((e) => !e.done);
  const doneList = todayList.filter((e) => e.done);

  const session = await auth(); // 세션 가져오기

  if (!session) {
    return <p>로그인 유저를 찾을 수 없습니다. 다시 로그인 해주세요</p>;
  }

  const { user } = session;

  return (
    <div className="relative flex min-h-48 w-full flex-1 flex-col overflow-hidden rounded-2xl bg-white p-4 md:h-full md:px-6 md:py-4">
      <section className="mb-2 flex w-full flex-none items-start">
        <p className="mr-auto flex flex-col">
          <span className="text-lg">
            안녕, <strong className="text-slate500">{user?.name}</strong>! 🖐️
          </span>
          <span className="text-sm text-gray-400">{formattedDate}</span>
        </p>
        <Link href="/todoCalendar">
          <button
            className="flex items-center gap-1 text-sm text-gray-400"
            type="button"
          >
            모두 보기
            <div className="flex h-6 w-6 items-center justify-center">
              <FontAwesomeIcon icon={faAngleRight} className="h-4 w-4" />
            </div>
          </button>
        </Link>
      </section>
      <div className="flex h-full w-full flex-1 flex-col overflow-y-auto">
        {todoList.map((todo) => (
          <SimpleTodo
            key={todo.id}
            title={todo.title}
            done={todo.done}
            noteId={todo.noteId}
          />
        ))}
        {!todayList.length && (
          <div className="flex h-full flex-1 flex-col items-center justify-center gap-2 2xl:gap-3">
            <span className="text-12M text-gs400 2xl:text-14M">
              오늘의 할 일이 없어요.
            </span>
            <Button variant="outline" size="medium">
              <Icon icon={faPlus} />새 할일 생성
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
