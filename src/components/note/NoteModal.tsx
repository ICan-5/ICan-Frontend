'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faFlag,
  faLink,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import DOMPurify from 'dompurify';
import { useClickOutside } from '@/hooks/useClickOutside';
import IconButton from '../common/button/IconButton';
import { useDeleteNote, useNoteDetail } from '@/hooks/useNotes';
import SkeletonNoteModal from './SkeletonNoteModal';
import Icon from '../common/icon/Icon';

interface Props {
  noteId: number;
}

export default function NoteModal({ noteId }: Props) {
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);
  const [sanitizedContent, setSanitizedContent] = useState<string | null>(null);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      router.back();
    }, 200);
  };
  const [modalRef] = useClickOutside<HTMLDivElement>(closeModal);
  const [menuRef, isMenuOpen, setIsMenuOpen] =
    useClickOutside<HTMLDivElement>();

  const { data: note, isLoading, error } = useNoteDetail(noteId);
  const { mutate: deleteNote } = useDeleteNote();

  useEffect(() => {
    if (note?.content) {
      setSanitizedContent(DOMPurify.sanitize(note.content));
    }
  }, [note?.content]);

  const handleEdit = () => {
    setIsClosing(true);
    router.replace(`/note/${noteId}/edit`);
  };

  const handleDelete = () => {
    deleteNote(noteId, {
      onSuccess: () => {
        router.back();
      },
    });
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (error || !note) return <p>노트를 불러오는 중 오류 발생</p>;

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
            className="fixed inset-y-0 right-0 z-40 flex max-h-full flex-col bg-gs00 pb-6 shadow-lg sm:w-full lg:w-[45%] xl:w-[45%]"
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
            {isLoading && <SkeletonNoteModal />}
            {error && (
              <div className="px-6">
                <p className="text-16M">
                  노트를 불러오는 중 오류가 발생했습니다.
                </p>
              </div>
            )}
            {!isLoading && !error && (
              <div className="flex grow flex-col gap-6 overflow-y-auto px-6">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    {/* 목표 제목 */}
                    {note.goalTitle && (
                      <div className="flex items-center justify-between">
                        <h1 className="flex items-center gap-3 text-16M">
                          <div className="flex size-8 items-center justify-center rounded-full bg-slate100 p-1 text-slate500">
                            <Icon icon={faFlag} />
                          </div>
                          {note.goalTitle}
                        </h1>
                      </div>
                    )}
                    <div className="relative">
                      <IconButton
                        className="bg-gs00 text-gs400"
                        icon={faEllipsisVertical}
                        onClick={() => {
                          setIsMenuOpen(true);
                        }}
                      />
                      {isMenuOpen && (
                        <div
                          className="absolute right-0 z-10 mt-2 rounded bg-gs00 shadow-md"
                          ref={menuRef}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            className="flex whitespace-nowrap px-4 py-2 text-14R text-gs700 hover:bg-gs200"
                            onClick={handleEdit}
                          >
                            수정하기
                          </button>
                          <button
                            type="button"
                            className="flex whitespace-nowrap px-4 py-2 text-14R text-gs700 hover:bg-gs200"
                            onClick={handleDelete}
                          >
                            삭제하기
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* To do */}
                  <div className="flex items-center gap-2 text-gs700">
                    <span className="rounded bg-gs200 p-1 text-12M">To do</span>
                    <span className="text-14R">{note.todo.title}</span>
                    <span className="ml-auto text-12R">{note.updatedAt}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {/* 노트 제목 */}
                  <div className="flex items-center justify-between border-y py-3">
                    <h1 className="flex items-center text-18M">{note.title}</h1>
                  </div>
                  {note.linkUrl && (
                    <Link
                      href={note.linkUrl}
                      className="flex w-full items-center gap-2 rounded-3xl bg-gs200 px-2 py-1"
                    >
                      <div className="flex size-6 flex-none items-center justify-center rounded-full bg-slate500">
                        <FontAwesomeIcon
                          icon={faLink}
                          className="size-3 text-gs00"
                        />
                      </div>
                      <p className="truncate text-16M">{note.linkUrl}</p>
                    </Link>
                  )}

                  {/* 내용 */}
                  <div
                    className="whitespace-pre-line text-16R text-gs700"
                    dangerouslySetInnerHTML={{ __html: sanitizedContent || '' }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
