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
  'Grudzień'
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
  'Gru'
];

export const days = [
  'Niedziela',
  'Poniedziałek',
  'Wtorek',
  'Środa',
  'Czwartek',
  'Piątek',
  'Sobota'
];
export const daysShort = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'];

export const locale = {
  pl,
  localize: {
    day: (n) => daysShort[n],
    month: (n) => months[n]
  },
  options: {
    weekStartsOn: 1
  },
  formatLong
};
