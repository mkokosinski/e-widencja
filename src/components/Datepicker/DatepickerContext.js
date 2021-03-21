import React from 'react';

export const DatepickerContext = React.createContext();

const DatepickerProvider = ({ children }) => {
  return (
    <DatepickerContext.Provider value={{ test: 'aaa' }}>
      {children}
    </DatepickerContext.Provider>
  );
};

export default DatepickerProvider;
