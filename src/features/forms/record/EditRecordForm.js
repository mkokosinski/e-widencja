import React from 'react';

import RecordForm from './RecordForm';
import { useSelector } from 'react-redux';
import { selectRecordById } from '../../records/recordsSlice';
import { useParams } from 'react-router';

const EditRecordForm = () => {
  const { id } = useParams();

  const record = useSelector((state) => selectRecordById(state, id));

  const initRecord = {
    id: record.id,
    date: `${record.year}-${record.month}`,
    vehicle: record.vehicle && {
      label: record.vehicle.name,
      value: record.vehicle.id,
      mileage: record.vehicle.mileage
    },
    mileage: record.mileage
  };

  return record ? <RecordForm record={initRecord} isEdit={true} /> : null;
};

export default EditRecordForm;
