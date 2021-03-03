import React from 'react';
import PropTypes from 'prop-types';
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  Font,
} from '@react-pdf/renderer';

import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectTrips, selectTripsForRecord } from '../../trips/tripsSlice';
import EmptyRow from './EmptyRow';
import styled from 'styled-components';
import DataRow from './DataRow';
import {
  formatTripsForVatReport,
  splitStop,
} from '../../../utils/reportsUtils';
import ReportVatHeader from './ReportVatHeader';

const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontSize: 8,
    fontFamily: 'Roboto',
  },
  table: {
    display: 'flex',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  row: { margin: 'auto', flexDirection: 'row', width: '100%', display: 'flex' },
  col: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    height: 24,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  cell: { textAlign: 'center', padding: 4 },
  splittedCol: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  splittedCell: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
});

const ReportVatTemplate = ({ data: records }) => {
  return (
    <Document>
      {records.map((recordData) => {
        const pagesCount = Math.ceil(recordData.trips.length / 17) || 1;
        const pages = Array.from(Array(pagesCount), (v, k) => k);

        return pages.map((page) => {
          const rows = Array.from(
            Array(17),
            (v, idx) => recordData.trips[idx + page * 17]
          );

          return (
            <Page size='A4' style={styles.page}>
              <ReportVatHeader
                totalPages={pagesCount}
                currentPage={page + 1}
                record={recordData.record}
              />

              <View style={styles.table}>
                <View style={styles.row}>
                  <View style={[styles.header, { flex: 2 }]}>
                    <Text style={styles.cell}>Nr kolejny wpisu </Text>
                  </View>
                  <View style={[styles.header, { flex: 3 }]}>
                    <Text style={styles.cell}>
                      Data wyjazdu/ udostępnienia pojazdu
                    </Text>
                  </View>
                  <View style={[styles.header, { flex: 5 }]}>
                    <Text style={styles.cell}>
                      Opis trasy wyjazdu (skąd-dokąd)
                    </Text>
                  </View>
                  <View style={[styles.header, { flex: 7 }]}>
                    <Text style={styles.cell}>
                      Cel wyjazdu/ udostępnienia pojazdu
                    </Text>
                  </View>
                  <View style={[styles.header, { flex: 3 }]}>
                    <Text style={styles.cell}>
                      Liczba faktyczna przejechanych kilometrów
                    </Text>
                  </View>
                  <View style={[styles.header, { flex: 4 }]}>
                    <Text style={styles.cell}>
                      Imię i nazwisko osoby kierującej pojazdem/osoby, której
                      udostępniony został pojazd
                    </Text>
                  </View>

                  <View style={[styles.splittedCol, { flex: 4 }]}>
                    <View style={[styles.splittedCell, { padding: 4 }]}>
                      <Text style={{ textAlign: 'center' }}>
                        Stan licznika na dzień udostępnienia pojazdu
                      </Text>
                    </View>
                    <View style={[styles.splittedCell, { padding: 4 }]}>
                      <Text style={{ textAlign: 'center' }}>
                        Stan licznika na dzień udostępnienia pojazdu
                      </Text>
                    </View>
                  </View>
                </View>

                {rows.map((row) =>
                  row ? (
                    <DataRow styles={styles} data={row} />
                  ) : (
                    <EmptyRow styles={styles} />
                  )
                )}
              </View>
            </Page>
          );
        });
      })}
    </Document>
  );
};

Font.register({
  family: 'Roboto',
  src:
    'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
});

Font.registerHyphenationCallback((word) => [word]);

ReportVatTemplate.propTypes = {};

export default ReportVatTemplate;
