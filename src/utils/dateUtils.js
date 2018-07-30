import { format, isSameYear } from 'date-fns';
import { en } from 'date-fns/locale/en-US';
import { isSameDay } from 'date-fns/esm/fp';

const today = () => new Date();
const isToday = date => isSameDay(date, today());
const isThisYear = date => isSameYear(date, today());

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

export { isToday, timeFormat, dateFormat, dateRange };
