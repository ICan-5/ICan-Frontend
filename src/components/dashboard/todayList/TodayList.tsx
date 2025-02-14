import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import TodayListItem from './TodayListItem';

// TOOD:: 나중에 할일 Type정해지면 todolist: Todo[]
type Props = {
  todayList: {
    id: number;
    title: string;
    date: string;
    done: boolean;
    note: boolean;
  }[];
  onToggleItem: (id: number) => void;
};

export default function TodayList({ todayList, onToggleItem }: Props) {
  const router = useRouter();
  const formatter = new Intl.DateTimeFormat('ko-KR', { dateStyle: 'long' });
  const formattedDate = formatter.format(new Date());

  const todoList = todayList.filter((e) => !e.done);
  const doneList = todayList.filter((e) => e.done);

  return (
    <div className="relative flex min-h-48 w-full flex-1 flex-col overflow-hidden rounded-2xl bg-white p-4 md:h-full md:px-6 md:py-4">
      <section className="mb-2 flex w-full flex-none items-start">
        <p className="mr-auto flex flex-col">
          <span className="text-lg">
            안녕, <strong className="text-primary">민지</strong>! 🖐️
          </span>
          <span className="text-sm text-gray-400">{formattedDate}</span>
        </p>
        <button
          className="flex items-center gap-1 text-sm text-gray-400"
          type="button"
          onClick={() => router.push('./todoCalendar')}
        >
          모두 보기
          <div>
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
        </button>
      </section>
      <div className="-mr-2 h-full w-full flex-1 overflow-y-auto pr-2">
        {todoList.map((todo) => (
          <TodayListItem
            todo={todo}
            key={todo.id}
            onToggleItem={onToggleItem}
          />
        ))}
        {doneList.map((todo) => (
          <TodayListItem
            todo={todo}
            key={todo.id}
            onToggleItem={onToggleItem}
          />
        ))}
      </div>
      {!todayList.length && (
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 text-center text-gray-400">
          최근에 등록한 할 일이 없어요.
        </p>
      )}
    </div>
  );
}
