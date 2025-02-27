import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '@/components/common/input/TextInput';
import DateInput from '../common/input/DateInput';
import Button from '../common/button/Button';
import { useGoals } from '@/hooks/useGoals';
import { Goal } from '@/types/goals';

const createTodoSchema = z.object({
  title: z
    .string()
    .nonempty('제목을 입력해주세요')
    .max(30, '제목은 30자 이하여야 합니다'),
  goal: z.any().nullable().optional(),
  date: z.union([z.date(), z.string()]).optional(),
});

type CreateTodoFormData = z.infer<typeof createTodoSchema>;

type Props = {
  goalId: string;
  onClose: () => void;
  onAdd: (task: string, date: string) => void;
};

export default function GoalTodoCreateModal({ goalId, onClose, onAdd }: Props) {
  const { data: goals } = useGoals();

  const goalTitle = goals?.find(
    (goal: Goal) => goal.goalId === Number(goalId),
  )?.title;

  const onSubmit = async (data: CreateTodoFormData) => {
    const formattedDate = (() => {
      if (typeof data.date === 'string') return data.date;
      if (data.date instanceof Date) {
        return data.date.toISOString().split('T')[0];
      }
      return new Date().toISOString().split('T')[0];
    })();

    const payload = {
      title: data.title,
      goalId: Number(goalId),
      date: formattedDate,
    };

    const response = await fetch(`/api/goals/${goalId}/todos`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const newTodo = await response.json();
    onAdd(newTodo.title, formattedDate);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreateTodoFormData>({
    mode: 'onChange',
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: '',
      date: new Date(),
    },
  });

  const titleValue = watch('title');

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-[520px] flex-col gap-6 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold">할 일 생성</h2>
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
        <p className="mt-4 text-16SB text-gsBk">목표</p>
        <input
          type="text"
          value={goalTitle}
          readOnly
          className="mb-3 w-full cursor-not-allowed rounded-lg bg-gs100 p-2 px-4 py-3 text-16R text-gs600"
        />
        <div className="relative mt-3">
          <DateInput name="date" control={control} label="날짜" />
        </div>
        <div className="mt-4 flex w-full flex-row gap-2">
          <Button
            type="button"
            size="full"
            onClick={onClose}
            className="bg-gs100 py-4 text-gs600 hover:bg-gs100"
          >
            취소
          </Button>
          <Button
            type="button"
            size="full"
            onClick={handleSubmit(onSubmit)}
            className={`py-4 ${titleValue ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}
            disabled={!titleValue}
          >
            추가
          </Button>
        </div>
      </div>
    </div>
  );
}
