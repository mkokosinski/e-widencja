import React, { useState } from 'react';
import { DetailsSection } from '../templates/detailsView/DetailsStyles';
import MonthlyReport from './MonthlyReport';
import {
  monthlyReportStyles,
  ReportLabel,
  ReportVatContent,
} from './ReportsStyles';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { selectRecords } from '../records/recordsSlice';
import DropdownPanel from '../../app/components/DropdownPanel/DropdownPanel';
import { ButtonMain } from '../layout/LayoutStyles';

const Reports = () => {
  const { items: records } = useSelector(selectRecords);

  const recordSelectItems = records.map((rec) => ({
    label: `${rec.vehicle && rec.vehicle.name} - ${rec.name}`,
    value: rec.id,
  }));
  return (
    <DropdownPanel title='Raport VAT'>
      <ReportVatContent>
        <ReportLabel>
          Wybierz ewidencję, dla których chcesz wygenerować raport
        </ReportLabel>
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
        <PDFDownloadLink document={<MonthlyReport />} fileName='somename.pdf'>
          {({ blob, url, loading, error }) =>
            loading ? (
              'Loading document...'
            ) : (
              <ButtonMain>Pobierz raport</ButtonMain>
            )
          }
        </PDFDownloadLink>
      </ReportVatContent>
    </DropdownPanel>
  );
};

export default Reports;
