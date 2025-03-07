import { getErrorMessage } from '@/constants/errorMessages';
import { fetchIntance } from './fetchInstance';
import { Todo } from '@/types/todos';

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};

const formatNoteData = (noteData: NoteResponse, todoData: Todo) => {
  return {
    title: noteData.title,
    content: noteData.content,
    linkUrl: noteData.linkUrl || null,
    updatedAt: formatDate(noteData.updatedAt),
    todo: todoData,
  };
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

// 클라이언트 컴포넌트에서 호출
export const getNoteDetail = async (noteId: number) => {
  const res = await fetch(`/api/notes/${noteId}`);
  if (!res.ok) throw new Error(getErrorMessage(res.status));

  const { noteData, todoData }: { noteData: NoteResponse; todoData: Todo } =
    await res.json();

  return formatNoteData(noteData, todoData);
};

// 서버 컴포넌트에서 호출
export const getServerNoteDetail = async (noteId: number) => {
  try {
    const res1 = await fetchIntance({
      base: 'CODEIT',
      method: 'GET',
      url: `/notes/${noteId}`,
    });
    if (!res1.ok) return res1;

    const noteData: NoteResponse = await res1.json();

    const res2 = await fetchIntance({
      method: 'GET',
      url: `/todos/${noteData.todo.id}`,
    });

    if (!res2.ok) return res2;

    const todoData: Todo = await res2.json();

    return formatNoteData(noteData, todoData);
  } catch {
    return null;
  }
};

/**
 * 노트 생성
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
    const res = await fetch(`/api/notes`, {
      method: 'POST',
      body: JSON.stringify({
        todoId,
        title: formData.title,
        content: formData.content,
        linkUrl: formData.linkUrl || 'https://www.codeit.kr',
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return data;
    }
    console.log('data', data);
    return { data };
  } catch (error) {
    console.log('err');
    return error;
  }
};

/**
 * 노트 삭제
 */
export const deleteNote = async (noteId: number) => {
  const res = await fetch(`/api/notes/${noteId}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error(getErrorMessage(res.status));
  return noteId;
};

// 목표별 노트 리스트 가져오기
export async function getNotes(goalId: number) {
  const res = await fetch(`/api/notes?goalId=${goalId}`);

  if (!res.ok) {
    throw new Error('Failed to fetch notes');
  }

  const data = await res.json();
  return data.notes;
}
