import { getFirstDateOfMoth } from './dateUtils';

export const getTripsData = (trips) => {
  const groupedTrips = trips.reduce((acc, cur) => {
    const monthYear = getFirstDateOfMoth(cur.date);
    if (acc[monthYear]) {
      return { ...acc, [monthYear]: acc[monthYear] + cur.distance };
    } else {
      return { ...acc, [monthYear]: cur.distance };
    }
  }, {});

  return groupedTrips;
};
