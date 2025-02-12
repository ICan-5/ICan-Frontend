type Props = {
  message: string;
};
export default function ErrorMessage({ message }: Props) {
  return <p className="ml-6 mt-2 text-sm text-red-600">{message}</p>;
}
