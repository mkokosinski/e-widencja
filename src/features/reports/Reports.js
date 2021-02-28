import React, { useState } from 'react';

import DropdownPanel from '../../app/components/DropdownPanel/DropdownPanel';
import { ButtonMain } from '../layout/LayoutStyles';
import ReportVat from './VatReport/ReportVat';

const Reports = () => {
  return (
    <DropdownPanel title='Raport VAT'>
      <ReportVat />
    </DropdownPanel>
  );
};

export default Reports;
