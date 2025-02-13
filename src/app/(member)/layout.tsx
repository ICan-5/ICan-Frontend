import Navbar from '@/components/common/navbar/Navbar';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100">
      <Navbar />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
