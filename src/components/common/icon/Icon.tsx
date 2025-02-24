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
      className={cn('flex size-7 items-center justify-center', className)}
      {...props}
    >
      <FontAwesomeIcon className="size-4" icon={icon} size="sm" />
    </div>
  );
}
