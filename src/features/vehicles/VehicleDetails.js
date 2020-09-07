import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { selectVehicleById } from './vehiclesSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faPencilAlt,
  faCopyright,
  faCarSide,
  faTachometerAlt,
  faColumns,
} from '@fortawesome/free-solid-svg-icons';

import LineChart from '../charts/Chart';
import {
  DetailsTopPanel,
  DetailsGoBack,
  DetailsTitle,
  DetailsEdit,
  DetailsInfo,
  DetailsIco,
  DetailsLabel,
  DetailsData,
  Details,
} from '../layout/LayoutStyles';

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
      data: [130, 140, 154, 142, 121, 130, 132, 124, 100, 121, 130, 144],
      backgroundColor: ['transparent'],
      borderColor: ['#5840BB'],
      borderWidth: 2,
    },
  ],
};

const VehileDetails = () => {
  const [data, setData] = useState();

  const { id } = useParams();
  const { goBack } = useHistory();

  const vehicle = useSelector((state) => selectVehicleById(state, id));

  useEffect(() => {
    setData(limitData(6));
  }, []);

  const limitData = (limit) => {
    const { labels, datasets } = sampleData;
    const limitedLabels = labels.slice(limit - 6, limit);
    const limitData = datasets[0].data.slice(limit - 6, limit);
    return {
      labels: limitedLabels,
      datasets: [{ ...datasets[0], data: limitData }],
    };
  };

  return vehicle ? (
    <Details>
      <DetailsTopPanel>
        <DetailsGoBack onClick={goBack}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </DetailsGoBack>
        <DetailsTitle>{vehicle.name}</DetailsTitle>
        <DetailsEdit>
          <FontAwesomeIcon icon={faPencilAlt} />
        </DetailsEdit>
      </DetailsTopPanel>

      <DetailsInfo>
        <DetailsIco>
          <FontAwesomeIcon icon={faCopyright} />
        </DetailsIco>
        <DetailsLabel>Marka</DetailsLabel>
        <DetailsData>{vehicle.mark}</DetailsData>
      </DetailsInfo>

      <DetailsInfo>
        <DetailsIco>
          <FontAwesomeIcon icon={faCarSide} />
        </DetailsIco>
        <DetailsLabel>Model</DetailsLabel>
        <DetailsData>{vehicle.model}</DetailsData>
      </DetailsInfo>

      <DetailsInfo>
        <DetailsIco>
          <FontAwesomeIcon icon={faTachometerAlt} />
        </DetailsIco>
        <DetailsLabel>Przebieg</DetailsLabel>
        <DetailsData>{vehicle.mileage}</DetailsData>
      </DetailsInfo>

      <DetailsInfo>
        <DetailsIco>
          <FontAwesomeIcon icon={faColumns} />
        </DetailsIco>
        <DetailsLabel>Numer rejestracyjny</DetailsLabel>
        <DetailsData>{vehicle.registrationNumber}</DetailsData>
      </DetailsInfo>

      <LineChart
        data={data}
        next={() => {
          setData(limitData(12));
          console.log('next');
        }}
      />
    </Details>
  ) : null;
};

export default VehileDetails;
