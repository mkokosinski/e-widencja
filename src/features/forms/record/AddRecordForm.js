import React from 'react';
import { useParams } from 'react-router';

import RecordForm from './RecordForm';

const AddRecordForm = () => {
  const { vehicleId } = useParams();

  return <RecordForm vehicleId={vehicleId} />;
};

export default AddRecordForm;
