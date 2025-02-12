type Props = {
  message: string;
};
export default function ErrorMessage({ message }: Props) {
  return (
    <p className="ml-4 mt-2 break-keep text-sm text-red-600 sm:ml-6">
      {message}
    </p>
  );
}
