/* eslint-disable react/jsx-props-no-spreading */
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from '@/utils/cn';

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: IconProp;
}

export default function Icon({ icon, className, ...props }: IconProps) {
  return (
    <div
      className={cn('flex h-7 w-7 items-center justify-center', className)}
      {...props}
    >
      <FontAwesomeIcon className="h-4 w-4" icon={icon} size="sm" />
    </div>
  );
}
