import { TextFieldProps } from '@/types/inputTypes';

export default function TextField({
  label,
  name,
  type = 'text',
  placeholder = '입력해주세요',
}: TextFieldProps) {
  return (
    <div className="mb-6 w-full">
      <label className="flex flex-col" htmlFor={name}>
        <span className="mb-3">{label}</span>
        <input
          className="rounded-full border border-grayLighter px-6 py-3 placeholder-gray"
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
}
