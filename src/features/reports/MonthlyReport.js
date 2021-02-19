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

// Create Document Component

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  row: { margin: 'auto', flexDirection: 'row', width: '100%', display: 'flex' },
  col: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  cell: { margin: 'auto', marginTop: 5, fontSize: 10 },
});

const headers = [
  'Nr kolejny wpisu',
  'Data wyjazdu/udostępnienia pojazdu',
  'Opis trasy wyjazdu (skąd-dokąd)',
  'Cel wyjazdu/udostępnienia pojazdu',
  'Liczba faktyczna przejechanych kilometrów',
  'Imię i nazwisko osoby kierującej pojazdem/osoby, której udostępniony został pojazd',
  'Stan licznika na dzień udostępnienia pojazdu',
];
const MonthlyReport = ({ data }) => {
  return (
    <Document>
      {data.map((record) => (
        <Page size='A4' style={styles.page}>
          <View style={styles.table}>
            <View style={styles.row}>
              <View style={[styles.col, { flex: 1 }]}>
                <Text style={styles.cell}>Nr kolejny wpisu </Text>
              </View>
              <View style={[styles.col, { flex: 2 }]}>
                <Text style={styles.cell}>
                  Data wyjazdu/udostępnienia pojazdu{' '}
                </Text>
              </View>
              <View style={[styles.col, { flex: 3 }]}>
                <Text style={styles.cell}>
                  Opis trasy wyjazdu (skąd-dokąd){' '}
                </Text>
              </View>
              <View style={[styles.col, { flex: 6 }]}>
                <Text style={styles.cell}>
                  Cel wyjazdu/udostępnienia pojazdu{' '}
                </Text>
              </View>
              <View style={[styles.col, { flex: 3 }]}>
                <Text style={styles.cell}>
                  Liczba faktyczna przejechanych kilometrów{' '}
                </Text>
              </View>
              <View style={[styles.col, { flex: 3 }]}>
                <Text style={styles.cell}>
                  Imię i nazwisko osoby kierującej pojazdem/osoby, której
                  udostępniony został pojazd{' '}
                </Text>
              </View>
              <View style={[styles.col, { flex: 3 }]}>
                <Text style={styles.cell}>
                  Stan licznika na dzień udostępnienia pojazdu{' '}
                </Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.col, { flex: 1 }]}>
                <Text style={styles.cell}> </Text>
              </View>
              <View style={[styles.col, { flex: 2 }]}>
                <Text style={styles.cell}> </Text>
              </View>
              <View style={[styles.col, { flex: 3 }]}>
                <Text style={styles.cell}> </Text>
              </View>
              <View style={[styles.col, { flex: 6 }]}>
                <Text style={styles.cell}> </Text>
              </View>
              <View style={[styles.col, { flex: 3 }]}>
                <Text style={styles.cell}> </Text>
              </View>
              <View style={[styles.col, { flex: 3 }]}>
                <Text style={styles.cell}> </Text>
              </View>
              <View style={[styles.col, { flex: 3 }]}>
                <Text style={styles.cell}> </Text>
              </View>
            </View>
          </View>
        </Page>
      ))}
    </Document>
  );
};

Font.registerHyphenationCallback((word) => [word]);

MonthlyReport.propTypes = {};

export default MonthlyReport;
