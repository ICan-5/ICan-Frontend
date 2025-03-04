import { notFound } from 'next/navigation';
import { fetchIntance } from './fetchInstance';
import { getErrorMessage } from '@/constants/errorMessages';

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 1월 = 0이므로 +1 필요
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};

export interface NoteResponse {
  id: number;
  title: string;
  content: string;
  linkUrl: string | null;
  updatedAt: string;
  todo: {
    id: number;
    title: string;
    done: boolean;
  };
  goal: {
    id: number;
    title: string;
  } | null;
}

export const getNoteDetail = async (noteId: number) => {
  try {
    const response = await fetchIntance({
      base: 'CODEIT',
      method: 'GET',
      url: `/notes/${noteId}`,
    });

    const data: NoteResponse = await response.json();

    return {
      goalTitle: data.goal?.title,
      todoTitle: data.todo.title,
      title: data.title,
      content: data.content,
      linkUrl: data.linkUrl,
      updatedAt: formatDate(data.updatedAt),
    };
  } catch {
    notFound();
    return null;
  }
};

/**
 * 노트 생성
 * @param
 */
export const createNote = async ({
  formData,
  todoId,
}: {
  formData: {
    title: string;
    content: string;
    linkUrl: string;
  };
  todoId: number;
}) => {
  try {
    const response = await fetch(`/api/note/${todoId}`, {
      method: 'POST',
      body: JSON.stringify({
        todoId,
        title: formData.title,
        content: formData.content,
        linkUrl: formData.linkUrl || 'https://www.codeit.kr',
      }),
    });

    if (!response.ok) throw new Error(getErrorMessage(response.status));
    const data = response.json();
    return { data };
  } catch (error) {
    console.error('노트 생성 중 오류 발생:', error);
    throw error;
  }
};
