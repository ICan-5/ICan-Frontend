'use client';

/* eslint-disable react/jsx-props-no-spreading */
import cn from '@/utils/cn';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  size?: 'default' | 'medium' | 'full';
}

const classNames: { [key: string]: string } = {
  default:
    '!text-14SB rounded-lg bg-slate500 text-gs00 hover:bg-slate800 focus:bg-slate800 active:bg-slate800 disabled:bg-gs200 disabled:text-gs400 2xl:rounded-xl 2xl:!text-16SB',
  outline:
    'rounded-lg border border-slate500 bg-gs00 !text-14M text-slate500 hover:border-slate800 hover:text-slate800 focus:border-slate800 focus:text-slate800 active:border-slate800 active:text-slate800 disabled:border-gs400 disabled:text-gs400 2xl:rounded-xl 2xl:!text-16M',
};

const sizes: { [key: string]: string } = {
  default: '',
  medium: 'px-6 2xl:px-8',
  full: 'w-full',
};

export default function Button({
  variant = 'default',
  size = 'default',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'flex items-center justify-center py-2 2xl:py-3',
        classNames[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
