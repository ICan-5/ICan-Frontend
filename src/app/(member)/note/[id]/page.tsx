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
    todo: '자바스크립트 기초',
  },
  {
    id: 2,
    title: '자바스크립트를 시작하기 전 준비물',
    todo: '자바스크립트 기초',
  },
  {
    id: 3,
    title: '프로그래밍 시작하기 in JavaScript',
    todo: '자바스크립트 기초',
  },
  {
    id: 4,
    title: '프로그래밍과 데이터 in JavaScript',
    todo: '자바스크립트 기초',
  },
];

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen w-full bg-gs100 px-4 py-8 sm:px-8 lg:px-16 xl:px-24">
      <Link
        href={`/goals/${params.id}`}
        className="mb-6 flex items-center gap-5 text-18SB"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        노트 모아보기
      </Link>

      <div className="mb-6 w-4/5 rounded-2xl bg-gs00 p-3 shadow">
        <NoteHeader id={params.id} />
      </div>

      <div>
        <NoteList notes={notes} />
      </div>
    </div>
  );
}
