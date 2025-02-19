import Link from 'next/link';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import cn from '@/utils/cn';
import Icon from '@/components/common/Icon/Icon';

type Props = {
  isFolded: boolean;
  icon: IconProp;
  path: string;
  title: string;
  isSelected: boolean;
};

export default function NavTabItem({
  isFolded,
  icon,
  path,
  title,
  isSelected,
}: Props) {
  return (
    <Link
      href={path}
      className={cn(
        'flex flex-shrink-0 items-center gap-1 overflow-hidden whitespace-nowrap rounded-lg px-1 py-2 text-gs600',
        'hover:bg-slate50 2xl:gap-2 2xl:rounded-xl 2xl:px-2 2xl:py-3',
        { 'bg-slate50 text-gsBk': isSelected },
      )}
    >
      <Icon
        icon={icon}
        className={cn('transition-all duration-300', {
          'w-10 p-3 2xl:p-2': isFolded,
        })}
      />
      <p className="text-14M font-medium 2xl:text-16M">{title}</p>
    </Link>
  );
}
