import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { useSelector } from 'react-redux';
import { months } from '../../../utils/dateUtils';

const styles2 = StyleSheet.create({
  pagesCount: {
    textAlign: 'right',
  },
  pageHeader: {
    flexDirection: 'row',
  },
  pageHeaderColumn: {
    width: '40%',
  },
  pageHeaderText: {
    margin: '6 0',
  },
  title: {
    fontSize: 12,
    margin: '4 0 0',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 10,
    margin: '0 0 4',
    textAlign: 'center',
  },
});

const ReportVatHeader = ({
  totalPages,
  currentPage,
  record,
  company,
  initMonthMileage,
}) => {
  return (
    <View>
      <View style={styles2.pagesCount}>
        <Text> {`Strona ${currentPage} z ${totalPages}`}</Text>
      </View>

      <View style={styles2.pageHeader}>
        <View style={[styles2.pageHeaderColumn, { marginRight: 60 }]}>
          <Text>{company.name}</Text>
          <Text>{company.address}</Text>
          <Text>
            {company.city}, {company.postcode}
          </Text>
          <Text>
            NIP: {company.NIP}, REGON: {company.REGON}
          </Text>
          <Text>Tel. {company.phone}</Text>
          <Text style={styles2.pageHeaderText}>Dane podatnika</Text>

          <Text style={styles2.pageHeaderText}>
            {`Numer rejestracyjny pojazdu samochodowego: ${record.vehicle.registrationNumber}`}
          </Text>
          <Text style={styles2.pageHeaderText}>
            {`Dzień rozpoczęcia prowadzenia ewidencji: ${record.vehicle.initRecordDate}`}
          </Text>
          <Text style={styles2.pageHeaderText}>
            {`Stan licznika przebiegu pojazdu na dzień rozpoczęcia prowadzenia ewidencji: ${record.vehicle.initMileage}`}
          </Text>
        </View>

        <View style={styles2.pageHeaderColumn}>
          <Text style={styles2.pageHeaderText}>
            {`Dzień zakończenia prowadzenia ewidencji: ${record.vehicle.endRecordDate}`}
          </Text>
          <Text style={styles2.pageHeaderText}>
            {`Stan licznika przebiegu pojazdu na dzień zakończenia prowadzenia ewidencji ${record.vehicle.endMileage}`}
          </Text>
          <Text style={styles2.pageHeaderText}>
            {` Liczba przejechanych kilometrów na dzień zakończenia prowadzenia ewidencji ${
              record.vehicle.endMileage - record.vehicle.initMileage
            }`}
          </Text>
        </View>
      </View>

      <View>
        <Text style={styles2.title}>
          EWIDENCJA PRZEBIEGU POJAZDU DLA CELÓW VAT
        </Text>
        <Text style={styles2.subTitle}>
          {`za miesiąc / kwartał1) ${months[record.month - 1]} roku ${
            record.year
          }`}
        </Text>

        <Text>
          {`Stan licznika ${initMonthMileage} na początek miesiąca/kwartału1)  ${
            months[record.month]
          } roku ${record.year}`}
        </Text>
      </View>
    </View>
  );
};

ReportVatHeader.propTypes = {};

export default ReportVatHeader;
