let cachedYear: number | null = null;
let cachedDates: { [key: string]: number } | null = null; // 객체 형태로 캐시된 날짜를 저장

const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

// 날짜 포맷팅 (YYYY-MM-DD)
const formatDate = (year: number, day: number) => {
  const date = new Date(year, 0, day);
  return date.toISOString().split('T')[0]; // 'YYYY-MM-DD' 포맷
};

/**
 * 371개 날짜 채우기
 */
const generateDates = (year: number) => {
  const firstDay = new Date(year, 0, 1).getDay(); // 1월 1일의 요일 (0=일, 1=월, ... 6=토)
  const totalBoxes = 7 * 53; // 371칸
  const totalDays = isLeapYear(year) ? 366 : 365; // 윤년 확인

  const datesArray = Array.from({ length: totalBoxes }, (_, i) => {
    const dayOffset = i - firstDay + 1; // 🔥 오프셋 보정

    if (dayOffset >= 0 && dayOffset < totalDays) {
      // 올해 날짜
      return { date: formatDate(year, dayOffset + 1), donePercent: 0 };
    }
    if (dayOffset < 0) {
      // 작년 날짜
      const prevYear = year - 1;
      const prevYearLastDay = isLeapYear(prevYear) ? 366 : 365;
      return {
        date: formatDate(prevYear, prevYearLastDay + dayOffset + 1),
        donePercent: 0,
      };
    }
    // 내년 날짜
    const nextYear = year + 1;
    return {
      date: formatDate(nextYear, dayOffset - totalDays + 1),
      donePercent: 0,
    };
  });

  // 날짜 객체로 변환
  return datesArray.reduce(
    (acc, { date, donePercent }) => {
      acc[date] = donePercent;
      return acc;
    },
    {} as { [key: string]: number },
  );
};

export const getCachedDates = () => {
  const currentYear = new Date().getFullYear();

  if (cachedYear !== currentYear || !cachedDates) {
    cachedYear = currentYear;
    cachedDates = generateDates(currentYear);
  }
  return cachedDates;
};

export const grassMonth = ['1월', '3월', '6월', '9월', '12월'];
export const grassWeekDay = ['월', '수', '금'];
