export const formatTripsForVatReport = (trips) => {
  const newTrips = [];
  let rowNumber = 0;

  if (!trips.length) {
    return newTrips;
  }

  trips.forEach((trip) => {
    for (let i = 0; i < trip.stops.length - 1; i++) {
      const currentStop = trip.stops[i];
      const nextStop = trip.stops[i + 1];

      if (nextStop) {
        const newItem = {
          rowNumber: ++rowNumber,
          label: `${currentStop.place} - ${nextStop.place}`,
          distance: nextStop.distance,
          mileageStart: currentStop.mileage,
          mileageEnd: nextStop.mileage,
          driver: `${trip.driver.name}`,
          date: trip.date,
          purpose: trip.purpose,
        };

        newTrips.push(newItem);
      }
    }
  });

  return newTrips;
};
