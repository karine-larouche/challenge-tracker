import { format, isSameDay, isSameYear, isAfter } from 'date-fns';
import { en } from 'date-fns/locale/en-US';
import { isSameMonth } from 'date-fns/esm';

export const now = () => new Date();

const dateToString = date => format(date, 'yyyy-MM-dd');

export const isToday = date => isSameDay(date, now());
export const isAfterToday = date =>
  isAfter(dateToString(date), dateToString(now()));

export const isThisMonth = date => isSameMonth(date, now());
const isThisYear = date => isSameYear(date, now());

const formatWithoutYear = date => format(date, 'MMMM d', en);
const formatShortWithoutYear = date => format(date, 'MMM d', en);
const formatWithYear = date => format(date, 'MMMM d yyyy', en);
const formatShortWithYear = date => format(date, 'MMM d yyyy');

export const timeFormat = time => format(time, 'h:mm a');

export const dateFormat = date =>
  isThisYear(date) ? formatWithoutYear(date) : formatWithYear(date);

export const dateFormatShort = date =>
  isThisYear(date) ? formatShortWithoutYear(date) : formatShortWithYear(date);

export const dateRange = (start, end) => {
  const formatter =
    isThisYear(start) && isThisYear(end) ? formatWithoutYear : formatWithYear;
  return `${formatter(start)} - ${formatter(end)}`;
};

export const monthFormat = date =>
  isThisYear(date) ? format(date, 'MMMM', en) : format(date, 'MMMM yyyy', en);
