import IcanLogo from '@/components/common/IcanLogo';
import IcanTitle from '@/components/common/IcanTitle';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="my-24 flex w-full flex-col items-center sm:my-32">
      <div className="w-full px-4 text-center">
        <h2 className="mb-4 flex items-center justify-center gap-3">
          <IcanLogo className="size-12 flex-none" />
          <IcanTitle className="h-8 w-28" />
        </h2>
        <p className="mb-10 break-keep text-gs700">
          할 일을 계획하고 관리해요!
        </p>
      </div>
      <div className="w-full max-w-screen-sm px-4">{children}</div>
    </div>
  );
}
