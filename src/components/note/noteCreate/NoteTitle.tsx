import { Controller } from 'react-hook-form';
import ErrorMessage from '../../auth/ErrorMessage';
import { NoteFormControlProps } from '@/types/note';

export default function NoteTitle({ control, errors }: NoteFormControlProps) {
  return (
    <>
      <div className="flex items-center justify-between border-y border-gs200 py-3">
        <Controller
          control={control}
          name="title"
          render={({ field: { value, onChange } }) => (
            <>
              <input
                placeholder="노트의 제목을 입력해주세요"
                className="border-top border-bottom w-full rounded-none bg-gs00 pl-0 outline-none focus:border-gs200"
                onChange={(e) => onChange(e.target.value)}
                value={value}
              />
              <div className="flex px-1 py-[2px] text-xs font-medium">
                <span className="text-error">{value ? value?.length : 0}</span>
                <span className="text-blue-500">/30</span>
              </div>
            </>
          )}
        />
      </div>
      {errors.title && (
        <ErrorMessage className="ml-0" message={errors.title?.message || ''} />
      )}
    </>
  );
}
