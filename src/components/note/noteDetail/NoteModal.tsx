'use client';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useClickOutside } from '@/hooks/useClickOutside';
import IconButton from '../../common/button/IconButton';
import NoteDetail from './NoteDetail';

interface Props {
  noteId: number;
}

export default function NoteModal({ noteId }: Props) {
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      router.back();
    }, 200);
  };
  const [modalRef] = useClickOutside<HTMLDivElement>(closeModal);

  return createPortal(
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
            className="fixed inset-y-0 right-0 z-40 flex max-h-full w-full flex-col bg-gs00 pb-6 shadow-lg lg:w-[45%]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* 닫기 버튼 */}
            <IconButton
              className="my-6 size-6 items-center justify-center px-6 text-18R text-gs500 hover:text-gsBk"
              onClick={closeModal}
              icon={faXmark}
            />
            <NoteDetail noteId={noteId} isModal setIsClosing={setIsClosing} />
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
