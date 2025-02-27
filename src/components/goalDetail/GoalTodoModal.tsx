'use client';

import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ReactDOM from 'react-dom';
import TextInput from '@/components/common/input/TextInput';
import DateInput from '../common/input/DateInput';

const createTodoSchema = z.object({
  title: z
    .string()
    .nonempty('제목을 입력해주세요')
    .max(30, '제목은 30자 이하여야 합니다'),
  goal: z.any().nullable().optional(),
  date: z.date().optional(),
});

type CreateTodoFormData = z.infer<typeof createTodoSchema>;

type Props = {
  goalId: string;
  onClose: () => void;
  onAdd: (task: string, date: string) => void;
};

export default function CreateTodo({ goalId, onClose, onAdd }: Props) {
  const onSubmit = (data: CreateTodoFormData) => {
    if (data.date) {
      const formattedDate = data.date.toISOString().split('T')[0];
      onAdd(data.title, formattedDate);
      onClose();
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTodoFormData>({
    mode: 'onChange',
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: '',
      date: new Date(),
    },
  });

  const modalContent = (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-gsBk bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold">할 일 추가</h2>

        <p className="mb-2 text-16SB text-gsBk">목표</p>
        <input
          type="text"
          value={`임시목표 ${goalId}`}
          readOnly
          className="mb-3 w-full cursor-not-allowed rounded-lg bg-gs100 p-2 px-4 py-3 text-16R text-gs600"
        />
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChange={field.onChange}
              name={field.name}
              label="할 일 제목"
              control={control}
              errors={errors}
              placeholder="할 일을 입력하세요."
            />
          )}
        />

        <div className="relative mt-3">
          <DateInput name="date" control={control} label="날짜" />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-gs300 px-4 py-2"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="rounded-md bg-slate500 px-4 py-2 text-gs00"
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}
