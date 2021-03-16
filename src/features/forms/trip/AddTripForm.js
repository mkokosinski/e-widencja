import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectRecordById } from '../../records/recordsSlice';
import { selectTripById } from '../../trips/tripsSlice';

import TripForm from './TripForm';

const AddTripForm = () => {
  const { recordId } = useParams();
  const record = useSelector((state) => selectRecordById(state, recordId));

  const today = new Date();
  const isCurrentMonth =
    today.getFullYear() === record.year && today.getMonth() === record.month;

  const trip = {
    date: isCurrentMonth
      ? new Date()
      : new Date(record.year, record.month - 1, 1),
    driver: '',
    initialMileage: 0,
    purpose: '',
    record: recordId,
    stops: [
      { label: 'Start', place: '', mileage: '', distance: 0 },
      { label: 'Cel', place: '', mileage: '', distance: 0 },
    ],
    tripTemplate: '',
  };

  return <TripForm trip={trip} />;
};

export default AddTripForm;
