import { getErrorMessage } from '@/constants/errorMessages';
import { fetchIntance } from './fetchInstance';

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};

const formatNoteData = (data: NoteResponse) => ({
  goalTitle: data.goal?.title ?? null,
  todoTitle: data.todo.title,
  title: data.title,
  content: data.content,
  linkUrl: data.linkUrl,
  updatedAt: formatDate(data.updatedAt),
});

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

// 클라이언트 컴포넌트에서 호출
export const getNoteDetail = async (noteId: number) => {
  const res = await fetch(`/api/notes/${noteId}`);
  if (!res.ok) throw new Error(getErrorMessage(res.status));

  const data: NoteResponse = await res.json();

  return formatNoteData(data);
};

// 서버 컴포넌트에서 호출
export const getServerNoteDetail = async (noteId: number) => {
  try {
    const res = await fetchIntance({
      base: 'CODEIT',
      method: 'GET',
      url: `/notes/${noteId}`,
    });
    if (!res.ok) throw new Error(getErrorMessage(res.status));

    const data: NoteResponse = await res.json();

    return formatNoteData(data);
  } catch {
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
