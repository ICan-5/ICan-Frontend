'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons/faFontAwesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import {
  faArrowLeft,
  faClose,
  faExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner';
import Button from '../common/button/Button';
import Icon from '../common/icon/Icon';
import '@/styles/textEditor.css';
import { NoteSchema, NoteSchemaType } from '@/lib/note-validation';
import NoteContentEditor from './NoteContentEditor';
import NoteTitle from './NoteTitle';
import { createNote } from '@/services/note';
import { useTodoWithGoalTitle } from '@/hooks/useTodoWithGoalTitle';
import NoteTitlesSkeleton from './NoteTitlesSkeleton';
import cn from '@/utils/cn';
import ConfirmModal from '../common/ConfirmModal';

export default function NoteEditor() {
  const { todoId } = useParams<{ todoId: string }>();
  const router = useRouter();
  const objectRef = useRef<HTMLObjectElement | null>(null);
  const [fallback, setFallback] = useState(false);

  // rhf을 통한 폼 상태 관리
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    setValue,
    clearErrors,
    watch,
    trigger,
  } = useForm({
    resolver: zodResolver(NoteSchema), // Zod 스키마를 사용한 유효성 검사
    defaultValues: { title: '', content: '', linkUrl: '' },
    mode: 'onChange',
  });

  // 할 일 제목, 목표 제목 가져오기
  const { todoQuery, goalQuery } = useTodoWithGoalTitle(todoId);

  // 임베드 URL 상태 관리
  const linkUrl = watch('linkUrl');
  const [embedUrl, setEmbedUrl] = useState(linkUrl);
  const [embedVisible, setEmbedVisible] = useState(false);
  // 노트 수정하기 상태
  const [isEditMode, setIsEditMode] = useState(false);

  const [confirmModalContent, setConfirmModalContent] = useState({
    title: '',
    description: '',
    confirmText: '',
    onConfirm: () => {},
  });

  // 노트 저장 함수
  const onSubmit = async (formData: NoteSchemaType) => {
    if (todoId) {
      try {
        const res = await createNote({
          todoId: Number(todoId),
          formData,
        });

        if (!res.data) {
          const errorMessage = res?.message;
          toast.error(errorMessage);
          return;
        }

        toast.success(res?.data.message);
        router.back(); // 이전 페이지로 이동
      } catch {
        toast.error('노트 생성 중 알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  // 임시 저장 기능
  const handleTempSave = useCallback(() => {
    if (isValid) {
      const noteData = getValues();
      localStorage.setItem(`todo-${todoId}`, JSON.stringify(noteData));
      toast.success('임시 저장이 완료되었습니다');
    }
  }, [isValid, getValues, todoId]);

  // 자동 임시 저장 기능(5분마다)
  useEffect(() => {
    const interval = setInterval(() => {
      handleTempSave();
    }, 300000); // 5분

    return () => clearInterval(interval);
  }, [handleTempSave]);

  const [savedData, setSavedData] = useState<string | null>(null);
  const [showSavedData, setShowSavedData] = useState(!!savedData);

  const [confirmModal, setConfirmModal] = useState(false);

  // 임시 저장된 데이터 setValue
  const setFormData = useCallback(
    (parsedData: { [key: string]: string }) => {
      Object.keys(parsedData).forEach((key) => {
        setValue(key as 'title' | 'content' | 'linkUrl', parsedData[key]);
      });
      trigger();
    },
    [setValue, trigger],
  );

  // 임시 저장된 노트 불러오기 클릭
  const handleConfirmLoad = useCallback(() => {
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        setConfirmModal(false); // 모달 닫기
        toast.success('임시 저장된 노트를 불러왔습니다.');
      } catch (error) {
        toast.error('임시 저장된 데이터를 불러오는 중 오류가 발생했습니다.');
        console.error('임시 저장된 데이터를 불러오는 중 오류:', error);
      }
    }
  }, [savedData, setFormData]);
  // 임시 저장된 데이터 가져오기
  const setTempData = useCallback(() => {
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // 현재 입력된 값 가져오기
        const currentTitle = getValues('title');
        const currentContent = getValues('content');
        const currentLinkUrl = getValues('linkUrl');

        // 입력 값이 있으면 모달 띄우기

        if (currentTitle || currentContent || currentLinkUrl) {
          setConfirmModalContent({
            title: '작성 중인 내용이 있습니다.',
            description: '임시 저장된 노트를 불러오면 기존 내용이 변경됩니다.',
            confirmText: '불러오기',
            onConfirm: handleConfirmLoad,
          });
          setConfirmModal(true);
        } else {
          setFormData(parsedData);
        }
      } catch (error) {
        toast.error('임시 저장된 데이터를 불러오는 중 오류가 발생했습니다.');
        console.error('임시 저장된 데이터를 불러오는 중 오류:', error);
      }
    }
  }, [savedData, getValues, handleConfirmLoad, setFormData]);

  useEffect(() => {
    setIsEditMode(false);
    // 노트 수정하기
    if (isEditMode) {
      // 기존 노트 데이터 가져오기
      //
    } else if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem(`todo-${todoId}`);
      setSavedData(storedData);
      setShowSavedData(!!storedData);
    }
  }, [todoId, isEditMode, setTempData]);

  // 링크 URL 변경 시 임베드 URL 업데이트
  useEffect(() => {
    setEmbedUrl(linkUrl || '');
    if (!linkUrl) setEmbedVisible(false);
  }, [linkUrl]);

  const handleBack = () => {
    const currentTitle = getValues('title');
    const currentContent = getValues('content');
    const currentLinkUrl = getValues('linkUrl');

    if (currentTitle || currentContent || currentLinkUrl) {
      setConfirmModalContent({
        title: '작성 중인 내용이 있습니다.',
        description:
          '페이지를 나가면 작성 중인 내용이 사라질 수 있습니다. 계속 진행하시겠습니까?',
        confirmText: '나가기',
        onConfirm: () => {
          setConfirmModal(false); // 모달 닫기
          router.back(); // 이전 페이지로 이동
        },
      });
      setConfirmModal(true);
    } else {
      router.back();
    }
  };

  // object 지원 체크
  const checkEmbedUrl = useCallback(() => {
    if (!objectRef.current) {
      return;
    }

    setTimeout(() => {
      const objectEl = objectRef.current;
      if (
        objectEl &&
        (objectEl.clientWidth === 0 || objectEl.clientHeight === 0)
      ) {
        console.warn('object 태그가 지원되지 않음. iframe으로 대체');
        // iframe 대체
        setFallback(true);
      }
    }, 100);
  }, []);

  return (
    <div className="flex h-dvh w-full flex-col sm:flex-row">
      {/* 임베드 URL이 있으면 표시 */}
      {embedVisible && embedUrl !== '' && (
        <section className="relative h-auto flex-1">
          {fallback ? (
            <iframe
              src={embedUrl}
              className="size-full rounded-2xl"
              title="EmbeddedContent"
              id="EmbeddedContent"
              sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"
              referrerPolicy="no-referrer"
            />
          ) : (
            <object
              ref={objectRef}
              data={embedUrl}
              className="flex size-full items-center justify-center break-keep rounded-2xl bg-gs200 px-4 text-center"
            >
              <p>
                <a
                  href={embedUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate500 underline underline-offset-4 transition-colors hover:text-slate700 focus:text-slate700 active:text-slate700"
                >
                  링크 열기
                </a>
                <br />
                <span className="mt-3 inline-block text-14R text-gs600">
                  이 콘텐츠는 직접 임베드할 수 없습니다!
                  <br />
                  링크로 이동하여 콘텐츠를 확인하세요
                </span>
              </p>
            </object>
          )}

          <button type="button" onClick={() => setEmbedVisible(false)}>
            <Icon
              icon={faClose}
              className="absolute right-4 top-4 rounded-full bg-gs600 text-gs00 transition-colors hover:bg-gs700 focus:bg-gs700 active:bg-gs700"
            />
          </button>
        </section>
      )}
      {/* 노트 작성 폼 */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex size-full flex-1 flex-col overflow-auto break-keep rounded-2xl border-2 border-gs200 bg-gs00 text-gs900"
      >
        <div>
          {/* 노트 작성 헤더 섹션 */}
          <div className="w-full items-center border-b-2 border-gs200 bg-gs50 px-4 py-2 xs:flex">
            <button type="button" onClick={handleBack}>
              <Icon icon={faArrowLeft} className="size-5" />
            </button>
            <div className="ml-2 flex w-full items-center justify-between">
              <h2 className="text-14SB xs:text-16SB md:text-18SB">노트 작성</h2>
              <div className="flex justify-end gap-2 xs:justify-normal">
                {/* 임시 저장 버튼 */}
                <Button
                  disabled={!isValid}
                  size="medium"
                  variant="outline"
                  className="border-none bg-transparent !px-1 !py-3 transition-colors xs:!px-4 sm:!px-6 2xl:rounded-lg 2xl:!px-6 2xl:!text-14SB"
                  onClick={() => {
                    handleTempSave();
                  }}
                >
                  임시저장
                </Button>
                {/* 제출 버튼 */}
                <Button
                  size="medium"
                  className="!px-1 !py-3 transition-colors xs:!px-4 sm:!px-6 2xl:rounded-lg 2xl:!px-6 2xl:!text-14SB"
                  type="submit"
                  disabled={!isValid}
                >
                  {isEditMode ? '수정 완료' : '작성 완료'}
                </Button>
              </div>
            </div>
          </div>

          {/* 임시 저장된 노트 알림 */}
          {showSavedData && (
            <section className="flex h-fit w-full flex-wrap items-center rounded-b-[28px] bg-slate100 px-4 py-2">
              <div className="mb-1 flex flex-1 flex-nowrap items-center sm:mb-0">
                <Icon icon={faExclamation} className="text-slate500" />
                <p className="text-14M text-slate500">
                  임시 저장된 노트가 있어요. 저장된 노트를 불러오시겠어요?
                </p>
              </div>
              <div className="ml-auto flex min-w-40 items-center justify-end">
                <Button
                  className="bg-transparent !py-2 px-5 !text-14R text-gs600 transition-colors hover:bg-transparent focus:bg-transparent active:bg-transparent 2xl:!text-14R"
                  onClick={() => setShowSavedData(false)}
                >
                  닫기
                </Button>
                <Button
                  variant="outline"
                  className="h-9 rounded-full px-4 py-2 text-14M transition-colors 2xl:rounded-full 2xl:py-2 2xl:!text-14M"
                  onClick={() => {
                    setTempData();
                    setShowSavedData(false);
                  }}
                >
                  불러오기
                </Button>
              </div>
            </section>
          )}
          {/* 목표와 할 일 제목이 로딩 중일 경우 스켈레톤 표시 */}
          {todoQuery.isLoading || goalQuery.isLoading ? (
            <NoteTitlesSkeleton />
          ) : (
            <>
              {/* 목표 제목이 있을 경우 표시 */}
              {goalQuery.data?.todo.title && (
                <section className="mx-6 mb-2 mt-4 flex items-center gap-3">
                  <Icon
                    icon={faFontAwesome}
                    className="size-4 rounded-lg text-lg text-[#FB923C]"
                  />
                  <h3 className="w-[calc(100%-40px)] break-words text-16M text-gs800">
                    {goalQuery.data?.todo.title}
                  </h3>
                </section>
              )}
              {/* 할 일 제목 */}
              <article
                className={cn(
                  'mx-6 mb-4 flex items-center gap-2 text-gs700',
                  !goalQuery.data?.todo.title && 'mt-4',
                )}
              >
                <span className="h-5 min-w-10 rounded-s bg-gs100 p-1 text-center text-12M">
                  To do
                </span>
                <h4 className="w-[calc(100%-44px)] break-words text-14R text-gs600">
                  {todoQuery.data?.title}
                </h4>
              </article>
            </>
          )}
        </div>
        <div className="mx-6 mb-6 flex h-full min-h-0 flex-col text-gs800">
          {/* 노트 제목 */}
          <NoteTitle control={control} errors={errors} />
          {/* 노트 컨텐츠 영역 */}
          <NoteContentEditor
            control={control}
            errors={errors}
            watch={watch}
            getValues={getValues}
            setError={setError}
            clearErrors={clearErrors}
            trigger={trigger}
            setValue={setValue}
            isValid={isValid}
            setEmbedVisible={setEmbedVisible}
            checkEmbedUrl={checkEmbedUrl}
          />
        </div>
      </form>

      {confirmModal && (
        <ConfirmModal
          title={confirmModalContent.title}
          description={confirmModalContent.description}
          confirmText={confirmModalContent.confirmText}
          onCancel={() => setConfirmModal(false)}
          onConfirm={confirmModalContent.onConfirm}
        />
      )}
    </div>
  );
}
