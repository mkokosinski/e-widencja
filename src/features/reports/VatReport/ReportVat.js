import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import ReactPDF, { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import ReportVatTemplate, { downloadReportVatPdf } from './ReportVatTemplate';

import { useSelector } from 'react-redux';
import { selectRecords } from '../../records/recordsSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import {
  monthlyReportStyles,
  ReportDownloadButton,
  ReportLabel,
  ReportVatContent,
} from '../ReportsStyles';
import { LoaderSpinner } from '../../loading/LoadingStyles';
import {
  selectFullTripsData,
  selectTripsForRecord,
} from '../../trips/tripsSlice';
import { formatTripsForVatReport } from '../../../utils/reportsUtils';
import { selectCompany } from '../../company/companySlice';

const ReportVat = (props) => {
  const { items: records } = useSelector(selectRecords);
  const trips = useSelector(selectFullTripsData);
  const company = useSelector(selectCompany);

  const [selectedRecords, setSelectedRecords] = useState([]);
  const [isGenerated, setIsGenerated] = useState(false);

  const isDisabled = !selectedRecords?.length;
  const fileName = `RaportVAT_${new Date().toLocaleString()}.pdf`;

  const handleDownload = () => {
    if (!isDisabled && selectedRecords.length > 0) {
      setIsGenerated(true);
    }
  };

  const recordsOptions = records.map((rec) => {
    const recTrips = trips.filter((trip) => trip.recordId === rec.id);
    const dataRows = formatTripsForVatReport(recTrips);
    return {
      label: `${rec.vehicle && rec.vehicle.name} - ${rec.name} (${
        dataRows.length
      })`,
      value: rec.id,
      record: rec,
      trips: dataRows,
    };
  });

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
            document={
              <ReportVatTemplate data={selectedRecords} company={company} />
            }
            fileName={fileName}
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
