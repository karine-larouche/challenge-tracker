import { format, isSameYear, isSameDay, isAfter, startOfDay } from 'date-fns';
import { en } from 'date-fns/locale/en-US';

export const now = () => new Date();

const dateToString = date => format(date, 'yyyy-MM-dd');
export const toLocalDayStart = startOfDay;

export const isToday = date => isSameDay(date, now());
export const isAfterToday = date =>
  isAfter(dateToString(date), dateToString(now()));

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
