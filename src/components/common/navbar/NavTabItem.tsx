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
        'flex flex-shrink-0 items-center gap-3 overflow-hidden whitespace-nowrap rounded-md p-2 text-gray-400',
        'hover:bg-gray-100',
        { 'bg-secondary text-primary hover:bg-secondary': isSelected },
      )}
    >
      <div className="flex items-center justify-center">
        <FontAwesomeIcon className="h-4 w-4" icon={icon} size="sm" />
      </div>
      <p className="text-m font-medium">{title}</p>
    </Link>
  );
}
