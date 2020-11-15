import React, { useState } from 'react';
import Datepicker from '../../app/components/Datepicker/Datepicker';
import Monthpicker from '../../app/components/Datepicker/Monthpicker/Monthpicker';
import { Input } from '../forms/FormsStyles';

const Reports = () => {
  return (
    <div>
      <Datepicker customInput={<Input />} portalId='portals' />
      <Datepicker customInput={<Input />} portalId='portals' withPortal />
      <Monthpicker customInput={<Input />} portalId='portals' withPortal />
    </div>
  );
};

export default Reports;
