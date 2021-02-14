import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import ReactPDF, { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import MonthlyReport, { downloadReportVatPdf } from './MonthlyReport';

import { useSelector } from 'react-redux';
import { selectRecords } from '../records/recordsSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import {
  monthlyReportStyles,
  ReportDownloadButton,
  ReportLabel,
  ReportVatContent,
} from './ReportsStyles';

const ReportVat = (props) => {
  const { items: records } = useSelector(selectRecords);

  const handleDownload = () => {
    downloadReportVatPdf();
  };

  const recordSelectItems = records.map((rec) => ({
    label: `${rec.vehicle && rec.vehicle.name} - ${rec.name}`,
    value: rec.id,
  }));

  return (
    <ReportVatContent>
      <ReportLabel>
        Wybierz ewidencję, dla których chcesz wygenerować raport
      </ReportLabel>
      <Select
        as='select'
        menuPortalTarget={document.body}
        closeMenuOnSelect={false}
        isMulti
        isSearchable={true}
        options={recordSelectItems}
        placeholder='Nie wybrano żadnej ewidencji'
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
      {/* <PDFDownloadLink document={<MonthlyReport />} fileName='somename.pdf'>
        {({ blob, url, loading, error }) => (
          <ReportDownloadButton>
            {loading ? (
              'Loading document...'
            ) : (
              <>
                <FontAwesomeIcon icon={faFilePdf} />
                <span>Pobierz raport</span>
              </>
            )}
          </ReportDownloadButton>
        )}
      </PDFDownloadLink> */}
      <ReportDownloadButton onClick={handleDownload}>
        <FontAwesomeIcon icon={faFilePdf} />
        <span>Pobierz raport</span>
      </ReportDownloadButton>
    </ReportVatContent>
  );
};

ReportVat.propTypes = {};

export default ReportVat;
