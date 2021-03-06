import { pl } from 'date-fns/locale';
import formatLong from 'date-fns/locale/pl/_lib/formatLong/index';

export const months = [
  'Styczeń',
  'Luty',
  'Marzec',
  'Kwiecień',
  'Maj',
  'Czerwiec',
  'Lipiec',
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień',
];

export const monthsShort = [
  'Sty',
  'Lut',
  'Mar',
  'Kwi',
  'Maj',
  'Cze',
  'Lip',
  'Sie',
  'Wrz',
  'Paź',
  'Lis',
  'Gru',
];

export const days = [
  'Niedziela',
  'Poniedziałek',
  'Wtorek',
  'Środa',
  'Czwartek',
  'Piątek',
  'Sobota',
];
export const daysShort = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'];

export const locale = {
  pl,
  localize: {
    day: (n) => daysShort[n],
    month: (n) => months[n],
  },
  options: {
    weekStartsOn: 1,
  },
  formatLong,
};

export const getNowString = () => new Date().toString();

export const DateFrom = (date) => {
  const formatDate = new Date(Date.parse(date));
  return new Date(formatDate.toUTCString());
};

export const datesAreEqual = (dateOne, dateTwo) => {
  const date1 = new Date(dateOne);
  const date2 = new Date(dateTwo);

  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);

  return date1.getTime() === date2.getTime();
};

export const compareDates = (dateOne, dateTwo) => {
  const date1 = new Date(dateOne);
  const date2 = new Date(dateTwo);

  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);

  return Math.sign(date1.getTime() - date2.getTime());
};

export const dateBetween = (date, from, to) => {
  const date1 = new Date(date);
  const dateFrom = new Date(from);
  const dateTo = new Date(to);

  date1.setHours(0, 0, 0, 0);
  dateFrom.setHours(0, 0, 0, 0);
  dateTo.setHours(0, 0, 0, 0);

  return (
    date1.getTime() >= dateFrom.getTime() && date1.getTime() <= dateTo.getTime()
  );
};

export const differenceInDays = (dateOne, dateTwo) => {
  const date1 = new Date(dateOne);
  const date2 = new Date(dateTwo);

  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);

  const diff = (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24);

  return parseInt(diff);
};

export const getFirstDateOfMoth = (date) => {
  const fullDate = DateFrom(date);
  return new Date(fullDate.getFullYear(), fullDate.getMonth(), 1);
};

export const getRemainDays = (date, expiredText = 'po terminie') => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkedDate = new Date(date);
  const diff = differenceInDays(checkedDate, today);
  const dayString = Math.abs(diff) === 1 ? 'dzień' : 'dni';

  const reaminText =
    diff === 0
      ? 'dziś'
      : diff === 1
      ? 'jutro'
      : diff < 0
      ? `${Math.abs(diff)} ${dayString} ${expiredText}`
      : `za ${Math.abs(diff)} ${dayString}`;

  return reaminText;
};
