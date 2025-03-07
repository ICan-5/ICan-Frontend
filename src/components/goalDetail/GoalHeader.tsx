import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFontAwesome,
  faTrashCan,
  faPenToSquare,
  faFilePen,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useGoals } from '@/hooks/useGoals';
import { Goal } from '@/types/goals';

interface Props {
  id: string;
}

export default function GoalHeader({ id }: Props) {
  const { data: goals, isLoading } = useGoals();

  const goalTitle = goals?.find(
    (goal: Goal) => goal.goalId === Number(id),
  )?.title;

  return (
    <div className="flex flex-col items-start justify-between gap-14 rounded-lg bg-gs00 px-6 py-5 shadow">
      <div className="flex w-full items-center justify-between">
        <h1 className="flex items-center truncate text-20M">
          <FontAwesomeIcon
            icon={faFontAwesome}
            className="mr-2 shrink-0 text-slate400"
          />
          {isLoading ? '로딩 중...' : goalTitle}
        </h1>
      </div>

      <div className="flex w-full flex-col items-center justify-between gap-3 sm:flex-row">
        <Link href={`${id}/note`} className="w-full sm:w-auto">
          <div className="flex h-10 w-full items-center justify-center rounded-full bg-slate500 px-4 text-14M text-gs00 shadow-md sm:w-[150px]">
            <FontAwesomeIcon icon={faFilePen} className="mr-1 shrink-0" />
            <span className="whitespace-nowrap">노트 모아보기</span>
          </div>
        </Link>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          <button
            type="button"
            className="flex h-10 w-full items-center justify-center gap-1 rounded-full bg-slate100 px-4 text-14M text-slate800 sm:w-[150px]"
          >
            <FontAwesomeIcon icon={faPenToSquare} className="mr-1 shrink-0" />
            목표 수정
          </button>
          <button
            type="button"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-warn500 text-14M text-warn500"
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>
    </div>
  );
}
