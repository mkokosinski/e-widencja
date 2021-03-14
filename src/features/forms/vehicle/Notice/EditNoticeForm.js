import React from 'react';

import VehicleNoticeForm from './VehicleNoticeForm';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectVehicleById } from '../../../vehicles/redux/vehiclesSlice';

const EditVehicleNoticeForm = () => {
  const { id, noticeId } = useParams();

  const vehicle = useSelector((state) => selectVehicleById(state, id));
  const notice = vehicle.notices?.find((notice) => notice.id === noticeId);

  return notice ? (
    <VehicleNoticeForm isEdit={true} editedNotice={notice} />
  ) : null;
};

export default EditVehicleNoticeForm;
