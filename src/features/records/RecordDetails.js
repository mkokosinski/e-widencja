import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRecord, selectRecordById } from './recordsSlice';

import Routing from '../routing/Routing';

import RecentList from '../templates/detailsView/RecentTrips';
import {
  ButtonGoBack,
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
import { months } from '../../utils/dateUtils';
import { selectTripsForRecord } from '../trips/tripsSlice';
import { selectCompany } from '../company/companySlice';

const RecordDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const record = useSelector((state) => selectRecordById(state, id));
  const trips = useSelector((state) => selectTripsForRecord(state, id));
  const company = useSelector(selectCompany);

  return record ? (
    <Details>
      <SectionDesc>
        <DetailsTopPanel>
          <ButtonGoBack />
          <DetailsTitle>{record.name}</DetailsTitle>
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
          <DetailsData>{company.name}</DetailsData>
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
        <RecentList title='Ostatnie trasy' list={trips} />
      </DetailsSection>
    </Details>
  ) : null;
};

export default RecordDetails;
