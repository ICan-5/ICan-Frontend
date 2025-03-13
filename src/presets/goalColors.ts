import colors from '@/presets/colors';

const goalColors: Record<
  `goal0${1 | 2 | 3 | 4 | 5}` | 'default',
  { 100: string; DEFAULT: string }
> = {
  default: { 100: colors.slate100, DEFAULT: colors.slate500 },
  goal01: { 100: '#FFEEE0', DEFAULT: '#FB923C' },
  goal02: { 100: '#FFF9E1', DEFAULT: '#FACC15' },
  goal03: { 100: '#E0FFFB', DEFAULT: '#2DD4BF' },
  goal04: { 100: '#FCF3FE', DEFAULT: '#C95AEE' },
  goal05: { 100: '#FFECEC', DEFAULT: '#F87171' },
};

export default goalColors;
