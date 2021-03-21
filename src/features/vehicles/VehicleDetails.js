import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVehicle } from './redux/vehicleThunk';

import Routing from '../routing/Routing';
import NoticesList from '../forms/vehicle/NoticesList';
import AppLink from '../templates/AppLink';
import LineChart from '../charts/Chart';
import RecentList from '../templates/detailsView/RecentTrips';
import {
  ButtonGoBack,
  ButtonEdit,
  DetailsDeleteButton,
} from '../templates/detailsView/DetailsComponents';

import { selectTripsForVehicle } from '../trips/tripsSlice';
import { selectVehicleById } from './redux/vehiclesSlice';
import { monthsShort } from '../../utils/dateUtils';
import { getTripsData } from '../../utils/chartUtils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as CarIco } from '../../assets/car.svg';
import { ReactComponent as LicenseIco } from '../../assets/licensePlate.svg';
import { ReactComponent as TachometerIco } from '../../assets/tachometer.svg';
import { ReactComponent as BrandIco } from '../../assets/branding.svg';
import {
  DetailsTopPanel,
  DetailsTitle,
  DetailsInfo,
  DetailsIco,
  DetailsLabel,
  DetailsData,
  Details,
  SectionDesc,
  DetailsButton,
  DetailsSection,
} from '../templates/detailsView/DetailsStyles';

const VehileDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const vehicle = useSelector((state) => selectVehicleById(state, id));
  const trips = useSelector((state) => selectTripsForVehicle(state, id));

  const vehicleTrips = {
    labels: monthsShort,
    datasets: [
      {
        label: 'Przejechano',
        data: getTripsData(trips),
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

  return vehicle ? (
    <Details>
      <SectionDesc>
        <DetailsTopPanel>
          <ButtonGoBack />
          <DetailsTitle>{vehicle.name}</DetailsTitle>
          <ButtonEdit
            actionPath={`${Routing.VehicleEdit.action}/${vehicle.id}`}
          />
          <DetailsDeleteButton
            item={vehicle}
            redirectPath={Routing.Vehicles.path}
            onClick={() => dispatch(deleteVehicle(vehicle.id))}
          />
          <DetailsButton>
            <AppLink to={`${Routing.VehicleAddNotice.action}/${id}`}>
              <FontAwesomeIcon icon={faExclamationCircle} />
            </AppLink>
          </DetailsButton>
        </DetailsTopPanel>

        <DetailsInfo>
          <DetailsIco>
            <BrandIco />
          </DetailsIco>
          <DetailsData>{vehicle.brand}</DetailsData>
          <DetailsLabel>Marka</DetailsLabel>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <CarIco />
          </DetailsIco>
          <DetailsData>{vehicle.model}</DetailsData>
          <DetailsLabel>Model</DetailsLabel>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <TachometerIco />
          </DetailsIco>
          <DetailsData>{vehicle.mileage} km</DetailsData>
          <DetailsLabel>Przebieg</DetailsLabel>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <LicenseIco />
          </DetailsIco>
          <DetailsData>{vehicle.registrationNumber}</DetailsData>
          <DetailsLabel>Numer rejestracyjny</DetailsLabel>
        </DetailsInfo>
      </SectionDesc>

      <DetailsSection>
        <DetailsTitle>Zgłoszone uwagi</DetailsTitle>
        <NoticesList vehicles={[vehicle]} />
      </DetailsSection>

      <DetailsSection>
        <LineChart
          data={vehicleTrips}
          dataOffset={6}
          title={'Przejechane kilometry'}
        />
      </DetailsSection>

      <DetailsSection>
        <RecentList title='Ostatnie trasy' list={trips} />
      </DetailsSection>
    </Details>
  ) : null;
};

export default VehileDetails;
