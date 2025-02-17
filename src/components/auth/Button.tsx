type Props = {
  label: string;
  type?: 'submit' | 'button';
};

export default function Button({ label, type }: Props) {
  return (
    <button
      className="mb-10 h-12 w-full cursor-pointer whitespace-nowrap rounded-full bg-black px-4 py-2 text-white shadow transition-colors hover:bg-grayDarkest focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
      type={type ? 'submit' : 'button'}
    >
      {label}
    </button>
  );
}
