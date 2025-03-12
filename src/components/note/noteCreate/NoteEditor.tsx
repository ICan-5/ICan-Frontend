'use client';

import React, { useCallback, useEffect, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import '@/styles/textEditor.css';
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons';
import { NoteSchema, NoteSchemaType } from '@/lib/note-validation';
import NoteContentEditor from './NoteContentEditor';
import NoteTitle from './NoteTitle';
import { createNote } from '@/services/note';
import { useTodoWithGoalTitle } from '@/hooks/useTodoWithGoalTitle';
import NoteTitlesSkeleton from './NoteTitlesSkeleton';
import ConfirmModal from '../../common/ConfirmModal';
import EmbedPreview from './EmbedPreview';
import TempSaveNotification from './TempSaveNotification';
import NoteEditHeader from './NoteEditHeader';
import Icon from '../../common/icon/Icon';
import cn from '@/utils/cn';

export default function NoteEditor() {
  const { todoId } = useParams<{ todoId: string }>();
  const router = useRouter();
  // 할 일 제목, 목표 제목 가져오기
  const { todoQuery, goalQuery } = useTodoWithGoalTitle(todoId);

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

  // 임베드 URL 상태 관리
  const linkUrl = watch('linkUrl');
  // 임베드 링크
  const [embedUrl, setEmbedUrl] = useState(linkUrl);
  // 임베드 보기 여부
  const [embedVisible, setEmbedVisible] = useState(false);
  // 노트 수정하기 상태
  const [isEditMode, setIsEditMode] = useState(false);

  // 임시저장 데이터
  const [savedData, setSavedData] = useState<string | null>(null);
  // 임시저장 안내창 보기 여부
  const [showSavedData, setShowSavedData] = useState(!!savedData);

  // 안내 모달창 내용
  const [confirmModalContent, setConfirmModalContent] = useState({
    title: '',
    description: '',
    confirmText: '',
    onConfirm: () => {},
  });

  // 안내 모달창 보기 여부
  const [confirmModal, setConfirmModal] = useState(false);

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

  // 뒤로가기
  const handleBack = () => {
    const currentTitle = getValues('title');
    const currentContent = getValues('content');
    const currentLinkUrl = getValues('linkUrl');

    if (currentTitle || currentContent || currentLinkUrl) {
      setConfirmModalContent({
        title: '작성 중인 내용이 있습니다.',
        description: '페이지를 나가면 작성 중인 내용이 사라집니다',
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

  // 자동 임시 저장 기능(5분마다)
  useEffect(() => {
    const interval = setInterval(() => {
      handleTempSave();
    }, 300000); // 5분

    return () => clearInterval(interval);
  }, [handleTempSave]);

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

  return (
    <div className="flex size-full flex-col md:h-dvh md:flex-row">
      <EmbedPreview
        embedUrl={embedUrl}
        embedVisible={embedVisible}
        onClose={() => setEmbedVisible(false)}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex size-full flex-1 flex-col overflow-auto break-keep rounded-2xl border-2 border-gs200 bg-gs00 text-gs900 md:min-w-[452px]"
      >
        <div>
          <NoteEditHeader
            handleBack={handleBack}
            isValid={isValid}
            handleTempSave={handleTempSave}
            isEditMode={isEditMode}
            onSubmit={handleSubmit(onSubmit)}
          />

          <TempSaveNotification
            savedData={savedData}
            showSavedData={showSavedData}
            setShowSavedData={setShowSavedData}
            setTempData={setTempData}
          />

          {/* 목표 및 할 일 제목 섹션 */}
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
          <NoteTitle control={control} errors={errors} />
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
