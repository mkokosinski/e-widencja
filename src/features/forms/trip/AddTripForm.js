import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectRecordById } from '../../records/recordsSlice';
import { selectTripById } from '../../trips/tripsSlice';

import TripForm from './TripForm';

const AddTripForm = () => {
  const { recordId } = useParams();

  const trip = {
    date: new Date(),
    driver: '',
    initialMileage: 0,
    purpose: '',
    record: recordId,
    stops: [
      { label: 'Start', place: '', mileage: '', distance: 0 },
      { label: 'Cel', place: '', mileage: '', distance: 0 }
    ],
    tripTemplate: '',
  };

  return <TripForm trip={trip} />;
};

export default AddTripForm;
