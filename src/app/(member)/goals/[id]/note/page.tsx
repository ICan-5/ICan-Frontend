import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import NoteHeader from '@/components/note/NoteHeader';
import NoteList from '@/components/note/NoteList';

config.autoAddCss = false;

const notes = [
  {
    id: 1,
    title: '자바스크립트를 배우기 전 알아두어야 할 것',
    todo: '자바스크립트 기초 1',
    content: '내용이 어쩌구 저쩌구 내용이 어쩌구 저쩌구',
    date: '2024.02.04',
  },
  {
    id: 2,
    title: '자바스크립트를 시작하기 전 준비물',
    todo: '자바스크립트 기초 2',
    content: '내용이 어쩌구 저쩌구 내용이 어쩌구 저쩌구',
    date: '2024.02.04',
  },
  {
    id: 3,
    title: '프로그래밍 시작하기 in JavaScript',
    todo: '자바스크립트 기초 3',
    content: '내용이 어쩌구 저쩌구 내용이 어쩌구 저쩌구',
    date: '2024.02.04',
  },
  {
    id: 4,
    title: '프로그래밍과 데이터 in JavaScript',
    todo: '자바스크립트 기초 4',
    content: '내용이 어쩌구 저쩌구 내용이 어쩌구 저쩌구',
    date: '2024.02.04',
  },
];

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="relative left-1/2 w-full max-w-screen-xl -translate-x-1/2 bg-gs100">
      <div className="mb-4 flex items-center gap-2 text-18SB">
        <Link href={`/goals/${params.id}`}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        노트 모아보기
      </div>
      <div className="mb-3 h-[52px] rounded-xl bg-gs00 p-3 shadow">
        <NoteHeader id={params.id} />
      </div>
      <div>
        <NoteList notes={notes} goalId={params.id} />
      </div>
    </div>
  );
}
