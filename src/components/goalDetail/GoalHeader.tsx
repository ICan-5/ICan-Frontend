import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useGoals } from '@/hooks/useGoals';
import GoalProgress from './GoalProgress';
import { Goal } from '@/types/goals';

type Props = {
  doneItems: number;
  todoItems: number;
  id: string;
};

export default function GoalHeader({ doneItems, todoItems, id }: Props) {
  const [menuRef, isMenuOpen, setIsMenuOpen] =
    useClickOutside<HTMLDivElement>();
  const { data: goals, isLoading } = useGoals();

  const goalTitle = goals?.find(
    (goal: Goal) => goal.goalId === Number(id),
  )?.title;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h1 className="flex items-center text-18SB">
          <FontAwesomeIcon icon={faFlag} className="mr-2 text-slate500" />
          {isLoading ? '목표 로딩 중...' : goalTitle}
        </h1>
        <div className="relative">
          <button
            type="button"
            className="cflex size-8 cursor-pointer items-center justify-center rounded-full bg-gs100"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faEllipsisV} className="text-gs500" />
          </button>
          {isMenuOpen && (
            <div
              className="absolute right-4 mt-2 w-[120px] rounded bg-gs00 shadow-md"
              ref={menuRef}
            >
              <button
                type="button"
                className="block w-full border-b px-4 py-2 text-center text-14R text-gs700 hover:bg-gs200"
              >
                목표 색상 변경
              </button>
              <button
                type="button"
                className="block w-full border-b px-4 py-2 text-center text-14R text-gs700 hover:bg-gs200"
              >
                수정하기
              </button>
              <button
                type="button"
                className="block w-full px-4 py-2 text-center text-14R text-gs700 hover:bg-gs200"
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>
      <GoalProgress doneItems={doneItems} todoItems={todoItems} />
    </div>
  );
}
