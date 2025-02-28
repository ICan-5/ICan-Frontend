'use client';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Button from '@/components/common/button/Button';
import Icon from '@/components/common/icon/Icon';
import TodoModal from '@/components/todoCalendar/TodoModal';

export default function TodayListEmpty() {
  const today = new Date();
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <div className="flex h-full flex-1 flex-col items-center justify-center gap-2 2xl:gap-3">
        <span className="text-12M text-gs400 2xl:text-14M">
          오늘의 할 일이 없어요.
        </span>
        <Button
          variant="outline"
          size="medium"
          onClick={() => setOpenModal(true)}
        >
          <Icon icon={faPlus} />새 할일 생성
        </Button>
      </div>
      {openModal && (
        <TodoModal
          selectedDate={today}
          onCloseModal={() => setOpenModal(false)}
        />
      )}
    </>
  );
}
