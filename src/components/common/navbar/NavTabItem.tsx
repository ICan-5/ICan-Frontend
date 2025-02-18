import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import cn from '@/utils/cn';

type Props = {
  icon: IconProp;
  path: string;
  title: string;
  isSelected: boolean;
};

export default function NavTabItem({ icon, path, title, isSelected }: Props) {
  return (
    <Link
      href={path}
      className={cn(
        'flex flex-shrink-0 items-center gap-1 overflow-hidden whitespace-nowrap rounded-lg px-1 py-2 text-gs600',
        'hover:bg-slate50 2xl:gap-2 2xl:rounded-xl 2xl:px-2 2xl:py-3',
        { 'bg-slate50 text-gsBk': isSelected },
      )}
    >
      <div className="flex h-7 w-7 items-center justify-center">
        <FontAwesomeIcon className="h-4 w-4" icon={icon} size="sm" />
      </div>
      <p className="text-14M font-medium 2xl:text-16M">{title}</p>
    </Link>
  );
}
