import React from 'react';
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  Font,
} from '@react-pdf/renderer';

import EmptyRow from './EmptyRow';
import DataRow from './DataRow';
import ReportVatHeader from './ReportVatHeader';
import ReportVatFooter from './ReportVatFooter';

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

const ReportVatTemplate = ({ data: records, company }) => {
  return (
    <Document>
      {records.map((recordData) => {
        const pagesCount = Math.ceil(recordData.trips.length / 17) || 1;
        const pages = Array.from(Array(pagesCount), (v, k) => k);

        return pages.map((page) => {
          const rows = Array.from(
            Array(17),
            (v, idx) => recordData.trips[idx + page * 17],
          );
          const initMonthMileage = recordData.trips[0]?.mileageStart || '';
          const pageSumDistance =
            rows.reduce((acc, cur) => (cur ? acc + cur.distance : acc), 0) ||
            '';
          const sumDistance =
            recordData.trips.reduce(
              (acc, cur) => (cur ? acc + cur.distance : acc),
              0,
            ) || '';
          return (
            <Page size='A4' style={styles.page}>
              <ReportVatHeader
                totalPages={pagesCount}
                currentPage={page + 1}
                record={recordData.record}
                company={company}
                initMonthMileage={initMonthMileage}
              />

              <View style={styles.table}>
                <View style={styles.row}>
                  <View style={[styles.header, { flex: 1 }]}>
                    <Text style={styles.cell}>Nr kolejny wpisu </Text>
                  </View>
                  <View style={[styles.header, { width: 65 }]}>
                    <Text style={styles.cell}>
                      Data wyjazdu/ udostępnienia pojazdu
                    </Text>
                  </View>
                  <View style={[styles.header, { width: 100 }]}>
                    <Text style={styles.cell}>
                      Opis trasy wyjazdu (skąd-dokąd)
                    </Text>
                  </View>
                  <View style={[styles.header, { width: 130 }]}>
                    <Text style={styles.cell}>
                      Cel wyjazdu/ udostępnienia pojazdu
                    </Text>
                  </View>
                  <View style={[styles.header, { width: 70 }]}>
                    <Text style={styles.cell}>
                      Liczba faktyczna przejechanych kilometrów
                    </Text>
                  </View>
                  <View style={[styles.header, { width: 90 }]}>
                    <Text style={styles.cell}>
                      Imię i nazwisko osoby kierującej pojazdem/osoby, której
                      udostępniony został pojazd
                    </Text>
                  </View>

                  <View style={[styles.splittedCol, { width: 80 }]}>
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
                  ),
                )}
              </View>
              <ReportVatFooter
                record={recordData.record}
                pageSumDistance={pageSumDistance}
                sumDistance={sumDistance}
              />
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
