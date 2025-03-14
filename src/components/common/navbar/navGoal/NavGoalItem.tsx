import Link from 'next/link';
import cn from '@/utils/cn';
import { Goal } from '@/types/goals';

type Props = {
  goal: Goal;
  isSelected: boolean;
};

const GOAL_BG_COLORS = {
  goal01: 'bg-goal01',
  goal02: 'bg-goal02',
  goal03: 'bg-goal03',
  goal04: 'bg-goal04',
  goal05: 'bg-goal05',
  default: 'bg-slate500',
} as const;

export default function NavGoalItem({ goal, isSelected }: Props) {
  // TODO :: 나중에 목표 색 정해지면 수정
  return (
    <Link
      href={`/goals/${goal.goalId}`}
      className={cn(
        'flex flex-none cursor-pointer items-center gap-4 overflow-hidden rounded-md p-2',
        'text-gray-400 hover:bg-gs50',
        {
          'bg-gs50 text-gray-600': isSelected,
        },
      )}
    >
      <span
        className={`ml-2 size-2 flex-none rounded-md ${GOAL_BG_COLORS[goal.color]}`}
      />
      <span className="text-overflow h-4 text-12R 2xl:h-5 2xl:text-14R">
        {goal.title}
      </span>
    </Link>
  );
}
