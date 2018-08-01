import { format, isSameYear } from 'date-fns';
import { en } from 'date-fns/locale/en-US';
import { isSameDay } from 'date-fns/esm/fp';

const now = () => new Date();
const isToday = date => isSameDay(date, now());
const isThisYear = date => isSameYear(date, now());

const formatWithoutYear = date => format(date, 'MMMM D', en);
const formatWithYear = date => format(date, 'MMMM D YYYY', en);

const timeFormat = time => format(time, 'h:mm a');

const dateFormat = date =>
  isThisYear(date) ? formatWithoutYear(date) : formatWithYear(date);

const dateRange = (start, end) => {
  const formatter =
    isThisYear(start) && isThisYear(end) ? formatWithoutYear : formatWithYear;
  return `${formatter(start)} - ${formatter(end)}`;
};

export { now, isToday, timeFormat, dateFormat, dateRange };
