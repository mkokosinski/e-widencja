import React from 'react';

import TripForm from './TripForm';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectTripById } from '../../trips/tripsSlice';

const EditTripForm = () => {
  const { id } = useParams();

  const trip = useSelector((state) => selectTripById(state, id));

  const tripData = {
    id,
    date: trip.date,
    driver: trip.driverId,
    initialMileage: 0,
    purpose: trip.purpose,
    record: trip.recordId,
    stops: trip.stops,
    tripTemplate: trip.templateId,
  };

  console.log(trip);

  return trip ? <TripForm trip={tripData} isEdit={true} /> : null;
};

export default EditTripForm;
