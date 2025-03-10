import cn from '@/utils/cn';

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  message: string;
}
export default function ErrorMessage({ message, className }: Props) {
  return (
    <p className={cn('ml-2 mt-2 break-keep text-14M text-warn500', className)}>
      {message}
    </p>
  );
}
