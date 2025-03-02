import Link from 'next/link';
import cn from '@/utils/cn';

type Props = {
  id: number;
  title: string;
  color: string;
  isSelected: boolean;
};

export default function NavGoalItem({ id, title, color, isSelected }: Props) {
  // TODO :: 나중에 목표 색 정해지면 수정
  const c = color === 'default' ? 'bg-slate500' : 'bg-goal01';
  return (
    <Link
      href={`/goals/${id}`}
      className={cn(
        'flex flex-none cursor-pointer items-center gap-4 overflow-hidden rounded-md p-2',
        'text-gray-400 hover:bg-gs50',
        {
          'bg-gs50 text-gray-600': isSelected,
        },
      )}
    >
      <span className={`ml-2 size-2 flex-none rounded-md ${c}`} />
      <span className="text-overflow h-4 text-12R 2xl:h-5 2xl:text-14R">
        {title}
      </span>
    </Link>
  );
}
