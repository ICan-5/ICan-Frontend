import Navbar from '@/components/common/navbar/Navbar';

export default function Layout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gs100 will-change-scroll">
      <Navbar />
      <div className="ml-16 flex-1 overflow-y-auto overscroll-contain md:ml-0">
        <div className="relative left-1/2 flex max-h-[1000px] w-full max-w-screen-xl -translate-x-1/2 flex-col gap-4 overflow-auto p-4 md:h-screen md:gap-8 md:p-10">
          {children}
        </div>
        {modal}
      </div>
    </div>
  );
}
