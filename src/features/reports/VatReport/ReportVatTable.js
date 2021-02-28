import React from 'react';
import PropTypes from 'prop-types';

const ReportVatTable = (props) => {
  return (
    <View style={styles.table}>
      <View style={styles.row}>
        <View style={[styles.col, { flex: 2 }]}>
          <Text style={styles.cell}>Nr kolejny wpisu </Text>
        </View>
        <View style={[styles.col, { flex: 3 }]}>
          <Text style={styles.cell}>Data wyjazdu/ udostępnie- nia pojazdu</Text>
        </View>
        <View style={[styles.col, { flex: 4 }]}>
          <Text style={styles.cell}>Opis trasy wyjazdu (skąd-dokąd)</Text>
        </View>
        <View style={[styles.col, { flex: 8 }]}>
          <Text style={styles.cell}>Cel wyjazdu/ udostępnienia pojazdu</Text>
        </View>
        <View style={[styles.col, { flex: 3 }]}>
          <Text style={styles.cell}>
            Liczba faktyczna przeje- chanych kilometrów
          </Text>
        </View>
        <View style={[styles.col, { flex: 4 }]}>
          <Text style={styles.cell}>
            Imię i nazwisko osoby kierującej pojazdem/osoby, której udostępnio-
            ny został pojazd
          </Text>
        </View>
        <View style={[styles.col, { flex: 4, flexDirection: 'column' }]}>
          <View style={{ borderBottomWidth: 1 }}>
            <Text style={styles.cell}>
              Stan licznika na dzień udostępnie- nia pojazdu
            </Text>
          </View>
          <View>
            <Text style={styles.cell}>
              Stan licznika na dzień udostępnie- nia pojazdu
            </Text>
          </View>
        </View>
      </View>

      {rows.map((trip, idx) =>
        trip ? (
          <DataRow styles={styles} data={{ ...trip, rowNumber: idx + 1 }} />
        ) : (
          <EmptyRow styles={styles} />
        ),
      )}
    </View>
  );
};

ReportVatTable.propTypes = {};

export default ReportVatTable;
