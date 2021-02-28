import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from '@react-pdf/renderer';

const DataRow = ({ styles, data }) => {
  return (
    <View style={styles.row}>
      <View style={[styles.col, { flex: 2 }]}>
        <Text style={styles.cell}>{data.rowNumber}</Text>
      </View>
      <View style={[styles.col, { flex: 3 }]}>
        <Text style={styles.cell}>{data.date} </Text>
      </View>
      <View style={[styles.col, { flex: 5 }]}>
        <Text style={styles.cell}>{data.label}</Text>
      </View>
      <View style={[styles.col, { flex: 7 }]}>
        <Text style={styles.cell}> {data.purpose}</Text>
      </View>
      <View style={[styles.col, { flex: 3 }]}>
        <Text style={styles.cell}> {data.distance} </Text>
      </View>
      <View style={[styles.col, { flex: 4 }]}>
        <Text style={styles.cell}> {data.driver} </Text>
      </View>

      <View style={[styles.splittedCol, { flex: 4 }]}>
        <View style={styles.splittedCell}>
          <Text style={{ textAlign: 'center' }}>{data.mileageStart}</Text>
        </View>
        <View style={styles.splittedCell}>
          <Text style={{ textAlign: 'center' }}>{data.mileageEnd}</Text>
        </View>
      </View>
    </View>
  );
};

DataRow.propTypes = {};

export default DataRow;
