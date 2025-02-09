import Link from 'next/link';

export default function page() {
  return (
    <form className="mt-12 flex w-full flex-col items-center">
      <h2 className="mb-4 text-3xl font-bold">I:Can</h2>
      <p className="mb-10 text-slate-500">할 일을 계획하고 관리해요!</p>
      <div className="w-full max-w-screen-sm px-4">
        <div className="mb-6 w-full">
          <label className="flex flex-col" htmlFor="name">
            <span>이름</span>
            <input
              className="mt-3 rounded-xl bg-slate-50 px-6 py-3"
              id="name"
              name="name"
              placeholder="이름을 입력해주세요"
            />
          </label>
        </div>
        <div className="mb-6 w-full">
          <label className="flex flex-col" htmlFor="email">
            <span>이메일</span>
            <input
              className="mt-3 rounded-xl bg-slate-50 px-6 py-3"
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요"
            />
          </label>
        </div>
        <div className="mb-6 w-full">
          <label className="flex flex-col" htmlFor="password">
            <span>비밀번호</span>
            <input
              className="mt-3 rounded-xl bg-slate-50 px-6 py-3"
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              autoComplete="off"
            />
          </label>
        </div>
        <div className="mb-6 w-full">
          <label className="flex flex-col" htmlFor="confirmPassword">
            <span>비밀번호</span>
            <input
              className="mt-3 rounded-xl bg-slate-50 px-6 py-3"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              autoComplete="off"
            />
          </label>
        </div>
        <button
          className="mb-10 h-12 w-full rounded-xl bg-slate-400 text-white"
          type="submit"
        >
          회원가입하기
        </button>
        <p className="text-center">
          이미 회원이신가요?{' '}
          <Link
            className="text-blue-600 underline underline-offset-2"
            href="/login"
          >
            로그인
          </Link>
        </p>
      </div>
    </form>
  );
}
