function formatDate(date: Date, dateFormat: string, locale: string) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const month1 = month + 1;
  const day = date.getDate();
  const weekDay = date.getDay();
  const { monthNamesIntl, monthNamesShortIntl, dayNamesIntl, dayNamesShortIntl } = getIntlNames(locale);

  const tokens = {
    yyyy: year,
    yy: String(year).substring(2),
    mm: twoDigits(month1),
    m: month1,
    MM: monthNamesIntl[month],
    M: monthNamesShortIntl[month],
    dd: twoDigits(day),
    d: day,
    DD: dayNamesIntl[weekDay],
    D: dayNamesShortIntl[weekDay],
  };

  const regexp = new RegExp(
    Object.keys(tokens)
      .map((t) => `(${t})`)
      .join('|'),
    'g',
  );

  return dateFormat.replace(regexp, (token) => {
    if (token in tokens) {
      return <string>tokens[<keyof typeof tokens>token];
    };
    return token;
  });
}

function yearFormatter(date: number | Date, locale: string) {
  return fixNumbers(new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(date));
}

function monthFormatter(date: number | Date, locale: string) {
  return fixNumbers(new Intl.DateTimeFormat(locale, { month: 'numeric' }).format(date)) - 1;
}

function dayFormatter(date: number | Date, locale: string) {
  return fixNumbers(new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(date));
}

function getIntlNames(locale: string) {
  const monthNamesIntl: string[] = [];
  const monthNamesShortIntl: string[] = [];
  const dayNamesIntl: string[] = [];
  const dayNamesShortIntl: string[] = [];
  const formatterMonthNames = new Intl.DateTimeFormat(locale, { month: 'long' });
  const formatterMonthNamesShort = new Intl.DateTimeFormat(locale, { month: 'short' });
  const formatterDayNames = new Intl.DateTimeFormat(locale, { weekday: 'long' });
  const formatterDayNamesShort = new Intl.DateTimeFormat(locale, { weekday: 'short' });

  let year;
  let yearStarted;
  let yearEnded;

  for (let i = 0; i < 24; i += 1) {
    const date = new Date().setMonth(i, 1);
    const currentYear = yearFormatter(date, locale);

    if (year && currentYear !== year) {
      if (yearStarted) yearEnded = true;
      yearStarted = true;
      year = currentYear;
    }
    if (!year) {
      year = currentYear;
    }
    if (yearStarted && year === currentYear && !yearEnded) {
      monthNamesIntl.push(formatterMonthNames.format(date));
      monthNamesShortIntl.push(formatterMonthNamesShort.format(date));
    }
  }
  const weekDay = new Date().getDay();

  for (let i = 0; i < 7; i += 1) {
    const date = new Date().getTime() + (i - weekDay) * 24 * 60 * 60 * 1000;
    dayNamesIntl.push(formatterDayNames.format(date));
    dayNamesShortIntl.push(formatterDayNamesShort.format(date));
  }

  return {
    monthNamesIntl,
    monthNamesShortIntl,
    dayNamesIntl,
    dayNamesShortIntl,
  };
}

function twoDigits(number: number) {
  return number < 10 ? `0${number}` : number;
}

function fixNumbers(value: string | number): number {
  return Number(value?.toString().replace(/[\u0660-\u0669\u06f0-\u06f9]/g, char => (char.charCodeAt(0) & 0xf).toString()).replace(/\D/g, ''));
}

export {
  formatDate,
  yearFormatter,
  monthFormatter,
  dayFormatter,
  getIntlNames,
  twoDigits,
  fixNumbers,
}
