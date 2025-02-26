'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faXmark } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import ReactDOM from 'react-dom';
import { useClickOutside } from '@/hooks/useClickOutside';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: {
    id: number;
    title: string;
    todo: string;
    content: string;
    date: string;
  };
  goalId: string;
}

export default function NoteModal({
  isOpen,
  onClose,
  note,
  goalId,
}: NoteModalProps) {
  const [modalRef] = useClickOutside<HTMLDivElement>(onClose);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-10 bg-gsBk/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={modalRef}
            className="fixed inset-y-0 right-0 z-20 bg-gs00 p-6 shadow-lg sm:w-full lg:w-[45%] xl:w-[45%]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* 닫기 버튼 */}
            <button
              type="button"
              className="mb-4 text-18R text-gs500 hover:text-gsBk"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            {/* 목표 제목 */}
            <div className="flex items-center justify-between">
              <h1 className="flex items-center gap-3 text-18SB">
                <div className="flex size-8 items-center justify-center rounded-full bg-slate100 text-slate500">
                  <FontAwesomeIcon icon={faFlag} />
                </div>
                임시 목표 {goalId}
              </h1>
            </div>

            {/* To do */}
            <div className="my-2 flex items-center gap-2 text-gs600">
              <span className="rounded bg-gs200 text-16M">To do</span>
              <span className="text-16M">{note.todo}</span>
              <span className="ml-auto text-14R">{note.date}</span>
            </div>

            {/* 노트 제목 */}
            <div className="flex items-center justify-between border-t pt-2">
              <h1 className="flex items-center text-16SB">{note.title}</h1>
            </div>

            {/* 내용 */}
            <div className="mt-3 border-t pt-2">
              <p className="text-gs600">{note.content}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}
