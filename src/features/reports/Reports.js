import React from 'react';

import DropdownPanel from '../../app/components/DropdownPanel/DropdownPanel';
import ReportVat from './VatReport/ReportVat';

const Reports = () => {
  return (
    <DropdownPanel title='Raport VAT' startExpanded>
      <ReportVat />
    </DropdownPanel>
  );
};

export default Reports;
