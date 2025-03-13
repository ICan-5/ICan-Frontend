import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import TextInput from '@/components/common/input/TextInput';
import DateInput from '../common/input/DateInput';
import Button from '../common/button/Button';
import { useGoals } from '@/hooks/useGoals';
import { Goal } from '@/types/goals';
import { useGoalAddTodo, useUpdateGoalTodo } from '@/hooks/useGoalsTodo';
import IconButton from '@/components/common/button/IconButton';

const createTodoSchema = z.object({
  title: z
    .string()
    .nonempty('제목을 입력해주세요')
    .max(30, '제목은 30자 이하여야 합니다'),
  goal: z.any().nullable().optional(),
  date: z.date().optional(),
});

type TodoFormValues = z.infer<typeof createTodoSchema>;

interface Props {
  goalId: string;
  todoId?: number | null;
  onClose: () => void;
  onCancel: () => void;
  isVisible?: boolean;
}

export default function GoalTodoCreateModal({
  goalId,
  todoId,
  onClose,
  onCancel,
  isVisible = true,
}: Props) {
  const { data: goals } = useGoals();
  const { mutate: addTodoMutation } = useGoalAddTodo();
  const { mutate: updateTodoMutation } = useUpdateGoalTodo();

  const goalTitle = goals?.find(
    (goal: Goal) => goal.goalId === Number(goalId),
  )?.title;

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TodoFormValues>({
    mode: 'onChange',
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: '',
      date: new Date(),
    },
  });

  const titleValue = watch('title');

  const onSubmit = useCallback(
    (data: TodoFormValues) => {
      const formattedDate = data.date ?? new Date();

      if (todoId) {
        updateTodoMutation(
          {
            todoId,
            goalId: Number(goalId),
            title: data.title,
            date: formattedDate.toISOString(),
          },
          {
            onSuccess: () => {
              onClose();
            },
          },
        );
      } else {
        addTodoMutation(
          {
            title: data.title,
            goal: { goalId: Number(goalId) },
            date: formattedDate,
          },
          {
            onSuccess: () => {
              onClose();
            },
          },
        );
      }
    },
    [addTodoMutation, updateTodoMutation, goalId, todoId, onClose],
  );

  if (!isVisible) return null;

  return (
    <div className="flex size-full flex-col gap-6 bg-gs00 p-6 md:h-auto md:w-[520px] md:rounded-lg">
      <div className="flex justify-between">
        <h2 className="mb-4 text-lg font-bold">
          {todoId ? '할 일 수정' : '할 일 생성'}
        </h2>
        <IconButton icon={faXmark} className="md:hidden" onClick={onCancel} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
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
                onClick={onCancel}
                className="bg-gs100 py-4 text-gs600 hover:bg-gs100"
              >
                취소
              </Button>
              <Button
                type="submit"
                size="full"
                className={`py-4 ${
                  titleValue ? 'bg-slate500 text-gs00' : 'bg-gs300 text-gs600'
                }`}
                disabled={!titleValue}
              >
                {todoId ? '수정' : '추가'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
