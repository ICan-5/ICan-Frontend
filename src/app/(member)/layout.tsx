import Navbar from '@/components/common/navbar/Navbar';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 will-change-scroll">
      <Navbar />
      <div className="w-full overflow-y-auto overscroll-contain">
        {children}
      </div>
    </div>
  );
}
