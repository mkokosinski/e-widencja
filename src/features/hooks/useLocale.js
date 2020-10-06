import React, { useEffect, useRef, useState } from 'react';

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
  const days = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'];
  
  export const locale = {
    pl,
    localize: {
      day: (n) => days[n],
      month: (n) => months[n],
    },
    options: {
      weekStartsOn: 1,
    },
    formatLong,
  };

export const useLocale = () => {
    
  return <></>;
};
