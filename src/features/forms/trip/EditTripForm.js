import React from 'react';

import TripForm from './TripForm';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectTripById } from '../../trips/tripsSlice';

const EditTripForm = () => {
  const { id } = useParams();

  const trip = useSelector((state) => selectTripById(state, id));

  return trip ? <TripForm trip={trip} /> : null;
};

export default EditTripForm;
