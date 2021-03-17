import React from 'react';
import { Text, View } from '@react-pdf/renderer';

const EmptyRow = ({ styles }) => {
  return (
    <View style={styles.row}>
      <View style={[styles.header, { flex: 1 }]}>
        <Text style={styles.cell}></Text>
      </View>
      <View style={[styles.header, { width: 65 }]}>
        <Text style={styles.cell}> </Text>
      </View>
      <View style={[styles.header, { width: 100 }]}>
        <Text style={styles.cell}></Text>
      </View>
      <View style={[styles.header, { width: 130 }]}>
        <Text style={styles.cell}> </Text>
      </View>
      <View style={[styles.header, { width: 70 }]}>
        <Text style={styles.cell}></Text>
      </View>
      <View style={[styles.header, { width: 90 }]}>
        <Text style={styles.cell}></Text>
      </View>

      <View style={[styles.splittedCol, { width: 80 }]}>
        <View style={styles.splittedCell}>
          <Text style={{ textAlign: 'center' }}></Text>
        </View>
        <View style={styles.splittedCell}>
          <Text style={{ textAlign: 'center' }}></Text>
        </View>
      </View>
    </View>
  );
};

EmptyRow.propTypes = {};

export default EmptyRow;
