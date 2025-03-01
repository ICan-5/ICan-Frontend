'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faXmark } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useGoals } from '@/hooks/useGoals';
import { Goal } from '@/types/goals';

interface NoteModalProps {
  goalTitle: string;
  todoTitle: string;
  title: string;
  content: string;
  linkUrl?: string;
  updatedAt: string;
}

export default function NoteModal({
  goalTitle,
  todoTitle,
  title,
  content,
  linkUrl = '',
  updatedAt,
}: NoteModalProps) {
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);
  console.log(linkUrl);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      router.back();
    }, 200);
  };
  const [modalRef] = useClickOutside<HTMLDivElement>(closeModal);

  return (
    <AnimatePresence>
      {!isClosing && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-gsBk/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // onClick={closeModal}
          />
          <motion.div
            ref={modalRef}
            className="fixed inset-y-0 right-0 z-40 bg-gs00 p-6 shadow-lg sm:w-full lg:w-[45%] xl:w-[45%]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* 닫기 버튼 */}
            <button
              type="button"
              className="mb-4 text-18R text-gs500 hover:text-gsBk"
              onClick={closeModal}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            {/* 목표 제목 */}
            <div className="flex items-center justify-between">
              <h1 className="flex items-center gap-3 text-18SB">
                <div className="flex size-8 items-center justify-center rounded-full bg-slate100 p-1 text-slate500">
                  <FontAwesomeIcon icon={faFlag} />
                </div>
                {goalTitle}
              </h1>
            </div>

            {/* To do */}
            <div className="my-2 flex items-center gap-2 text-gs600">
              <span className="rounded bg-gs200 px-1 text-16M">To do</span>
              <span className="text-16M">{todoTitle}</span>
              <span className="ml-auto text-14R">{updatedAt}</span>
            </div>

            {/* 노트 제목 */}
            <div className="flex items-center justify-between border-t pt-2">
              <h1 className="flex items-center text-16SB">{title}</h1>
            </div>

            {/* 내용 */}
            <div className="mt-3 border-t pt-2">
              <p className="text-gs600">{content}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
