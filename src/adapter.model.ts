export abstract class NativeDateAdapterModel {
  syncForeignDate(date: Date, methodName: string, args: number[]): [year: number, month: number, day: number] {
    const jumpIndexMap = { setFullYear: 0, setMonth: 1, setDate: 2 };
    const foreignDate = this.toForeignDate(date);

    for (let i = 0; i < args.length; i++) {
      foreignDate[i + jumpIndexMap[<keyof typeof jumpIndexMap>methodName]] = args[i];
    }

    return this.toGregorianDate(...(<[year: number, month: number, day: number]>foreignDate));
  }

  abstract toForeignDate(date: Date): [year: number, month: number, day: number];
  abstract toGregorianDate(year: number, month: number, day?: number): [year: number, month: number, day: number];
  abstract fixMonths(year: number, month: number, day: number, startDate: Date): [year: number, month: number, day: number, startDate: Date];
  abstract daysInMonth(year: number, month: number): number;
  abstract isLeapYear(year: number, date: Date): boolean;
}
