import { fetchIntance } from './fetchInstance';

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
  } catch (error) {
    console.error('Failed to fetch note:', error);
    throw new Error('노트 정보를 불러오는데 실패했습니다.');
  }
};
