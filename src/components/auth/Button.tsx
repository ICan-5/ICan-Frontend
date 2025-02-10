type ButtonProps = {
  label: string;
  type?: 'submit' | 'reset' | 'button';
};

export default function Button({ label, type = 'button' }: ButtonProps) {
  return (
    <button
      className="mb-10 h-12 w-full rounded-full bg-slate-400 text-white"
      type={type}
    >
      {label}
    </button>
  );
}
