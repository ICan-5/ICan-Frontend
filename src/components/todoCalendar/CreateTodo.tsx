import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '@/components/common/input/TextInput';
import DropDownInput from '@/components/common/input/DropDownInput';
import DateInput from '../common/input/DateInput';
import cn from '@/utils/cn';
import Button from '../common/button/Button';

const options = [
  { id: 1, title: '자바스크립트 기초 챕터4 듣기', color: 'goal01' },
  { id: 2, title: 'React 프로젝트 만들기', color: 'goal02' },
  { id: 3, title: 'Next.js 학습하기', color: 'goal01' },
  { id: 4, title: '또 다른 목표', color: 'goal01' },
  {
    id: 5,
    title:
      '목표가 길어지면 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구',
    color: 'goal01',
  },
];

const createTodoSchema = z.object({
  title: z
    .string()
    .nonempty('제목을 입력해주세요')
    .max(30, '제목은 30자 이하여야 합니다'),
  goal: z.any().nullable().optional(),
  date: z.date().optional(),
});

export type TodoFormValues = z.infer<typeof createTodoSchema>;

type Props = {
  selectedDate: Date;
  onCloseModal: () => void;
  onShowConfirmModal: (value: TodoFormValues) => void;
  savedValues: TodoFormValues | null;
};

export default function CreateTodo({
  selectedDate,
  onCloseModal,
  onShowConfirmModal,
  savedValues,
}: Props) {
  const onSubmit = (formData: TodoFormValues) => {
    console.log(formData);
    onCloseModal();
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <TextInput<TodoFormValues>
            name="title"
            label="할 일 제목"
            placeholder="할 일의 제목을 작성하세요"
            control={control}
            errors={errors}
          />
          <DropDownInput<TodoFormValues>
            name="goal"
            label="목표"
            placeholder="목표를 선택해주세요"
            options={options}
            control={control}
          />
          <DateInput<TodoFormValues>
            name="date"
            label="날짜"
            control={control}
          />
        </div>
        <div className="flex w-full flex-row gap-2">
          <Button
            size="full"
            onClick={() => onShowConfirmModal(watchedValues)}
            className="bg-gs100 py-4 text-gs600 hover:bg-gs100 focus:bg-gs100 active:bg-gs100"
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
  );
}
