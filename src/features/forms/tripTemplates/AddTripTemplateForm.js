import React from 'react';

import TripTemplateForm from './TripTemplateForm';

const AddTripTemplateForm = () => {
  const tripTemplate = {
    label: '',
    purpose: '',
    stops: [
      { label: 'Start', place: '', distance: 0 },
      { label: 'Cel', place: '', distance: 0 },
    ],
  };

  return <TripTemplateForm tripTemplate={tripTemplate} />;
};

export default AddTripTemplateForm;
