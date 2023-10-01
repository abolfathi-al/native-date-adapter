import { yearFormatter, monthFormatter, dayFormatter } from './formatter';
import { NativeDateAdapterModel } from './adapter.model';
import { IranianDateAdapter } from './iranian-adapter';

export const mapDateAdapter = new Map<string, NativeDateAdapterModel>([
  ['fa-IR', new IranianDateAdapter()],
]);

export class NativeDateAdapter extends Date {
  private static locale: string;

  constructor();
  constructor(...args: [value: number | string | Date]);
  constructor(...args: [year: number, month: number, day?: number, hours?: number, minutes?: number, seconds?: number, ms?: number]);
  constructor(...args: [value: number | string | Date] | [year: number, month: number, day?: number, hours?: number, minutes?: number, seconds?: number, ms?: number] | []) {

    const dateAdapter = mapDateAdapter.get(NativeDateAdapter.locale);

    if (args.length === 0) { super(); }
    else if (args.length === 1) { super(args[0]); }
    else {
      if (dateAdapter) {
        const foreignDate = args.slice(0, 3);
        const gregorianDate = dateAdapter.toGregorianDate(...(<[year: number, month: number, day: number]>foreignDate));

        args.splice(0, 3, ...gregorianDate);
      }
      super(...args);
    }

    if (dateAdapter) {
      for (let setterMethod of ['setFullYear', 'setMonth', 'setDate']) {
        (<any>this)[setterMethod] = function (...args: number[]) {
          const [year, month, day] = dateAdapter.syncForeignDate(this, setterMethod, args);
          return Date.prototype.setFullYear.bind(this)(year, month, day);
        }
      }
    }

    if (NativeDateAdapter.locale) {
      for (let [getterMethod, formatter] of Object.entries({
        getFullYear: yearFormatter,
        getMonth: monthFormatter,
        getDate: dayFormatter
      })) {
        (<any>this)[getterMethod] = function () {
          return formatter(this, NativeDateAdapter.locale);
        }
      }
    }
  }

  public static setLocale(locale: string) {
    this.locale = locale;
    return NativeDateAdapter;
  }

  public static getLocale() {
    return this.locale;
  }
}
