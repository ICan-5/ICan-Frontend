type Props = {
  label: string;
  type?: 'submit' | 'button';
  disabled?: boolean;
};

export default function Button({ label, type, disabled }: Props) {
  return (
    <button
      className="mb-12 h-12 w-full cursor-pointer whitespace-nowrap rounded-xl bg-slate500 px-4 py-2 text-16SB text-white shadow transition-colors hover:bg-slate800 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:bg-gs200 disabled:text-gs400 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
      type={type ? 'submit' : 'button'}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
