import React, { useEffect, useState } from 'react';
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
import { LoaderSpinner } from '../loading/LoadingStyles';

const ReportVat = (props) => {
  const { items: records } = useSelector(selectRecords);

  const [selectedRecords, setSelectedRecords] = useState([]);
  const [isGenerated, setIsGenerated] = useState(false);

  const isDisabled = !selectedRecords?.length;

  const handleDownload = () => {
    if (!isDisabled) {
      setIsGenerated(true);
    }
  };

  const recordsOptions = records.map((rec) => ({
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
        options={recordsOptions}
        placeholder='Nie wybrano żadnej ewidencji'
        onChange={(itmes) => {
          setIsGenerated(false);
          setSelectedRecords(itmes);
        }}
      />
      <ReportDownloadButton
        isGenerated={isGenerated}
        isDisabled={isDisabled}
        onClick={handleDownload}
      >
        {!isGenerated ? (
          <>
            <FontAwesomeIcon icon={faFilePdf} />
            <span>Generuj PDF</span>
          </>
        ) : (
          <PDFDownloadLink
            document={<MonthlyReport data={selectedRecords} />}
            fileName='somename.pdf'
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                <LoaderSpinner height='20px' width='20px' color='white' />
              ) : (
                <>
                  <FontAwesomeIcon icon={faFilePdf} />
                  <span>Pobierz PDF</span>
                </>
              )
            }
          </PDFDownloadLink>
        )}
      </ReportDownloadButton>
    </ReportVatContent>
  );
};

ReportVat.propTypes = {};

export default ReportVat;
