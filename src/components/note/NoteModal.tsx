'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faLink, faXmark } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useGoals } from '@/hooks/useGoals';
import { Goal } from '@/types/goals';

interface NoteModalProps {
  goalTitle?: string | null;
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
  linkUrl = 'https://www.codeit.kr/topics/getting-started-with-javascript/lessons/3480',
  updatedAt,
}: NoteModalProps) {
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);

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
          />
          <motion.div
            ref={modalRef}
            className="fixed inset-y-0 right-0 z-40 flex max-h-full flex-col bg-gs00 pb-6 shadow-lg sm:w-full lg:w-[45%] xl:w-[45%]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* 닫기 버튼 */}
            <button
              type="button"
              className="my-6 size-6 items-center justify-center px-6 text-18R text-gs500 hover:text-gsBk"
              onClick={closeModal}
            >
              <FontAwesomeIcon icon={faXmark} className="size-3" size="sm" />
            </button>

            <div className="flex grow flex-col gap-6 overflow-y-auto px-6">
              <div className="flex flex-col gap-3">
                {/* 목표 제목 */}
                {goalTitle && (
                  <div className="flex items-center justify-between">
                    <h1 className="flex items-center gap-3 text-16M">
                      <div className="flex size-8 items-center justify-center rounded-full bg-slate100 p-1 text-slate500">
                        <FontAwesomeIcon icon={faFlag} />
                      </div>
                      {goalTitle}
                    </h1>
                  </div>
                )}

                {/* To do */}
                <div className="flex items-center gap-2 text-gs700">
                  <span className="rounded bg-gs200 p-1 text-12M">To do</span>
                  <span className="text-14R">{todoTitle}</span>
                  <span className="ml-auto text-12R">{updatedAt}</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {/* 노트 제목 */}
                <div className="flex items-center justify-between border-y py-3">
                  <h1 className="flex items-center text-18M">{title}</h1>
                </div>

                <Link
                  href={linkUrl}
                  className="flex w-full items-center gap-2 rounded-3xl bg-gs200 px-2 py-1"
                >
                  <div className="flex size-6 flex-none items-center justify-center rounded-full bg-slate500">
                    <FontAwesomeIcon
                      icon={faLink}
                      className="size-3 text-gs00"
                    />
                  </div>
                  <p className="truncate text-16M">{linkUrl}</p>
                </Link>

                {/* 내용 */}
                <p className="whitespace-pre-line text-16R text-gs700">
                  {content}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
