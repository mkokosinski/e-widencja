import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { useSelector } from 'react-redux';

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
    margin: '4 0',
  },
  title: {
    fontSize: 12,
    margin: '2 0 0',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 10,
    margin: '0 0 2',
    textAlign: 'center',
  },
});

const ReportVatHeader = ({ totalPages, currentPage, record }) => {
  return (
    <View>
      <View style={styles2.pagesCount}>
        <Text> {`Strona ${currentPage} z ${totalPages}`}</Text>
      </View>

      <View style={styles2.pageHeader}>
        <View style={[styles2.pageHeaderColumn, { marginRight: 60 }]}>
          <Text style={styles2.pageHeaderText}></Text>
          <Text style={styles2.pageHeaderText}>Dane podatnika</Text>

          <Text style={styles2.pageHeaderText}>
            {`Numer rejestracyjny pojazdu samochodowego: ${record.vehicle.registrationNumber}`}
          </Text>
          <Text style={styles2.pageHeaderText}>
            Dzień rozpoczęcia prowadzenia ewidencji . . . . . . . . . . . . . .
            . . . . .
          </Text>
          <Text style={styles2.pageHeaderText}>
            Stan licznika przebiegu pojazdu na dzień Liczba przejechanych
            kilometrów na dzień rozpoczęcia prowadzenia ewidencji . . . . . . .
            . . . . . . . . . . . . . . . . .
          </Text>
        </View>

        <View style={styles2.pageHeaderColumn}>
          <Text style={styles2.pageHeaderText}>
            Dzień zakończenia prowadzenia ewidencji . . . . . . . . . . . . . .
            . .
          </Text>
          <Text style={styles2.pageHeaderText}>
            Stan licznika przebiegu pojazdu na dzień zakończenia prowadzenia
            ewidencji . . . . . . . . . . . . . . . . . . . . .
          </Text>
          <Text style={styles2.pageHeaderText}>
            Liczba przejechanych kilometrów na dzień zakończenia prowadzenia
            ewidencji . . . . . . . . . . . . . . . . . . . . .
          </Text>
        </View>
      </View>

      <View>
        <Text style={styles2.title}>
          EWIDENCJA PRZEBIEGU POJAZDU DLA CELÓW VAT
        </Text>
        <Text style={styles2.subTitle}>
          za miesiąc / kwartał1) . . . . . . . . . . . . . . roku . . . . . . .
        </Text>

        <Text>
          Stan licznika . . . . . . . . . . . . . . . na początek miesiąca /
          kwartału1) . . . . . . . . . . . . . roku . . . . . . .
        </Text>
      </View>
    </View>
  );
};

ReportVatHeader.propTypes = {};

export default ReportVatHeader;
