'use client';

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
      className={cn('flex size-7 items-center justify-center', className)}
      {...props}
    >
      <FontAwesomeIcon className="size-4" icon={icon} size="sm" />
    </button>
  );
}
