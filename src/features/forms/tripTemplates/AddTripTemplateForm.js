import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectRecordById } from '../../records/recordsSlice';
import { selectTripById } from '../../trips/tripsSlice';

import TripTemplateForm from './TripTemplateForm';

const AddTripTemplateForm = () => {
  const tripTemplate = {
    label: '',
    purpose: '',
    stops: [
      { label: 'Start', place: '', mileage: '', distance: 0 },
      { label: 'Cel', place: '', mileage: '', distance: 0 }
    ]
  };

  return <TripTemplateForm tripTemplate={tripTemplate} />;
};

export default AddTripTemplateForm;
