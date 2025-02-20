import DatePicker from 'react-datepicker';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { ko } from 'date-fns/locale';

import 'react-datepicker/dist/react-datepicker.css';
import CustomDateInput from './CustomDateInput';

// 제네릭 사용하여 컴포넌트를 호출 할 때 타입 전달 받음
type Props<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  control: Control<T>;
};

export default function DateInput<T extends FieldValues>({
  name,
  label,
  control,
}: Props<T>) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={String(name)} className="text-16SB">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            dateFormat="yyyy.MM.dd EEEE"
            locale={ko}
            shouldCloseOnSelect
            customInput={<CustomDateInput />}
          />
        )}
      />
    </div>
  );
}
