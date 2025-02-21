'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { z } from 'zod';

interface GoalTodoModalProps {
  goalId: string;
  onClose: () => void;
  onAdd: (task: string, date: string) => void;
}

const GoalTodoSchema = z.object({
  title: z
    .string()
    .nonempty('제목을 입력해주세요.')
    .max(30, '제목은 30자 이하여야 합니다.'),
  date: z.date().optional(),
});

export default function GoalTodoModal({
  goalId,
  onClose,
  onAdd,
}: GoalTodoModalProps) {
  const [task, setTask] = useState('');
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState<string | null>(null);

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTask = e.target.value;
    setTask(newTask);

    if (newTask.length > 30) {
      setError('제목은 30자 이하여야 합니다.');
    } else {
      setError(null);
    }
  };

  const handleSubmit = () => {
    const result = GoalTodoSchema.safeParse({ title: task, date });

    if (!result.success) {
      setError(result.error.errors.map((err) => err.message).join(' '));
      return;
    }

    setError(null);
    const formattedDate = date.toISOString().split('T')[0];
    onAdd(task, formattedDate);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold">할 일 추가</h2>

        <p>목표</p>
        <input
          type="text"
          value={`임시목표 ${goalId}`}
          readOnly
          className="w-full cursor-not-allowed rounded-md border bg-gray-100 p-2 text-gray-600"
        />

        <p className="mt-4">할 일 제목</p>
        <input
          name="title"
          type="text"
          placeholder="할 일을 입력하세요"
          value={task}
          onChange={handleTaskChange}
          className="w-full rounded-md border p-2"
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        <div className="relative mt-3">
          <p>날짜</p>
          <DatePicker
            selected={date}
            onChange={(selectedDate) => selectedDate && setDate(selectedDate)}
            dateFormat="yyyy/MM/dd"
            className="w-full rounded-md border p-2"
          />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-gray-300 px-4 py-2"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-md bg-blue-500 px-4 py-2 text-white"
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
}
