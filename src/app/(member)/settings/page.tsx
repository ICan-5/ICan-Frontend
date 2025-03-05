import SettingForm from '@/components/settings/SettingForm';

export default function page() {
  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <div className="flex-1">
        <h1 className="rounded-t-2xl border-2 border-gs200 bg-gs50 px-4 py-3 text-16SB 2xl:rounded-t-3xl 2xl:py-4 2xl:text-18SB">
          프로필 수정
        </h1>
        <SettingForm />
      </div>
      <div className="size-full md:w-[280px] lg:w-[350px]">
        <h1 className="rounded-t-2xl border-2 border-gs200 bg-gs50 px-4 py-3 text-16SB 2xl:rounded-t-3xl 2xl:py-4 2xl:text-18SB">
          테마변경
        </h1>
        <div className="rounded-b-2xl border-x-2 border-b-2 border-gs200 bg-gs00 p-3 2xl:rounded-b-3xl 2xl:p-4" />
      </div>
    </div>
  );
}
