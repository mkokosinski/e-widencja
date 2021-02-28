import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from '@react-pdf/renderer';

const EmptyRow = ({ styles }) => {
  return (
    <View style={styles.row}>
      <View style={[styles.col, { flex: 2 }]}>
        <Text style={styles.cell}></Text>
      </View>
      <View style={[styles.col, { flex: 3 }]}>
        <Text style={styles.cell}> </Text>
      </View>
      <View style={[styles.col, { flex: 5 }]}>
        <Text style={styles.cell}></Text>
      </View>
      <View style={[styles.col, { flex: 7 }]}>
        <Text style={styles.cell}> </Text>
      </View>
      <View style={[styles.col, { flex: 3 }]}>
        <Text style={styles.cell}></Text>
      </View>
      <View style={[styles.col, { flex: 4 }]}>
        <Text style={styles.cell}></Text>
      </View>

      <View style={[styles.splittedCol, { flex: 4 }]}>
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
