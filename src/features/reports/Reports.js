import React, { useState } from 'react';
import { DetailsSection } from '../templates/detailsView/DetailsStyles';
import MonthlyReport from './MonthlyReport';
import { monthlyReportStyles } from './ReportsStyles';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import ReportsGrid from './ReportsGrid';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { selectRecords } from '../records/recordsSlice';

const Reports = () => {
  const { items: records } = useSelector(selectRecords);

  const recordSelectItems = records.map((rec) => ({
    label: `${rec.vehicle && rec.vehicle.name} - ${rec.name}`,
    value: rec.id,
  }));
  return (
    <DetailsSection>
      Raporty:
      <div>
        Wybierz ewidencje:
        <Select
          as='select'
          closeMenuOnSelect={false}
          isMulti
          isSearchable={true}
          options={recordSelectItems}
          onChange={(option) => {
            // setFieldTouched('record');
            // setFieldValue('record', option);
            // setFieldValue(
            //   'stops',
            //   values.stops.map((stop) => ({
            //     ...stop,
            //     mileage: option.mileage,
            //   })),
            // );
            // focusOn(tripTemplateRef);
          }}
          // value={values.record}
        />
      </div>
      {/* <PDFDownloadLink document={<MonthlyReport />} fileName='somename.pdf'>
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download now!'
        }
      </PDFDownloadLink> */}
    </DetailsSection>
  );
};

export default Reports;
