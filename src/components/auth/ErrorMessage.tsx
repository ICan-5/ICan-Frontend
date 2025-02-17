type Props = {
  message: string;
};
export default function ErrorMessage({ message }: Props) {
  return <p className="ml-2 mt-1 break-keep text-sm text-warn500">{message}</p>;
}
