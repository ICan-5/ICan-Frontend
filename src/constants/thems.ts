export const THEME_COLORS = [
  { id: 'blue', primary: 'bg-[#60A5FA]', secondary: 'bg-[#DBEAFE]' },
  { id: 'green', primary: 'bg-[#34D399]', secondary: 'bg-[#D1FAE5]' },
  { id: 'pink', primary: 'bg-[#F472B6]', secondary: 'bg-[#FCE7F3]' },
  { id: 'purple', primary: 'bg-[#A78BFA]', secondary: 'bg-[#EDE9FE]' },
] as const;

export const THEMES = [
  { value: 'light', text: '밝게' },
  { value: 'dark', text: '어둡게' },
  { value: 'system', text: '시스템' },
];
