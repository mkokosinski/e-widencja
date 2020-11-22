import React from 'react';
import { useLocation } from 'react-router';

import TripForm from './TripForm';

const AddTripForm = () => {
  const loc = useLocation();
  console.log(loc);
  return <TripForm />;
};

export default AddTripForm;
