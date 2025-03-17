import colors from '@/presets/colors';

const goalColors: Record<
  | `goal0${1 | 2 | 3 | 4 | 5}`
  | `goal0${1 | 2 | 3 | 4 | 5}-100`
  | 'default'
  | 'default-100',
  string
> = {
  'default-100': colors.slate100,
  default: colors.slate500,
  'goal01-100': colors.goal01['100'],
  goal01: colors.goal01.DEFAULT,
  'goal02-100': colors.goal02['100'],
  goal02: colors.goal02.DEFAULT,
  'goal03-100': colors.goal03['100'],
  goal03: colors.goal03.DEFAULT,
  'goal04-100': colors.goal04['100'],
  goal04: colors.goal04.DEFAULT,
  'goal05-100': colors.goal05['100'],
  goal05: colors.goal05.DEFAULT,
};

export default goalColors;
