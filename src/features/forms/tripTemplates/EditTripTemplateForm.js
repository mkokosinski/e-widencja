import React from 'react';

import TripTemplateForm from './TripTemplateForm';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectTripById } from '../../trips/tripsSlice';

const EditTripTemplateForm = () => {
  const { id } = useParams();

  const trip = useSelector((state) => selectTripById(state, id));

  return trip ? <TripTemplateForm trip={trip} /> : null;
};

export default EditTripTemplateForm;
