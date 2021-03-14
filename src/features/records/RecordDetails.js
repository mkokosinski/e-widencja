import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRecord, selectRecordById } from './recordsSlice';

import Routing from '../routing/Routing';

import LineChart from '../charts/Chart';
import RecentList from '../templates/detailsView/RecentTrips';
import {
  ButtonGoBack,
  ButtonEdit,
  DetailsDeleteButton,
} from '../templates/detailsView/DetailsComponents';
import {
  DetailsTopPanel,
  DetailsTitle,
  DetailsInfo,
  DetailsIco,
  DetailsLabel,
  DetailsData,
  Details,
  SectionDesc,
  DetailsSection,
} from '../templates/detailsView/DetailsStyles';

import { ReactComponent as CompanyIco } from '../../assets/branding.svg';
import { ReactComponent as YearIco } from '../../assets/year.svg';
import { ReactComponent as MonthIco } from '../../assets/month.svg';
import { ReactComponent as CarIco } from '../../assets/car.svg';
import { months, monthsShort } from '../../utils/dateUtils';
import { selectTripsForRecord } from '../trips/tripsSlice';
import { getTripsData } from '../../utils/chartUtils';

const VehileDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const record = useSelector((state) => selectRecordById(state, id));
  const trips = useSelector((state) => selectTripsForRecord(state, id));

  const recordTrips = {
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

  return record ? (
    <Details>
      <SectionDesc>
        <DetailsTopPanel>
          <ButtonGoBack />
          <DetailsTitle>{record.name}</DetailsTitle>
          <ButtonEdit
            actionPath={`${Routing.RecordEdit.action}/${record.id}`}
          />
          <DetailsDeleteButton
            item={record}
            onClick={() => dispatch(deleteRecord(record.id))}
            redirectPath={Routing.Records.path}
          />
        </DetailsTopPanel>

        <DetailsInfo>
          <DetailsIco>
            <CompanyIco />
          </DetailsIco>
          <DetailsData>{record.company}</DetailsData>
          <DetailsLabel>Firma</DetailsLabel>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <YearIco />
          </DetailsIco>
          <DetailsData>{record.year}</DetailsData>
          <DetailsLabel>Rok</DetailsLabel>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <MonthIco />
          </DetailsIco>
          <DetailsData>{months[record.month]}</DetailsData>
          <DetailsLabel>Miesiąc</DetailsLabel>
        </DetailsInfo>

        <DetailsInfo>
          <DetailsIco>
            <CarIco />
          </DetailsIco>
          <DetailsData>{record.vehicle.name}</DetailsData>
          <DetailsLabel>Pojazd</DetailsLabel>
        </DetailsInfo>
      </SectionDesc>

      <DetailsSection>
        <LineChart
          data={recordTrips}
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
