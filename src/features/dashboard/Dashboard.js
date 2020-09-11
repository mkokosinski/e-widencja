import React from 'react';

import LineChart from '../charts/Chart';
import { DetailsSection } from '../templates/detailsView/DetailsStyles';

const sampleData = {
  labels: [
    'Sty',
    'Lut',
    'Mar',
    'Kwi',
    'Maj',
    'Cze',
    'Lip',
    'Sie',
    'Wrz',
    'Paź',
    'Lis',
    'Gru',
  ],
  datasets: [
    {
      label: 'Przejechano',
      data: [242, 215, 224, 242, 232, 224, 200, 199, 202, 222, 230, 244],
      backgroundColor: ['transparent'],
      borderColor: 'rgba(88, 64, 187,0.8)',
      borderWidth: 2,
      pointBorderColor: '#ffffff',
      pointBackgroundColor: 'rgba(88, 64, 187,1)',
      pointRadius: 6,
      pointBorderWidth: 3,
    },
  ],
};

const Dashboard = () => {
  return (
    <DetailsSection>
      <LineChart
        data={sampleData}
        dataOffset={6}
        title={'Przejechane kilometry'}
      />
    </DetailsSection>
  );
};

export default Dashboard;
