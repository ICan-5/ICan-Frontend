type Props = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
};

export default function TextField({
  label,
  name,
  type = 'text', // 기본값 'text'
  placeholder = '입력창에 입력해주세요',
}: Props) {
  return (
    <div className="mb-6 w-full">
      <label className="flex flex-col" htmlFor={name}>
        <span className="mb-3">{label}</span>
        <input
          className="focus-visible:ring-ring placeholder:text-muted-foreground w-full rounded-full border border-grayLighter px-6 py-3 placeholder-grayLight shadow-sm transition-colors focus:outline-none focus:ring-grayLight focus-visible:ring-1"
          id={name} // label을 연결
          name={name}
          type={type}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
}
