import SettingForm from '@/components/settings/SettingForm';
import ThemeColors from '@/components/settings/theme/ThemeColors';
import ThemeTab from '@/components/settings/theme/ThemeTabs';
import { getTheme, getThemeColor } from '@/services/theme';

export default async function page() {
  const theme = await getTheme();
  const themeColor = await getThemeColor();

  return (
    <div className="flex w-full flex-col gap-2 text-gsBk md:flex-row">
      <div className="flex-1">
        <h1 className="rounded-t-2xl border-2 border-gs200 bg-gs50 px-4 py-3 text-16SB 2xl:rounded-t-3xl 2xl:py-4 2xl:text-18SB">
          프로필 수정
        </h1>
        <SettingForm />
      </div>
      <div className="flex size-full flex-none flex-col md:w-[280px] lg:w-[350px]">
        <h1 className="flex rounded-t-2xl border-2 border-gs200 bg-gs50 px-4 py-3 text-16SB 2xl:rounded-t-3xl 2xl:py-4 2xl:text-18SB">
          테마변경
        </h1>
        <div className="flex flex-1 flex-col gap-5 rounded-b-2xl border-x-2 border-b-2 border-gs200 bg-gs00 p-3 2xl:rounded-b-3xl 2xl:p-4">
          <ThemeTab initialTheme={theme} />
          <ThemeColors initialColor={themeColor} />
        </div>
      </div>
    </div>
  );
}
