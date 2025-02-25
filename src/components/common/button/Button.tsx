'use client';

/* eslint-disable react/jsx-props-no-spreading */
import { cva, VariantProps } from 'class-variance-authority';
import cn from '@/utils/cn';

const ButtonVariants = cva(
  'flex items-center justify-center rounded-lg py-2 2xl:rounded-xl 2xl:py-3', // 공통 스타일
  {
    variants: {
      variant: {
        default:
          'bg-slate500 !text-14SB text-gs00 hover:bg-slate800 focus:bg-slate800 active:bg-slate800 disabled:bg-gs200 disabled:text-gs400 2xl:!text-16SB',
        outline:
          'border border-slate500 bg-gs00 !text-14M text-slate500 hover:border-slate800 hover:text-slate800 focus:border-slate800 focus:text-slate800 active:border-slate800 active:text-slate800 disabled:border-gs400 disabled:text-gs400 2xl:!text-16M',
      },
      size: {
        default: 'px-2 py-1',
        medium: 'px-6 2xl:px-8',
        full: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface ButtonProps
  extends VariantProps<typeof ButtonVariants>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({
  variant,
  size,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(ButtonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
