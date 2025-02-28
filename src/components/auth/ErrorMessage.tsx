interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  message: string;
}
export default function ErrorMessage({ message, className }: Props) {
  return (
    <p className={`ml-2 mt-1 break-keep text-14M text-warn500 ${className}`}>
      {message}
    </p>
  );
}
