import React from 'react';
import { Text, View } from '@react-pdf/renderer';

const DataRow = ({ styles, data }) => {
  return (
    <View style={styles.row}>
      <View style={[styles.header, { flex: 1 }]}>
        <Text style={styles.cell}>{data.rowNumber}</Text>
      </View>
      <View style={[styles.header, { width: 65 }]}>
        <Text style={styles.cell}>{data.date} </Text>
      </View>
      <View style={[styles.header, { width: 100 }]}>
        <Text style={styles.cell}>{data.label}</Text>
      </View>
      <View style={[styles.header, { width: 130 }]}>
        <Text style={styles.cell}> {data.purpose}</Text>
      </View>
      <View style={[styles.header, { width: 70 }]}>
        <Text style={styles.cell}> {data.distance} </Text>
      </View>
      <View style={[styles.header, { width: 90 }]}>
        <Text style={styles.cell}> {data.driver} </Text>
      </View>

      <View style={[styles.splittedCol, { width: 80 }]}>
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
