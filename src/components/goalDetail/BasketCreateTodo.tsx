import { useCallback, useEffect } from 'react';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '@/components/common/input/TextInput';
import Button from '../common/button/Button';
import { useGoals } from '@/hooks/useGoals';
import { Goal } from '@/types/goals';
import { useAddBasketTodo } from '@/hooks/useGoalBasketTodo';

const createBasketSchema = z.object({
  title: z
    .string()
    .nonempty('제목을 입력해주세요')
    .max(30, '제목은 30자 이하여야 합니다'),
  goal: z.any().nullable().optional(),
});

export type BasketFormValues = z.infer<typeof createBasketSchema>;

type Props = {
  goalId: number;
  basketId?: number | null;
  onClose: () => void;
  onCancel: () => void;
  isVisible?: boolean;
  initialData?: { title: string };
};

export default function GoalTodoCreateModal({
  goalId,
  basketId,
  onClose,
  onCancel,
  isVisible = true,
  initialData,
}: Props) {
  const { data: goals } = useGoals();
  const { mutate: addBasketTodo } = useAddBasketTodo();

  const goalTitle =
    goals?.find((goal: Goal) => goal.goalId === goalId)?.title || '목표 없음';

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<BasketFormValues>({
    mode: 'onChange',
    resolver: zodResolver(createBasketSchema),
    defaultValues: {
      title: initialData?.title || '',
    },
  });

  useEffect(() => {
    if (initialData) {
      setValue('title', initialData.title);
    }
  }, [initialData, setValue]);

  const titleValue = watch('title');

  const onSubmit = useCallback(
    (data: BasketFormValues) => {
      addBasketTodo(
        { title: data.title, goal: { goalId } },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    },
    [goalId, addBasketTodo, onClose],
  );

  if (!isVisible) return null;

  return (
    <div className="w-[520px] flex-col gap-6 rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-lg font-bold">
        {basketId ? '장바구니 할일 수정' : '장바구니 할일 생성'}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <div className="mt-4 flex w-full flex-row gap-2">
          <Button
            type="button"
            size="full"
            onClick={onCancel}
            className="bg-gs100 py-4 text-gs600 hover:bg-gs100"
          >
            취소
          </Button>
          <Button
            type="submit"
            size="full"
            className={`py-4 ${
              titleValue
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-600'
            }`}
            disabled={!titleValue}
          >
            {basketId ? '수정' : '추가'}
          </Button>
        </div>
      </form>
    </div>
  );
}
