import Link from 'next/link';
import cn from '@/utils/cn';

type Props = {
  id: number;
  title: string;
  isSelected: boolean;
};

export default function NavGoalItem({ id, title, isSelected }: Props) {
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
      <span className="ml-2 h-2 w-2 rounded-md bg-goal01" />
      <span className="text-overflow text-12R 2xl:text-14R">{title}</span>
    </Link>
  );
}
