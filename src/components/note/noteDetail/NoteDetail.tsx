'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faEllipsisVertical,
  faFlag,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { useClickOutside } from '@/hooks/useClickOutside';
import IconButton from '../../common/button/IconButton';
import { useDeleteNote, useNoteDetail } from '@/hooks/useNotes';
import SkeletonNoteModal from './SkeletonNoteModal';
import Icon from '../../common/icon/Icon';
import cn from '@/utils/cn';
import EmbedPreview from '../noteCreate/EmbedPreview';
import ConfirmModal from '@/components/common/ConfirmModal';

const goalColor: Record<string, string> = {
  goal01: 'text-goal01',
  goal02: 'text-goal02',
  goal03: 'text-goal03',
  goal04: 'text-goal04',
  goal05: 'text-goal05',
  default: 'text-slate500',
};

interface Props {
  noteId: number;
  isModal?: boolean;
  embedVisible?: boolean;
  setEmbedVisible?: (visible: boolean) => void;
  setIsClosing?: (value: boolean) => void;
  setShowConfirm?: (value: boolean) => void;
}

export default function NoteDetail({
  noteId,
  isModal,
  embedVisible: embedVisibleProp,
  setEmbedVisible: setEmbedVisibleProp,
  setIsClosing,
  setShowConfirm: setShowConfirmProp,
}: Props) {
  const router = useRouter();
  const [sanitizedContent, setSanitizedContent] = useState<string | null>(null);

  const [menuRef, isMenuOpen, setIsMenuOpen] =
    useClickOutside<HTMLDivElement>();

  const { data: note, isLoading, error } = useNoteDetail(noteId);
  const { mutate: deleteNote } = useDeleteNote();

  const [embedVisible, setEmbedVisible] = useState(embedVisibleProp ?? false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (note?.content) {
      setSanitizedContent(DOMPurify.sanitize(note.content));
    }
  }, [note?.content, note?.linkUrl]);

  const handleEdit = () => {
    if (setIsClosing) {
      setIsClosing(true);

      router.replace(`/note/${noteId}/edit`);
    } else {
      router.push(`/note/${noteId}/edit`);
    }
  };

  const handleDeleteButton = () => {
    if (setShowConfirmProp) {
      setShowConfirmProp(true);
    }
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    deleteNote(noteId, {
      onSuccess: () => {
        router.back();
      },
    });
    setShowConfirm(false);
    if (setShowConfirmProp) {
      setShowConfirmProp(false);
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  if (isLoading) return <SkeletonNoteModal />;
  if (error || !note) {
    return (
      <div className="px-6">
        <p className="text-16M">노트를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'size-full overflow-y-auto',

        { 'lg:flex': embedVisible },
      )}
    >
      {note.linkUrl && (
        <EmbedPreview
          embedUrl={note.linkUrl}
          embedVisible={embedVisible}
          onClose={() => {
            if (setEmbedVisibleProp) {
              setEmbedVisibleProp(false);
            }
            setEmbedVisible(false);
          }}
        />
      )}

      <div
        className={cn(
          'flex grow flex-col bg-gs00',
          {
            'lg:w-1/4': embedVisible && isModal,
            'lg:w-1/3': embedVisible && !isModal,
          },
          {
            'rounded-2xl border-2 border-gs200': !isModal,
          },
        )}
      >
        {!isModal && (
          <div className="flex w-full gap-2 rounded-t-2xl border-b-2 border-gs200 bg-gs50 p-4">
            <IconButton icon={faArrowLeft} onClick={handleBack} />
            <h1 className="text-18SB text-gsBk">노트</h1>
          </div>
        )}

        <div
          className={cn('flex size-full grow flex-col gap-6 px-6', {
            'pt-6': !isModal,
          })}
        >
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              {/* 목표 제목 */}
              <div className="flex items-center justify-between">
                {note.todo.goal && (
                  <h1 className="flex items-center gap-3 text-16M">
                    <Icon
                      icon={faFlag}
                      className={cn(
                        goalColor[note.todo.goal?.color || 'default'],
                      )}
                    />
                    {note.todo.goal?.title}
                  </h1>
                )}
              </div>
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
                      className="flex whitespace-nowrap rounded px-4 py-2 text-14R text-gs700 hover:bg-gs200"
                      onClick={handleEdit}
                    >
                      수정하기
                    </button>
                    <button
                      type="button"
                      className="flex whitespace-nowrap rounded px-4 py-2 text-14R text-gs700 hover:bg-gs200"
                      onClick={handleDeleteButton}
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
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-3xl bg-gs200 px-2 py-1"
                onClick={() => {
                  if (setEmbedVisibleProp) {
                    setEmbedVisibleProp(true);
                  }
                  setEmbedVisible(true);
                }}
              >
                <div className="flex size-6 flex-none items-center justify-center rounded-full bg-slate500">
                  <FontAwesomeIcon icon={faLink} className="size-3 text-gs00" />
                </div>
                <p className="truncate text-16M">{note.linkUrl}</p>
              </button>
            )}

            {/* 내용 */}
            <div
              className="whitespace-pre-line text-16R text-gs700"
              dangerouslySetInnerHTML={{ __html: sanitizedContent || '' }}
            />
          </div>
        </div>
      </div>
      {showConfirm && (
        <ConfirmModal
          title="노트를 삭제 하시겠어요?"
          description="작성된 내용이 모두 사라지고 복구할 수 없습니다."
          confirmText="지우기"
          onCancel={() => {
            if (setShowConfirmProp) {
              setShowConfirmProp(false);
            }
            setShowConfirm(false);
          }}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
