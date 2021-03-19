// export const getStopsFromTemplate = (templateStops, initialMileage ,currentStops) =>
//   currentStops.reduce((acc, cur, i) => {
//     if (i === 0) {
//       return [{ ...cur, mileage: initialMileage }];
//     }
//     const previousMileage = acc[i - 1].mileage;

//     return [...acc, cur];
//   }, []);

export const refreshStopsMileage = (initialMileage, stops) =>
  stops.reduce((acc, cur, i) => {
    if (i === 0) {
      return [{ ...cur, mileage: initialMileage }];
    }
    const previousMileage = acc[i - 1].mileage;
    return [...acc, { ...cur, mileage: previousMileage + cur.distance }];
  }, []);
