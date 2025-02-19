import Navbar from '@/components/common/navbar/Navbar';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gs100 will-change-scroll">
      <Navbar />
      <div className="ml-16 flex-1 overflow-y-auto overscroll-contain sm:ml-0">
        {children}
      </div>
    </div>
  );
}
