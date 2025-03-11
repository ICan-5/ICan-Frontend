import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import TextInput from '@/components/common/input/TextInput';
import DropDownInput from '@/components/common/input/DropDownInput';
import DateInput from '../common/input/DateInput';
import cn from '@/utils/cn';
import Button from '../common/button/Button';
import { useGoals } from '@/hooks/useGoals';
import { useAddTodo, useUpdateTodo } from '@/hooks/useTodos';
import IconButton from '../common/button/IconButton';

const createTodoSchema = z.object({
  title: z
    .string()
    .nonempty('제목을 입력해주세요')
    .max(30, '제목은 30자 이하여야 합니다'),
  goal: z.any().nullable().optional(),
  date: z
    .date({ required_error: '날짜를 선택해주세요' })
    .refine((value) => value !== null, { message: '날짜를 선택해주세요' }),
});

export type TodoFormValues = z.infer<typeof createTodoSchema>;

interface Props {
  selectedDate: Date;
  onCloseModal: () => void;
  onShowConfirmModal: (value: TodoFormValues) => void;
  savedValues: TodoFormValues | null;
  isEdit: boolean;
  todoId?: number | null;
}

export default function CreateTodo({
  selectedDate,
  onCloseModal,
  onShowConfirmModal,
  savedValues,
  isEdit,
  todoId,
}: Props) {
  const { data: goalList, isLoading } = useGoals();
  const { mutate: addTodo } = useAddTodo();
  const { mutate: updateTodo } = useUpdateTodo();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (formData: TodoFormValues) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    if (isEdit && todoId) {
      updateTodo(
        {
          todoId,
          updatedFields: {
            ...formData,
            date: formData.date.toLocaleDateString('sv-SE'),
          },
        },
        { onSuccess: onCloseModal },
      );
    } else {
      addTodo(formData, {
        onSuccess: () => {
          onCloseModal();
        },
      });
    }
  };

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<TodoFormValues>({
    mode: 'onChange',
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: savedValues?.title || '',
      goal: savedValues?.goal || null,
      date: savedValues?.date || selectedDate,
    },
  });

  const watchedValues = watch();

  return (
    <div className="flex h-full w-[520px] flex-col gap-6 bg-gs00 p-6 md:h-auto md:rounded-lg">
      <div className="flex justify-between">
        <h2 className="text-18SB">{isEdit ? '할일 수정' : '할일 생성'}</h2>
        <IconButton
          icon={faXmark}
          className="md:hidden"
          onClick={() => onShowConfirmModal(watchedValues)}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <TextInput<TodoFormValues>
              name="title"
              label="할일 제목"
              placeholder="할일의 제목을 작성하세요"
              control={control}
              errors={errors}
            />
            <DateInput<TodoFormValues>
              name="date"
              label="날짜"
              control={control}
            />
            <DropDownInput<TodoFormValues>
              name="goal"
              label="목표"
              placeholder="목표를 선택해주세요"
              options={goalList}
              control={control}
              isLoading={isLoading}
            />
          </div>
          <div className="flex w-full flex-row gap-2">
            <Button
              size="full"
              onClick={() => onShowConfirmModal(watchedValues)}
              className="hidden bg-gs100 py-4 text-gs600 hover:bg-gs100 focus:bg-gs100 active:bg-gs100 md:block"
            >
              취소
            </Button>
            <Button
              size="full"
              type="submit"
              disabled={!isValid}
              className={cn('py-4')}
            >
              확인
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
