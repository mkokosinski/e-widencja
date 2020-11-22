import React from 'react';

import TripForm from './TripForm';
import { useSelector } from 'react-redux';
import { selectRecordById } from '../../records/recordsSlice';
import { useParams } from 'react-router';

const EditTripForm = () => {
  const { id } = useParams();

  const record = useSelector((state) => selectRecordById(state, id));

  return record ? <TripForm record={record} /> : null;
};

export default EditTripForm;
