import { NativeDateAdapter } from '../src';

describe('Native date adapter', () => {
  const dateHandler = NativeDateAdapter.setLocale('fa-IR');

  test('should support date object as argument', () => {
    const gregorianDate = new Date(1992, 8, 27)
    const iranianDate = new dateHandler(gregorianDate);

    expect(iranianDate.getFullYear()).toEqual(1371)
    expect(iranianDate.getMonth()).toEqual(6)
    expect(iranianDate.getDate()).toEqual(5)
  });

  test('should support NativeDateAdapter object as argument', () => {
    const iranianDate = new dateHandler(1371, 6, 5)
    const cloneDate = new dateHandler(iranianDate)

    expect(cloneDate.getFullYear()).toEqual(1371)
    expect(cloneDate.getMonth()).toEqual(6)
    expect(cloneDate.getDate()).toEqual(5)
  })

  test('should truly convert date', () => {
    const iranianDate = new dateHandler(1371, 6, 5)
    const gregorianDate = new Date(iranianDate)

    expect(gregorianDate.getFullYear()).toEqual(1992)
    expect(gregorianDate.getMonth()).toEqual(8)
    expect(gregorianDate.getDate()).toEqual(27)
  })

  describe('getDate method', () => {
    test('should act like native js Date on 0', () => {
      const iranianDate = new dateHandler(1397, 0, 0)

      expect(iranianDate.getMonth()).toEqual(11)
      expect(iranianDate.getDate()).toEqual(29)
    })
  })

  describe('setDate method', () => {
    test('should act like native js Date on + (leap year)', () => {
      const gregorianDate = new Date(1553470566470)
      const iranianDate = new dateHandler(1553470566470)

      gregorianDate.setDate(gregorianDate.getDate() + 2536)
      iranianDate.setDate(iranianDate.getDate() + 2536)

      expect(gregorianDate.toISOString()).toEqual(iranianDate.toISOString())
    })

    test('should act like native js Date on + (not leap year)', () => {
      const gregorianDate = new Date(1534030492804)
      const iranianDate = new dateHandler(1534030492804)

      gregorianDate.setDate(gregorianDate.getDate() + 2536)
      iranianDate.setDate(iranianDate.getDate() + 2536)

      expect(gregorianDate.toISOString()).toEqual(iranianDate.toISOString())
    })

    test('should act like native js Date on - (leap year)', () => {
      const gregorianDate = new Date(1553470566470)
      const iranianDate = new dateHandler(1553470566470)

      gregorianDate.setDate(gregorianDate.getDate() - 1231)
      iranianDate.setDate(iranianDate.getDate() - 1231)

      expect(gregorianDate.toISOString()).toEqual(iranianDate.toISOString())
    })

    test('should act like native js Date on - (not leap year)', () => {
      const gregorianDate = new Date(1534030492804)
      const iranianDate = new dateHandler(1534030492804)

      gregorianDate.setDate(gregorianDate.getDate() - 1231)
      iranianDate.setDate(iranianDate.getDate() - 1231)

      expect(gregorianDate.toISOString()).toEqual(iranianDate.toISOString())
    })
  })
})
