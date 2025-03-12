'use client';

import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@/components/common/button/Button';

export default function TodayProgressError() {
  return (
    <div className="relative flex size-full min-h-48 flex-[3] flex-col rounded-2xl border-2 border-gs200 px-6 py-4 2xl:rounded-3xl">
      <p className="text-16SB text-gsBk 2xl:text-18SB">금일 진행도</p>
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <FontAwesomeIcon
          className="size-10 text-warn500"
          icon={faTriangleExclamation}
        />
        <span className="text-center text-16M text-gs600">
          데이터를 불러오는데 실패했습니다.
        </span>
        <Button
          variant="outline"
          size="medium"
          onClick={() => window.location.reload()}
        >
          retry
        </Button>
      </div>
    </div>
  );
}
