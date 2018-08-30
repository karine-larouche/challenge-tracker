import { format, isSameYear, isSameDay, isAfter } from 'date-fns';
import { en } from 'date-fns/locale/en-US';
import { toDate } from 'date-fns/esm';

export const now = () => new Date();

const dateToString = date => format(date, 'YYYY-MM-DD');
export const toLocalDayStart = date => toDate(dateToString(date));

export const isToday = date => isSameDay(date, now());
export const isAfterToday = date =>
  isAfter(dateToString(date), dateToString(now()));

const isThisYear = date => isSameYear(date, now());
const formatWithoutYear = date => format(date, 'MMMM D', en);
const formatWithYear = date => format(date, 'MMMM D YYYY', en);

export const timeFormat = time => format(time, 'h:mm a');

export const dateFormat = date =>
  isThisYear(date) ? formatWithoutYear(date) : formatWithYear(date);

export const dateRange = (start, end) => {
  const formatter =
    isThisYear(start) && isThisYear(end) ? formatWithoutYear : formatWithYear;
  return `${formatter(start)} - ${formatter(end)}`;
};
