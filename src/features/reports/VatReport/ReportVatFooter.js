import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import { months } from '../../../utils/dateUtils';

const ReportVatFooter = ({ record, pageSumDistance, sumDistance }) => {
  return (
    <>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            fontWeight: 'bold',

            marginTop: 10,
          }}
        >
          <Text style={{ marginRight: 5 }}>UWAGA:</Text>

          <Text style={{ textAlign: 'justify' }}>
            W przypadku, gdy pojazd samochodowy jest udostępniany osobie
            niebędącej pracownikiem podatnika, ewidencję przebiegu pojazdu
            wypełnia osoba, która udostępnia pojazd.
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            height: 40,
            marginRight: 5,
            textAlign: 'right',
            width: 150,
          }}
        >
          <Text
            style={{
              flex: 1,
            }}
          >
            Podsumowanie strony
          </Text>
          <Text
            style={{
              flex: 1,
            }}
          >
            Z przeniesienia
          </Text>
          <Text
            style={{
              flex: 1,
            }}
          >
            Razem
          </Text>
        </View>
        <View
          style={{
            borderStyle: 'solid',
            borderWidth: 1,
            borderTopWidth: 0,
            flexDirection: 'column',
            height: 40,
            width: 71,
            textAlign: 'center',
          }}
        >
          <Text
            style={{
              borderStyle: 'solid',
              borderBottomWidth: 1,
              flex: 1,
            }}
          >
            {pageSumDistance}
          </Text>
          <Text
            style={{
              borderBottomWidth: 1,
              flex: 1,
            }}
          >
            {' '}
          </Text>
          <Text style={{ flex: 1 }}>{sumDistance}</Text>
        </View>
        <View
          style={{
            borderStyle: 'solid',
            borderWidth: 1,
            borderLeftWidth: 0,
            borderTopWidth: 0,
            height: 40,
            width: 170,
          }}
        >
          <Text></Text>
        </View>
        <View>
          <Text></Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 16,
        }}
      >
        <Text>
          {` Stan licznika ${
            record.vehicle.mileage
          } na koniec miesiąca / kwartału1)  ${months[record.month - 1]} roku ${
            record.year
          } Podpis podatnika . . . . . . . . . . . . . . . . . . . . . . . . . . . `}
        </Text>
      </View>
    </>
  );
};

ReportVatFooter.propTypes = {};

export default ReportVatFooter;
