import {
  addDays,
  addMonths,
  endOfDay,
  endOfMonth,
  subDays,
  subMonths,
  startOfDay,
  startOfMonth,
  setDayOfYear,
  getYear,
} from 'date-fns';
import {
  now,
  isToday,
  isAfterToday,
  isThisMonth,
  timeFormat,
  dateFormat,
  dateFormatShort,
  dateRange,
  monthFormat,
} from '../dateUtils';

const thisYear = setDayOfYear(now(), 5);
const anotherYear = new Date(2000, 0, 1);

describe('isToday', () => {
  it('returns true if the date the beginning of today', () => {
    expect(isToday(startOfDay(now()))).toBe(true);
  });
  it('returns true if the date is the end of today', () => {
    expect(isToday(endOfDay(now()))).toBe(true);
  });
  it('returns false if the date is the end of yesterday', () => {
    expect(isToday(endOfDay(subDays(now(), 1)))).toBe(false);
  });
  it('returns false if the date is the beginning of tomorrow', () => {
    expect(isToday(startOfDay(addDays(now(), 1)))).toBe(false);
  });
});

describe('isAfterToday', () => {
  it('returns true if the date is after today', () => {
    expect(isAfterToday(startOfDay(addDays(now(), 1)))).toBe(true);
  });
  it('returns false if the date is today', () => {
    expect(isAfterToday(endOfDay(now()))).toBe(false);
  });
  it('returns false if the date is before today', () => {
    expect(isAfterToday(subDays(now(), 1))).toBe(false);
  });
});

describe('isThisMonth', () => {
  it('returns true if the date is the first day of this month', () => {
    expect(isThisMonth(startOfMonth(now()))).toBe(true);
  });
  it('returns true if the date is the last day of this month', () => {
    expect(isThisMonth(endOfMonth(now()))).toBe(true);
  });
  it('returns false if the date is the last day of last month', () => {
    expect(isThisMonth(endOfMonth(subMonths(now(), 1)))).toBe(false);
  });
  it('returns false if the date is the first day of next month', () => {
    expect(isThisMonth(startOfMonth(addMonths(now(), 1)))).toBe(false);
  });
});

describe('timeFormat', () => {
  it('shows "AM" before noon', () => {
    expect(timeFormat(new Date(0, 0, 0, 8, 12, 54, 3))).toBe('8:12 AM');
  });
  it('shows "PM" after noon', () => {
    expect(timeFormat(new Date(0, 0, 0, 20, 12, 54, 3))).toBe('8:12 PM');
  });
});

describe('dateFormat', () => {
  it('shows the year when date is not this year', () => {
    expect(dateFormat(anotherYear)).toBe('January 1 2000');
  });
  it('does not show the year when date is this year', () => {
    expect(dateFormat(thisYear)).toBe('January 5');
  });
});

describe('dateFormatShort', () => {
  it('shows the year when date is not this year', () => {
    expect(dateFormatShort(anotherYear)).toBe('Jan 1 2000');
  });
  it('does not show the year when date is this year', () => {
    expect(dateFormatShort(thisYear)).toBe('Jan 5');
  });
});

describe('dateRange', () => {
  const currentYear = getYear(now());
  it('shows the year for both dates when the first date is not this year', () => {
    expect(dateRange(anotherYear, thisYear)).toBe(
      `January 1 2000 - January 5 ${currentYear}`,
    );
  });
  it('shows the year for both dates when the last date is not this year', () => {
    expect(dateRange(thisYear, anotherYear)).toBe(
      `January 5 ${currentYear} - January 1 2000`,
    );
  });
  it('does not show the year when both dates are this year', () => {
    expect(dateRange(thisYear, thisYear)).toBe('January 5 - January 5');
  });
});

describe('monthFormat', () => {
  it('shows the year when date is not this year', () => {
    expect(monthFormat(anotherYear)).toBe('January 2000');
  });
  it('does not show the year when date is this year', () => {
    expect(monthFormat(thisYear)).toBe('January');
  });
});
