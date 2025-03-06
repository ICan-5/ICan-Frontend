export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <div className="my-40 flex w-full flex-col items-center">
      <div className="w-full px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold">I:Can</h2>
        <p className="mb-10 break-keep text-gs700 dark:text-gs400">
          할 일을 계획하고 관리해요!
        </p>
      </div>
      <div className="w-full max-w-screen-sm px-4">{children}</div>{' '}
    </div>
  );
}
