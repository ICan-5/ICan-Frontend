/* eslint-disable react/jsx-props-no-spreading */
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from '@/utils/cn';

interface ButtonIconProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon: IconProp;
}

export default function IconButton({
  icon,
  className,
  ...props
}: ButtonIconProps) {
  return (
    <button
      type="button"
      className={cn('flex h-7 w-7 items-center justify-center', className)}
      {...props}
    >
      <FontAwesomeIcon className="h-4 w-4" icon={icon} size="sm" />
    </button>
  );
}
