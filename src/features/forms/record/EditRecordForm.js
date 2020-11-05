import React from 'react';

import RecordForm from './RecordForm';
import { useSelector } from 'react-redux';
import { selectRecordById } from '../../records/recordsSlice';
import { useParams } from 'react-router';

const EditRecordForm = () => {
  const { id } = useParams();

  const record = useSelector((state) => selectRecordById(state, id));

  return record ? <RecordForm record={record} /> : null;
};

export default EditRecordForm;
