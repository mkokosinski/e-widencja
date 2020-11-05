import React from 'react';

import TourForm from './TourForm';
import { useSelector } from 'react-redux';
import { selectRecordById } from '../../records/recordsSlice';
import { useParams } from 'react-router';

const EditTourForm = () => {
  const { id } = useParams();

  const record = useSelector((state) => selectRecordById(state, id));

  return record ? <TourForm record={record} /> : null;
};

export default EditTourForm;
