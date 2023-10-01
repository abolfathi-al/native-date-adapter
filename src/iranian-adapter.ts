import { fixNumbers, dayFormatter } from './formatter';
import { NativeDateAdapterModel } from './adapter.model';

export class IranianDateAdapter extends NativeDateAdapterModel {
  locale = 'en-u-ca-persian';

  toForeignDate(date: Date): [year: number, month: number, day: number] {
    const iranianFormat = new Intl.DateTimeFormat(this.locale, { year: 'numeric', month: 'numeric', day: 'numeric' }).format(date);
    const [month, day, year] = iranianFormat.split(/[./\W]/g).map(item => fixNumbers(item));

    return [year, month - 1, day];
  }

  toGregorianDate(year: number, month: number, day = 1, startDate?: Date): [year: number, month: number, day: number] {
    [year, month, day, startDate] = this.fixMonths(year, month, day);

    const calcForeign = (year: number, month: number, day: number, startDate: Date): [number, number, number] => {
      if (dayFormatter(startDate, this.locale) === 1) {
        for (var i = 0; i < month; i++) {
          day += this.daysInMonth(year, i + 1);
        }
        startDate.setDate(startDate.getDate() + day - 1);
        startDate.setHours(0, 0, 0, 0);

        return [startDate.getFullYear(), startDate.getMonth(), startDate.getDate()];
      };

      startDate.setDate(startDate.getDate() + 1);
      return calcForeign(year, month, day, startDate);
    }
    return calcForeign(year, month, day, startDate);
  }

  fixMonths(year: number, month: number, day: number): [year: number, month: number, day: number, startDate: Date] {
    let startDate = new Date(year + 621, 2, 20);

    if (month > 11 || month < 0) {
      year += Math.trunc(month / 12);
      month = month % 12;

      if (month < 0) {
        year -= 1;
        month += 12;
      }

      startDate = new Date(year + 621, 2, 20);
    }

    return [year, month, day, startDate];
  }

  daysInMonth(year: number, month: number): number {
    if (month <= 6) return 31
    if (month <= 11) return 30
    if (this.isLeapYear(year)) return 30
    return 29
  }

  isLeapYear(year: number): boolean {
    const calcLeapYear = (year: number, date = new Date(year + 622, 2, 19)): boolean => {
      const day = dayFormatter(date, this.locale);
      if (day === 30) return true;
      if (day === 1) return false;

      date.setDate(date.getDate() + 1);
      return calcLeapYear(year, date);
    };

    return calcLeapYear(year);
  }
}
